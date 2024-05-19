"use client";
import Image from "next/image";
import AlertsBox from "../AlertsBox";
import { ChangeEventHandler, useState, ReactNode } from "react";
import { Alerts } from "@/interfaces/Alerts";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";
import readedContentToArray from "@/lib/helpers/readedContentToArray";
import { BD_DataTypes } from "@/interfaces/BD_DataTypes";

interface UploadCSVFormProps<T> {
  setError: React.Dispatch<React.SetStateAction<ErrorAPI | null>>;
  setCsvData: React.Dispatch<
    React.SetStateAction<
      number[][] | string[][] | (string | number)[][] | null | undefined
    >
  >;
  columnNames: string[];
  columnsUnique: (keyof T)[];
  minMaxLenghtColumns: number[][];
  columnTypes: BD_DataTypes[];
  isThereFileUploaded: boolean;
  setIsThereFileUploaded: React.Dispatch<React.SetStateAction<boolean>>;
  resultsMode: boolean;
  alerts: Alerts;
  setAlerts: React.Dispatch<React.SetStateAction<Alerts>>;
  setSuccessMessage: React.Dispatch<
    React.SetStateAction<SuccessMessageAPI | null>
  >;
  setResultsMode: React.Dispatch<React.SetStateAction<boolean>>;
  HelpComponent: (props: {
    eliminateModal: (
      event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
    ) => void;
  }) => React.JSX.Element;
}

const UploadCSVForm = <T extends object>({
  columnTypes,
  setError,
  columnsUnique,
  minMaxLenghtColumns,
  columnNames,
  isThereFileUploaded,
  setIsThereFileUploaded,
  setCsvData,
  resultsMode,
  setResultsMode,
  alerts,
  setAlerts,
  setSuccessMessage,
  HelpComponent,
}: UploadCSVFormProps<T>) => {
  const [helpModalIsShowing, setHelpModalIsShowing] = useState(false);
  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    setError(null);
    setAlerts([]);
    setSuccessMessage(null);
    setResultsMode(false);
    const file = e.target.files?.[0];
    if (!file) return;

    setIsThereFileUploaded(true);

    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result;

      // Utiliza la función readedContentToArray para procesar el contenido
      const { data, alerts } = readedContentToArray<T>(
        content,
        columnNames,
        columnTypes,
        minMaxLenghtColumns,
        columnsUnique
      );

      if (alerts.length !== 0) {
        setError(() => ({
          message:
            "Hay algunas observaciones que debes corregir en tu archivo CSV",
        }));
        return setAlerts(() => alerts);
      }

      if (data) {
        setCsvData(() => data);
      } else {
        setError(() => ({
          message: "No se pudo leer el contenido por alguna razón",
        }));
      }
    };

    reader.readAsText(file); // Lee el contenido del archivo como texto
  };

  return (
    <div className="flex flex-wrap items-center justify-evenly -border-2 gap-8 w-[35rem] max-w-[min(80vw,35rem)]">
      <div className="flex flex-col gap-y-4 items-center justify-center ">
        <label
          title={isThereFileUploaded ? "Cambiar Archivo" : "Subir CSV"}
          className={`hover:underline font-bold cursor-pointer flex flex-col justify-center items-center gap-y-3 -border-2 border-black -p-3 -rounded-lg ${
            isThereFileUploaded ? "text-azul-pablo" : ""
          }`}
        >
          <Image
            width={40}
            height={40}
            alt="Subir CSV icono"
            src={"/svg/Logo Subir CSV.svg"}
            className="aspect-auto w-20"
          />
          {isThereFileUploaded ? "Cambiar Archivo" : "Subir CSV"}
          <input
            onClick={(e) => {
              const input = e.target as HTMLInputElement;
              input.value = ""; // Limpiar el valor del input de archivo cuando se hace clic en él
            }}
            accept=".csv"
            multiple={false}
            className="hidden"
            type="file"
            name="admins-csv"
            onChange={handleFileChange}
          />
        </label>

        <Image
          onClick={() => setHelpModalIsShowing(true)}
          width={30}
          height={30}
          alt="Icono de Ayuda"
          src={"/svg/Icono de Ayuda.svg"}
          title="Ayuda"
          className="w-9 aspect-auto cursor-pointer"
        />
      </div>

      <AlertsBox
        resultsMode={resultsMode}
        alerts={alerts}
        isThereFileUploaded={isThereFileUploaded}
      />

      {helpModalIsShowing && (
        <HelpComponent
          eliminateModal={() => {
            setHelpModalIsShowing(false);
          }}
        />
      )}
    </div>
  );
};

export default UploadCSVForm;
