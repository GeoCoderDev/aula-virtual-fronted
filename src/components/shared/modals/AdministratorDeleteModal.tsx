import useAPI from "@/app/hooks/useAPI";
import { Admin } from "../../../interfaces/Admin";
import { Dispatch, SetStateAction, useState } from "react";
import ModalContainer from "../ModalContainer";
import ErrorMessage from "../ErrorMessage";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";
import Loader from "@/components/Loader";
import SuccessMessage from "../SuccessMessage";
import useModalFeatures from "@/app/hooks/useModalFeatures";

export interface AdministratorDeleteModalProps {
  admin: Admin;
  setDeleteModalIsShowing: Dispatch<SetStateAction<boolean>>;
  handleRemoveAdmin: (idAdmin: number) => void;
}

const AdministratorDeleteModal = ({
  admin: { Id_Admin, Nombre_Usuario },
  setDeleteModalIsShowing,
  handleRemoveAdmin,
}: AdministratorDeleteModalProps) => {
  const {
    fetchAPI,
    isSomethingLoading,
    setIsSomethingLoading,
    error,
    setError,
    successMessage,
    setSuccessMessage,
  } = useModalFeatures();

  const eliminateAdmin = async () => {
    try {
      const fetchCancelable = fetchAPI(`/api/admins/${Id_Admin}`, "DELETE");

      if (fetchCancelable === undefined) return;

      setIsSomethingLoading(true);

      const res = await fetchCancelable?.fetch();

      if (!res.ok) {

        const { message }: ErrorAPI = await res.json();
        setError(() => ({ message: message ?? "Administrador no eliminado" }));

      } else {

        const { message }: SuccessMessageAPI = await res.json();
        setSuccessMessage(() => ({
          message: message ?? "Administrador Eliminado",
        }));

      }

      setIsSomethingLoading(false);
    } catch (e) {
      setError(() => ({
        message: "No se pudo eliminar el administrador",
      }));

      setIsSomethingLoading(false);
    }
  };

  return (
    <ModalContainer
      eliminateModal={(
        event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
      ) => {
        if (!isSomethingLoading) {
          //Eliminando el admin de los resultados
          if (successMessage) handleRemoveAdmin(Id_Admin);
          setDeleteModalIsShowing(false);
        }
        event.stopPropagation();
      }}
    >
      <div className="flex flex-col gap-y-2 items-center justify-center">
        <h2>
          ¿Estas seguro de eliminar al administrador <b>{Nombre_Usuario}</b>?
        </h2>

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
          <div className="flex w-full items-center justify-center gap-x-3">
            <button
              onClick={eliminateAdmin}
              className="w-10 py-2 text-black font-normal rounded-lg bg-verde-spotify"
            >
              Si
            </button>
            <button
              onClick={() => {
                setDeleteModalIsShowing(false);
              }}
              className="w-10 py-2 text-white font-normal rounded-lg bg-rojo-orange"
            >
              No
            </button>
          </div>
        )}
      </div>
    </ModalContainer>
  );
};

export default AdministratorDeleteModal;
