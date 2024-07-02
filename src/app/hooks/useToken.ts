

import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useToken = () => {

  const urlAPI = useSelector<RootState>(
    (state) => state.globalConstants.urlAPI
  );

  const [token, setToken] = useState<string | undefined>();

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

  return { token, urlAPI };
};

export default useToken;
