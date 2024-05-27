"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import CourseRow from "./_components/CourseRow";
import useBatchAPI from "@/app/hooks/useBatchAPI";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";
import { Course } from "@/interfaces/Course";
import Loader from "@/components/shared/Loader";
import WarningMessage from "@/components/shared/messages/WarningMessage";

// Constants
const limitCourseRequired = 50;

// Interfaces
interface SearchTermsCourse {
  nombre?: string; // Nombre del curso
  grado?: string; // Grado del curso
}

// Initial states
const searchTermsInitial: SearchTermsCourse = {
  nombre: "",
  grado: "",
};

// Component
const Cursos = () => {
  // Refs
  const inputNombre = useRef<HTMLInputElement>();
  const selectGrado = useRef<HTMLSelectElement>();

  // States
  const [searchTerms, setSearchTerms] = useState(searchTermsInitial);

  const { allResultsGetted, error, fetchNextResults, isLoading, results } =
    useBatchAPI<Course>(
      "/api/courses",
      limitCourseRequired,
      0,
      searchTerms as any,
      [inputNombre, selectGrado],
      "GET"
    );

  // Handlers
  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerms({ ...searchTerms, [e.target.name]: e.target.value });
  };

  const handleSelectChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchTerms({ ...searchTerms, [e.target.name]: e.target.value });
  };

  // Render
  return (
    <div className="flex flex-col items-start justify-start gap-y-6 -border-2 md:flex-row md:flex-wrap md:justify-center">
      <div className="flex justify-between items-start w-full ">
        <h1 className=" text-4x1 md:text-5xl font-extrabold">Buscar Cursos</h1>

        <Link href={"cursos/registrar"}>
          <button className="px-4 py-3  rounded-[0.5rem] bg-verde-spotify font-bold">
            Registrar Cursos
          </button>
        </Link>
      </div>

      <div className="flex  items-center gap-3 w-full">
        <p className="font-semibold">NOMBRE DE ASIGNATURAS:</p>
        <input
          ref={inputNombre as React.LegacyRef<HTMLInputElement>}
          maxLength={100}
          name="username"
          style={{ boxShadow: "0 0 10px 4px #00FF6F50" }}
          className="outline-none w-full md:w-64 px-4 rounded-[1rem] py-2 font-semibold placeholder:text-black"
          type="text"
          onChange={handleInputTextChange}
        />
        <select
          ref={selectGrado as React.LegacyRef<HTMLSelectElement>}
          name="grado"
          value={searchTerms.grado}
          onChange={handleSelectChange}
          className="bg-verde-spotify text-center outline-none px-3 py-2 rounded-[1rem] w-48 md:w-32"
        >
          <option value="">GRADO</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-4 w-full">
        <table className="w-full">
          <thead>
            <tr className="font-semibold bg-verde-spotify text-black">
              <td className="px-8 py-3 rounded-l">ID</td>
              <td className="px-8 py-3">Nombre de asignaturas</td>
              <td className="px-8 py-3">Grados</td>
              <td className="px-60 py-3 rounded-r">Acciones</td>
            </tr>
          </thead>

          <tbody>
            {results.map((course, index) => (
              <CourseRow course={course} key={index} />
            ))}
          </tbody>
        </table>

        {!error && !isLoading && results.length === 0 && (
          <WarningMessage message="No se encontraron resultados" />
        )}

        {!error && isLoading && (
          <Loader
            color="black"
            durationSegundos={1}
            backgroundSize="12px"
            width="40px"
          />
        )}

        {!error && !isLoading && !allResultsGetted && (
          <button
            className="bg-amarillo-pooh text-white px-3 py-2 rounded-[0.5rem]"
            onClick={() => {
              fetchNextResults?.();
            }}
          >
            Cargar mas
          </button>
        )}

        {error && <ErrorMessage message={error.message} />}
      </div>
    </div>
  );
};

export default Cursos;
