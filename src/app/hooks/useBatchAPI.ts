import { ObjetoConStringYNumber } from "@/interfaces/CustomObjects";
import { MethodHTTP } from "@/interfaces/MethodsHTTP";
import { useCallback, useEffect, useState } from "react";
import useAPI from "./useAPI";

const waitTimeRedirectionMS = 2300;

export interface ErrorBatchAPI {
  message: string;
}

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
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [allResultsGetted, setAllResultsGetted] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [error, setError] = useState<ErrorBatchAPI | null>(null);

  //Definicion de la funcion fetchNextResults
  const fetchNextResults = useCallback(async () => {
    if (!shouldFetch) return;

    if ((fetchAPI === undefined || start >= count) && count !== 0) return;

    try {
      const fetchCancelable = fetchAPI(
        endpoint,
        method,
        { ...queryParams, startFrom: start, limit },
        body
      );

      if (fetchCancelable === undefined) return;

      setIsLoading(true);

      while (fetchCancelables.length > 0) {
        const oldFetch = fetchCancelables.shift();
        oldFetch?.cancel();
      }

      const res = await fetchCancelable.fetch();

      let equalsQueryParams = true;
      let indice = -1;

      for (const [key, value] of Object.entries(fetchCancelable.queryParams)) {
        indice++;
        if (searchParamsRef?.[indice]?.current === undefined) continue;
        if (searchParamsRef[indice].current?.value !== value) {
          // console.log("%cdiferente", "font-size: 2rem");
          equalsQueryParams = false;
          break;
        }
      }

      if (!equalsQueryParams) return;

      const {
        results: nextResults,
        count: countResults,
        message,
      }: {
        results: Array<T>;
        count?: number;
        message?: string;
      } = await res.json();

      if (res.status === 401) {
        setError(() => ({
          message: message ?? "Tu sesion ha expirado o no estas autorizado",
        }));
        setTimeout(() => {
          window.location.href = "/";
        }, waitTimeRedirectionMS );
        return setIsLoading(false);
      }

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
    } catch (error: any) {
      const pattern = /signal is aborted without reason/;
      if (error.stack && pattern.test(error.stack)) return;
      setError(() => ({ message: "La red es inestable" }));
      setIsLoading(false);
    }
  }, [
    fetchAPI,
    body,
    endpoint,
    start,
    limit,
    method,
    queryParams,
    count,
    shouldFetch,
  ]);

  useEffect(() => {
    setStart(() => startFrom);
  }, [endpoint, limit, startFrom, queryParams, method, body]);

  // Reset the state when the query params change
  useEffect(() => {
    if (start >= count && count !== 0) return setAllResultsGetted(true);
    if (start !== startFrom) return;
    setIsLoading(true);
    setAllResultsGetted(false);
    setError(null);
    setResults([]);
    setStart(() => startFrom);
    fetchNextResults();
  }, [fetchNextResults, startFrom, start, queryParams]);

  useEffect(() => {
    setShouldFetch(false);
    setTimeout(() => setShouldFetch(true), 1000);
  }, [queryParams]);

  return { fetchNextResults, results, isLoading, allResultsGetted, error };
};

export default useBatchAPI;
