"use client";

import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import Loader from "@/components/shared/Loader";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";
import SuccessMessage from "@/components/shared/messages/SuccessMessage";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";
import {
  RespuestaForo,
  RespuestaForoRegisterFormFields,
} from "@/interfaces/Foro";
import { equalObjects } from "@/lib/helpers/equalObjects";
import { ChangeEventHandler, FormEventHandler, useState } from "react";

import { useUserSessionData } from "@/lib/utils/UserSessionData";
import { UserEstado } from "@/interfaces/Student";

const initialState: RespuestaForoRegisterFormFields = {
  Contenido_Respuesta: "",
};

const RegisterStudentResponse = ({
  isAnswered,
  Id_Foro,
  addStudentResponseInFrontend,
}: {
  isAnswered: boolean;
  Id_Foro: number;
  addStudentResponseInFrontend: (studentResponse: RespuestaForo) => void;
}) => {
  const { UserSessionData } = useUserSessionData();

  const [form, setForm] = useState(initialState);

  const {
    fetchAPI,
    isSomethingLoading,
    setIsSomethingLoading,
    error,
    setError,
    successMessage,
    setSuccessMessage,
  } = useRequestAPIFeatures();

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const fetchCancelable = fetchAPI(
        `/api/forum/${Id_Foro}/addResponse`,
        "POST",
        null,
        JSON.stringify(form)
      );

      if (!fetchCancelable) return;

      setIsSomethingLoading(true);

      const res = await fetchCancelable.fetch();
      if (!res.ok) {
        const { message }: ErrorAPI = await res.json();
        if (!message) throw new Error();
        setError(() => ({
          message,
        }));
      } else {
        const { message, Id }: SuccessMessageAPI = await res.json();

        if (Id) {
          const newResponse: RespuestaForo = {
            Id_Respuesta_Foro: Id,
            Contenido_Respuesta: form.Contenido_Respuesta,
            Estudiante: {
              Id_Usuario: 0,
              Nombres: UserSessionData.Nombres!,
              Apellidos: UserSessionData.Apellidos!,
              Foto_Perfil_URL: UserSessionData.urlImage!,
              DNI_Estudiante: "",
              Estado: UserEstado.Habilitado,
            },
          };

          addStudentResponseInFrontend(newResponse);
        }

        setSuccessMessage(() => ({
          message: message ?? "Curso Registrado",
        }));
      }
      setForm(() => initialState);
      setIsSomethingLoading(false);
    } catch (e) {
      setError(() => ({
        message: "No se pudo registrar el curso",
      }));
      setIsSomethingLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mt-4 flex flex-col gap-2">
      <h3 className="font-semibold text-[1.2rem]">
        Agregar Respuesta:{" "}
        {isAnswered && <i>(No puedes agregar mas respuestas)</i>}
      </h3>
      <label htmlFor="">
        <textarea
          value={form.Contenido_Respuesta}
          required
          onChange={handleChange}
          name="Contenido_Respuesta"
          className="resize-none w-full border-[1px] border-black rounded-[0.5rem] p-3"
          rows={5}
          maxLength={255}
        ></textarea>
      </label>

      {!successMessage && !isSomethingLoading && error && (
        <ErrorMessage message={error.message} />
      )}

      {!error && !isSomethingLoading && successMessage && (
        <SuccessMessage
          className="text-rojo-orange"
          message={successMessage.message}
        />
      )}
      {!successMessage && (
        <button
          className="button-with-loader py-2 self-center"
          disabled={
            Boolean(error) ||
            Boolean(successMessage) ||
            isSomethingLoading ||
            isAnswered ||
            equalObjects(initialState, form)
          }
          type="submit"
        >
          Registrar Respuesta{" "}
          {isSomethingLoading && (
            <Loader backgroundSize="8px" width="25px" color="black" />
          )}
        </button>
      )}
    </form>
  );
};

export default RegisterStudentResponse;
