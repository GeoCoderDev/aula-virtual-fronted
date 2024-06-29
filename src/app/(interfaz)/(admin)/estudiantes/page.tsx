"use client";
import { Student } from "@/interfaces/Student";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import StudentRow from "./_components/StudentRow";
import Link from "next/link";
import useBatchAPI from "@/app/hooks/useBatchAPI";
import Loader from "@/components/shared/Loader";
import WarningMessage from "@/components/shared/messages/WarningMessage";

import ErrorMessage from "@/components/shared/messages/ErrorMessage";
import { Aula } from "@/interfaces/Aula";
import AulaSelector from "@/components/inputs/AulaSelector";

const limitStudentsRequired = 50;

interface SearchTermsStudent extends Aula {
  DNI: string; // DNI del estudiante
  Nombre: string; // Nombre del estudiante
  Apellidos: string; // Apellidos del estudiante
  Estado: string;
}

const searchTermsInitial: SearchTermsStudent = {
  DNI: "",
  Nombre: "",
  Apellidos: "",
  Grado: "",
  Seccion: "",
  Estado: "",
};

const Estudiantes = () => {
  const inputDNI = useRef<HTMLInputElement>();
  const inputName = useRef<HTMLInputElement>();
  const inputApellido = useRef<HTMLInputElement>();
  const selectGrado = useRef<HTMLSelectElement>();
  const selectSeccion = useRef<HTMLSelectElement>();
  const selectEstado = useRef<HTMLSelectElement>();


  const [searchTerms, setSearchTerms] = useState(searchTermsInitial);


  const {
    fetchNextResults,
    results,
    isLoading,
    allResultsGetted,
    error,
    setResults,
  } = useBatchAPI<Student>(
    "/api/students",
    limitStudentsRequired,
    0,
    searchTerms as any,
    [
      inputDNI,
      inputName,
      inputApellido,
      selectGrado,
      selectSeccion,
      selectEstado,
    ]
  );

  const handleSelectChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {

      setSearchTerms({ ...searchTerms, [e.target.name]: e.target.value });
    
  };

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerms({ ...searchTerms, [e.target.name]: e.target.value });
  };

  const toggleEstadoEstudiante = (dni: string) => {
    // Buscar al estudiante por su DNI_Estudiante en el array results
    const updatedResults = results.map((estudiante) => {
      // Si el DNI_Estudiante coincide, cambiar su estado
      if (estudiante.DNI_Estudiante === dni) {
        return {
          ...estudiante,
          Estado: estudiante.Estado === 1 ? 0 : 1,
        };
      }
      return estudiante; // Devolver el estudiante sin cambios si no coincide el DNI_Estudiante
    });

    // Actualizar el estado del array results con el estudiante actualizado
    setResults(updatedResults);
  };

  return (
    <div className="flex flex-col items-start justify-center gap-y-6 ">
      <div className="flex justify-between items-center w-full">
        <h1 className="section-tittle">Buscar Estudiante</h1>
        <Link href={"estudiantes/registrar"}>
          <button
            type="button"
            className="bg-verde-spotify rounded-lg py-3 px-4 font-semibold flex items-center justify-center gap-x-2 "
          >
            Registrar Estudiantes
          </button>
        </Link>
      </div>

      <form className="flex flex-wrap max-w-full items-center gap-x-5 gap-y-4 justify-start">
        <label className="font-semibold flex w-min flex-row items-center gap-x-3">
          DNI:
          <input
            ref={inputDNI as React.LegacyRef<HTMLInputElement>}
            maxLength={8}
            name="DNI"
            className="custom-input w-[8rem]"
            type="text"
            value={searchTerms.DNI}
            onChange={handleInputTextChange}
          />
        </label>

        <label className="font-semibold flex items-center gap-x-3 w-min">
          NOMBRES:
          <input
            ref={inputName as React.LegacyRef<HTMLInputElement>}
            onChange={handleInputTextChange}
            maxLength={60}
            name="Nombre"
            className="custom-input w-[10rem]"
            type="text"
            placeholder=""
            value={searchTerms.Nombre}
          />
        </label>

        <label className="flex font-semibold items-center gap-3 w-min">
          APELLIDO:
          <input
            ref={inputApellido as React.LegacyRef<HTMLInputElement>}
            onChange={handleInputTextChange}
            maxLength={100}
            name="Apellidos"
            className="custom-input w-[10rem]"
            type="text"
            placeholder=""
            value={searchTerms.Apellidos}
          />
        </label>

        <AulaSelector
          tipo="search"
          selectGrado={selectGrado}
          searchTerms={searchTerms}
          setSearchTerms={setSearchTerms as Dispatch<SetStateAction<Aula>>}
          selectSeccion={selectSeccion}
        />

        <select
          ref={selectEstado as React.LegacyRef<HTMLSelectElement>}
          name="Estado"
          value={searchTerms.Estado}
          onChange={handleSelectChange}
          className="bg-verde-spotify text-center outline-none px-3 py-2 rounded-[1rem]"
        >
          <option value="">Estado</option>
          <option value="1">Habilitado</option>
          <option value="0">Deshabilitado</option>
        </select>
      </form>

      <div className="flex flex-col items-center justify-center gap-y-4 ">
        <div
          className="w-full max-w-[80vw] overflow-auto relative max-h-[300px]"
          style={{ overflowX: "auto", margin: "0", padding: "0" }}
        >
          <table className="w-full min-w-full">
            <colgroup>
              <col className="w-[6rem]" />
              <col className="w-[12rem]" />
              <col className="w-[12rem]" />
              <col className="w-[3rem]" />
              <col className="w-[3rem]" />
              <col className="w-[6rem]" />
              <col className="w-[15rem]" />
            </colgroup>
            <thead className="sticky top-0">
              <tr className="font-semibold bg-verde-spotify text-black ">
                <th className="text-center px-4 py-2 rounded-l ">DNI</th>
                <th className="text-center px-4 py-2">Nombre</th>
                <th className="text-center px-4 py-2">Apellidos</th>
                <th className="text-center px-4 py-2 ">Grado</th>
                <th className="text-center px-4 py-2">Sección</th>
                <th className="text-center px-4 py-2">Estado</th>
                <th className="text-center px-30 py-2 rounded-r">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {results.map((student, index) => (
                <StudentRow
                  togleStateFunction={toggleEstadoEstudiante}
                  key={index}
                  {...student}
                />
              ))}
            </tbody>
          </table>
        </div>

        {!error && isLoading && (
          <Loader
            color="black"
            durationSegundos={1}
            backgroundSize="12px"
            width="40px"
          />
        )}

        {!error && !isLoading && results.length === 0 && (
          <WarningMessage message="No se encontraron resultados" />
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

        {error && !isLoading && <ErrorMessage message={error.message} />}
      </div>
    </div>
  );
};

export default Estudiantes;
