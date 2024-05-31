"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import CourseRow from "./_components/CourseRow";
import useBatchAPI from "@/app/hooks/useBatchAPI";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";
import { Course } from "@/interfaces/Course";
import useAPI from "@/app/hooks/useAPI";
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
      [inputNombre, selectGrado]
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
    <div className="flex flex-col items-start justify-center gap-y-6 max-w-max self-start">
      <div className="flex justify-between items-start w-full ">
        <h1 className="section-tittle">Buscar Cursos</h1>

        <Link href={"cursos/registrar"}>
          <button
            type="button"
            className="bg-verde-spotify rounded-lg py-3 px-4 font-semibold flex items-center justify-center gap-x-2 "
          >
            Registrar Cursos
          </button>
        </Link>
      </div>

      <form className="flex flex-wrap max-w-full items-center gap-x-5 gap-y-4 justify-start">
        <label className="font-semibold flex w-min flex-row items-center gap-x-3">
          <input
            ref={inputNombre as React.LegacyRef<HTMLInputElement>}
            maxLength={60}
            name="username"
            className="custom-input w-[10rem]"
            type="text"
            placeholder=""
            onChange={handleInputTextChange}
          />
        </label>

        <select
          ref={selectGrado as React.LegacyRef<HTMLSelectElement>}
          name="grado"
          value={searchTerms.grado}
          onChange={handleSelectChange}
          className="bg-verde-spotify text-center outline-none px-3 py-2 rounded-[1rem]"
        >
          <option value="">GRADO</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </form>

      <div className="flex flex-col items-center justify-center gap-y-4">
        <div
          className="w-full max-w-[80vw] overflow-auto max-h-[300px] relative"
          style={{ overflowX: "auto", margin: "0", padding: "0" }}
        >
          <table className="w-full min-w-full">
            <colgroup>
              <col className="w-[6rem]" />
              <col className="w-[12rem]" />
              <col className="w-[3rem]" />
              <col className="w-[15rem]" />
            </colgroup>
            <thead className="sticky top-0">
              <tr className="font-semibold bg-verde-spotify text-black">
                <th className="text-center px-4 py-2 rounded-l">ID</th>
                <th className="text-center px-100 py-2">
                  Nombre de asignaturas
                </th>
                <th className="text-center px-4 py-2">Grados</th>
                <th className="text-center px-30 py-2 rounded-r">Acciones</th>
              </tr>
            </thead>
            <tbody className="mt-4">
              {results.map((course, index) => (
                <CourseRow course={course} key={index} />
              ))}
            </tbody>
          </table>
        </div>

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
            Cargar más
          </button>
        )}

        {error && <ErrorMessage message={error.message} />}
      </div>
    </div>
  );
};

export default Cursos;
