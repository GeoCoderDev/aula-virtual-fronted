import { ObjetoConStringYNumber } from "@/interfaces/CustomObjects";
import { MethodHTTP } from "@/interfaces/MethodsHTTP";
import { useCallback, useEffect, useState } from "react";
import useAPI from "./useAPI";

/**
 * Las referencias deben ir en el mismo
 * orden de los parametros de consulta
 * @param endpoint
 * @param limit
 * @param startFrom
 * @param queryParams
 * @param searchParamsRef
 * @param method
 * @param body
 * @returns
 */
const useBatchAPI = <T>(
  endpoint: string,
  limit: number,
  startFrom: number = 0,
  queryParams: ObjetoConStringYNumber | null = null,
  searchParamsRef: React.MutableRefObject<
    HTMLInputElement | HTMLSelectElement | undefined
  >[],
  method: MethodHTTP = "GET",
  body: string | null = null
) => {
  const { fetchAPI, fetchCancelables } = useAPI();
  const [results, setResults] = useState<Array<T>>([]);
  const [start, setStart] = useState(startFrom);
  const [count, setCount] = useState(Number.MAX_VALUE);
  const [isLoading, setIsLoading] = useState(true);
  const [allResultsGetted, setAllResultsGetted] = useState(false);

  //Definicion de la funcion fetchNextResults
  const fetchNextResults = useCallback(async () => {
    if (fetchAPI === undefined || start >= count) {
      if (count === 0) {
        setIsLoading(false);
        setResults([]);
        setAllResultsGetted(true);
      }
      return;
    }

    try {
      const fetchCancelable = fetchAPI(
        endpoint,
        method,
        { ...queryParams, startFrom: start, limit },
        body
      );

      if (fetchCancelable === undefined) return;


      setIsLoading(true);

      const res = await fetchCancelable.fetch();

      let equalsQueryParams = true;
      let indice = -1;

      for (const [key, value] of Object.entries(fetchCancelable.queryParams)) {
        indice++;
        if (searchParamsRef?.[indice]?.current === undefined) continue;
        if (searchParamsRef[indice].current?.value !== value) {
          console.log("%cdiferente", "font-size: 2rem")

          console.log(
            "current-" + key,
            '"' + searchParamsRef[indice].current?.value + '"'
          );
          console.log("old-" + key, '"' + value + '"');

          equalsQueryParams = false;
          break;
        }
      }

      if (!equalsQueryParams) return;

      const {
        results: nextResults,
        count: countResults,
      }: { results: Array<T>; count?: number } = await res.json();

      if (countResults !== undefined) setCount(countResults);

      if (start === 0) {
        setResults(() => nextResults);
      } else {
        setResults(
          (prevResults) => [...prevResults, ...nextResults] as Array<T>
        );
      }

      setStart((prev) => prev + limit);
      setAllResultsGetted(start + limit >= count);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  }, [fetchAPI, body, endpoint, start, limit, method, queryParams, count]);

  useEffect(() => {
    setStart(() => startFrom);
  }, [endpoint, limit, startFrom, queryParams, method, body]);

  useEffect(() => {
    if(start>=count) return setAllResultsGetted(true);
    if (start !== startFrom) return;
    setIsLoading(true);
    setAllResultsGetted(false);
    setResults([]);
    setStart(() => startFrom);
    fetchNextResults();
  }, [fetchNextResults, startFrom, start, queryParams]);

  return { fetchNextResults, results, isLoading, allResultsGetted };
};

export default useBatchAPI;
