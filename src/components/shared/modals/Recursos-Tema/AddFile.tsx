import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";
import { ModalNoActions } from "@/interfaces/ModalNoActions";
import ModalContainer from "../../ModalContainer";
import Loader from "../../Loader";
import ErrorMessage from "../../messages/ErrorMessage";
import SuccessMessage from "../../messages/SuccessMessage";
import { Topic } from "@/interfaces/Topic";
import { ChangeEventHandler, useState } from "react";

const AddFileToTopic = ({
  eliminateModal,
  topic: { Nombre_Tema, Id_Tema },
  index,
}: ModalNoActions & { topic: Topic; index: number }) => {
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
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {};

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
          <input type="text" name="" className="custom-input w-[15rem]" />
        </label>

        <label className="flex flex-col gap-y-2 font-bold -border-2 w-[15rem]">
          Descripción:
          <textarea
            name=""
            rows={3}
            cols={30}
            maxLength={255}
            className="custom-input resize-none -border-2 w-full"
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
              type="file"
              name="Foto_Perfil"
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
          <label
            title={file ? file.name : "No hay nigun archivo seleccionado"}
            className=" max-w-[80%] text-ellipsis"
          >
            {file ? file.name : "No hay nigun archivo seleccionado"}
          </label>
        </div>

        {!successMessage && !error && isSomethingLoading && (
          <Loader color="black" width="30px" backgroundSize="9px" />
        )}

        {!successMessage && !isSomethingLoading && error && (
          <ErrorMessage message={error.message} />
        )}

        {!error && !isSomethingLoading && successMessage && (
          <SuccessMessage
            className="text-rojo-orange"
            message={successMessage.message}
          />
        )}

        <button
          className="button-with-loader py-2"
          disabled={
            Boolean(error) || Boolean(successMessage) || isSomethingLoading
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
