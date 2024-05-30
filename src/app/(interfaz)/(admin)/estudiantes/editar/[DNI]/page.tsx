"use client";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import InputPassword from "@/components/shared/InputPassword";
import Loader from "@/components/shared/Loader";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";
import SuccessMessage from "@/components/shared/messages/SuccessMessage";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";
import { StudentEditionForm, StudentResponse } from "@/interfaces/Student";
import { equalObjects } from "@/lib/helpers/equalObjects";
import validateDNI from "@/lib/helpers/validations/validateDNI";
import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";

const EditarEstudiante = ({ params: { DNI } }: { params: { DNI: string } }) => {
  const selectGrado = useRef<HTMLSelectElement>();

  const [errorDNI, setErrorDNI] = useState<ErrorAPI | null>(null);
  const [imgUrl, setImgUrl] = useState<string | undefined>();
  const [initialForm, setInitialForm] = useState<StudentEditionForm | null>(
    null
  );
  const [form, setForm] = useState<StudentEditionForm | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [availableSections, setAvailableSections] = useState<string[]>([]);
  const {
    error,
    setError,
    fetchCancelables,
    isSomethingLoading,
    setIsSomethingLoading,
    successMessage,
    setSuccessMessage,
    fetchAPI,
  } = useRequestAPIFeatures();

  useEffect(() => {
    const { status, messageError } = validateDNI(DNI);

    if (!status)
      return setErrorDNI(() => ({
        message: messageError ?? "El DNI no es valido",
      }));

    const fetchStudent = async () => {
      try {
        const fetchCancelable = fetchAPI(`/api/students/${DNI}`, "GET");
        if (fetchCancelable === undefined) return;
        setIsSomethingLoading(true);

        const res = await fetchCancelable?.fetch();

        if (!res.ok) {
          const { message }: ErrorAPI = await res.json();
          if (!message) throw new Error();
          setError(() => ({ message }));
        } else {
          const student: StudentResponse = await res.json();

          setImgUrl(() => student.Foto_Perfil_URL);
          setInitialForm(() => student);
          setForm(() => student);
          //Obteniendo las secciones del grado del estudiante
          const fetchCancelableSection = fetchAPI(
            `/api/classrooms/grade/${student.Grado}/sections`
          );

          if (fetchCancelableSection === undefined) return;

          const resSections = await fetchCancelableSection.fetch();

          const sections = await resSections.json();
          setAvailableSections(() => sections ?? []);
        }

        setIsSomethingLoading(false);
      } catch (e) {
        setError(() => ({
          message: "No se pudo obtener los datos del estudiante",
        }));
        setIsSomethingLoading(false);
      }
    };

    fetchStudent();
  }, [fetchAPI]);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    setForm((prev) => {
      return { ...prev!, [e.target.name]: e.target.value };
    });
    reset();
  };

  const reset = () => {
    setError(null);
    setSuccessMessage(null);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!form) return;
    const formData = new FormData();

    formData.append("Grado", form.Grado);
    formData.append("Seccion", form.Seccion);
    formData.append("Nombres", form.Nombres);
    formData.append("Apellidos", form.Apellidos);
    formData.append("Fecha_Nacimiento", form.Fecha_Nacimiento);
    formData.append("Nombre_Usuario", form.Nombre_Usuario);
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
        `/api/students/${DNI}`,
        "POST",
        null,
        formData,
        false
      );
      if (!fetchCancelable) return;

      setIsSomethingLoading(true);

      const res = await fetchCancelable.fetch();

      if (!res.ok) {
        const { message }: ErrorAPI = await res.json();

        if (!message) throw new Error();

        setError(() => ({ message }));
      } else {
        const { message }: SuccessMessageAPI = await res.json();
        setSuccessMessage(() => ({ message }));
        setInitialForm(() => form);
        setFile(() => null);
      }
      setIsSomethingLoading(false);
    } catch (e) {
      setError(() => ({ message: "No se pudo actualizar el estudiante" }));
      setIsSomethingLoading(false);
    }
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      reset();
      setFile(e.target.files[0]);

      const objetoURL = URL.createObjectURL(e.target.files[0]);
      setImgUrl(() => objetoURL);
    }
  };

  const handleSelectChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    handleChange(e);
    setForm((prev) => ({ ...prev!, Seccion: "" }));
    setAvailableSections([]);
    reset();
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

  return (
    <>
      <h1 className="section-tittle">
        Editar Estudiante{" "}
        {initialForm &&
          ` - ${initialForm.Nombres} ${initialForm.Apellidos} (${DNI})`}
      </h1>
      {!form && (errorDNI || error) && (
        <ErrorMessage
          message={
            errorDNI?.message ||
            error?.message ||
            "No se pudieron obtener los datos del estudiante"
          }
        />
      )}

      {isSomethingLoading && !initialForm && (
        <Loader
          color="black"
          className="self-center mt-6"
          durationSegundos={1}
          backgroundSize="12px"
          width="40px"
        />
      )}

      {(!isSomethingLoading || initialForm) && form && (
        <>
          <form
            className="flex w-full flex-wrap gap-x-14 items-center justify-center"
            onSubmit={handleSubmit}
          >
            <div className="py-5 flex-col gap-y-4 flex items-center justify-start">
              <img
                className={`aspect-square  w-40 rounded-[50%] bg-contain object-cover bg-no-repeat bg-center ${
                  imgUrl ? "border-2" : ""
                }`}
                src={imgUrl ?? "/svg/No-Foto-Perfil.svg"}
                alt="Foto Perfil"
              />

              <label
                onMouseUp={() => {
                  setFile(null);
                }}
                className="flex flex-col gap-y-2 font-bold"
              >
                <input
                  className="hidden"
                  type="file"
                  name="Foto_Perfil"
                  onChange={handleFileChange}
                  accept=".png, .jpg, .jpeg"
                />
                <span
                  className={`w-max max-w-[8.5rem] text-wrap text-center bg-black py-1 leading-5 rounded-lg cursor-pointer break-words text-[0.9rem] px-3 ${
                    file ? "text-verde-spotify" : "text-white"
                  }`}
                >
                  {file ? "Cambiar Archivo" : "Cambiar foto de perfil"}
                </span>
              </label>
            </div>

            <div className="flex flex-1 items-center justify-between item-center  flex-wrap gap-x-6 gap-y-8 py-5">
              <label className="flex flex-col gap-y-2 font-bold">
                Nombres:
                <input
                  className="custom-input w-[15rem]"
                  name="Nombres"
                  type="text"
                  onChange={handleChange}
                  value={form.Nombres}
                  minLength={1}
                  maxLength={100}
                  required
                />
              </label>

              <label className="flex flex-col gap-y-2 font-bold">
                Apellidos:
                <input
                  className="custom-input w-[15rem]"
                  name="Apellidos"
                  type="text"
                  value={form.Apellidos}
                  onChange={handleChange}
                  minLength={4}
                  maxLength={100}
                  required
                />
              </label>

              <label className="flex flex-col gap-y-2 font-bold">
                Nombre Usuario:
                <input
                  className="custom-input w-[14rem]"
                  name="Nombre_Usuario"
                  type="text"
                  onChange={handleChange}
                  value={form.Nombre_Usuario}
                  min={8}
                  maxLength={30}
                  required
                />
              </label>

              <label className="flex flex-col gap-y-2 font-bold">
                Fecha de Nacimiento:
                <input
                  className="custom-input w-[11rem]"
                  name="Fecha_Nacimiento"
                  type="date"
                  required
                  value={form.Fecha_Nacimiento}
                  placeholder="dd / mm / aa"
                  onChange={handleChange}
                />
              </label>

              <label className="flex flex-col gap-y-2 font-bold">
                Grado:
                <select
                  ref={selectGrado as React.LegacyRef<HTMLSelectElement>}
                  className="custom-input w-max px-3 text-center"
                  name="Grado"
                  required
                  value={form.Grado}
                  onChange={handleSelectChange}
                >
                  <option disabled value={""}>
                    - seleccione -
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </label>

              <label className="flex flex-col gap-y-2 font-bold">
                Sección:
                <select
                  required
                  value={form.Seccion}
                  className="custom-input w-max px-3 text-center"
                  name="Seccion"
                  disabled={availableSections.length === 0}
                  onChange={handleChange}
                >
                  <option disabled value="">
                    - seleccione -
                  </option>
                  {availableSections.map((section, index) => (
                    <option value={section} key={index}>
                      {section}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-y-2 font-bold text-[0.9rem]">
                Teléfono:
                <input
                  className="custom-input w-[10rem]"
                  name="Telefono"
                  value={form.Telefono}
                  type="tel"
                  required
                  onChange={handleChange}
                  minLength={4}
                  maxLength={9}
                />
              </label>

              <label className="flex flex-col gap-y-2 font-bold text-[0.9rem]">
                En caso de emergencia comunicarse con:
                <input
                  className="custom-input w-[15rem]"
                  name="Nombre_Contacto_Emergencia"
                  value={form.Nombre_Contacto_Emergencia}
                  type="text"
                  required
                  minLength={1}
                  maxLength={200}
                  onChange={handleChange}
                />
              </label>

              <label className="flex flex-col gap-y-2 font-bold text-[0.9rem]">
                Parentezco:
                <input
                  className="custom-input w-[10rem]"
                  name="Parentezco_Contacto_Emergencia"
                  value={form.Parentezco_Contacto_Emergencia}
                  type="text"
                  required
                  onChange={handleChange}
                  minLength={1}
                  maxLength={40}
                />
              </label>

              <label className="flex flex-col gap-y-2 font-bold text-[0.9rem]">
                Teléfono Contacto Emergencia:
                <input
                  className="custom-input w-[10rem]"
                  name="Telefono_Contacto_Emergencia"
                  value={form.Telefono_Contacto_Emergencia}
                  type="tel"
                  required
                  onChange={handleChange}
                  minLength={4}
                  maxLength={9}
                />
              </label>

              <label
                className="flex flex-col gap-y-2 font-bold"
                htmlFor="address"
              >
                Domicilio:
                <input
                  className="custom-input w-[18rem]"
                  name="Direccion_Domicilio"
                  type="text"
                  required
                  minLength={1}
                  maxLength={200}
                  onChange={handleChange}
                  value={form.Direccion_Domicilio}
                />
              </label>
            </div>
            <div className="min-w-full flex items-center justify-center flex-col gap-y-4">
              {error && <ErrorMessage message={error.message} />}
              {successMessage && (
                <SuccessMessage message={successMessage.message} />
              )}
              <button
                className="button-with-loader max-w-[70%] py-2 self-center"
                disabled={
                  isSomethingLoading ||
                  Boolean(error) ||
                  (equalObjects(initialForm, form) && !file)
                }
                type="submit"
              >
                Guardar Cambios
                {isSomethingLoading &&
                  (!equalObjects(initialForm, form) || Boolean(file)) && (
                    <Loader backgroundSize="8px" width="25px" color="black" />
                  )}
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default EditarEstudiante;
