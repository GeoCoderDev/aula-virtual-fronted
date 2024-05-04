"use client";
import { Student } from "@/interfaces/Student";
import React, { FormEvent, useEffect, useState } from "react";
import StudentRow from "./_components/StudentRow";
import Link from "next/link";
import useBatchAPI from "@/app/hooks/useBatchAPI";
import Loader from "@/components/Loader";
import { ObjetoConStringYNumber } from "@/interfaces/CustomObjects";

const limitStudentsRequired = 4;

interface SearchTermsStudent {
  dni?: string; // DNI del estudiante
  nombre?: string; // Nombre del estudiante
  apellidos?: string; // Apellidos del estudiante
  grado?: string; // Grado del estudiante
  seccion?: string; // Sección del estudiante
}

const searchTermsInitial: SearchTermsStudent = {
  dni: "",
  nombre: "",
  apellidos: "",
  grado: "",
  seccion: "",
};

const Estudiantes = () => {
  const [searchTerms, setSearchTerms] = useState(searchTermsInitial);

  const [queryParams, setQueryParams] = useState<ObjetoConStringYNumber | null>(
    null
  );

  const { fetchNextResults, results, isLoading, allResultGetted } =
    useBatchAPI<Student>(
      "/api/students",
      "/api/students/count",
      limitStudentsRequired,
      0,
      queryParams
    );

  const loadMoreResults = () => {
    fetchNextResults?.();
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchTerms({ ...searchTerms, [e.target.name]: e.target.value });
  };

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerms({ ...searchTerms, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQueryParams(searchTerms as any);
  };


  return (
    <div className="flex flex-col items-start justify-center gap-y-6">
      <div className="flex justify-between items-center w-full">
        <p className=" text-4xl font-extrabold"> Buscar Estudiante</p>
        <Link href={"estudiantes/registrar"}>
          <button
            type="button"
            className="bg-verde-spotify rounded-full py-3 px-4 font-semibold flex items-center justify-center gap-x-2 disabled:grayscale-[0.5]"
          >
            Registrar Estudiante
          </button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="flex  items-center gap-3">
        <div className="flex items-center space-x-3">
          <p className="font-semibold">DNI:</p>
          <input
            maxLength={100}
            name="dni"
            style={{ boxShadow: "0 0 10px 4px #00FF6F50" }}
            className="outline-none w-[60%] px-4 rounded-[1rem] py-2 font-semibold placeholder:text-black"
            type="text"
            value={searchTerms.dni}
            onChange={handleInputTextChange}
          />
        </div>

        <div className="flex items-center space-x-3">
          <p className="font-semibold">NOMBRES:</p>
          <input
            onChange={handleInputTextChange}
            maxLength={100}
            name="nombre"
            style={{ boxShadow: "0 0 10px 4px #00FF6F50" }}
            className="outline-none w-[60%] px-4 rounded-[1rem] py-2 font-semibold placeholder:text-black"
            type="text"
            placeholder=""
            value={searchTerms.nombre}
          />
        </div>

        <div className="flex items-center space-x-3">
          <select
            name="grado"
            value={searchTerms.grado}
            onChange={handleSelectChange}
            id="grado-student"
            className="bg-verde-spotify text-center"
          >
            <option value="">GRADO</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <select
            name="seccion"
            value={searchTerms.seccion}
            onChange={handleSelectChange}
            disabled
            className="bg-verde-spotify"
          >
            <option value="">SECCIÓN</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>

        <div className="flex  items-center gap-3">
          <p className="font-semibold">APELLIDO:</p>
          <input
            onChange={handleInputTextChange}
            maxLength={100}
            name="apellidos"
            style={{ boxShadow: "0 0 10px 4px #00FF6F50" }}
            className="outline-none w-[150%] px-4 rounded-[1rem] py-2 font-semibold placeholder:text-black"
            type="text"
            placeholder=""
            value=""
          />
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="bg-verde-spotify rounded-full py-3 px-4 font-semibold flex items-center justify-center gap-x-2 disabled:grayscale-[0.5]"
        >
          Buscar Estudiante
        </button>
      </form>

      <div>
        <table>
          <thead>
            <tr className="font-semibold bg-verde-spotify text-black">
              <th className="px-4 py-2 rounded-l">DNI</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Apellidos</th>
              <th className="px-4 py-2">Grado</th>
              <th className="px-4 py-2">Sección</th>
              <th className="px-30 py-2 rounded-r">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {results.map((student, index) => (
              <StudentRow key={index} {...student} />
            ))}

            {isLoading && (
              <Loader
                color="black"
                durationSegundos={1}
                backgroundSize="12px"
                width="40px"
              />
            )}
          </tbody>
        </table>
        {!isLoading && !allResultGetted && (
          <button
            className="bg-amarillo-pooh text-white px-3 py-2 rounded-[0.5rem]"
            onClick={loadMoreResults}
          >
            Cargar mas
          </button>
        )}
      </div>
    </div>
  );
};

export default Estudiantes;
