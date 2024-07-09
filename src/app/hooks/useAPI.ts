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
      body: BodyInit | string | null = null,
      JSONBody: boolean = true
    ) => {
      if (token === undefined) return undefined;

      const headers: { ["Content-Type"]?: string; Authorization: string } = {
        Authorization: token,
      };

      if (JSONBody) {
        headers["Content-Type"] = "application/json";
      }

      const fetchCancelable = new FetchCancelable(
        `${urlAPI}${endpoint}`,
        {
          method,
          headers,
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
