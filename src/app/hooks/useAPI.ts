import { useState, useEffect, useCallback } from "react";
import { MethodHTTP } from "@/interfaces/MethodsHTTP";
import { ObjetoConStringYNumber } from "@/interfaces/CustomObjects";
import useToken from "./useToken";
import { FetchCancelable } from "@/lib/utils/FetchCancellable";

const useAPI = () => {
  const { token, urlAPI } = useToken();
  const [fetchCancelables, setFetchCancelables] = useState<FetchCancelable[]>(
    []
  );  

  const fetchAPI = useCallback(
    (
      endpoint: string,
      method: MethodHTTP = "GET",
      queryParams: ObjetoConStringYNumber | null = null,
      body: string | null = null
    ) => {
      if (token === undefined) return undefined;

      const fetchCancelable = new FetchCancelable(
        `${urlAPI}${endpoint}`,
        {
          method,
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body,
        },
        queryParams as any
      );

      setFetchCancelables((prev) => [...prev, fetchCancelable]);
      return fetchCancelable;
    },
    [token, urlAPI]
  );

  return { fetchAPI, fetchCancelables };
};

export default useAPI;
