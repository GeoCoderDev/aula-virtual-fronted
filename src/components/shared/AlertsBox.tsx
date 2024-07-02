import { AlertColors } from "@/app/assets/AlertColors";
import { Alerts } from "@/interfaces/Alerts";
import React from "react";

const AlertsBox = ({
  alerts,
  className = "",
  isThereFileUploaded,
  resultsMode,
}: {
  alerts: Alerts;
  className?: string;
  isThereFileUploaded: boolean;
  resultsMode: boolean;
}) => {
  return (
    <div className="flex flex-col justify-center gap-2">
      <h3 className="font-bold">
        {resultsMode ? "Resultados" : "Observaciones"}:
      </h3>
      <div
        style={{ boxShadow: "2px 2px 6px 2px #00000030" }}
        className={`scrollbar-oculto scrollbar-stilizado-gray flex justify-start flex-col px-3 gap-y-2 py-2 rounded-lg w-[18rem] h-48 min-h-40 overflow-auto ${
          resultsMode ? "response-box" : ""
        } ${className}`}
      >
        {alerts.length === 0 ? (
          <span
            style={{
              color: isThereFileUploaded
                ? AlertColors["success"]
                : AlertColors["informative"],
            }}
            className="text-[0.8rem] font-semibold"
          >
            {isThereFileUploaded
              ? "No hay observaciones, todo correcto"
              : "Selecciona un archivo"}
          </span>
        ) : (
          alerts.map(({ content, type }, index) => (
            <span
              style={{ color: AlertColors[type] }}
              className="text-[0.8rem] font-semibold min-w-full text-wrap break-words"
              key={index}
            >
              {index + 1}.&nbsp;{content}
            </span>
          ))
        )}
      </div>
    </div>
  );
};

export default AlertsBox;
