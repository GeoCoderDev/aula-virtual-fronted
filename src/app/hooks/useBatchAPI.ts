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
  const [count, setCount] = useState(0);
  const [shouldFetchNextResults, setShouldFetchNextResults] = useState(false);

const fetchNextResults = useCallback(async () => {
    if (fetchAPI === undefined || start >= count) return;

    const res = await fetchAPI(
      endpoint,
      method,
      { ...queryParams, startFrom: start, limit: limit },
      body
    );
    const nextResults = await res!.json();
    setResults((prevResults) => [...prevResults, ...nextResults] as Array<T>);
    setStart((prev) => prev + limit);
  }, [fetchAPI, endpoint, count, limit, queryParams, method, body, start]);

  useEffect(() => {
    const getCount = async () => {
      if (fetchAPI === undefined) return;
      const getCountRegistersRes = await fetchAPI(endpointCount);
      const { count } = await getCountRegistersRes!.json();
      setCount(count);
      setShouldFetchNextResults(true); // Establecer shouldFetchNextResults a true después de obtener el count
    };

    getCount();
  }, [fetchAPI, endpointCount]);

  useEffect(() => {
    if (shouldFetchNextResults) {
      fetchNextResults();
      setShouldFetchNextResults(false); // Establecer shouldFetchNextResults a false después de llamar a fetchNextResults
    }
  }, [shouldFetchNextResults, fetchNextResults]);

  return { fetchNextResults, results };
  
};

export default useBatchAPI;