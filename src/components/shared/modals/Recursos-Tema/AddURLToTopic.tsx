import React, { useState, ChangeEventHandler, FormEventHandler } from "react";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";
import { ModalNoActions } from "@/interfaces/ModalNoActions";
import ModalContainer from "../../ModalContainer";
import Loader from "../../Loader";
import ErrorMessage from "../../messages/ErrorMessage";
import SuccessMessage from "../../messages/SuccessMessage";
import { Topic } from "@/interfaces/Topic";

interface UrlTopicRegisterForm {
  Titulo: string;
  URL: string;
}

function equalObjects(obj1: object, obj2: object): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

const AddURLToTopic = ({
  eliminateModal,
  topic: { Nombre_Tema, Id_Tema },
  index,
  Nombre_Curso,
  Grado,
  Seccion,
}: ModalNoActions & {
  topic: Topic;
  index: number;
  Nombre_Curso: string;
  Grado: string;
  Seccion: string;
}) => {
  const initialState: UrlTopicRegisterForm = {
    Titulo: "",
    URL: "",
  };

  const [form, setForm] = useState(initialState);

  const {
    error,
    fetchAPI,
    setError,
    isSomethingLoading,
    setIsSomethingLoading,
    setSuccessMessage,
    successMessage,
  } = useRequestAPIFeatures();

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > = (e) => {
    setForm((prev) => {
      return { ...prev!, [e.target.name]: e.target.value };
    });
    reset();
  };

  const reset = () => {
    setError(null);
    setSuccessMessage(null);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Titulo", form.Titulo);
    formData.append("Grado", Grado);
    formData.append("Seccion", Seccion);

    formData.append("Nombre_Curso", Nombre_Curso);
    formData.append("URL", form.URL);

    const fetchCancelable = fetchAPI(
      `/api/topicResources/${Id_Tema}/addURL`,
      "POST",
      null,
      formData,
      false
    );

    if (!fetchCancelable) return;

    try {
      setIsSomethingLoading(true);
      const res = await fetchCancelable.fetch();

      if (!res.ok) {
        const { message }: ErrorAPI = await res.json();

        if (!message) throw new Error();

        setError(() => ({
          message,
        }));
      } else {
        const { message }: SuccessMessageAPI = await res.json();

        setSuccessMessage(() => ({
          message: message ?? `URL agregada al tema ${Nombre_Tema}`,
        }));

        setForm(initialState);
      }

      setIsSomethingLoading(false);
    } catch (e) {
      setError(() => ({ message: "Error al agregar la URL" }));
      setIsSomethingLoading(false);
    }
  };

  return (
    <ModalContainer
      eliminateModal={(e) => {
        if (!isSomethingLoading) eliminateModal(e);
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-y-5 mx-4 my-2"
      >
        <h3 className="text-[1.5rem] flex flex-wrap break-words font-bold">
          TEMA {index}: {Nombre_Tema}
        </h3>
        <label className="flex flex-col gap-y-2 font-bold">
          Titulo:
          <input
            required
            type="text"
            name="Titulo"
            value={form.Titulo}
            onChange={handleChange}
            className="custom-input w-[16rem]"
          />
        </label>

        <label className="flex flex-col gap-y-2 font-bold -border-2 w-[16rem]">
          URL:
          <input
            required
            type="url"
            name="URL"
            value={form.URL}
            onChange={handleChange}
            className="custom-input w-[16rem] font-normal"
          />
        </label>

        {!successMessage && !isSomethingLoading && error && (
          <ErrorMessage message={error.message} className="max-w-[15rem]" />
        )}

        {!error && !isSomethingLoading && successMessage && (
          <SuccessMessage
            className="text-rojo-orange max-w-[15rem]"
            message={successMessage.message}
          />
        )}

        <button
          className="button-with-loader py-2"
          disabled={
            Boolean(error) ||
            Boolean(successMessage) ||
            !Boolean(form.URL) ||
            isSomethingLoading ||
            equalObjects(form, initialState)
          }
          type="submit"
        >
          Agregar URL
          {isSomethingLoading && (
            <Loader backgroundSize="8px" width="25px" color="black" />
          )}
        </button>
      </form>
    </ModalContainer>
  );
};

export default AddURLToTopic;
