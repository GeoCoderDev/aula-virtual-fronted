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
      <form className="flex flex-col gap-y-3 items-center justify-center">
        <h4 className="text-[1.5rem] font-semibold">Frecuencia de backup</h4>

        <div className="flex items-center gap-x-2">
          <label className="font-semibold">Color:</label>
          <div
            className="w-8 h-8"
            style={{ backgroundColor: color, border: "1px solid black" }}
          ></div>
          <input
            type="text"
            value={color}
            readOnly
            className="border px-2 py-1 text-center"
            style={{ minWidth: "80px" }}
          />
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="sr-only" // Esto oculta el selector de color predeterminado
            id="color-picker"
          />
          <label
            htmlFor="color-picker"
            className="button-with-loader cursor-pointer"
            style={{ backgroundColor: color }}
          >
            Seleccionar Color
          </label>
        </div>

        <button className="button-with-loader mt-3" type="submit">
          GUARDAR CAMBIOS
        </button>
      </form>
    </ModalContainer>
  );
};

export default ChangeInterfazColor;
