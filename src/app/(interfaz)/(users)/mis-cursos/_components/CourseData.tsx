"use client";

import { GradosInterpretacion } from "@/app/assets/GradosInterpretacion";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import Loader from "@/components/shared/Loader";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";
import { ErrorAPI } from "@/interfaces/API";

import { useEffect, useState } from "react";
import DropDownTopic from "./DropDownTopic";
import { CourseDataResponse } from "@/interfaces/Course";
import AddTopicIcon from "@/components/icons/courses/AddTopicIcon";
import AddTopic from "@/components/shared/modals/Temas/AddTopic";
import { Topic } from "@/interfaces/Topic";

const TEACHER_ASOCIATED_NOT_FOUND = "No hay ningun profesor asignado";

const CourseData = ({ idCourseClassroom }: { idCourseClassroom: number }) => {
  const [courseData, setCourseData] = useState<
    CourseDataResponse & { isTeacher: boolean }
  >();

  const [viewAddTopic, setViewAddTopic] = useState(false);

  const {
    error,
    fetchAPI,
    isSomethingLoading,
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

          setCourseData(() => ({
            ...courseData,
            isTeacher: !Boolean(courseData.Profesor_Asociado),
          }));
        }

        setIsSomethingLoading(false);
      } catch (e) {
        setError(() => ({ message: "No se pudo obtener los datos del curso" }));
        setIsSomethingLoading(false);
      }
    };

    fetchCourseData();
  }, [fetchAPI]);

  const addTopicFrontend = (newTopic: Topic) => {
    if (!courseData) return;

    setCourseData((prevData) => ({
      ...prevData!,
      Temas: [...(prevData!.Temas ?? []), newTopic]
    }));
  };

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
        <div className="w-full flex flex-col -border-2">
          <div className="flex gap-4 items-center flex-wrap justify-center w-max max-w-[90%]">
            <h1 className="section-tittle break-words">
              {courseData.Nombre_Curso} -{" "}
              {GradosInterpretacion[courseData.Grado]} {courseData.Seccion}
            </h1>

            {courseData.isTeacher && (
              <button
                title="Agregar Tema"
                className="bg-verde-spotify py-2 px-3 rounded-[0.5rem]"
                onClick={() => {
                  setViewAddTopic(true);
                }}
              >
                <AddTopicIcon className="aspect-square w-8" />
              </button>
            )}
          </div>
          {courseData.Profesor_Asociado && (
            <h3 className="text-[1.5rem] mt-2 mb-1">
              {courseData.Profesor_Asociado !== TEACHER_ASOCIATED_NOT_FOUND &&
                "Prof."}{" "}
              {courseData.Profesor_Asociado}
            </h3>
          )}

          <hr className="separator-courses mt-2" />

          <div className="mt-6 flex flex-col gap-8">
            {courseData.Temas
              ? courseData.Temas.map((topic, index) => (
                  <DropDownTopic
                    isTeacher={courseData.isTeacher}
                    topic={topic}
                    key={index}
                    index={index + 1}
                  />
                ))
              : "Aun no se han agregado temas a este curso"}
          </div>
        </div>
      )}

      {viewAddTopic && (
        <AddTopic
          addTopicFrontend={addTopicFrontend}
          idCourseClassroom={idCourseClassroom}
          eliminateModal={() => {
            setViewAddTopic(false);
          }}
        />
      )}
    </>
  );
};

export default CourseData;
