"use client";
import { Student } from "@/interfaces/Student";
import React, { useEffect, useState } from "react";
import StudentRow from "./_components/StudentRow";
import Link from "next/link";
import useBatchAPI from "@/app/hooks/useBatchAPI";

const limitStudentsRequired = 50;


const Estudiantes = () => {
  
    const { fetchNextResults, results } = useBatchAPI<Student>(
      "/api/students",
      "/api/students/count",
      2,
      0
    );
  
    const loadMoreResults = () => {
      fetchNextResults?.();
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

      <div className="flex  items-center gap-3">
        <div className="flex items-center space-x-3">
          <p className="font-semibold">DNI:</p>
          <input
            // onChange=''
            maxLength={100}
            name="username"
            style={{ boxShadow: "0 0 10px 4px #00FF6F50" }}
            className="outline-none w-[60%] px-4 rounded-[1rem] py-2 font-semibold placeholder:text-black"
            type="text"
            placeholder=""
            value=""
          />
        </div>

        <div className="flex items-center space-x-3">
          <p className="font-semibold">NOMBRES:</p>
          <input
            // onChange=''
            maxLength={100}
            name="username"
            style={{ boxShadow: "0 0 10px 4px #00FF6F50" }}
            className="outline-none w-[60%] px-4 rounded-[1rem] py-2 font-semibold placeholder:text-black"
            type="text"
            placeholder=""
            value=""
          />
        </div>

        <div className="flex items-center space-x-3">
          <form>
            <select className="bg-verde-spotify">
              <option value="0">GRADO</option>
              <option value="1">Opción 1</option>
              <option value="2">Opción 2</option>
              <option value="3">Opción 3</option>
            </select>
          </form>

          <form>
            <select className="bg-verde-spotify">
              <option value="0">SECCIÓN</option>
              <option value="1">Opción 1</option>
              <option value="2">Opción 2</option>
              <option value="3">Opción 3</option>
            </select>
          </form>
        </div>
      </div>

      <div className="flex  items-center gap-3">
        <p className="font-semibold">APELLIDO:</p>
        <input
          // onChange=''
          maxLength={100}
          name="username"
          style={{ boxShadow: "0 0 10px 4px #00FF6F50" }}
          className="outline-none w-[150%] px-4 rounded-[1rem] py-2 font-semibold placeholder:text-black"
          type="text"
          placeholder=""
          value=""
        />
      </div>

      <button
        type="button"
        className="bg-verde-spotify rounded-full py-3 px-4 font-semibold flex items-center justify-center gap-x-2 disabled:grayscale-[0.5]"
      >
        Buscar Estudiante
      </button>

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
          </tbody>
        </table>
        <button onClick={loadMoreResults}>
          Cargar mas
        </button>
      </div>
    </div>
  );
};

export default Estudiantes;
