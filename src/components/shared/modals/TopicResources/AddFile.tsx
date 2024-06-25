import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";
import { ModalNoActions } from "@/interfaces/ModalNoActions";
import ModalContainer from "../../ModalContainer";
import Loader from "../../Loader";
import ErrorMessage from "../../messages/ErrorMessage";
import SuccessMessage from "../../messages/SuccessMessage";
import { Topic } from "@/interfaces/Topic";

const AddFileToTopic = ({
  eliminateModal,
  topic: { Nombre_Tema, Id_Tema },
  index,
}: ModalNoActions & { topic: Topic; index: number }) => {
  const {
    error,
    fetchAPI,
    setError,
    isSomethingLoading,
    setIsSomethingLoading,
    setSuccessMessage,
    successMessage,
  } = useRequestAPIFeatures();

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
            rows={4}
            cols={30}
            maxLength={255}
            className="custom-input resize-none -border-2 w-full"
          ></textarea>
        </label>

        

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
