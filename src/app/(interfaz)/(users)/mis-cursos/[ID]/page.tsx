"use client";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import Loader from "@/components/shared/Loader";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";
import { ErrorAPI } from "@/interfaces/API";
import validateCourseId from "@/lib/helpers/validations/validateCursoID";
import React, { useEffect, useState } from "react";
import CourseData from "../_components/CourseData";

const Curso = ({ params: { ID } }: { params: { ID: number } }) => {
  const [errorCursoID, setErrorCursoID] = useState<ErrorAPI | null>(null);

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
    const { status, messageError } = validateCourseId(ID);

    if (!status)
      return setErrorCursoID(() => ({
        message: messageError ?? "El DNI no es valido",
      }));
  }, [fetchAPI]);

  return (
    <div className="flex flex-col gap-y-4">
      {errorCursoID && (
        <ErrorMessage
          message={
            errorCursoID?.message ||
            error?.message ||
            "No se pudieron obtener los datos del estudiante"
          }
        />
      )}
      {isSomethingLoading && (
        <Loader
          color="black"
          className="self-center mt-6"
          durationSegundos={1}
          backgroundSize="12px"
          width="40px"
        />
      )}

      {!errorCursoID && !isSomethingLoading && <CourseData />}
    </div>
  );
};

export default Curso;
