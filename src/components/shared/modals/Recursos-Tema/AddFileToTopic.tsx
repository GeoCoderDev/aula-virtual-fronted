import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";
import { ModalNoActions } from "@/interfaces/ModalNoActions";
import ModalContainer from "../../ModalContainer";
import Loader from "../../Loader";
import ErrorMessage from "../../messages/ErrorMessage";
import SuccessMessage from "../../messages/SuccessMessage";
import { Topic } from "@/interfaces/Topic";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import separateFullFileName from "../../../../lib/helpers/functions/separateFullFileName";
import { equalObjects } from "@/lib/helpers/equalObjects";
import validateFileExtension from "@/lib/helpers/validations/validateFileExtension";

interface FileTopicRegisterForm extends RecursoTemaRegisterFields {}

const AddFileToTopic = ({
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
  const initialState: FileTopicRegisterForm = {
    Titulo: "",
    Nombre_Curso,
    Grado,
    Seccion,
    Descripcion_Recurso: "",
  };

  const [form, setForm] = useState(initialState);

  const [file, setFile] = useState<File | null>(null);

  const {
    error,
    fetchAPI,
    setError,
    isSomethingLoading,
    setIsSomethingLoading,
    setSuccessMessage,
    successMessage,
  } = useRequestAPIFeatures();

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setError(null);

      const { status } = validateFileExtension(
        e.target.files[0].name,
        setError
      );

      if (status) setFile(e.target.files[0]);
    }
  };

  const reset = () => {
    setError(null);
    setSuccessMessage(null);
  };

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > = (e) => {
    setForm((prev) => {
      return { ...prev!, [e.target.name]: e.target.value };
    });
    reset();
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Titulo", form.Titulo);
    formData.append("Grado", form.Grado);
    formData.append("Seccion", form.Seccion);
    if (form.Descripcion_Recurso)
      formData.append("Descripcion_Recurso", form.Descripcion_Recurso);

    formData.append("Nombre_Curso", form.Nombre_Curso);

    if (file) {
      formData.append("Archivo", file);
      formData.append("Nombre_Archivo", separateFullFileName(file.name).Nombre);
    }

    const fetchCancelable = fetchAPI(
      `/api/topicResources/${Id_Tema}/addFile`,
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
          message: message ?? `Archivo agregado al tema ${Nombre_Tema}`,
        }));

        setFile(null);

        setForm(initialState);
      }

      setIsSomethingLoading(false);
    } catch (e) {
      setError(() => ({ message: "Error al agregar el archivo" }));
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
          Descripción:
          <textarea
            name="Descripcion_Recurso"
            value={form.Descripcion_Recurso ?? ""}
            rows={3}
            cols={30}
            maxLength={255}
            onChange={handleChange}
            className="custom-input resize-none -border-2 w-full font-normal"
          ></textarea>
        </label>

        <div className="flex flex-col items-center justify-center gap-y-2">
          <label
            onMouseUp={() => {
              setFile(null);
            }}
            className="flex flex-col gap-y-2 font-bold"
          >
            <input
              className="hidden"
              required
              type="file"
              name="Archivo"
              onChange={handleFileChange}
            />
            <span
              className={`w-max max-w-[8.5rem] text-wrap text-center bg-black py-1 leading-5 rounded-lg cursor-pointer break-words text-[0.9rem] px-3 ${
                file ? "text-verde-spotify" : "text-white"
              }`}
            >
              {file ? "Cambiar Archivo" : "Seleccionar Archivo"}
            </span>
          </label>
          <span className="flex justify-center max-w-[16rem]">
            <span
              title={file ? file.name : "No hay nigun archivo seleccionado"}
              className="max-w-[16rem] overflow-hidden text-ellipsis whitespace-nowrap -border-2"
            >
              {file
                ? `${separateFullFileName(file.name).Nombre}`
                : "No hay nigun archivo seleccionado"}
            </span>
            {file && "." + separateFullFileName(file.name).Extension}
          </span>
        </div>

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
            !Boolean(file) ||
            isSomethingLoading ||
            equalObjects(form, initialState)
          }
          type="submit"
        >
          Agregar Archivo{" "}
          {isSomethingLoading && (
            <Loader backgroundSize="8px" width="25px" color="black" />
          )}
        </button>
      </form>
    </ModalContainer>
  );
};

export default AddFileToTopic;
