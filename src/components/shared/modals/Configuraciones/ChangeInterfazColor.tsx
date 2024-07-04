import React, { useState } from "react";
import ModalContainer from "../../ModalContainer";

const ChangeInterfazColor = ({ eliminateModal }: { eliminateModal: () => void }) => {
  const [color, setColor] = useState("#06FC68");

  return (
    <ModalContainer
      eliminateModal={() => {
        eliminateModal();
      }}
    >
      <form className="flex flex-col gap-y-4 items-center justify-center w-full max-w-md px-4">
        <h4 className="text-[1.5rem] font-semibold">Frecuencia de backup</h4>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <label className="font-semibold text-sm sm:text-base">Color:</label>
          <div className="flex items-center gap-2">
         
          <div
            className="w-8 h-8 border border-gray-300"
            style={{ backgroundColor: color, border: "1px solid black" }}
          ></div>
          <input
            type="text"
            value={color}
            readOnly
            className="border px-2 py-1 text-center w-24 text-sm"
            style={{ minWidth: "80px" }}
          />
          </div>
          <div className="w-full sm:w-auto mt-2 sm:mt-0">
 
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="sr-only" // Esto oculta el selector de color predeterminado
            id="color-picker"
          />
          <label
            htmlFor="color-picker"
            className="button-with-loader cursor-pointer w-full sm:w-auto inline-block text-center px-4 py-2 text-sm"
            style={{ backgroundColor: color }}
          >
            Seleccionar Color
          </label>
        </div>
        </div>

        <button className="button-with-loader mt-3 w-full sm:w-ato" type="submit">
          GUARDAR CAMBIOS
        </button>
      </form>
    </ModalContainer>
  );
};

export default ChangeInterfazColor;
