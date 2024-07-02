import React from "react";
import Loader from "../../Loader";
import ErrorMessage from "../../messages/ErrorMessage";
import SuccessMessage from "../../messages/SuccessMessage";
import ButtonsYerOrNot from "../../ButtonsYerOrNot";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import ModalContainer from "../../ModalContainer";
import { ModalNoActions } from "@/interfaces/ModalNoActions";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";

const AddSection = ({
  eliminateModal,
  grado,
  addSectionInResults,
}: ModalNoActions & {
  grado: string;
  addSectionInResults: (grado: string) => void;
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

  const addSection = async () => {
    try {
      const fetchCancelable = fetchAPI(
        `/api/classrooms/grade/${grado}/sections`,
        "POST"
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
        addSectionInResults(grado);
      }
      setIsSomethingLoading(false);
    } catch (e) {
      setError(() => ({ message: "No se pudo agregar la sección" }));
      setIsSomethingLoading(false);
    }
  };

  return (
    <ModalContainer
      eliminateModal={(e) => {
        if (!isSomethingLoading) eliminateModal(e);
      }}
    >
      <div className="flex flex-col justify-center gap-y-4 items-center">
        <h3>
          Se agregara una seccion en el grado <b>{grado}</b>, ¿Desea continuar?
        </h3>

        {!successMessage && !error && isSomethingLoading && (
          <Loader color="black" width="30px" backgroundSize="9px" />
        )}

        {!successMessage && !isSomethingLoading && error && (
          <ErrorMessage
            className="max-w-[min(20rem,60vw)] text-center"
            message={error.message}
          />
        )}

        {!error && !isSomethingLoading && successMessage && (
          <SuccessMessage
            className="text-rojo-orange"
            message={successMessage.message}
          />
        )}

        {!successMessage && !error && !isSomethingLoading && (
          <ButtonsYerOrNot onClickYes={addSection} onClickNo={eliminateModal} />
        )}
      </div>
    </ModalContainer>
  );
};

export default AddSection;
