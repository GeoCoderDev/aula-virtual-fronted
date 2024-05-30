"use client";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import Loader from "@/components/shared/Loader";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";
import { ErrorAPI } from "@/interfaces/API";
import { StudentResponse } from "@/interfaces/Student";
import { transformFechaGuionesASlash } from "@/lib/helpers/transformFechaGuionesASlash";
import validateDNI from "@/lib/helpers/validations/validateDNI";
import React, { useEffect, useState } from "react";

const VerEstudiante = ({ params: { DNI } }: { params: { DNI: string } }) => {
  const [errorDNI, setErrorDNI] = useState<ErrorAPI | null>(null);
  const [student, setStudent] = useState<StudentResponse | null>(null);

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
          setStudent(() => student);
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

  const reset = () => {
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <>
      {isSomethingLoading && !student && (
        <Loader
          color="black"
          className="self-center mt-6"
          durationSegundos={1}
          backgroundSize="12px"
          width="40px"
        />
      )}

      {errorDNI ? (
        <ErrorMessage message={errorDNI.message} />
      ) : (
        student && (
          <div className="w-full mt-4 flex flex-wrap justify-between">
            <div className="flex justify-between items-center -border-2 min-w-full">
              <h1 className="section-tittle text-[2.5rem] flex flex-wrap break-words">
                {student.Nombres} {student.Apellidos}
              </h1>

              <img
                className="w-64 aspect-square m-0 p-0 rounded-[50%]"
                src={student.Foto_Perfil_URL ?? "/svg/No-Foto-Perfil.svg"}
                alt={
                  student.Foto_Perfil_URL
                    ? "Foto de Perfil"
                    : "Sin foto de Perfil"
                }
              />
            </div>

            <div className="flex flex-col w-[min(80%,20rem)]  gap-y-3 border-2">
              <span className="font-bold">
                Grado: <span className="font-normal">{student.Grado}</span>
              </span>
              <span className="font-bold">
                Sección: <span className="font-normal">{student.Seccion}</span>
              </span>
              <span className="font-bold">
                Nombre de Usuario:{" "}
                <span className="font-normal">{student.Nombre_Usuario}</span>
              </span>
              <span className="font-bold">
                DNI:{" "}
                <span className="font-normal">{student.DNI_Estudiante}</span>
              </span>
              <span className="font-bold">
                Fecha de Nacimiento:{" "}
                <span className="font-normal">
                  {transformFechaGuionesASlash(student.Fecha_Nacimiento)}
                </span>
              </span>
            </div>
            <div className="flex flex-col w-[min(80%,20rem)] gap-y-3 border-2">
              <span className="font-bold">
                Domicilio:{" "}
                <span className="font-normal">
                  {student.Direccion_Domicilio}
                </span>
              </span>
              <span className="font-bold">
                Telefono:{" "}
                <span className="font-normal">{student.Telefono}</span>
              </span>

              <div className="self-start flex flex-col items-center justify-center gap-y-4">
                <span className="text-rojo-orange font-extrabold">
                  En caso de emergencia comunicarse con:
                </span>

                <div className="flex flex-col gap-y-2 p-4 bg-[#ccc] rounded-lg ">
                  <span>
                    {student.Nombre_Contacto_Emergencia} ({" "}
                    {student.Parentezco_Contacto_Emergencia} )
                  </span>
                  <span className="font-bold">
                    Telefono:{" "}
                    <span className="font-normal">
                      {student.Telefono_Contacto_Emergencia}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default VerEstudiante;
