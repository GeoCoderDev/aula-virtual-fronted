import ModalContainer from "../../ModalContainer";
import Loader from "../../Loader";
import ErrorMessage from "../../messages/ErrorMessage";
import SuccessMessage from "../../messages/SuccessMessage";
import { ChangeEventHandler, FormEventHandler, useState } from "react";

import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";
import { equalObjects } from "@/lib/helpers/equalObjects";
import { ModalNoActions } from "@/interfaces/ModalNoActions";
import { Topic } from "@/interfaces/Topic";
import { RecursoTemaRegisterFields } from "../../../../interfaces/RecursoTema";

interface ForumFormFields extends RecursoTemaRegisterFields {}

const AddForumToTopic = ({
  eliminateModal,
  index,
  Nombre_Curso,
  Grado,
  Seccion,
  topic: { Id_Tema, Nombre_Tema },
}: ModalNoActions & {
  index: number;
  topic: Topic;
  Nombre_Curso: string;
  Grado: string;
  Seccion: string;
}) => {
  const initialState: ForumFormFields = {
    Titulo: "",
    Descripcion_Recurso: "",
  };

  const [form, setForm] = useState(initialState);
  const [descriptionImage, setDescriptionImage] = useState<File | null>(null);
  const [descriptionImageURL, setDescriptionImageURL] = useState<
    string | null
  >();

  const {
    error,
    fetchAPI,
    setError,
    isSomethingLoading,
    setIsSomethingLoading,
    setSuccessMessage,
    successMessage,
  } = useRequestAPIFeatures();

  const handleDescriptionImageChange: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setDescriptionImageURL(null);
    if (e.target.files && e.target.files.length > 0) {
      reset();
      setDescriptionImage(e.target.files[0]);
      const objetoURL = URL.createObjectURL(e.target.files[0]);
      setDescriptionImageURL(() => objetoURL);
    }
  };

  const reset = () => {
    setError(null);
    setSuccessMessage(null);
  };

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    reset();
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Titulo", form.Titulo);
    formData.append("Grado", Grado);
    formData.append("Seccion", Seccion);
    formData.append("Nombre_Curso", Nombre_Curso);

    if (descriptionImage) {
      formData.append("Imagen_Descripcion", descriptionImage);
      formData.append("Imagen_Descripcion_Nombre", descriptionImage.name);
    }

    const fetchCancelable = fetchAPI(
      `/api/topicResources/${Id_Tema}/addForum`,
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
        setError(() => ({ message }));
      } else {
        const { message }: SuccessMessageAPI = await res.json();
        setSuccessMessage(() => ({
          message: message ?? "Foro agregado con éxito",
        }));

        setForm(initialState);
      }

      setIsSomethingLoading(false);
    } catch (e) {
      setError(() => ({ message: "Error al agregar el Foro" }));
      setIsSomethingLoading(false);
    }
  };

  return (
    <ModalContainer
      eliminateModal={(e) => !isSomethingLoading && eliminateModal(e)}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-y-5 mx-4 my-2"
      >
        <h3 className="section-tittle text-[1.5rem] leading-6 flex flex-wrap break-words font-bold text-center max-w-[min(15rem,85vw)]">
          Tema {index}: {Nombre_Tema} - Agregar Foro
        </h3>
        <label className="flex flex-col gap-y-2 font-bold ">
          Titulo del Foro:
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
          Descripcion:
          <textarea
            name="Descripcion_Recurso"
            required
            value={form.Descripcion_Recurso}
            rows={3}
            cols={30}
            maxLength={255}
            onChange={handleChange}
            className="custom-input resize-none -border-2 w-full font-normal"
          ></textarea>
        </label>

        <div className="flex flex-col items-center justify-center w-full gap-4">
          <label
            onMouseUp={() => {
              setDescriptionImage(null);
            }}
            className="flex flex-col gap-y-2 font-bold items-center justify-center "
          >
            Imagen para descripción:
            <input
              className="hidden"
              type="file"
              name="Foto_Perfil"
              onChange={handleDescriptionImageChange}
              accept=".png, .jpg, .jpeg"
            />
            <span
              className={`w-max max-w-[8.5rem] text-wrap text-center bg-black py-1 leading-5 rounded-lg cursor-pointer break-words text-[0.9rem] px-3 ${
                descriptionImage ? "text-verde-spotify" : "text-white"
              }`}
            >
              {descriptionImage ? "Cambiar Imagen" : "Seleccionar Imagen"}
            </span>
          </label>

          {descriptionImageURL && (
            <img
              src={descriptionImageURL}
              alt="Imagen de descripcion de Tarea"
              title="Imagen de descripcion de Tarea"
              className=" max-w-[min(5rem,80vw)] aspect-auto border-[1px] border-black rounded-[0.5rem]"
            />
          )}
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
            !Boolean(form.Titulo) ||
            !Boolean(form.Descripcion_Recurso) ||
            isSomethingLoading
          }
          type="submit"
        >
          Agregar Foro{" "}
          {isSomethingLoading && (
            <Loader backgroundSize="8px" width="25px" color="black" />
          )}
        </button>
      </form>
    </ModalContainer>
  );
};

export default AddForumToTopic;
