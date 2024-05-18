import useAPI from "@/app/hooks/useAPI";
import ModalContainer from "@/components/shared/ModalContainer";
import AdministratorChangePasswordModal from "@/components/shared/modals/AdministratorChangePasswordModal";
import AdministratorDeleteModal from "@/components/shared/modals/AdministratorDeleteModal";
import { Admin } from "@/interfaces/Admin";
import { useState } from "react";
import AdministratorChangeUsernameModal from "../../../../../../components/shared/modals/AdministratorChangeUsernameModal";

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
      <tr className=" border-b-[0.1rem] border-black">
        <td className="py-4  text-center items-center justify-center">
          {admin.Id_Admin}
        </td>
        <td className="py-4 text-center items-center justify-center">
          {admin.Nombre_Usuario}
        </td>
        <td className="py-4 flex items-center justify-center flex-wrap gap-x-2">
          <button
            onClick={() => {
              setDeleteModalIsShowing(true);
            }}
            type="button"
            className="text-white bg-rojo-orange rounded-[0.5rem] py-2 px-4 font-semibold  text-[0.9rem] gap-x-2 disabled:grayscale-[0.5] inline-block mr-2"
          >
            Eliminar
          </button>
          <button
            onClick={() => {
              setChangeUsernameModalIsShowing(true);
            }}
            type="button"
            className="text-white bg-amarillo-pooh rounded-[0.5rem] py-2 px-4 font-semibold  text-[0.9rem] gap-x-2 disabled:grayscale-[0.5] inline-block mr-2"
          >
            Cambiar Nombre de Usuario
          </button>
          <button
            onClick={() => {
              setChangePasswordModalIsShowing(true);
            }}
            type="button"
            className="text-white bg-azul-pablo rounded-[0.5rem] py-2 px-4 font-semibold  gap-x-2 disabled:grayscale-[0.5] inline-block text-[0.9rem]"
          >
            Cambiar Contraseña
          </button>
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
