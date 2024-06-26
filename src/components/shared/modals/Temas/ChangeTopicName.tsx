import React from "react";
import ModalContainer from "../../ModalContainer";

const ChangeTopicName = ({
  eliminateModal,
}: {
  eliminateModal: () => void;
}) => {
  return (
    <ModalContainer
      eliminateModal={() => {
        eliminateModal();
      }}
    >
      <div className="flex flex-col gap-y-3 items-center justify-center">
        <h3 className="text-[1.5rem] font-semibold">AGREGAR TEMA</h3>

        <label className="flex flex-col gap-y-2 w-max -border-2">
          Nombre:
          <input
            className="custom-input w-[18rem]"
            type="text"
            maxLength={150}
          />
        </label>

        <button className="button-with-loader mt-3">REGISTRAR TEMA</button>

      </div>
    </ModalContainer>
  );
};

export default ChangeTopicName;
