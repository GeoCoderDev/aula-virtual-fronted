import { setMyToken } from "@/state/Constants/myToken";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useToken = () => {

  const urlAPI = useSelector<RootState>((state) => state.globalConstants.urlAPI);

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

  const fetchAPIWithToken = (endpoint: string, body: string, method = "GET") => {
    return fetch(`${urlAPI}${endpoint}`, {
      method,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body,
    } as any);
  };

  return { fetchAPIWithToken };
};

export default useToken;
