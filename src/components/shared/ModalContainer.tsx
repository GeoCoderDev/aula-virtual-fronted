import ReactDOM from "react-dom";



const ModalContainer = ({
  children,
  eliminateModal,
}: {
  children: React.ReactNode;
  eliminateModal: (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
  ) => void;
}) => {
  const handleModalContainerClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".modal-content")) {
      event.stopPropagation(); // Detener la propagación del evento hacia afuera
      eliminateModal(event);
    }
  };

  return ReactDOM.createPortal(
    <div
      onClick={handleModalContainerClick}
      className="fixed flex-col w-screen h-[100svh] z-[100] top-0 left-0 bg-[#00000054] flex items-center justify-center"
    >
      <div className="bg-white relative p-6 rounded-xl modal-content">
        <button
          onClick={eliminateModal}
          className="bg-rojo-orange font-mono absolute top-0 right-0 aspect-square rounded-[50%] text-white text-[1.4rem] w-10 flex items-center justify-center translate-x-1/2 -translate-y-1/2"
        >
          X
        </button>
        {children}
      </div>
    </div>,
    document.querySelector("body")!
  );
};

export default ModalContainer;

