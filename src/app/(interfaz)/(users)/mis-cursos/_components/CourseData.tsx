"use client";

import { GradosInterpretacion } from "@/app/assets/GradosInterpretacion";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import Loader from "@/components/shared/Loader";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";
import { ErrorAPI } from "@/interfaces/API";

import { UserSessionData } from "@/lib/utils/UserSessionData";

import { useEffect, useState } from "react";
import DropDownTopic from "./DropDownTopic";
import { CourseDataResponse } from "@/interfaces/Course";

const CourseData = ({ idCourseClassroom }: { idCourseClassroom: number }) => {
  const [courseData, setCourseData] = useState<CourseDataResponse>();

  const {
    error,
    fetchAPI,
    isSomethingLoading,
    setSuccessMessage,
    successMessage,
    setError,
    setIsSomethingLoading,
  } = useRequestAPIFeatures();

  useEffect(() => {
    const fetchCourseData = async () => {
      const fetchCancelable = fetchAPI(
        `/api/myCourses/${idCourseClassroom}/data`,
        "GET"
      );

      if (!fetchCancelable) return;

      try {
        setIsSomethingLoading(true);
        const res = await fetchCancelable.fetch();

        if (!res.ok) {
          const { message }: ErrorAPI = await res.json();
          console.log(message);
          if (!message) throw new Error();
          setError(() => ({ message }));
        } else {
          const courseData: CourseDataResponse = await res.json();

          setCourseData(() => courseData);
        }

        setIsSomethingLoading(false);
      } catch (e) {
        setError(() => ({ message: "No se pudo obtener los datos del curso" }));
        setIsSomethingLoading(false);
      }
    };

    fetchCourseData();
  }, [fetchAPI]);

  return (
    <>
      {isSomethingLoading && (
        <Loader
          color="black"
          className="self-center mt-6"
          durationSegundos={1}
          backgroundSize="12px"
          width="40px"
        />
      )}

      {error && (
        <ErrorMessage
          message={
            error?.message || "No se pudieron obtener los datos del curso"
          }
        />
      )}

      {!error && !isSomethingLoading && courseData && (
        <div className="w-full flex flex-col">
          <h1 className="section-tittle">
            {courseData.Nombre_Curso} - {GradosInterpretacion[courseData.Grado]}{" "}
            {courseData.Seccion}
          </h1>
          {courseData.Profesor_Asociado ? (
            <h3 className="text-[1.5rem]">
              Prof. {courseData.Profesor_Asociado}
            </h3>
          ) : (
            UserSessionData.role === "student" && (
              <h3 className="text-[1.5rem]">No hay ningun profesor asignado</h3>
            )
          )}

          {courseData.Temas ? (
            courseData.Temas.map((topic, index) => (
              <DropDownTopic topic={topic} key={index} />
            ))
          ) : (
            <>
              <div>Aun no se han agregado temas a este curso</div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default CourseData;
