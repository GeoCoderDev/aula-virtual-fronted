"use client";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import Loader from "../Loader";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface LoginForm {
  username: string;
  password: string;
}

const initialForm: LoginForm = {
  username: "",
  password: "",
};

interface LoginFormProps {
  endpoint: string;
  welcomeMessageRole: string;
}

export default function LoginForm({
  endpoint,
  welcomeMessageRole,
}: LoginFormProps) {
  const urlAPI = useSelector<RootState>(
    (state) => state.globalConstants.urlAPI
  );

  const [form, setForm] = useState<LoginForm>(initialForm);

  const [visiblePassword, setVisiblePassword] = useState(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await fetch(`${urlAPI}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const { token } = await response.json();

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token }),
      });

      if (res.ok) {
        // Redirigir al usuario al home
        return (window.location.href = "/"); // Cambiar la URL y redirigir al home
      }

      console.log("Ocurrio un error");
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
      setForm(initialForm);
    }
  };

  //INICIO DE SESION DE PROFESORES Y ALUMNOS
  return (
    <>
      <div
        style={{ boxShadow: "0 0 22px 6px #00FF6F50" }}
        className="flex flex-row flex-wrap max-w-[83%] min-h-[28rem] rounded-[2rem] border-red-100 -border-2 overflow-hidden justify-center"
      >
        {/* PRIMERA MITAD */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-[25rem] min-w-[50%] max-md:order-5 items-center justify-items-center justify-center gap-y-7 p-5"
        >
          <h2 className="font-semibold text-[1.5rem] text-center">
            Inicia sesión ahora
          </h2>

          <input
            onChange={handleChange}
            name="username"
            required={true}
            style={{ boxShadow: "0 0 10px 4px #00FF6F50" }}
            className="outline-none w-[80%] px-4 rounded-[1rem] py-2 font-semibold placeholder:text-black"
            type="text"
            placeholder="Usuario*"
            value={form.username}
          />

          <label className="w-[80%] relative flex flex-col items-center justify-center">
            <input
              required={true}
              name="password"
              onChange={handleChange}
              style={{ boxShadow: "0 0 10px 4px #00FF6F50" }}
              className="outline-none w-full px-4 rounded-[1rem] py-2 font-semibold placeholder:text-black"
              type={visiblePassword ? "text" : "password"}
              placeholder="Contraseña*"
              value={form.password}
            />
            <img
              onClick={(e) => {
                setVisiblePassword(!visiblePassword);
              }}
              src={
                visiblePassword ? "/icons/ojo.svg" : "/icons/ojo_cerrado.svg"
              }
              alt="Icono-Ojo"
              className="-border-2 cursor-pointer absolute aspect-auto w-6 right-2 bottom-1/2 -translate-y-1/2"
            />

            <button
              type="button"
              className="font-bold self-end text-sm mt-6 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </label>

          <button
            className="bg-verde-spotify rounded-full py-3 w-[80%] min-w-[50%] font-extrabold flex items-center justify-center gap-x-2"
            type="submit"
          >
            ACCEDER{" "}
            {isLoading && (
              <Loader
                className=""
                width="20px"
                color="#000"
                backgroundSize="6px"
              />
            )}
          </button>
        </form>

        {/* SEGUNDA MITAD */}
        <div className="bg-verde-spotify w-[25rem] flex flex-col items-center justify-center gap-y-3 max-md:gap-y-2 max-md:p-5 p-7 flex-1">
          <img
            className="-border-2 border-b-teal-50 aspect-auto max-sm:w-[4.2rem] w-20"
            src="/svg/Logo Colegio.svg"
            alt="Logo Colegio"
          />
          <h1 className="text-center min-w-min font-black text-3xl max-sm:text-2xl max-w-[70%]">
            ¡Bienvenido {welcomeMessageRole}!
          </h1>
          <p className="text-center max-w-[20rem] max-md:text-sm px-[0.35rem]">
            ¡Estamos encantados de darte la bienvenida a la plataforma virtual
            de
            <b> José Buenaventura Sepúlveda</b>! Aquí, la educación va más allá
            de las aulas tradicionales. ¡Únete a nosotros y descubre un nuevo
            mundo de posibilidades educativas!
          </p>
        </div>
      </div>
    </>
  );
}
