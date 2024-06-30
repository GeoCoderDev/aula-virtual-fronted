"use client";
import Link from "next/link";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const CrearCuestionario = () => {
  const [mostrarComponentes, setMostrarComponentes] = useState(false);

  const [preguntas, setPreguntas] = useState([
    { tipo: "multiple", pregunta: "", opciones: [{ texto: "Opción 1", marcado: false, correcta: false }] },
  ]);

  const handleCrearClick = () => {
    setMostrarComponentes(true);
  };

  const handleImagenSeleccionada = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[index].imagen = event.target.result;
        setPreguntas(nuevasPreguntas);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEliminarImagen = (index) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[index].imagen = null;
    setPreguntas(nuevasPreguntas);
  };

  const handleTipoChange = (index, tipo) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[index].tipo = tipo;
    // Limpiar opciones y puntaje cuando se cambia el tipo
    if (tipo === "libre") {
      nuevasPreguntas[index].opciones = [];
    }
    setPreguntas(nuevasPreguntas);
  };

  const handlePreguntaChange = (index, pregunta) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[index].pregunta = pregunta;
    setPreguntas(nuevasPreguntas);
  };

  const handleOpcionChange = (preguntaIndex, opcionIndex, texto) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[preguntaIndex].opciones[opcionIndex].texto = texto;
    setPreguntas(nuevasPreguntas);
  };

  const handleMarcarOpcion = (preguntaIndex, opcionIndex) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[preguntaIndex].opciones[opcionIndex].marcado = !nuevasPreguntas[preguntaIndex].opciones[opcionIndex].marcado;
    setPreguntas(nuevasPreguntas);
  };

  const handleMarcarCorrecta = (preguntaIndex, opcionIndex) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[preguntaIndex].opciones[opcionIndex].correcta = !nuevasPreguntas[preguntaIndex].opciones[opcionIndex].correcta;
    setPreguntas(nuevasPreguntas);
  };

  const handleAñadirPregunta = () => {
    setPreguntas([
      ...preguntas,
      { tipo: "multiple", pregunta: "", opciones: [{ texto: "Opción 1", marcado: false, correcta: false }] },
    ]);
  };

  const handleEliminarPregunta = (index) => {
    const nuevasPreguntas = preguntas.filter((_, i) => i !== index);
    setPreguntas(nuevasPreguntas);
  };

  const handleAñadirOpcion = (index) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[index].opciones.push({ texto: `Opción ${preguntas[index].opciones.length + 1}`, marcado: false, correcta: false });
    setPreguntas(nuevasPreguntas);
  };

  const handleDuplicarPregunta = (index) => {
    const nuevasPreguntas = [...preguntas];
    const preguntaDuplicada = JSON.parse(JSON.stringify(nuevasPreguntas[index])); // Copia profunda de la pregunta
    nuevasPreguntas.splice(index + 1, 0, preguntaDuplicada); // Insertar la copia después de la pregunta original
    setPreguntas(nuevasPreguntas);
  };

  return (
    <div className="flex flex-col gap-y-1 w-full">
      <div className="fixed left-10% w-full max-w-[1000px] bg-white z-10 p-4 shadow-md">
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
      </div>
      {/* Aquí va el resto de tu contenido */}

      <hr />
      <br />
      <br />
      <br />
      <br />
      <br />
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

          {preguntas.map((pregunta, index) => (
            <div key={index} className="border-2 border-gray-300 p-8 rounded-lg mt-4">
              <div className="flex flex-col gap-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="rounded-full bg-verde-spotify h-6 w-6 flex items-center justify-center text-gray-600 font-bold">
                      {index + 1}
                    </div>
                    <label htmlFor={`pregunta-${index}`} className="ml-2">
                      Pregunta:
                    </label>
                  </div>
                  <div className="custom-select">
                    <select
                      value={pregunta.tipo}
                      onChange={(e) => handleTipoChange(index, e.target.value)}
                    >
                      <option value="multiple">Opción Múltiple</option>
                      <option value="unica">Opción Única</option>
                      <option value="libre">Respuesta Libre</option>
                    </select>
                    <FaChevronDown />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    id={`pregunta-${index}`}
                    className="custom-input2 pregunta-input"
                    value={pregunta.pregunta}
                    onChange={(e) => handlePreguntaChange(index, e.target.value)}
                  />

                  <label className="bg-black text-white rounded-md px-10 py-2 ml-2 cursor-pointer hover:bg-gray-800 mt-2 flex items-center">
                    <span style={{ marginRight: "10px" }}>Añadir Imagen</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleImagenSeleccionada(e, index)}
                    />
                    <img
                      src="/icons/image.svg"
                      alt="Imagen Ejemplo"
                      className="w-8 h-8"
                    />
                  </label>
                </div>

                {pregunta.imagen && (
                  <div className="flex flex-col items-center mt-2">
                    <img
                      src={pregunta.imagen}
                      alt="Imagen seleccionada"
                      className="max-w-full h-auto rounded-md"
                      style={{ maxWidth: "300px", maxHeight: "300px" }}
                    />
                    <button
                      className="bg-red-500 text-white rounded-md px-4 py-2 mt-2 hover:bg-red-600"
                      onClick={() => handleEliminarImagen(index)}
                    >
                      Eliminar Imagen
                    </button>
                  </div>
                )}

                {pregunta.tipo === "libre" && (
                  <textarea
                    placeholder="Escribe tu respuesta aquí"
                    className="custom-input2 mb-4"
                  ></textarea>
                )}

                {pregunta.tipo !== "libre" && (
                  <div>
                    <label>Puntaje:</label>
                    <input
                      type="number"
                      className="custom-input2 mb-4"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-y-2">
                  {pregunta.tipo === "multiple" && (
                    <>
                      {pregunta.opciones.map((opcion, i) => (
                        <div key={i} className="flex items-center gap-x-2">
                          <input
                            type="checkbox"
                            checked={opcion.marcado}
                            onChange={() => handleMarcarOpcion(index, i)}
                          />
                          <input
                            type="text"
                            value={opcion.texto}
                            onChange={(e) => handleOpcionChange(index, i, e.target.value)}
                            className="ml-2 opcion-input"
                          />
                          <div className="slidecontainer">
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="1"
                              className="slider"
                              id={`slider-${index}-${i}`}
                              onClick={() => handleMarcarCorrecta(index, i)}
                            />
                          </div>
                        </div>
                      ))}
                      <button
                        className="text-blue-500 mt-2 text-left flex items-center gap-2"
                        onClick={() => handleAñadirOpcion(index)}
                      >
                        <img
                          src="/icons/option_mas.svg"
                          alt="Imagen Ejemplo"
                          className="w-8 h-8"
                        />
                        <span>Añadir opción</span>
                      </button>
                    </>
                  )}
                  {pregunta.tipo === "unica" && (
                    <>
                      {pregunta.opciones.map((opcion, i) => (
                        <div key={i} className="flex items-center gap-x-2">
                          <input
                            type="radio"
                            name={`pregunta-${index}`}
                            checked={opcion.marcado}
                            onChange={() => handleMarcarOpcion(index, i)}
                          />
                          <input
                            type="text"
                            value={opcion.texto}
                            onChange={(e) => handleOpcionChange(index, i, e.target.value)}
                            className="ml-2 opcion-input"
                          />
                          <div className="slidecontainer">
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="1"
                              className="slider"
                              id={`slider-${index}-${i}`}
                              onClick={() => handleMarcarCorrecta(index, i)}
                            />
                          </div>
                        </div>
                      ))}
                      <button
                        className="text-blue-500 mt-2 text-left flex items-center gap-2"
                        onClick={() => handleAñadirOpcion(index)}
                      >
                        <img
                          src="/icons/option_mas.svg"
                          alt="Imagen Ejemplo"
                          className="w-8 h-8"
                        />
                        <span>Añadir opción</span>
                      </button>
                    </>
                  )}
                </div>

                <div className="flex gap-2 mt-2">
                  <button
                    className="text-blue-500"
                    onClick={() => handleDuplicarPregunta(index)}
                  >
                    Duplicar Pregunta
                  </button>
                  {index > 0 && (
                    <button
                      className="text-red-500"
                      onClick={() => handleEliminarPregunta(index)}
                    >
                      Eliminar Pregunta
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          <button className="text-blue-500 mt-4" onClick={handleAñadirPregunta}>
            Añadir Otra Pregunta
          </button>
        </>
      )}
      <style jsx>{`
        .custom-input2 {
          border: 1px solid #ccc;
          border-radius: 0.5rem;
          padding: 0.5rem;
          font-size: 1rem;
          width: 100%;
        }
        .custom-select {
          border: 1px solid #ccc;
          border-radius: 0.5rem;
          padding: 0.5rem;
          position: relative;
          display: flex;
          align-items: center;
          background-color: white;
        }
        .custom-select select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background: transparent;
          border: none;
          outline: none;
          font-size: 1rem;
          flex-grow: 1;
        }
        .custom-select svg {
          margin-left: auto;
        }
        .custom-select:after {
          content: "";
          position: absolute;
          right: 0.5rem;
          pointer-events: none;
        }
        .pregunta-input,
        .opcion-input {
          position: relative;
          border-bottom: 1px dotted #ccc; /* Línea decorativa */
        }
        .pregunta-input:focus,
        .opcion-input:focus {
          border-bottom: 1px solid #000; /* Cambiar el estilo cuando está enfocado */
        }
        .slidecontainer {
          width: 100%;
        }
        .slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 3px; /* Ajustar altura del slider */
          border-radius: 5px;
          background: linear-gradient(to right, #ff0000 0%, #ff0000 50%, #00ff00 50%, #00ff00 100%); /* Colores rojo a la izquierda y verde a la derecha */
          outline: none;
          opacity: 0.7;
          transition: opacity 0.15s ease-in-out;
          cursor: pointer;
        }

        .slider:hover {
          opacity: 1;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 10px; /* Ajustar tamaño del botón deslizable */
          height: 10px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default CrearCuestionario;
