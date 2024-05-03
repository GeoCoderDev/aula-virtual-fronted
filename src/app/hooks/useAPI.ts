import { useState, useEffect, useCallback } from "react";
import { MethodHTTP } from "@/interfaces/MethodsHTTP";
import { ObjetoConStringYNumber } from "@/interfaces/CustomObjects";
import useToken from "./useToken";

const useAPI = () => {
  const { token, urlAPI } = useToken();

  const fetchAPI = useCallback(
    (
      endpoint: string,
      method: MethodHTTP = "GET",
      queryParams: ObjetoConStringYNumber | null = null,
      body: string | null = null
    ) => {
      if (token === undefined) return;
      let query: undefined | string = undefined;

      if (queryParams) {
        query = "?";
        for (const [key, value] of Object.entries(queryParams)) {
          query = query + key + "=" + value + "&";
        }
      }

      console.log(endpoint);

      return fetch(`${urlAPI}${endpoint}${query ?? ""}`, {
        method,
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body,
      } as any);
    },
    [token]
  );

  return { fetchAPI };
};

export default useAPI;
