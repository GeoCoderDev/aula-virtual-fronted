import { ObjetoConStringYNumber } from "@/interfaces/CustomObjects";
import { MethodHTTP } from "@/interfaces/MethodsHTTP";
import { useCallback, useEffect, useState } from "react";
import useAPI from "./useAPI";

const useBatchAPI = <T>(
  endpoint: string,
  endpointCount: string,
  limit: number,
  startFrom: number = 0,
  queryParams: ObjetoConStringYNumber | null = null,
  method: MethodHTTP = "GET",
  body: string | null = null
) => {
  const { fetchAPI } = useAPI();
  const [results, setResults] = useState<Array<T>>([]);
  const [start, setStart] = useState(startFrom);
  const [count, setCount] = useState(Number.MAX_VALUE);
  const [isLoading, setIsLoading] = useState(false);
  const [allResultGetted, setAllResultGetted] = useState(false);

  const [shouldFetchNextResults, setShouldFetchNextResults] = useState(false);

  const fetchNextResults = useCallback(async () => {
    if (fetchAPI === undefined || start >= count) {
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetchAPI(
        endpoint,
        method,
        { ...queryParams, startFrom: start, limit: limit },
        body
      );
      const nextResults = await res!.json();
      setResults((prevResults) => [...prevResults, ...nextResults] as Array<T>);
      setStart((prev) => prev + limit);
      setAllResultGetted(start + limit >= count - 1);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  }, [fetchAPI, endpoint, count, limit, queryParams, method, body, start]);

    // Resetear los resultados al enviar el formulario
    useEffect(() => {
        setResults([]);
        setShouldFetchNextResults(false);
        setStart(startFrom);
        setIsLoading(false);
        setAllResultGetted(false);
    }, [queryParams, startFrom]);

  useEffect(() => {
    const getCount = async () => {
      setIsLoading(true);
      if (fetchAPI === undefined) return;
      const getCountRegistersRes = await fetchAPI(
        endpointCount,
        "GET",
        queryParams
      );
      if (getCountRegistersRes === undefined) return;
      const { count } = await getCountRegistersRes!.json();
      setCount(count);
      setShouldFetchNextResults(true); // Establecer shouldFetchNextResults a true después de obtener el count
    };

    getCount();
  }, [fetchAPI, endpointCount, queryParams]);

  useEffect(() => {
    if (shouldFetchNextResults) {
      fetchNextResults();
      setShouldFetchNextResults(false); // Establecer shouldFetchNextResults a false después de llamar a fetchNextResults
    }
  }, [shouldFetchNextResults, fetchNextResults]);

  return { fetchNextResults, results, isLoading, allResultGetted };
};

export default useBatchAPI;
