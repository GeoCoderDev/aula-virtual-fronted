"use client";

import { useState } from "react";

const CourseData = () => {
  const [verComponente1, setVerComponente1] = useState(true);
  const [verComponente2, setVerComponente2] = useState(false);
  const [verComponente3, setVerComponente3] = useState(false);
  const [verComponente4, setVerComponente4] = useState(false);

  const [preguntas, setPreguntas] = useState([{}]);

  const handleNuevaPregunta = () => {
    setPreguntas([...preguntas, {}]);
  };

  const handleEliminarPregunta = (index: number) => {
    setPreguntas(preguntas.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col gap-y-4 items-start">
        <h1 style={{ fontSize: "2.5em", fontWeight: "bolder" }}>
          Aritmética | 4TO C
        </h1>

        <button className="bg-black text-white rounded-full px-4 py-2">
          AÑADIR NUEVA SECCIÓN
        </button>

        <div className="flex items-center">
          <button className="bg-verde-spotify text-black rounded-full px-4 py-2 font-bold">
            TEMA 1
          </button>
          <img
            src="/icons/Editar Icon.svg"
            alt="Imagen 1"
            className="w-8 h-auto mx-2"
          />
        </div>

        <div className="w-full border border-black rounded-xl p-3">
          <nav className="flex flex-wrap justify-start gap-2">
            <button
              onClick={() => {
                setVerComponente1(true);
                setVerComponente2(false);
                setVerComponente3(false);
                setVerComponente4(false);
              }}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-white 
              ${verComponente1 ? "bg-azul-pablo-dark" : "bg-azul-pablo"}
              hover:bg-azul-pablo-dark md:px-4 md:py-2 text-sm md:text-base`}
            >
              <img src="/icons/Archivo.svg" alt="Icono" className="w-7 h-7" />
              SUBIR ARCHIVO
            </button>

            <button
              onClick={() => {
                setVerComponente1(false);
                setVerComponente2(true);
                setVerComponente3(false);
                setVerComponente4(false);
              }}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-white 
              ${verComponente2 ? "bg-amarillo-pooh-dark" : "bg-amarillo-pooh"}
              hover:bg-amarillo-pooh-dark md:px-4 md:py-2 text-sm md:text-base`}
            >
              <img src="/icons/Megafono.svg" alt="Icono" className="w-7 h-7" />
              CREAR FORO
            </button>

            <button
              onClick={() => {
                setVerComponente1(false);
                setVerComponente2(false);
                setVerComponente3(true);
                setVerComponente4(false);
              }}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-white 
              ${verComponente3 ? "bg-rojo-orange-dark" : "bg-rojo-orange"}
              hover:bg-rojo-orange-dark md:px-4 md:py-2 text-sm md:text-base`}
            >
              <img
                src="/icons/Cuestionario Icon.svg"
                alt="Icono"
                className="w-7 h-7"
              />
              CREAR CUESTIONARIO
            </button>

            <button
              onClick={() => {
                setVerComponente1(false);
                setVerComponente2(false);
                setVerComponente3(false);
                setVerComponente4(true);
              }}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-white 
              ${verComponente4 ? "bg-negro-claro" : "bg-negro"}
              hover:bg-negro-claro md:px-4 md:py-2 text-sm md:text-base`}
            >
              <img
                src="/icons/Tarea Icon.svg"
                alt="Icono"
                className="w-7 h-7"
              />
              CREAR TAREA
            </button>
          </nav>

          {verComponente1 && (
            <div className="p-7 rounded-2xl flex flex-col items-center">
              {/* Botón con estilo personalizado para computadoras */}
              <button
                className="hidden md:block px-4 py-2"
                style={{
                  borderTop: "50px solid gray",
                  borderRight: "250px solid gray",
                  borderBottom: "50px solid gray",
                  borderLeft: "250px solid gray",
                }}
              >
                SELECCIONAR ARCHIVO
              </button>

              {/* Botón con estilo simplificado para dispositivos móviles */}
              <button
                className="block md:hidden px-4 py-2 border border-gray-500"
                style={{
                  borderTop: "50px solid gray",
                  borderRight: "30px solid gray",
                  borderBottom: "50px solid gray",
                  borderLeft: "30px solid gray",
                }}
              >
                SELECCIONAR ARCHIVO
              </button>

              <div className="flex flex-col md:flex-row w-full mt-4">
                <div className="flex flex-col w-full md:w-1/2 p-4">
                  <label className="font-bold mb-2">Título:</label>
                  <input
                    type="text"
                    className="custom-input"
                    placeholder="Añade un título*"
                  />
                </div>

                <div className="flex flex-col w-full md:w-1/2 p-4">
                  <label className="font-bold mb-2">Descripción:</label>
                  <textarea
                    className="custom-input"
                    placeholder="Añade una descripción*"
                  ></textarea>
                </div>
              </div>

              <button className="bg-verde-spotify text-black rounded-full px-2 py-2 mx-2 my-4 w-full md:w-1/2 font-bold">
                PUBLICAR
              </button>
            </div>
          )}

          {verComponente2 && (
            <div className="flex flex-col md:flex-row w-full mt-4">
              <div className="flex flex-col w-full md:w-1/2 p-4">
                <label className="font-bold mb-2">Título del foro:</label>
                <input
                  type="text"
                  className="custom-input"
                  placeholder="Añade un título para el foro*"
                />
                <label className="font-bold mb-2 mt-4">Descripción:</label>
                <input
                  type="text"
                  className="custom-input"
                  placeholder="Añade una descripción*"
                />

                <button
                  className="bg-verde-spotify text-black rounded-full px-2 py-2 mx-4 my-4" // Cambiado de mx-15 a mx-4
                  style={{ fontWeight: "bolder", width: "30vh" }}
                >
                  PUBLICAR
                </button>
              </div>

              <div className="flex flex-col w-full md:w-1/2 p-4">
                <label className="font-bold mb-2">Añade una imagen:</label>
                <div className="p-7 rounded-2xl flex flex-col items-center">
                  {/* Botón con estilo personalizado para computadoras */}
                  <button
                    className="hidden md:block px-4 py-2"
                    style={{
                      borderTop: "50px solid gray",
                      borderRight: "50px solid gray",
                      borderBottom: "50px solid gray",
                      borderLeft: "50px solid gray",
                    }}
                  >
                    SELECCIONAR ARCHIVO
                  </button>

                  {/* Botón con estilo simplificado para dispositivos móviles */}
                  <button
                    className="block md:hidden px-1 py-2 border border-gray-50"
                    style={{
                      borderTop: "50px solid gray",
                      borderRight: "30px solid gray",
                      borderBottom: "50px solid gray",
                      borderLeft: "30px solid gray",
                    }}
                  >
                    SELECCIONAR ARCHIVO
                  </button>
                </div>
              </div>
            </div>
          )}

          {verComponente3 && (
            <div className="relative bg-white p-4 rounded-lg">
              {preguntas.map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row w-full mt-4 border border-red-500 rounded-lg p-4"
                >
                  <div className="flex flex-col w-full md:w-1/2 p-4">
                    <label className="font-bold mb-2">
                      Realiza la pregunta:
                    </label>
                    <input
                      type="text"
                      className="custom-input"
                      placeholder="Realiza la pregunta*"
                    />
                    <br />
                    <label className="font-bold mb-2">Alternativas:</label>
                    <input
                      type="text"
                      className="custom-input mb-2"
                      placeholder="Añade la alternativa*"
                    />

                    <button className="bg-black text-white rounded-full px-1 py-2 mt-2">
                      AÑADIR OTRA ALTERNATIVA
                    </button>

                    {index > 0 && (
                      <button
                        className="bg-rojo-orange text-white rounded-full px-4 py-2 mt-2"
                        onClick={() => handleEliminarPregunta(index)}
                      >
                        ELIMINAR PREGUNTA
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col w-full md:w-1/2 p-4">
                    <label className="font-bold mb-2">Añade una imagen:</label>

                    {/* Botón con estilo personalizado para computadoras */}
                    <button
                      className="hidden md:block px-4 py-2"
                      style={{
                        borderTop: "50px solid gray",
                        borderRight: "50px solid gray",
                        borderBottom: "50px solid gray",
                        borderLeft: "50px solid gray",
                      }}
                    >
                      SELECCIONAR ARCHIVO
                    </button>

                    {/* Botón con estilo simplificado para dispositivos móviles */}
                    <button
                      className="block md:hidden px-1 py-2 border border-gray-50"
                      style={{
                        borderTop: "50px solid gray",
                        borderRight: "30px solid gray",
                        borderBottom: "50px solid gray",
                        borderLeft: "30px solid gray",
                      }}
                    >
                      SELECCIONAR ARCHIVO
                    </button>
                  </div>
                </div>
              ))}
              <button
                className="bg-rojo-orange text-white rounded-full px-4 py-2 mt-4"
                onClick={handleNuevaPregunta}
              >
                REALIZAR OTRA PREGUNTA
              </button>

              <div className="w-full text-center mt-4">
                <button
                  className="bg-verde-spotify text-black rounded-full px-2 py-2 mx-4 my-4" // Cambiado de mx-15 a mx-4
                  style={{ fontWeight: "bolder", width: "30vh" }}
                >
                  PUBLICAR
                </button>
              </div>
            </div>
          )}

          {verComponente4 && (
            <div className="flex flex-col w-full mt-4">
              <div className="flex flex-row flex-wrap w-full">
                <div className="flex flex-col w-full md:w-1/2 p-4">
                  <label className="font-bold mb-2">Título de la tarea:</label>
                  <input
                    type="text"
                    className="custom-input mb-2"
                    placeholder="Añade un título*"
                  />
                  <label className="font-bold mb-2">
                    Añade una descripción:
                  </label>
                  <input
                    type="text"
                    className="custom-input mb-4"
                    placeholder="Añade una descripción*"
                  />
                </div>

                <div className="flex flex-col w-full md:w-1/2 p-2">
                  <label className="font-bold mb-2">Añade un archivo:</label>
                  <div className="p-3 rounded-[2rem] flex flex-col items-center">
                    {/* Botón con estilo personalizado para computadoras */}
                    <button
                      className="hidden md:block px-4 py-2"
                      style={{
                        borderTop: "50px solid gray",
                        borderRight: "50px solid gray",
                        borderBottom: "50px solid gray",
                        borderLeft: "50px solid gray",
                      }}
                    >
                      SELECCIONAR ARCHIVO
                    </button>

                    {/* Botón con estilo simplificado para dispositivos móviles */}
                    <button
                      className="block md:hidden px-1 py-2 border border-gray-50"
                      style={{
                        borderTop: "50px solid gray",
                        borderRight: "30px solid gray",
                        borderBottom: "50px solid gray",
                        borderLeft: "30px solid gray",
                      }}
                    >
                      SELECCIONAR ARCHIVO
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full p-2 md:p-4 mt-2">
                {" "}
                {/* Reducido el margen superior de 4 a 2 */}
                <label className="font-bold mb-2">
                  Seleccione duración de la tarea:
                </label>
                <div className="flex flex-col md:flex-row w-full">
                  <div className="flex flex-col w-full md:w-1/3 p-2 md:p-4">
                    <label className="font-bold mb-2">
                      Fecha y hora de inicio:
                    </label>
                    <input type="datetime-local" className="custom-input" />
                  </div>
                  <div className="flex flex-col w-full md:w-1/3 p-2 md:p-4">
                    <label className="font-bold mb-2">
                      Fecha y hora de cierre:
                    </label>
                    <input type="datetime-local" className="custom-input" />
                  </div>
                  <div className="flex flex-col w-full md:w-1/3 p-2 md:p-4">
                    <button
                      className="bg-verde-spotify text-black rounded-full px-4 py-2 w-full md:w-auto"
                      style={{ fontWeight: "bolder" }}
                    >
                      PUBLICAR
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseData;
