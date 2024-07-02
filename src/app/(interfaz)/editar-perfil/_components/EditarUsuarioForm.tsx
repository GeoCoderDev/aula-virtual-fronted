"use client";

import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import Loader from "@/components/shared/Loader";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";
import SuccessMessage from "@/components/shared/messages/SuccessMessage";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";
import { StudentResponse } from "@/interfaces/Student";
import { TeacherResponse } from "@/interfaces/Teacher";
import { equalObjects } from "@/lib/helpers/equalObjects";
import { useUserSessionData } from "@/lib/utils/UserSessionData";

import React, { ChangeEventHandler, useEffect, useState } from "react";

interface EditFormUser {
  Telefono: string;
  Direccion_Domicilio: string;
  Nombre_Contacto_Emergencia: string;
  Parentezco_Contacto_Emergencia: string;
  Telefono_Contacto_Emergencia: string;
}

const EditarUsuarioForm = ({
  user: {
    Nombres,
    Apellidos,
    Direccion_Domicilio,
    Nombre_Contacto_Emergencia,
    Parentezco_Contacto_Emergencia,
    Telefono,
    Telefono_Contacto_Emergencia,
    Foto_Perfil_URL,
  },
}: {
  user: TeacherResponse | StudentResponse;
}) => {
  const [imgUrl, setImgUrl] = useState<string | undefined>();
  const [initialForm, setInitialForm] = useState<EditFormUser | null>(null);
  const [form, setForm] = useState<EditFormUser | null>(null);
  const [file, setFile] = useState<File | null>(null);

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
    setImgUrl(() => Foto_Perfil_URL);

    setInitialForm(() => ({
      Direccion_Domicilio,
      Nombre_Contacto_Emergencia,
      Parentezco_Contacto_Emergencia,
      Telefono,
      Telefono_Contacto_Emergencia,
    }));

    setForm(() => ({
      Direccion_Domicilio,
      Nombre_Contacto_Emergencia,
      Parentezco_Contacto_Emergencia,
      Telefono,
      Telefono_Contacto_Emergencia,
    }));
  }, []);

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      reset();
      setFile(e.target.files[0]);

      const objetoURL = URL.createObjectURL(e.target.files[0]);
      setImgUrl(() => objetoURL);
    }
  };

  const reset = () => {
    setError(null);
    setSuccessMessage(null);
  };

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    setForm((prev) => {
      return { ...prev!, [e.target.name]: e.target.value };
    });
    reset();
  };

  const { UserSessionData } = useUserSessionData();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!form) return;
    const formData = new FormData();

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
        `/api/auth/me`,
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

        UserSessionData.urlImage = imgUrl;

        const fetchCancelableImage = fetchAPI(`/api/auth/me/image`, "GET");
        if (!fetchCancelableImage) return;
        const resImage = await fetchCancelableImage.fetch();
        if (!resImage.ok) {
          window.location.href = "/";
        } else {
          const { Foto_Perfil_URL } = await resImage.json();
          UserSessionData.urlImage = Foto_Perfil_URL;
        }
      }
      setIsSomethingLoading(false);
    } catch (e) {
      setError(() => ({ message: "No se pudieron actualizar tus datos" }));
      setIsSomethingLoading(false);
    }
  };

  return (
    <>
      {form && (
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-wrap"
        >
          <h2 className="min-w-full text-[1.4rem] font-bold">
            {Nombres} {Apellidos}
          </h2>
          <div className="flex w-full justify-center items-center gap-8 flex-wrap">
            <div className="py-5 flex-col gap-y-4 flex min-w-max items-center justify-start">
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

            <div className="flex flex-1 flex-wrap items-start justify-center gap-x-12 gap-y-8">
              <label className="flex flex-col gap-y-2 font-bold text-[0.9rem]">
                Teléfono:
                <input
                  className="custom-input w-[10rem]"
                  name="Telefono"
                  value={form.Telefono}
                  onChange={handleChange}
                  type="tel"
                  required
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
                  onChange={handleChange}
                  minLength={1}
                  maxLength={200}
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
                  onChange={handleChange}
                  required
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
                  onChange={handleChange}
                  minLength={1}
                  maxLength={200}
                  value={form.Direccion_Domicilio}
                />
              </label>
            </div>
          </div>
          <div className="min-w-full flex items-center justify-center flex-col gap-y-4 mt-4">
            {error && <ErrorMessage message={error.message} />}
            {successMessage && (
              <SuccessMessage message={successMessage.message} />
            )}
            <button
              className="button-with-loader max-w-[70%] py-2 self-center "
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
      )}
    </>
  );
};

export default EditarUsuarioForm;
