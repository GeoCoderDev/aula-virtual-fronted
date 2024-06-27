"use client";

import Link from "next/link";
import { useState } from "react";

const CrearCuestionario = () => {
  const [verComponente1, setVerComponente1] = useState(true);
  const [verComponente2, setVerComponente2] = useState(false);
  const [verComponente3, setVerComponente3] = useState(false);
  const [mostrarComponentes, setMostrarComponentes] = useState(false);

  const handleCrearClick = () => {
    setMostrarComponentes(true);
  };

  return (
    <div className="flex flex-col gap-y-1 w-full">
      <nav className="flex items-center justify-between mb-4">
        <div>
          <Link href="/mis-cursos" as={"/mis-cursos"}>
            <div className="cursor-pointer hover:underline">
              Mis Cursos <span> &gt; Aritmética 4C &gt; Tema 1 - Crear Cuestionario</span>
            </div>
          </Link>
          <h1 className="section-tittle">Crear Cuestionario</h1>
        </div>
        <div className="flex gap-5">
          <button
            type="button"
            className="text-white bg-red-500 rounded-[0.5rem] py-1 px-8 font-semibold text-[1.1rem]"
          >
            <Link href="/mis-cursos/1" as={"/mis-cursos/1"}>
              Cancelar
            </Link>
        
          </button>
          <button
            type="button"
            className="text-white bg-blue-500 rounded-[0.5rem] py-1 px-8 font-semibold text-[1.1rem]"
            onClick={handleCrearClick}
          >
            Crear
          </button>
        </div>
      </nav>
      <hr />
      <br />
 

      {mostrarComponentes && (
        <>
          
          <div className="border-2 border-gray-300 p-8 rounded-lg">
          
            <div className="flex flex-col gap-y-4">
             
              <div className="flex flex-col gap-y-2">
                <label htmlFor="titulo">Título del cuestionario:</label>
                <input type="text" id="titulo" className="custom-input2" />
              </div>
              <div className="flex flex-col gap-y-2">
                <label htmlFor="descripcion">Descripción (Opcional):</label>
                <textarea id="descripcion" className="custom-input2"></textarea>
              </div>
              <div className="flex gap-7">
                <div className="flex flex-col gap-y-2">
                  <label htmlFor="fechaInicio">Fecha y hora de inicio:</label>
                  <input type="date" id="fechaInicio" className="custom-input2" />
                </div>
                <div className="flex flex-col gap-y-2">
                  <label htmlFor="fechaCierre">Fecha y hora de cierre:</label>
                  <input type="date" id="fechaCierre" className="custom-input2" />
                </div>
              </div>
            </div>
          </div>
          <br />
          <h2 className="section-tittle">Preguntas:</h2>
          <div className="border-2 border-gray-300 p-8 rounded-lg mt-4">
            <div className="flex flex-col gap-y-2">
              
              <div className="flex flex-col gap-y-2">
                <label htmlFor="titulo">Pregunta:</label>
                <input type="text"  className="custom-input2" />
                <div className="flex gap-2 items-center">
                  <input type="text" className="border rounded p-2 flex-grow" placeholder="Puntaje" />
                  <div className="flex flex-col gap-y-2">
                    <label className="flex items-center gap-x-2">
                      <input type="checkbox" /> Opción 1
                    </label>
                    <label className="flex items-center gap-x-2">
                      <input type="checkbox" /> Opción 2
                    </label>
                    <label className="flex items-center gap-x-2">
                      <input type="checkbox" /> Opción 3
                    </label>
                    <button className="text-blue-500">Añadir opción</button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-500">Duplicar Pregunta</button>
                  <button className="text-red-500">Eliminar Pregunta</button>
                </div>
              </div>
            </div>
          </div>

          <nav className="flex justify-center gap-x-4 mt-4">
            <button
              onClick={() => {
                setVerComponente1(true);
                setVerComponente2(false);
                setVerComponente3(false);
              }}
              className={`border-2 border-blue-400 ${
                verComponente1 ? "font-extrabold" : "font-normal"
              }`}
            >
              Componente 1
            </button>
            <button
              onClick={() => {
                setVerComponente1(false);
                setVerComponente2(true);
                setVerComponente3(false);
              }}
              className={`border-2 border-blue-400 ${
                verComponente2 ? "font-extrabold" : "font-normal"
              }`}
            >
              Componente 2
            </button>
            <button
              onClick={() => {
                setVerComponente1(false);
                setVerComponente2(false);
                setVerComponente3(true);
              }}
              className={`border-2 border-blue-400 ${
                verComponente3 ? "font-extrabold" : "font-normal"
              }`}
            >
              Componente 3
            </button>
          </nav>

          {verComponente1 && (
            <div className="p-7 rounded-[2rem] bg-green-500">Componente 1</div>
          )}
          {verComponente2 && (
            <div className="p-7 rounded-[2rem] bg-green-500">Componente 2</div>
          )}
          {verComponente3 && (
            <div className="p-7 rounded-[2rem] bg-green-500">Componente 3</div>
          )}
        </>
      )}
    </div>
  );
};

export default CrearCuestionario;
