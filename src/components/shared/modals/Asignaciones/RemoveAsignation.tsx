import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import ModalContainer from "../../ModalContainer";
import { ModalNoActions } from "@/interfaces/ModalNoActions";
import { FormEventHandler } from "react";

import SuccessMessage from "../../messages/SuccessMessage";
import ErrorMessage from "../../messages/ErrorMessage";
import Loader from "../../Loader";

const RemoveAsignation = ({ eliminateModal }: ModalNoActions & {}) => {
  const {
    fetchAPI,
    isSomethingLoading,
    setIsSomethingLoading,
    error,
    setError,
    successMessage,
    setSuccessMessage,
  } = useRequestAPIFeatures();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <ModalContainer
      eliminateModal={(e) => {
        if (!isSomethingLoading) eliminateModal(e);
      }}
    >
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
        <p className="flex gap-6 items-stretch"></p>
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
          className="button-with-loader py-2 w-max self-center"
          disabled={
            Boolean(error) || Boolean(successMessage) || isSomethingLoading
          }
          type="submit"
        >
          Añadir Asignación{" "}
          {isSomethingLoading && (
            <Loader backgroundSize="8px" width="25px" color="black" />
          )}
        </button>
      </form>
    </ModalContainer>
  );
};

export default RemoveAsignation;
