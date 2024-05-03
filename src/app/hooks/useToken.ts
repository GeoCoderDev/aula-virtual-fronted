import { ObjetoConStringYNumber } from "@/interfaces/CustomObjects";
import { MethodHTTP } from "@/interfaces/MethodsHTTP";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useToken = () => {
  const urlAPI = useSelector<RootState>(
    (state) => state.globalConstants.urlAPI
  );

  const [token, setToken] = useState(null);

  //Aca se devuelve 401 si no hay token
  useEffect(() => {
    const fetchData = async function () {
      try {
        const res = await fetch("/api/auth/myToken");
        if (!res.ok) throw new Error();

        const { token } = await res.json();
        setToken(token);
      } catch (e) {
        fetch("/api/auth/close", { method: "PUT" }).finally(() => {
          window.location.href = "/login";
        });
      }
    };
    fetchData();
  }, []);

  const fetchAPIWithToken = (
    endpoint: string,
    method: MethodHTTP = "GET",
    queryParams: ObjetoConStringYNumber | null = null,
    body: string | null = null
  ) => {
    let query: undefined | string = undefined;

    if (queryParams) {
      query = "?";
      for (const [key, value] of Object.entries(queryParams)) {
        query = query + key + "=" + value + "&";
      }
    }

    return fetch(`${urlAPI}${endpoint}${query ?? ""}`, {
      method,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body,
    } as any);
  };

  return { fetchAPIWithToken, token };
};

export default useToken;