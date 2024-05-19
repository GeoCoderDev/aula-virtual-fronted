"use client";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import Loader from "@/components/shared/Loader";
import Image from "next/image";
import React, { ChangeEventHandler, useState } from "react";
import RegisterAdminForm from "./_components/RegisterAdminForm";
import UploadCSVForm from "../../../../../../components/shared/forms/UploadCSVForm";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";
import SuccessMessage from "@/components/shared/messages/SuccessMessage";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";
import { Alerts } from "@/interfaces/Alerts";
import validateUsername from "@/lib/helpers/validations/validateUsername";
import validatePassword from "@/lib/helpers/validations/validatePassword";
import HelpCSVAdminRegister, {
  HelpCSVAdminRegisterProps,
} from "@/components/shared/modals/Admins/HelpCSVAdminRegister";

export interface RegisterAdminFormFields {
  Nombre_Usuario: string;
  Contraseña: string;
}

//Importante que estos estean en orden y con los nombre que la API acepta
const initialForm: RegisterAdminFormFields = {
  Nombre_Usuario: "",
  Contraseña: "",
};

const RegistrarAdministradores = () => {
  const {
    fetchAPI,
    isSomethingLoading,
    setIsSomethingLoading,
    error,
    setError,
    successMessage,
    setSuccessMessage,
  } = useRequestAPIFeatures();

  const [registerWithCSV, setRegisterWithCSV] = useState(false);
  const [resultsMode, setResultsMode] = useState(false);
  const [alerts, setAlerts] = useState<Alerts>([]);
  const [form, setForm] = useState<RegisterAdminFormFields>(initialForm);
  const [isThereFileUploaded, setIsThereFileUploaded] = useState(false);

  const [csvData, setCsvData] = useState<
    number[][] | string[][] | (string | number)[][] | null
  >();

  const registrarAdministrador = async () => {
    try {
      //Validando el nombre de usuario
      const { status: statusUsername } = validateUsername(
        form.Nombre_Usuario,
        setError
      );

      if (!statusUsername) return;

      //Validando la contraseña
      const { status: statusPassword } = validatePassword(
        form.Contraseña,
        setError
      );

      if (!statusPassword) return;

      setIsSomethingLoading(true);

      const fetchCancelable = fetchAPI(
        "/api/admins",
        "POST",
        null,
        JSON.stringify(form)
      );

      if (fetchCancelable === undefined) return;

      const res = await fetchCancelable.fetch();

      if (!res.ok) {
        const { message }: ErrorAPI = await res.json();
        if (!message) throw new Error();
        setError(() => ({
          message,
        }));
      } else {
        const { message }: SuccessMessageAPI = await res.json();
        setSuccessMessage(() => ({
          message: message ?? "Administrador Registrado",
        }));

        setForm(initialForm);
      }

      setIsSomethingLoading(false);
    } catch (e) {
      setError(() => ({ message: "No se pudo registrar el administrador" }));
      setIsSomethingLoading(false);
    }
  };

  const registrarAdministradores = async () => {
    try {
      if (!csvData)
        return setError(() => ({
          message: "El archivo no es valido o no tiene informacion",
        }));

      setIsSomethingLoading(true);

      const fetchCancelable = fetchAPI(
        "/api/admins/multiple",
        "POST",
        null,
        JSON.stringify({ adminValues: csvData })
      );

      if (fetchCancelable === undefined) return;

      const res = await fetchCancelable.fetch();

      //Ten en cuenta que la API siempre respondera como success (200), porque puede que algunos se añadan y otros no, lo cual almenos a mi parecer se considera una tarea exitosa
      const { alerts }: SuccessMessageAPI = await res.json();

      if (alerts) setAlerts(() => alerts);

      setResultsMode(true);
      setSuccessMessage(() => ({
        message: "Operacion Realizada",
      }));
      setIsThereFileUploaded(false);
      setIsSomethingLoading(false);
    } catch (e) {
      setError(() => ({ message: "No se pudo registrar los administradores" }));
      setIsSomethingLoading(false);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSuccessMessage(null);
    setError(null);
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (registerWithCSV) {
      registrarAdministradores();
    } else {
      registrarAdministrador();
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-start w-full flex-col gap-y-4">
        <div className="flex flex-wrap w-full justify-start gap-6 items-center">
          <h1 className=" text-4xl  font-extrabold">Registrar Administrador</h1>

          <button
            onClick={() => {
              setRegisterWithCSV((prev) => !prev);
              setIsThereFileUploaded(false);
              setError(null);
              setSuccessMessage(null);
              setResultsMode(false);
              setAlerts([]);
            }}
            className="flex text-wrap flex-wrap items-center justify-center font-bold text-[0.8rem] px-3 rounded-lg py-2 max-w-44 w-max text-center bg-[#d3d3d3] leading-4 gap-1"
          >
            <span
              className={`text-ellipsis text-wrap text-center flex-auto ${
                !registerWithCSV ? "max-[70%] w-min" : "w-max"
              } `}
            >
              {registerWithCSV
                ? "Registrar con Formulario"
                : "Registrar con CSV"}
            </span>

            {!registerWithCSV && (
              <Image
                width={25}
                height={25}
                className="aspect-auto"
                alt="Logo CSV"
                src={"/svg/CSV Icon.svg"}
              />
            )}
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`flex flex-col items-start flex-wrap -border-2 gap-6 w-max`}
        >
          {registerWithCSV ? (
            <UploadCSVForm<RegisterAdminFormFields>
              HelpComponent={(props) => {
                return <HelpCSVAdminRegister {...props} />;
              }}
              setSuccessMessage={setSuccessMessage}
              alerts={alerts}
              setAlerts={setAlerts}
              setResultsMode={setResultsMode}
              resultsMode={resultsMode}
              setCsvData={setCsvData}
              isThereFileUploaded={isThereFileUploaded}
              setIsThereFileUploaded={setIsThereFileUploaded}
              columnNames={Object.keys(initialForm)}
              columnTypes={["username", "string"]}
              minMaxLenghtColumns={[
                [8, 20],
                [8, 20],
              ]}
              columnsUnique={["Nombre_Usuario"]}
              setError={setError}
            />
          ) : (
            <RegisterAdminForm form={form} handleChange={handleChange} />
          )}

          {!successMessage && !isSomethingLoading && error && (
            <ErrorMessage
              className="w-full text-center"
              message={error.message}
            />
          )}

          {!error && !isSomethingLoading && successMessage && (
            <SuccessMessage
              className="text-rojo-orange"
              message={successMessage.message}
            />
          )}

          <button
            className="button-with-loader max-w-[70%] py-2 self-center"
            disabled={
              (registerWithCSV && !isThereFileUploaded) ||
              isSomethingLoading ||
              Boolean(error)
            }
            type="submit"
          >
            {registerWithCSV ? "Registrar con CSV" : "Registrar Administrador"}
            {isSomethingLoading && (
              <Loader backgroundSize="8px" width="25px" color="black" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrarAdministradores;
