"use client";
import { Student } from "@/interfaces/Student";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import StudentRow from "./_components/StudentRow";
import Link from "next/link";
import useBatchAPI from "@/app/hooks/useBatchAPI";
import Loader from "@/components/Loader";
import WarningMessage from "@/components/shared/WarningMessage";
import useAPI from "@/app/hooks/useAPI";
import ErrorMessage from "@/components/shared/ErrorMessage";

const limitStudentsRequired = 50;

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
  const inputDNI = useRef<HTMLInputElement>();
  const inputName = useRef<HTMLInputElement>();
  const inputApellido = useRef<HTMLInputElement>();
  const selectGrado = useRef<HTMLSelectElement>();
  const selectSeccion = useRef<HTMLSelectElement>();

  const [availableSections, setAvailableSections] = useState([]);

  const [searchTerms, setSearchTerms] = useState(searchTermsInitial);

  const { fetchAPI } = useAPI();

  const { fetchNextResults, results, isLoading, allResultsGetted, error } =
    useBatchAPI<Student>(
      "/api/students",
      limitStudentsRequired,
      0,
      searchTerms as any,
      [inputDNI, inputName, inputApellido, selectGrado, selectSeccion]
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

        if(fetchCancelable?.queryParams?.grado===selectGrado.current?.value) return setAvailableSections([]);

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

  return (
    <div className="flex flex-col items-start justify-center gap-y-6 -border-2">
      
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

      <form className="flex  items-center gap-3">
        <div className="flex items-center space-x-3">
          <p className="font-semibold">DNI:</p>
          <input
            ref={inputDNI as React.LegacyRef<HTMLInputElement>}
            maxLength={100}
            name="dni"
            className="custom-input"
            type="text"
            value={searchTerms.dni}
            onChange={handleInputTextChange}
          />
        </div>

        <div className="flex items-center space-x-3">
          <p className="font-semibold">NOMBRES:</p>
          <input
            ref={inputName as React.LegacyRef<HTMLInputElement>}
            onChange={handleInputTextChange}
            maxLength={100}
            name="nombre"
            className="custom-input"
            type="text"
            placeholder=""
            value={searchTerms.nombre}
          />
        </div>

        <div className="flex items-center space-x-3">
          <select
            ref={selectGrado as React.LegacyRef<HTMLSelectElement>}
            name="grado"
            value={searchTerms.grado}
            onChange={handleSelectChange}
            id="grado-student"
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
        </div>

        <div className="flex  items-center gap-3">
          <p className="font-semibold">APELLIDO:</p>
          <input
            ref={inputApellido as React.LegacyRef<HTMLInputElement>}
            onChange={handleInputTextChange}
            maxLength={100}
            name="apellidos"
            className="custom-input"
            type="text"
            placeholder=""
            value={searchTerms.apellidos}
          />
        </div>
      </form>

      <div className="flex flex-col items-center justify-center gap-y-4  min-w-[100%] max-w-[80vw] overflow-x-auto overflow-y-hidden">
        <table className="w-full min-w-full">
        <colgroup>
          <col className="w-[6rem]"/>
          <col className="w-[12rem]"/>
          <col className="w-[12rem]"/>
          <col className="w-[3rem]"/>
          <col className="w-[3rem]"/>
          <col className="w-[6rem]"/>
          <col className="w-[15rem]"/>
        </colgroup>
          <thead>
            <tr className="font-semibold bg-verde-spotify text-black">
              <th className="text-center px-4 py-2 rounded-l">DNI</th>
              <th className="text-center px-4 py-2">Nombre</th>
              <th className="text-center px-4 py-2">Apellidos</th>
              <th className="text-center px-4 py-2">Grado</th>
              <th className="text-center px-4 py-2">Sección</th>
              <th className="text-center px-4 py-2">Estado</th>
              <th className="text-center px-30 py-2 rounded-r">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {results.map((student, index) => (
              <StudentRow key={index} {...student} />
            ))}
          </tbody>
        </table>
          
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
        {}
        {!error && !isLoading && !allResultsGetted && (
          <button
            className="bg-amarillo-pooh text-white px-3 py-2 rounded-[0.5rem]"
            onClick={()=>{fetchNextResults?.()}}
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
