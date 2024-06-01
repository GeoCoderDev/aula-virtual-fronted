import useAPI from "@/app/hooks/useAPI";
import ModalContainer from "@/components/shared/ModalContainer";
import AdministratorChangePasswordModal from "@/components/shared/modals/Admins/AdministratorChangePasswordModal";
import AdministratorDeleteModal from "@/components/shared/modals/Admins/AdministratorDeleteModal";
import { Admin } from "@/interfaces/Admin";
import { useState } from "react";
import AdministratorChangeUsernameModal from "../../../../../../components/shared/modals/Admins/AdministratorChangeUsernameModal";

const AdminRow = ({
  admin,
  handleRemoveAdmin,
  handleUpdateUsername,
}: {
  admin: Admin;
  handleRemoveAdmin: (idAdmin: number) => void;
  handleUpdateUsername: (idAdmin: number, newUsername: string) => void;
}) => {
  const [deleteModalIsShowing, setDeleteModalIsShowing] = useState(false);
  const [changeUsernameModalIsShowing, setChangeUsernameModalIsShowing] =
    useState(false);
  const [changePasswordModalIsShowing, setChangePasswordModalIsShowing] =
    useState(false);

  return (
    <>
      <tr className="">
        <td className="p-3 text-center sm:p-2 md:p-3">{admin.Id_Admin}</td>
        <td className="p-3 text-center sm:p-2 md:p-3">{admin.Nombre_Usuario}</td>
        <td className="p-3 text-center sm:p-2 md:p-3 w-full">
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => {
                setDeleteModalIsShowing(true);
              }}
              type="button"
              className="text-white bg-rojo-orange rounded-[0.5rem] py-2 px-4 font-semibold text-[0.9rem] whitespace-nowrap disabled:grayscale-[0.5] sm:py-1 sm:px-2 sm:text-[0.8rem] md:py-2 md:px-4 md:text-[0.9rem]"
            >
              Eliminar
            </button>
            <button
              onClick={() => {
                setChangeUsernameModalIsShowing(true);
              }}
              type="button"
              className="text-white bg-amarillo-pooh rounded-[0.5rem] py-2 px-4 font-semibold text-[0.9rem] whitespace-nowrap disabled:grayscale-[0.5] sm:py-1 sm:px-2 sm:text-[0.8rem] md:py-2 md:px-4 md:text-[0.9rem]"
            >
              Cambiar Nombre de Usuario
            </button>
            <button
              onClick={() => {
                setChangePasswordModalIsShowing(true);
              }}
              type="button"
              className="text-white bg-azul-pablo rounded-[0.5rem] py-2 px-4 font-semibold disabled:grayscale-[0.5] text-[0.9rem] whitespace-nowrap sm:py-1 sm:px-2 sm:text-[0.8rem] md:py-2 md:px-4 md:text-[0.9rem]"
            >
              Cambiar Contraseña
            </button>
          </div>
        </td>
      </tr>
      {deleteModalIsShowing && (
        <AdministratorDeleteModal
          admin={admin}
          setDeleteModalIsShowing={setDeleteModalIsShowing}
          handleRemoveAdmin={handleRemoveAdmin}
        />
      )}
      {changeUsernameModalIsShowing && (
        <AdministratorChangeUsernameModal
          admin={admin}
          handleUpdateUsername={handleUpdateUsername}
          setDeleteModalIsShowing={setChangeUsernameModalIsShowing}
        />
      )}

      {changePasswordModalIsShowing && (
        <AdministratorChangePasswordModal
          admin={admin}
          setDeleteModalIsShowing={setChangePasswordModalIsShowing}
        />
      )}
    </>
  );
};

export default AdminRow;