"use client";
import InputPassword from "@/components/shared/InputPassword";

import { ChangeEventHandler, FormEventHandler, useRef, useState } from "react";
import useCSVRegister from "@/app/hooks/useCSVRegister";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import Loader from "@/components/shared/Loader";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";
import SuccessMessage from "@/components/shared/messages/SuccessMessage";
import Image from "next/image";
import UploadCSVForm from "@/components/shared/forms/UploadCSVForm";
import HelpCSVStudentRegister from "@/components/shared/modals/Estudiantes/HelpCSVStudentRegister";
import RegisterStudentForm from "./_components/RegisterStudentForm";
import validateUsername from "@/lib/helpers/validations/validateUsername";
import validatePassword from "@/lib/helpers/validations/validatePassword";
import validateDNI from "@/lib/helpers/validations/validateDNI";
import { StudentRegisterForm } from "@/interfaces/Student";

const initialForm: StudentRegisterForm = {
  DNI_Estudiante: "",
  Grado: "",
  Seccion: "",
  Nombres: "",
  Apellidos: "",
  Fecha_Nacimiento: "",
  Nombre_Usuario: "",
  Contraseña_Usuario: "",
  Direccion_Domicilio: "",
  Telefono: "",
  Nombre_Contacto_Emergencia: "",
  Parentezco_Contacto_Emergencia: "",
  Telefono_Contacto_Emergencia: "",
};

const RegistrarEstudiante = () => {
  const selectGrado = useRef<HTMLSelectElement>();

  const {
    fetchAPI,
    isSomethingLoading,
    setIsSomethingLoading,
    error,
    setError,
    successMessage,
    setSuccessMessage,
  } = useRequestAPIFeatures();

  const {
    registerWithCSV,
    setRegisterWithCSV,
    resultsMode,
    setResultsMode,
    alerts,
    setAlerts,
    form,
    setForm,
    isThereFileUploaded,
    setIsThereFileUploaded,
    csvData,
    setCsvData,
  } = useCSVRegister<StudentRegisterForm>(initialForm);

  const [file, setFile] = useState<File | null>(null);

  const [availableSections, setAvailableSections] = useState<string[]>([]);

  const registrarEstudiante = async () => {
    const formData = new FormData();
    formData.append("DNI_Estudiante", form.DNI_Estudiante);
    formData.append("Grado", form.Grado);
    formData.append("Seccion", form.Seccion);
    formData.append("Nombres", form.Nombres);
    formData.append("Apellidos", form.Apellidos);
    formData.append("Fecha_Nacimiento", form.Fecha_Nacimiento);
    formData.append("Nombre_Usuario", form.Nombre_Usuario);
    formData.append("Contraseña_Usuario", form.Contraseña_Usuario);
    formData.append("Direccion_Domicilio", form.Direccion_Domicilio);
    formData.append("Telefono", form.Telefono);
    formData.append(
      "Nombre_Contacto_Emergencia",
      form.Nombre_Contacto_Emergencia
    );
    formData.append(
      "Parentezco_Contacto_Emergencia",
      form.Parentezco_Contacto_Emergencia
    );
    formData.append(
      "Telefono_Contacto_Emergencia",
      form.Telefono_Contacto_Emergencia
    );
    if (file) {
      formData.append("Foto_Perfil", file);
    }

    try {
      const fetchCancelable = fetchAPI(
        "/api/students",
        "POST",
        null,
        formData,
        false
      );

      if (fetchCancelable === undefined) return;

      //============================================
      //                Validaciones               |
      //============================================

      //Validando la Seccion
      if (form.Seccion === "") {
        return setError(() => ({ message: "Debes Seleccionar una Sección" }));
      }
      //Validando el nombre de usuario
      const { status: statusUsername } = validateUsername(
        form.Nombre_Usuario,
        setError
      );

      if (!statusUsername) return;

      //Validando la contraseña
      const { status: statusPassword } = validatePassword(
        form.Contraseña_Usuario,
        setError
      );

      if (!statusPassword) return;

      //Validando el DNI
      const { status: statusDNI } = validateDNI(form.DNI_Estudiante, setError);
      if (!statusDNI) return;

      setIsSomethingLoading(true);
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
          message: message ?? "Estudiante Registrado",
        }));

        setForm(initialForm);
      }

      setIsSomethingLoading(false);
    } catch (e) {
      setError(() => ({ message: "No se pudo registrar el estudiante" }));
      setIsSomethingLoading(false);
    }
  };

  const registrarEstudiantes = async () => {
    try {
      if (!csvData)
        return setError(() => ({
          message: "El archivo no es valido o no tiene informacion",
        }));
      setIsSomethingLoading(true);

      const fetchCancelable = fetchAPI(
        "/api/students/multiple",
        "POST",
        null,
        JSON.stringify({ studentValues: csvData })
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
      setError(() => ({ message: "No se pudo registrar los estudiantes" }));
      setIsSomethingLoading(false);
    }
  };

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    setError(null);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSelectChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    handleChange(e);
    setForm((prev) => ({ ...prev, Seccion: "" }));
    setAvailableSections([]);
    if (e.target.value === "") {
      setAvailableSections([]);
    } else {
      const fetchCancelable = fetchAPI(
        `/api/classrooms/grade/${e.target.value}/sections`
      );

      if (fetchCancelable === undefined) return;

      const res = await fetchCancelable.fetch();

      if (fetchCancelable?.queryParams?.grado === selectGrado.current?.value)
        return setAvailableSections([]);

      const sections = await res?.json();
      setAvailableSections(sections ?? []);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (registerWithCSV) {
      registrarEstudiantes();
    } else {
      registrarEstudiante();
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-wrap w-full justify-start gap-6 items-center">
        <h1 className="section-tittle">Registrar Estudiante</h1>
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
            {registerWithCSV ? "Registrar con Formulario" : "Registrar con CSV"}
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
        className={`flex flex-wrap gap-x-6 gap-y-8 py-5 justify-between ${
          registerWithCSV ? "w-min" : "w-full"
        }`}
      >
        {registerWithCSV ? (
          <UploadCSVForm<StudentRegisterForm>
            HelpComponent={(props) => {
              return <HelpCSVStudentRegister {...props} />;
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
            columnTypes={[
              "dni",
              "number",
              "string",
              "string",
              "string",
              "date-database-format",
              "username",
              "password",
              "string",
              "string",
              "string",
              "string",
              "string",
            ]}
            minMaxLenghtColumns={[
              [8, 8],
              [1, 1],
              [1, 4],
              [1, 100],
              [4, 100],
              [1, 15],
              [8, 30],
              [8, 20],
              [1, 200],
              [1, 9],
              [1, 200],
              [1, 40],
              [1, 9],
            ]}
            columnsUnique={["DNI_Estudiante", "Nombre_Usuario"]}
            setError={setError}
          />
        ) : (
          <RegisterStudentForm
            setFile={setFile}
            setForm={setForm}
            selectGrado={selectGrado}
            handleSelectChange={handleSelectChange}
            handleFileChange={handleFileChange}
            availableSections={availableSections}
            file={file}
            form={form}
            handleChange={handleChange}
          />
        )}

        <div className="w-full flex flex-col gap-y-2 justify-center items-center">
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
            {registerWithCSV ? "Registrar con CSV" : "Registrar Estudiante"}
            {isSomethingLoading && (
              <Loader backgroundSize="8px" width="25px" color="black" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrarEstudiante;
