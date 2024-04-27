"use client";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import Loader from "../Loader";

interface LoginForm {
  username: string;
  password: string;
}

const initialForm: LoginForm = {
  username: "",
  password: "",
};

interface LoginFormProps {
  Api_Endpoint: string;
  welcomeMessageRole: string;
}

export default function LoginForm({
  Api_Endpoint,
  welcomeMessageRole,
}: LoginFormProps) {
  const [form, setForm] = useState<LoginForm>(initialForm);

  const [visiblePassword, setVisiblePassword] = useState(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    async function fetchData() {
      const response = await fetch(Api_Endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const message = await response.json();

      console.log(message);
    }

    try {
      setIsLoading(true);
      fetchData();
      setForm(initialForm);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  //INICIO DE SESION DE PROFESORES Y ALUMNOS
  return (
    <>
      {/* CONTENEDOR */}
      <div className="w-screen flex flex-row h-screen items-center justify-center">
        <div
          style={{ boxShadow: "0 0 22px 6px #00FF6F50" }}
          className="flex flex-row w-[60%] h-[73%] rounded-[2rem] border-red-100 -border-2 overflow-hidden"
        >
          {/* PRIMERA MITAD */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-1/2 items-center justify-center gap-y-7"
          >
            <h2 className="font-semibold text-[1.4rem]">Inicia sesión ahora</h2>

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
                className="-border-2 absolute aspect-auto w-6 right-2 bottom-1/2 -translate-y-1/2"
              />

              <button
                type="button"
                className="font-bold self-end text-sm mt-6 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </label>

            <button
              className="bg-verde-spotify rounded-full py-3 w-[80%] font-extrabold"
              type="submit"
            >
              ACCEDER{" "}
              {isLoading && (
                <Loader
                  className=""
                  width="20px"
                  color="black"
                  backgroundSize="8px"
                />
              )}
            </button>
          </form>

          {/* SEGUNDA MITAD */}
          <div className="bg-verde-spotify w-1/2 flex flex-col items-center justify-center p-[5%] gap-y-2">
            <img
              className="-border-2 border-b-teal-50 aspect-auto w-20"
              src="/svg/Logo Colegio.svg"
              alt="Logo Colegio"
            />
            <h1 className="text-center min-w-min font-black text-3xl">
              ¡Bienvenido <br />
              {welcomeMessageRole}!
            </h1>
            <p className="text-center">
              ¡Estamos encantados de darte la bienvenida a la plataforma virtual
              de
              <b> José Buenaventura Sepúlveda</b>! Aquí, la educación va más
              allá de las aulas tradicionales. ¡Únete a nosotros y descubre un
              nuevo mundo de posibilidades educativas!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
