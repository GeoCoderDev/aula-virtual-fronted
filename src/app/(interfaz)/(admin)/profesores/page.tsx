"use client";
import { Student } from "@/interfaces/Student";
import React, { useRef, useState } from "react";
import Link from "next/link";
import useBatchAPI from "@/app/hooks/useBatchAPI";
import Loader from "@/components/shared/Loader";
import WarningMessage from "@/components/shared/messages/WarningMessage";
import useAPI from "@/app/hooks/useAPI";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";
import TeacherRow from "./_components/TeacherRow";
import { Teacher } from "@/interfaces/Teacher";

const limitStudentsRequired = 50;

interface SearchTermsTeacher {
  dni?: string; // DNI del profesor
  nombre?: string; // Nombre del profesor
  apellidos?: string; // Apellidos del profesor
  estado?: string;
}

const searchTermsInitial: SearchTermsTeacher = {
  dni: "",
  nombre: "",
  apellidos: "",
  estado: "",
};

const Profesores = () => {
  const inputDNI = useRef<HTMLInputElement>();
  const inputName = useRef<HTMLInputElement>();
  const inputApellido = useRef<HTMLInputElement>();
  const selectEstado = useRef<HTMLSelectElement>();

  const [searchTerms, setSearchTerms] = useState(searchTermsInitial);

  const {
    fetchNextResults,
    results,
    isLoading,
    setResults,
    allResultsGetted,
    error,
  } = useBatchAPI<Teacher>(
    "/api/teachers",
    limitStudentsRequired,
    0,
    searchTerms as any,
    [inputDNI, inputName, inputApellido, selectEstado]
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearchTerms({ ...searchTerms, [e.target.name]: e.target.value });
  };

  const toggleEstadoProfesor = (dni: string) => {
    // Buscar al estudiante por su DNI_Estudiante en el array results
    const updatedResults = results.map((profesor) => {
      // Si el DNI_Estudiante coincide, cambiar su estado
      if (profesor.DNI_Profesor === dni) {
        return {
          ...profesor,
          Estado: profesor.Estado === 1 ? 0 : 1,
        };
      }
      return profesor; // Devolver el estudiante sin cambios si no coincide el DNI_Estudiante
    });

    // Actualizar el estado del array results con el estudiante actualizado
    setResults(updatedResults);
  };

  return (
    <div className="flex flex-col items-start justify-center gap-y-6 ">
      <div className="flex justify-between items-center w-full">
        <h1 className="section-tittle">Buscar Profesores</h1>
        <Link href={"profesores/registrar"}>
          <button
            type="button"
            className="bg-verde-spotify rounded-lg py-3 px-4 font-semibold flex items-center justify-center gap-x-2 "
          >
            Registrar Profesores
          </button>
        </Link>
      </div>

      <form className="flex flex-wrap max-w-full items-center gap-x-5 gap-y-4 justify-start">
        <label className="font-semibold flex w-min flex-row items-center gap-x-3">
          DNI:
          <input
            ref={inputDNI as React.LegacyRef<HTMLInputElement>}
            maxLength={8}
            name="dni"
            className="custom-input w-[8rem]"
            type="text"
            value={searchTerms.dni}
            onChange={handleChange}
          />
        </label>

        <label className="font-semibold flex items-center gap-x-3 w-min">
          NOMBRES:
          <input
            ref={inputName as React.LegacyRef<HTMLInputElement>}
            onChange={handleChange}
            maxLength={60}
            name="nombre"
            className="custom-input w-[10rem]"
            type="text"
            placeholder=""
            value={searchTerms.nombre}
          />
        </label>

        <label className="flex font-semibold items-center gap-3 w-min">
          APELLIDO:
          <input
            ref={inputApellido as React.LegacyRef<HTMLInputElement>}
            onChange={handleChange}
            maxLength={100}
            name="apellidos"
            className="custom-input w-[10rem]"
            type="text"
            placeholder=""
            value={searchTerms.apellidos}
          />
        </label>

        <select
          ref={selectEstado as React.LegacyRef<HTMLSelectElement>}
          name="estado"
          value={searchTerms.estado}
          onChange={handleChange}
          className="bg-verde-spotify text-center outline-none px-3 py-2 rounded-[1rem]"
        >
          <option value="">Estado</option>
          <option value="1">Habilitado</option>
          <option value="0">Deshabilitado</option>
        </select>
      </form>

      <div className="flex flex-col items-center justify-center gap-y-4 ">
        <div className="max-w-[80vw] w-max overflow-auto max-h-[300px] relative">
          <table className=" max-w-max">
            <colgroup>
              <col className="w-[6rem]" />
              <col className="w-[12rem]" />
              <col className="w-[12rem]" />
              <col className="w-[6rem]" />
              <col className="w-[15rem]" />
            </colgroup>
            <thead className="sticky top-0">
              <tr className="font-semibold bg-verde-spotify text-black ">
                <th className="text-center px-4 py-2 rounded-l ">DNI</th>
                <th className="text-center px-4 py-2">Nombre</th>
                <th className="text-center px-4 py-2">Apellidos</th>
                <th className="text-center px-4 py-2">Estado</th>
                <th className="text-center px-30 py-2 rounded-r">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {results.map((teacher, index) => (
                <TeacherRow
                  togleStateFunction={toggleEstadoProfesor}
                  key={index}
                  {...teacher}
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

export default Profesores;
