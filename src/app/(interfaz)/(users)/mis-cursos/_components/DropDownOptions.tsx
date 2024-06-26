import { Dispatch, SetStateAction, useState } from "react";

const DropdownOptions = ({
  setViewAddFileToTopicModal,
  setViewChangeTopicName,
}: {
  setViewAddFileToTopicModal: Dispatch<SetStateAction<boolean>>;
  setViewChangeTopicName: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <div
        style={{ boxShadow: "0 0 9px 1px #00000050" }}
        className="absolute top-[100%] right-0 mt-1 bg-white p-4 z-[200] rounded-[0.8rem]"
      >
        <ul className="list-none flex flex-col gap-y-1 w-[9rem]">
          <li
            className="w-full cursor-pointer text-[0.9rem] hover:bg-[#ddd] p-1 rounded-[0.3rem]"
            onClick={() => {
              setViewChangeTopicName(true);
            }}
          >
            Cambiar Nombre
          </li>
          <h5 className="font-bold hover:cursor-default p-1">
            AGREGAR:
            <hr className="border-[#ccc] mt-1" />
          </h5>

          <li
            className="w-full cursor-pointer text-[0.9rem] hover:bg-[#ddd] p-1 rounded-[0.3rem]"
            onClick={() => {
              setViewAddFileToTopicModal(true);
            }}
          >
            Archivo
          </li>
          <li className="w-full cursor-pointer text-[0.9rem] hover:bg-[#ddd] p-1 rounded-[0.3rem]">
            Foro
          </li>
          <li className="w-full cursor-pointer text-[0.9rem] hover:bg-[#ddd] p-1 rounded-[0.3rem]">
            Tarea
          </li>
          <li className="w-full cursor-pointer text-[0.9rem] hover:bg-[#ddd] p-1 rounded-[0.3rem]">
            URL
          </li>
          <li className="w-full cursor-pointer text-[0.9rem] hover:bg-[#ddd] p-1 rounded-[0.3rem]">
            Cuestionario
          </li>
        </ul>
      </div>
    </>
  );
};

export default DropdownOptions;
