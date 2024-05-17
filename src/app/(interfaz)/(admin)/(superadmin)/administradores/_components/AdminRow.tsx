import useAPI from "@/app/hooks/useAPI";
import ModalContainer from "@/components/shared/ModalContainer";
import AdministratorDeleteModal from "@/components/shared/modals/AdministratorDeleteModal";
import { Admin } from "@/interfaces/Admin";
import { useState } from "react";

const AdminRow = ({
  admin,handleRemoveAdmin
}: {admin:Admin, handleRemoveAdmin: (idAdmin: number) => void }) => {

  const [deleteModalIsShowing, setDeleteModalIsShowing] = useState(false);

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
          onClick={()=>{
            setDeleteModalIsShowing(true);
          }}
            type="button"
            className="text-white bg-rojo-orange rounded-[0.5rem] py-2 px-4 font-semibold  text-[0.9rem] gap-x-2 disabled:grayscale-[0.5] inline-block mr-2"
          >
            Eliminar
          </button>
          <button
            type="button"
            className="text-white bg-amarillo-pooh rounded-[0.5rem] py-2 px-4 font-semibold  text-[0.9rem] gap-x-2 disabled:grayscale-[0.5] inline-block mr-2"
          >
            Cambiar Nombre de Usuario
          </button>
          <button
            type="button"
            className="text-white bg-azul-pablo rounded-[0.5rem] py-2 px-4 font-semibold  gap-x-2 disabled:grayscale-[0.5] inline-block text-[0.9rem]"
          >
            Cambiar Contraseña
          </button>
        </td>
      </tr>
      {deleteModalIsShowing && (        
          <AdministratorDeleteModal admin={admin} setDeleteModalIsShowing={setDeleteModalIsShowing} handleRemoveAdmin={handleRemoveAdmin}/>        
      )}
    </>
  );
};

export default AdminRow;
