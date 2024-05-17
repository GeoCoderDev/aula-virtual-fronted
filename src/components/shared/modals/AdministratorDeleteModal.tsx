import useAPI from "@/app/hooks/useAPI";
import { Admin } from "../../../interfaces/Admin";
import { Dispatch, SetStateAction, useState } from "react";
import ModalContainer from "../ModalContainer";
import ErrorMessage from "../ErrorMessage";
import { ErrorAPI } from "@/interfaces/ErrorAPI";
import Loader from "@/components/Loader";
import SuccessMessage from "../SuccessMessage";

const AdministratorDeleteModal = ({
  admin: { Id_Admin, Nombre_Usuario },
  setDeleteModalIsShowing,
  handleRemoveAdmin,
}: {
  admin: Admin;
  setDeleteModalIsShowing: Dispatch<SetStateAction<boolean>>;
  handleRemoveAdmin: (idAdmin: number) => void;
}) => {
  const [isSomethingLoading, setIsSomethingLoading] = useState(false);
  const [error, setError] = useState<ErrorAPI | null>(null);
  const [success, setSuccess] = useState(false);
  const { fetchAPI } = useAPI();

  const eliminateAdmin = async () => {
    try {
      const fetchCancelable = fetchAPI(`/api/admins/${Id_Admin}`, "DELETE");

      if (fetchCancelable === undefined) return;

      setIsSomethingLoading(true);

      const res = await fetchCancelable?.fetch();

      if (!res.ok) {
        const errorRes: ErrorAPI = await res.json();
        setError(() => errorRes);
        return;
      }

      setSuccess(true);

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
          if (success) handleRemoveAdmin(Id_Admin);
          setDeleteModalIsShowing(false);
        }
        event.stopPropagation();
      }}
    >
      <div className="flex flex-col gap-y-2 items-center justify-center">
        <h2>
          ¿Estas seguro de eliminar al administrador <b>{Nombre_Usuario}</b>?
        </h2>

        {!success && !error && isSomethingLoading && (
          <Loader color="black" width="30px" backgroundSize="9px" />
        )}

        {!success && !isSomethingLoading && error && (
          <ErrorMessage message={error.message} />
        )}

        {!error && !isSomethingLoading && success && (
          <SuccessMessage message="Administrador eliminado Correctamente" />
        )}

        {!success && !error && !isSomethingLoading && (
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
