"use client";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import DateTimeSelector from "@/components/shared/DateTimeSelector";
import FilesSelector from "@/components/shared/FilesSelector";
import Loader from "@/components/shared/Loader";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";
import SuccessMessage from "@/components/shared/messages/SuccessMessage";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";
import { TopicAdditionalDataResponse } from "@/interfaces/Topic";
import { equalObjects } from "@/lib/helpers/equalObjects";
import { RootState } from "@/store";
import Link from "next/link";
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";

interface HomeworkTopicRegisterForm extends RecursoTemaRegisterFields {}

const CrearTarea = ({
  params: { Tema_ID, CursoAula_ID },
}: {
  params: { Tema_ID: number; CursoAula_ID: number };
}) => {
  const headerHeight = useSelector(
    (state: RootState) => state.elementsDimensions.headerHeight
  );

  const initialState: HomeworkTopicRegisterForm = {
    Titulo: "",
    Nombre_Curso: "",
    Grado: "",
    Seccion: "",
    Descripcion_Recurso: "",
  };

  const [form, setForm] = useState(initialState);

  const [descriptionImage, setDescriptionImage] = useState<File | null>(null);
  const [descriptionImageURL, setDescriptionImageURL] = useState<string | null>(
    null
  );
  const [files, setFiles] = useState<File[]>([]);

  const {
    error,
    fetchAPI,
    setError,
    isSomethingLoading,
    setIsSomethingLoading,
    setSuccessMessage,
    successMessage,
  } = useRequestAPIFeatures();

  const [topicAdditionalData, setTopicAdditionalData] =
    useState<TopicAdditionalDataResponse>();

  useEffect(() => {
    const fetchTopicAdditionalData = async () => {
      try {
        const fetchCancelable = fetchAPI(
          `/api/topics/${Tema_ID}/additionalData`,
          "GET"
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
          const topicAdditionalData: TopicAdditionalDataResponse =
            await res.json();

          setTopicAdditionalData(() => topicAdditionalData);
        }

        setIsSomethingLoading(false);
      } catch (e) {
        setError(() => ({
          message: "No se pudo obtener los datos del tema",
        }));
        setIsSomethingLoading(false);
      }
    };

    fetchTopicAdditionalData();
  }, [fetchAPI]);

  const reset = () => {
    setError(null);
    setSuccessMessage(null);
  };

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

    if (!topicAdditionalData) return;

    const formData = new FormData();
    formData.append("Titulo", form.Titulo);
    formData.append("Grado", form.Grado);
    formData.append("Seccion", form.Seccion);
    if (form.Descripcion_Recurso)
      formData.append("Seccion", form.Descripcion_Recurso);

    formData.append("Nombre_Curso", form.Nombre_Curso);

    const fetchCancelable = fetchAPI(
      `/api/topicResources/${Tema_ID}/addHomework`,
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
          message:
            message ??
            `Tarea agregada al tema ${topicAdditionalData.Nombre_Tema}`,
        }));

        setDescriptionImage(null);

        setForm(initialState);
      }

      setIsSomethingLoading(false);
    } catch (e) {
      setError(() => ({ message: "Error al agregar el archivo" }));
      setIsSomethingLoading(false);
    }
  };

  return (
    <>
      {!topicAdditionalData && isSomethingLoading && (
        <div className="w-full flex items-center justify-center">
          <Loader
            color="black"
            className="mt-6 self-start justify-self-center"
            durationSegundos={1}
            backgroundSize="12px"
            width="40px"
          />
        </div>
      )}

      {topicAdditionalData && (
        <div className="flex flex-col items-start justify-start gap-y-2 w-full max-w-[90vw] max-h-[90vh] ">
          <div
            style={{ top: `${headerHeight}px` }}
            className="flex -border-2 break-words flex-wrap sticky left-0 bg-[#ffffff99] backdrop-blur-[30px] w-full py-2 border-black -border-b-[1px]"
          >
            <Link href="/mis-cursos" as={"/mis-cursos"}>
              <div className="cursor-pointer hover:underline">Mis Cursos</div>
            </Link>
            &nbsp;&gt;&nbsp;
            <Link
              href={`/mis-cursos/${CursoAula_ID}`}
              as={`/mis-cursos/${CursoAula_ID}`}
            >
              <div className="cursor-pointer hover:underline">
                {topicAdditionalData.Nombre_Curso} - {topicAdditionalData.Grado}
                {topicAdditionalData.Seccion}
              </div>
            </Link>
            &nbsp;&gt;&nbsp;
            <div className="cursor-pointer hover:underline">
              {topicAdditionalData.Nombre_Tema} - Crear Tarea
            </div>
          </div>

          <div className="flex flex-col items-center justify-center w-full gap-4">
            <h3 className="section-tittle flex flex-wrap break-words font-bold">
              Tema: {topicAdditionalData.Nombre_Tema} - Agregar Tarea
            </h3>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-max h-max gap-y-3"
            >
              <div className="flex gap-y-4 gap-x-8 items-stretch flex-wrap">
                <div className="flex flex-col -border-2 min-h-[min(15rem,80vh)] justify-between items-center h-full gap-y-4">
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

                  <label className="flex flex-col gap-y-2 font-bold -border-2 w-[16rem] flex-1">
                    Descripción:
                    <textarea
                      name="Descripcion_Recurso"
                      value={form.Descripcion_Recurso ?? ""}
                      rows={3}
                      cols={30}
                      maxLength={255}
                      onChange={handleChange}
                      className="custom-input resize-none font-normal w-full min-h-[min(4rem,80vh)] max-w-[min(80vw,100%)] flex-1"
                    ></textarea>
                  </label>
                </div>

                <fieldset className="border-2 border-black p-4 pt-0 rounded-[1rem] flex flex-col gap-y-4">
                  <legend className="ml-4">
                    &nbsp;Duración de la Tarea&nbsp;
                  </legend>

                  <label className="flex flex-col">
                    <span className="font-semibold">Fecha de Apertura:</span>
                    <DateTimeSelector />
                  </label>
                  <label className="flex flex-col">
                    <span className="font-semibold">Fecha de Cierre:</span>

                    <DateTimeSelector />
                  </label>
                </fieldset>
              </div>

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
                    className=" max-w-[min(18rem,80vw)] aspect-auto border-[1px] border-black rounded-[0.5rem]"
                  />
                )}
              </div>

              <div className="flex flex-col items-center justify-center gap-y-2">
                <FilesSelector
                  files={files}
                  setFiles={setFiles}
                  setError={setError}
                />
              </div>

              {!successMessage && !isSomethingLoading && error && (
                <ErrorMessage
                  message={error.message}
                  className="max-w-[15rem]"
                />
              )}

              {!error && !isSomethingLoading && successMessage && (
                <SuccessMessage
                  className="text-rojo-orange max-w-[15rem]"
                  message={successMessage.message}
                />
              )}

              <label className="flex gap-4 items-center text-center">
                Puntaje Maximo:
                <input
                  type="number"
                  name=""
                  min={10}
                  className="custom-input w-[5rem]"
                  required
                  value={20}
                />
              </label>

              <button
                className="button-with-loader py-2 w-max self-center"
                disabled={
                  Boolean(error) ||
                  Boolean(successMessage) ||
                  isSomethingLoading ||
                  equalObjects(form, initialState)
                }
                type="submit"
              >
                AGREGAR TAREA{" "}
                {isSomethingLoading && (
                  <Loader backgroundSize="8px" width="25px" color="black" />
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CrearTarea;
