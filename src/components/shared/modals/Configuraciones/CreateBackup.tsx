import React, { useState } from "react";
import ModalContainer from "../../ModalContainer";

const CreateBackup = ({ eliminateModal }: { eliminateModal: () => void }) => {
  return (
    <ModalContainer
      eliminateModal={() => {
        eliminateModal();
      }}
    >
      <form className="flex flex-col gap-y-4 items-center justify-center w-full max-w-md px-4">
        <h4 className="text-xl sm:text-2x1 font-semibold text-center">Frecuencia de backup</h4>

        <div className="w-full">
          <label className="font-semibold text-sm sm:text-base flex flex-col sm:flex-row items-start sm:items-center gap-2">
            Seleccionar
            <select name="backup-frequency" id="backup-frequency" className="font-normal border border-gray-400 rounded-sm p-2 w-full sm:w-auto mt-1 sm:mt-0">
              <option value="" disabled selected>Seleccionar</option>
              <option value="backup-1" className="font-normal">Backup - 17/06/2024 - 06:00</option>
              <option value="backup-2" className="font-normal">Backup - 16/06/2024 - 06:00</option>
              <option value="backup-3" className="font-normal">Backup - 15/06/2024 - 06:00</option>
            </select>
          </label>
        </div>

        <button className="button-with-loader mt-4 w-full sm:w-auto" type="submit">
          GUARDAR CAMBIOS
        </button>
      </form>

    </ModalContainer>
  );
};

export default CreateBackup;
