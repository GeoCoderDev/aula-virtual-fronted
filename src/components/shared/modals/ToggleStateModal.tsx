import { ModalNoActions } from "@/interfaces/ModalNoActions";
import React from "react";
import ModalContainer from "../ModalContainer";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import ErrorMessage from "../messages/ErrorMessage";
import SuccessMessage from "../messages/SuccessMessage";
import Loader from "../Loader";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";
import ButtonsYerOrNot from "../ButtonsYerOrNot";

const ToggleStateModal = ({
  eliminateModal,
  currentState,
  userType,
  toggleStateFunction,
  DNI,
}: ModalNoActions & {
  currentState: number;
  userType: "profesor" | "estudiante";
  DNI: string;
  toggleStateFunction: () => void;
}) => {
  const {
    error,
    fetchAPI,
    setError,
    isSomethingLoading,
    setIsSomethingLoading,
    setSuccessMessage,
    successMessage,
  } = useRequestAPIFeatures();

  const handleToggleState = async () => {
    setError(() => null);
    try {
      const fetchCancelable = fetchAPI(
        `/api/${
          userType === "estudiante" ? "students" : "teachers"
        }/${DNI}/toggleState`,
        "PUT"
      );

      if (!fetchCancelable) return;
      setIsSomethingLoading(true);
      const res = await fetchCancelable.fetch();

      if (!res.ok) {
        const { message }: ErrorAPI = await res.json();

        if (!message) throw new Error();
        setError(() => ({ message }));
      } else {
        const { message }: SuccessMessageAPI = await res.json();

        setSuccessMessage(() => ({ message }));
        toggleStateFunction();
      }
      setIsSomethingLoading(false);
    } catch (e) {
      setError(() => ({
        message: `No se pudo ${
          currentState === 0 ? "habilitar" : "deshabilitar"
        } el ${userType}`,
      }));
      setIsSomethingLoading(false);
    }
  };

  return (
    <ModalContainer
      eliminateModal={(e) => {
        if (!isSomethingLoading) eliminateModal(e);
      }}
    >
      <div className="flex flex-col items-center justify-center gap-y-3">
        {!successMessage && (
          <span>
            ¿Estas seguro de{" "}
            <b>{currentState === 0 ? "habilitar" : "deshabilitar"}</b> el{" "}
            {userType}?
          </span>
        )}

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

        {!successMessage && !error && !isSomethingLoading && (
          <ButtonsYerOrNot
            onClickYes={handleToggleState}
            onClickNo={eliminateModal}
          />
        )}
      </div>
    </ModalContainer>
  );
};

export default ToggleStateModal;
