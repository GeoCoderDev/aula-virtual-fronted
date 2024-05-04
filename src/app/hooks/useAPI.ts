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
      if (token === undefined) return undefined;
      let query = '';

      if (queryParams) {
        const queryString = Object.entries(queryParams)
          .map(([key, value]) => {
            const trimmedValue = typeof value === "string" ? value.trim() : value;
            return trimmedValue !== '' ? `${key}=${trimmedValue}` : '';
          })
          .filter(Boolean)
          .join('&');

        query = `?${queryString}`;
      }

      console.log(`${urlAPI}${endpoint}${query}`);

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
