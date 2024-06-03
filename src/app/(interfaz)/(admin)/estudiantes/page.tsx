"use client";
import { Student } from "@/interfaces/Student";
import React, { useRef, useState } from "react";
import StudentRow from "./_components/StudentRow";
import Link from "next/link";
import useBatchAPI from "@/app/hooks/useBatchAPI";
import Loader from "@/components/shared/Loader";
import WarningMessage from "@/components/shared/messages/WarningMessage";
import useAPI from "@/app/hooks/useAPI";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";

const limitStudentsRequired = 50;


interface SearchTermsStudent {
  dni?: string; // DNI del estudiante
  nombre?: string; // Nombre del estudiante
  apellidos?: string; // Apellidos del estudiante
  grado?: string; // Grado del estudiante
  seccion?: string; // Sección del estudiante
  estado?: string;
}

const searchTermsInitial: SearchTermsStudent = {
  dni: "",
  nombre: "",
  apellidos: "",
  grado: "",
  seccion: "",
  estado: "",
};

const Estudiantes = () => {
  const inputDNI = useRef<HTMLInputElement>();
  const inputName = useRef<HTMLInputElement>();
  const inputApellido = useRef<HTMLInputElement>();
  const selectGrado = useRef<HTMLSelectElement>();
  const selectSeccion = useRef<HTMLSelectElement>();
  const selectEstado = useRef<HTMLSelectElement>();

  const [availableSections, setAvailableSections] = useState([]);

  const [searchTerms, setSearchTerms] = useState(searchTermsInitial);

  const { fetchAPI } = useAPI();

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
    if (e.target.name === "grado") {
      setSearchTerms({
        ...searchTerms,
        [e.target.name]: e.target.value,
        seccion: "",
      });

      setAvailableSections([]);
      if (e.target.value === "") {
        setAvailableSections([]);
      } else {
        const fetchCancelable = fetchAPI(
          `/api/classrooms/grade/${e.target.value}/sections`
        );

        if (fetchCancelable === undefined) return;

        const res = await fetchCancelable.fetch();

        if (fetchCancelable?.queryParams?.grado === selectGrado.current?.value)
          return setAvailableSections([]);

        const sections = await res?.json();
        setAvailableSections(sections ?? []);
      }
    } else {
      setSearchTerms({ ...searchTerms, [e.target.name]: e.target.value });
    }
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
            name="dni"
            className="custom-input w-[8rem]"
            type="text"
            value={searchTerms.dni}
            onChange={handleInputTextChange}
          />
        </label>

        <label className="font-semibold flex items-center gap-x-3 w-min">
          NOMBRES:
          <input
            ref={inputName as React.LegacyRef<HTMLInputElement>}
            onChange={handleInputTextChange}
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
            onChange={handleInputTextChange}
            maxLength={100}
            name="apellidos"
            className="custom-input w-[10rem]"
            type="text"
            placeholder=""
            value={searchTerms.apellidos}
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

        <select
          ref={selectSeccion as React.LegacyRef<HTMLSelectElement>}
          name="seccion"
          value={searchTerms.seccion}
          onChange={handleSelectChange}
          disabled={availableSections.length === 0}
          className="bg-verde-spotify text-center outline-none px-3 py-2 rounded-[1rem]"
        >
          <option value="">SECCIÓN</option>
          {availableSections.map((section, index) => (
            <option value={section} key={index}>
              {section}
            </option>
          ))}
        </select>

        <select
          ref={selectEstado as React.LegacyRef<HTMLSelectElement>}
          name="estado"
          value={searchTerms.estado}
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
