import { setMyToken } from "@/state/Constants/myToken";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useToken = () => {

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

  return {token};
};

export default useToken;
