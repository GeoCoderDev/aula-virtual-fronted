import React, { useState } from "react";
import ModalContainer from "../../ModalContainer";

const CreateBackup = ({ eliminateModal }: { eliminateModal: () => void }) => {
  return (
    <ModalContainer
      eliminateModal={() => {
        eliminateModal();
      }}
    >
      <form className="flex flex-col gap-y-3 items-center justify-center">
        <h4 className="text-[1.5rem] font-semibold">Frecuencia de backup</h4>

        <div className="flex items-center gap-x-2">
            <label className="font-semibold flex items-center gap-x-2">
            Seleccionar
            <select name="backup-frequency" id="backup-frequency" className="font-normal border border-gray-400 rounded-sm p-1 ml-2">
                <option value="" disabled selected>Seleccionar</option>
                <option value="backup-1" className="font-normal">Backup - 17/06/2024 - 06:00</option>
                <option value="backup-2" className="font-normal">Backup - 16/06/2024 - 06:00</option>
                <option value="backup-3" className="font-normal">Backup - 15/06/2024 - 06:00</option>
            </select>
            </label>
        </div>

        <button className="button-with-loader mt-3" type="submit">
            GUARDAR CAMBIOS
        </button>
        </form>

    </ModalContainer>
  );
};

export default CreateBackup;
