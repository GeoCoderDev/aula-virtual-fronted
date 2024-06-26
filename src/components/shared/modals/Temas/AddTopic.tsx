import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import ModalContainer from "../../ModalContainer";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";
import ErrorMessage from "../../messages/ErrorMessage";
import SuccessMessage from "../../messages/SuccessMessage";
import Loader from "../../Loader";
import { Topic } from "@/interfaces/Topic";

interface RegisterTopicFormFields {
  Nombre_Tema: string;
  Id_Curso_Aula: number;
}

const AddTopic = ({
  eliminateModal,
  idCourseClassroom,
  addTopicFrontend,
}: {
  eliminateModal: () => void;
  idCourseClassroom: number;
  addTopicFrontend: (newTopic: Topic) => void;
}) => {
  const initialState: RegisterTopicFormFields = {
    Id_Curso_Aula: idCourseClassroom,
    Nombre_Tema: "",
  };

  const [form, setForm] = useState(initialState);

  const {
    error,
    fetchAPI,
    isSomethingLoading,
    setError,
    setIsSomethingLoading,
    successMessage,
    setSuccessMessage,
  } = useRequestAPIFeatures();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setError(null);
    setSuccessMessage(null);
    setForm(() => ({ ...form, [e.target.name]: e.target.value }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const fetchCancelable = fetchAPI(
      "/api/topics",
      "POST",
      null,
      JSON.stringify(form)
    );

    if (!fetchCancelable) return;

    try {
      setIsSomethingLoading(true);

      const res = await fetchCancelable.fetch();

      if (res.ok) {
        const { message, Id }: SuccessMessageAPI = await res.json();

        addTopicFrontend({ Id_Tema: Id!, Nombre_Tema: form.Nombre_Tema });

        setForm(() => initialState);

        setSuccessMessage(() => ({
          message: message ?? "Se ha creado el tema",
        }));
      } else {
        const { message }: ErrorAPI = await res.json();

        if (!message) throw Error();

        setError(() => ({ message }));
      }

      setIsSomethingLoading(false);
    } catch (e) {
      setError(() => ({ message: "Error al crear el Tema" }));
      setIsSomethingLoading(false);
    }
  };

  return (
    <ModalContainer
      eliminateModal={() => {
        if (!isSomethingLoading) eliminateModal();
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-3 items-center justify-center"
      >
        <h3 className="text-[1.5rem] font-semibold">AGREGAR TEMA</h3>

        <label className="flex flex-col gap-y-2 w-max -border-2">
          Nombre:
          <input
            name="Nombre_Tema"
            className="custom-input w-[18rem]"
            type="text"
            maxLength={150}
            value={form.Nombre_Tema}
            onChange={handleChange}
          />
        </label>

        {error && <ErrorMessage message={error.message} />}
        {successMessage && <SuccessMessage message={successMessage.message} />}

        <button
          className="button-with-loader mt-3"
          disabled={            
            Boolean(error) || Boolean(successMessage) || isSomethingLoading || form.Nombre_Tema===""
          }
          type="submit"
        >
          REGISTRAR TEMAl
          {isSomethingLoading && (
            <Loader backgroundSize="8px" width="25px" color="black" />
          )}
        </button>
      </form>
    </ModalContainer>
  );
};

export default AddTopic;
