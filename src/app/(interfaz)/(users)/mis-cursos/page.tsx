"use client";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";

import CourseCard from "@/components/shared/courses/CourseCard";
import Loader from "@/components/shared/Loader";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";
import { ErrorAPI } from "@/interfaces/API";
import { CourseResponse } from "@/interfaces/Course";
import { gradientGenerator } from "@/lib/helpers/generators/courseDegradateColorsGenerator";
import { useEffect, useState } from "react";

const MisCursosHome = () => {
  const [courses, setCourses] = useState<CourseResponse[] | undefined>();
  const {
    error,
    setError,
    isSomethingLoading,
    setIsSomethingLoading,
    fetchAPI,
  } = useRequestAPIFeatures();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchCancelable = fetchAPI(`/api/myCourses`, "GET");
        if (fetchCancelable === undefined) return;
        setIsSomethingLoading(true);

        const res = await fetchCancelable?.fetch();

        if (!res.ok) {
          const { message }: ErrorAPI = await res.json();
          if (!message) throw new Error();
          setError(() => ({ message }));
        } else {
          const courses: CourseResponse[] = await res.json();
          setCourses(() => courses);
        }

        setIsSomethingLoading(false);
      } catch (e) {
        setError(() => ({
          message: "No se pudieron obtener tus cursos",
        }));
        setIsSomethingLoading(false);
      }
    };

    fetchCourses();
  }, [fetchAPI]);

  const gradients = gradientGenerator(true);

  return (
    <div className="w-full flex flex-col gap-y-4">
      <h1 className="section-tittle">Mis Cursos</h1>
      {isSomethingLoading && (
        <Loader
          color="black"
          className="self-center mt-6"
          durationSegundos={1}
          backgroundSize="12px"
          width="40px"
        />
      )}

      {error && <ErrorMessage message={error.message} />}

      <div
        className="boder-2 grid w-full -border-2 gap-x-6 gap-y-8 justify-center content-between items-center justify-items-center"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {courses &&
          courses.map((course, index) => (
            <>
              <CourseCard
                course={course}
                key={index}
                backgroundImage={gradients.next().value.pattern}
              />
            </>
          ))}
      </div>
    </div>
  );
};

export default MisCursosHome;
