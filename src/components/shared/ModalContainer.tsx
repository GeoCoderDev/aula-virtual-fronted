import React, { Dispatch, SetStateAction, useState } from "react";

const ModalContainer = ({
  children,
  eliminateModal,
}: {
  children: React.ReactNode;
  eliminateModal: (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
}) => {
  const handleModalContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.modal-content')) {
      event.stopPropagation(); // Detener la propagación del evento hacia afuera
      eliminateModal(event);
    }
  };

  return (
    <div
      onClick={handleModalContainerClick}
      className="fixed flex-col w-screen h-[100svh] z-[100] top-0 left-0 bg-[#0000002e] flex items-center justify-center"
    >
      <div className="bg-white relative p-6 rounded-xl modal-content">
        <button
          onClick={eliminateModal}
          className="bg-rojo-orange font-mono absolute right-0 aspect-square rounded-[50%] text-white text-[1.4rem] w-10 flex items-center justify-center -top-1/2 translate-x-1/2 translate-y-[100%]"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalContainer;