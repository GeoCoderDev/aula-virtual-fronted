"use client";


import { useState } from "react";
import AsignationsByAula from "./_components/AsignationsByAula";

import AsignationByProfesor from "./_components/AsignationsByProfesor";

const Asignaciones = () => {
  const [porAula, setPorAula] = useState(true);

  return (
    <div className="w-full flex flex-col items-start justify-start gap-y-4">
      <h1 className="section-tittle">Asignaciones</h1>
      <nav className="flex justify-center gap-x-4">
        <button
          onClick={() => {
            setPorAula(true);
          }}
          className={`button-with-loader cursor-default  ${
            !porAula &&
            "bg-gray-300 font-normal hover:grayscale-[0.8] cursor-pointer"
          }`}
        >
          Por Aula
        </button>

        <button
          onClick={() => {
            setPorAula(false);
          }}
          className={`button-with-loader cursor-default ${
            porAula &&
            " bg-gray-300 font-normal hover:grayscale-[0.8] cursor-pointer	"
          }`}
        >
          Por Profesor
        </button>
      </nav>

      {porAula ? <AsignationsByAula /> : <AsignationByProfesor />}
    </div>
  );
};

export default Asignaciones;
