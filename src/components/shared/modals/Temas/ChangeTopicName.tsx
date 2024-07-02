import React, {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import ModalContainer from "../../ModalContainer";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";
import ErrorMessage from "../../messages/ErrorMessage";
import SuccessMessage from "../../messages/SuccessMessage";
import Loader from "../../Loader";
import { Topic } from "@/interfaces/Topic";

interface RegisterTopicFormFields {
  Nombre_Tema: string;
}

const ChangeTopicName = ({
  eliminateModal,
  topic: { Id_Tema, Nombre_Tema },
  changeNameTopicFrontend,
}: {
  eliminateModal: () => void;
  changeNameTopicFrontend: (idTema: number, newName: string) => void;
  topic: Topic;
}) => {
  const [form, setForm] = useState<RegisterTopicFormFields>({
    Nombre_Tema,
  });

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
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const fetchCancelable = fetchAPI(
      `/api/topics/${Id_Tema}`,
      "PUT",
      null,
      JSON.stringify(form)
    );

    if (!fetchCancelable) return;

    try {
      setIsSomethingLoading(true);

      const res = await fetchCancelable.fetch();

      if (res.ok) {
        const { message }: SuccessMessageAPI = await res.json();

        changeNameTopicFrontend(Id_Tema, form.Nombre_Tema);

        setSuccessMessage({
          message: message ?? "Se ha actualizado el nombre del tema",
        });
      } else {
        const { message }: ErrorAPI = await res.json();
        if (!message) throw new Error();

        setError({ message });
      }

      setIsSomethingLoading(false);
    } catch (e) {
      setError({ message: "Error al actualizar el nombre del Tema" });
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
        <h3 className="text-[1.5rem] font-semibold">CAMBIAR NOMBRE</h3>

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
            Boolean(error) ||
            Boolean(successMessage) ||
            isSomethingLoading ||
            form.Nombre_Tema === "" ||
            form.Nombre_Tema.trim() === Nombre_Tema
          }
          type="submit"
        >
          GUARDAR CAMBIOS
          {isSomethingLoading && (
            <Loader backgroundSize="8px" width="25px" color="black" />
          )}
        </button>
      </form>
    </ModalContainer>
  );
};

export default ChangeTopicName;
