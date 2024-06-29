"use client";
import React, { Component, useState } from "react";

const Asignaciones = () => {
  const formatMinutes = (minutes) => {
    return minutes < 10 ? `0${minutes}` : minutes;
  };

  const hoursAndMinutes = [];
  for (let hour = 8; hour <= 13; hour++) {
    for (let minute = 0; minute < 60; minute += 45) {
      const startHour = `${hour}:${formatMinutes(minute)}`;
      const endHour = `${hour + Math.floor(minute / 45)}:${formatMinutes(
        (minute + 45) % 60
      )}`;
      hoursAndMinutes.push(`${startHour} - ${endHour}`);
    }
  }

  const [porAula, setPorAula] = useState(true);
  const [porProfesor, setPorProfesor] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAddAsignacion = (e) => {
    e.preventDefault();
    setShowModal(true); // Mostrar el modal al hacer clic en "Añadir Asignación"
  };

  const closeModal = () => {
    setShowModal(false); // Función para cerrar el modal
  };

  return (
    <div className="w-full flex flex-col items-start justify-start gap-y-4">
      <h1 className="font-bold titulo-t">Asignaciones</h1>
      <nav className="flex justify-center gap-x-4">
        <button
          onClick={() => {
            setPorAula(true);
            setPorProfesor(false);
          }}
          className={`button-with-loader hover:grayscale-[0.8] ${
            porAula ? "font-extrabold bg-gray-300" : "font-normal"
          }`}
        >
          Por Aula
        </button>

        <button
          onClick={() => {
            setPorAula(false);
            setPorProfesor(true);
          }}
          className={`button-with-loader ${
            porProfesor ? "font-extrabold bg-gray-300" : "font-normal"
          }`}
        >
          Por Profesor
        </button>
      </nav>

      {porAula && (
        <div className="w-full flex flex-col items-start justify-start gap-y-4">
          <form
            className="flex flex-wrap max-w-full items-center gap-x-5 gap-y-4 justify-between"
            onSubmit={handleAddAsignacion} // Manejar el envío del formulario
          >
            <div className="flex items-center gap-x-5 flex-1">
              <label className="font-semibold flex w-auto flex-row items-center gap-x-3 whitespace-nowrap">
                Selecciona un aula:
              </label>
              <select
                name="grado"
                className="bg-verde-spotify text-center outline-none px-3 py-2 rounded-[1rem]"
              >
                <option>GRADO</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <select
                name="seccion"
                className="bg-verde-spotify text-center outline-none px-3 py-2 rounded-[1rem]"
              >
                <option>Sección</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-verde-spotify rounded-lg py-3 px-4 font-semibold flex items-center justify-center gap-x-2"
            >
              Añadir Asignación
            </button>
          </form>

          {/* Modal para confirmar */}
          {showModal && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Añadir asignación</h2>
                <form className="flex flex-col gap-y-4">
                  <label htmlFor="curso">Curso:</label>
                  <select
                    id="curso"
                    name="curso"
                    value="curso"
                    className="border border-gray-300 p-2 rounded-md"
                  >
                    <option value="">Selecciona un curso</option>
                    <option value="Curso 1">Curso 1</option>
                    <option value="Curso 2">Curso 2</option>
                    <option value="Curso 3">Curso 3</option>
                  </select>

                  <label htmlFor="dia">Día:</label>
                  <select
                    id="dia"
                    name="dia"
                    value="dia"
                    className="border border-gray-300 p-2 rounded-md"
                  >
                    <option value="">Selecciona un día</option>
                    <option value="Lunes">Lunes</option>
                    <option value="Martes">Martes</option>
                    <option value="Miércoles">Miércoles</option>
                    <option value="Jueves">Jueves</option>
                    <option value="Viernes">Viernes</option>
                    <option value="Sábado">Sábado</option>
                  </select>

                  <label htmlFor="horaInicio">Hora de inicio:</label>
                  <input
                    type="time"
                    id="horaInicio"
                    name="horaInicio"
                    value="horaInicio"
                    className="border border-gray-300 p-2 rounded-md"
                  />

                  <label htmlFor="cantidadHoras">Cantidad de horas:</label>
                  <select className="border border-gray-300 p-2 rounded-md">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>

                  <div>
                    <label htmlFor="profesorSeleccionado">Profesores:</label>
                    <select
                      id="profesorSeleccionado"
                      name="profesorSeleccionado"
                      value="profesorSeleccionado"
                      className="border border-gray-300 p-2 rounded-md"
                    >
                      <option value="">Selecciona un profesor</option>
                      <option value="profesor1">Profesor 1</option>
                      <option value="profesor2">Profesor 2</option>
                      <option value="profesor3">Profesor 3</option>
                    </select>
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="bg-gray-300 px-4 py-2 rounded-lg font-semibold"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      onClick={closeModal}
                      className="bg-verde-spotify px-4 py-2 rounded-lg text-white font-semibold ml-2"
                    >
                      Aceptar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div
            style={{
              maxWidth: "80vw",
            }}
          >
            <label className="font-semibold flex w-auto flex-row items-center gap-x-3 whitespace-nowrap">
              AULA:
            </label>
          </div>

          {/* Tabla de horarios */}
          <table
            style={{
              borderCollapse: "collapse",
              padding: 0,
              tableLayout: "fixed",
              maxWidth: "100%",
            }}
          >
            <thead className="font-semibold bg-verde-spotify text-black overflow-hidden">
              <tr>
                <th
                  style={{
                    borderTop: "none",
                    borderBottom: "none",
                    padding: "8px",
                    width: "150px",
                    height: "50px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Hora
                </th>
                {[
                  "Lunes",
                  "Martes",
                  "Miércoles",
                  "Jueves",
                  "Viernes",
                  "Sábado",
                ].map((day) => (
                  <th
                    key={day}
                    style={{
                      borderTop: "none",
                      borderBottom: "none",
                      padding: "8px",
                      width: "150px",
                      height: "50px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {hoursAndMinutes.map((time, rowIndex) => (
                <tr key={rowIndex}>
                  <td
                    className="text-center"
                    style={{
                      border: "2px solid rgb(207, 207, 207)",
                      padding: "8px",
                      width: "150px",
                      height: "50px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      borderBottomLeftRadius: "10px",
                    }}
                  >
                    {time}
                  </td>
                  {Array(6)
                    .fill(null)
                    .map((_, colIndex) => (
                      <td
                        key={colIndex}
                        style={{
                          border: "2px solid rgb(207, 207, 207)",
                          padding: "8px",
                          width: "150px",
                          height: "50px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      ></td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {porProfesor && (
        <div className="w-full flex flex-col items-start justify-start gap-y-4">
          <div>
            <form
              className="flex flex-wrap max-w-full items-center gap-x-5 gap-y-4 justify-between"
              onSubmit={handleAddAsignacion}
            >
              <div className="flex items-center gap-x-5 flex-1">
                <label className="font-semibold flex w-auto flex-row items-center gap-x-3 whitespace-nowrap">
                  Selecciona un profesor:
                </label>
                <select
                  name="profesores"
                  className="border-2 border-verde-spotify bg-slate-50 text-center outline-none px-3 py-2 rounded-[1rem]"
                >
                  <option>Selecciona un profesor</option>
                  <option value="profesor1">profesor1</option>
                  <option value="profesor2">profesor2</option>
                  <option value="profesor3">profesor3</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-verde-spotify rounded-lg py-3 px-4 font-semibold flex items-center justify-center gap-x-2"
              >
                Añadir Asignación
              </button>
            </form>

            {/* Modal para confirmar */}
            {showModal && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-lg">
                  <h2 className="text-2xl font-bold mb-4">Añadir asignación</h2>
                  <form className="flex flex-col gap-y-4">
                    <label htmlFor="curso">Curso:</label>
                    <select
                      id="curso"
                      name="curso"
                      value="curso"
                      className="border border-gray-300 p-2 rounded-md"
                    >
                      <option value="">Selecciona un curso</option>
                      <option value="Curso 1">Curso 1</option>
                      <option value="Curso 2">Curso 2</option>
                      <option value="Curso 3">Curso 3</option>
                    </select>

                    <label htmlFor="dia">Día:</label>
                    <select
                      id="dia"
                      name="dia"
                      value="dia"
                      className="border border-gray-300 p-2 rounded-md"
                    >
                      <option value="">Selecciona un día</option>
                      <option value="Lunes">Lunes</option>
                      <option value="Martes">Martes</option>
                      <option value="Miércoles">Miércoles</option>
                      <option value="Jueves">Jueves</option>
                      <option value="Viernes">Viernes</option>
                      <option value="Sábado">Sábado</option>
                    </select>

                    <label htmlFor="horaInicio">Hora de inicio:</label>
                    <input
                      type="time"
                      id="horaInicio"
                      name="horaInicio"
                      value="horaInicio"
                      className="border border-gray-300 p-2 rounded-md"
                    />

                    <label htmlFor="cantidadHoras">Cantidad de horas:</label>
                    <select className="border border-gray-300 p-2 rounded-md">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>

                    <div>
                      <label htmlFor="profesorSeleccionado">Profesores:</label>
                      <select
                        id="profesorSeleccionado"
                        name="profesorSeleccionado"
                        value="profesorSeleccionado"
                        className="border border-gray-300 p-2 rounded-md"
                      >
                        <option value="">Selecciona un profesor</option>
                        <option value="profesor1">Profesor 1</option>
                        <option value="profesor2">Profesor 2</option>
                        <option value="profesor3">Profesor 3</option>
                      </select>
                    </div>

                    <div className="flex justify-end mt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="bg-gray-300 px-4 py-2 rounded-lg font-semibold"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        onClick={closeModal}
                        className="bg-verde-spotify px-4 py-2 rounded-lg text-white font-semibold ml-2"
                      >
                        Aceptar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            <div
              style={{
                maxWidth: "80vw",
              }}
            >
              <label className="font-semibold flex w-auto flex-row items-center gap-x-3 whitespace-nowrap">
                Profesor:
              </label>
            </div>
          </div>
          <table
            style={{
              borderCollapse: "collapse",
              padding: 0,
              tableLayout: "fixed",
              maxWidth: "100%",
            }}
          >
            <thead className="font-semibold bg-verde-spotify text-black overflow-hidden">
              <tr>
                <th
                  style={{
                    borderTop: "none",
                    borderBottom: "none",
                    padding: "8px",
                    width: "150px",
                    height: "50px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Hora
                </th>
                {[
                  "Lunes",
                  "Martes",
                  "Miércoles",
                  "Jueves",
                  "Viernes",
                  "Sábado",
                ].map((day) => (
                  <th
                    key={day}
                    style={{
                      borderTop: "none",
                      borderBottom: "none",
                      padding: "8px",
                      width: "150px",
                      height: "50px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {hoursAndMinutes.map((time, rowIndex) => (
                <tr key={rowIndex}>
                  <td
                    className="text-center"
                    style={{
                      border: "2px solid rgb(207, 207, 207)",
                      padding: "8px",
                      width: "150px",
                      height: "50px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      borderBottomLeftRadius: "10px",
                    }}
                  >
                    {time}
                  </td>
                  {Array(6)
                    .fill(null)
                    .map((_, colIndex) => (
                      <td
                        key={colIndex}
                        style={{
                          border: "2px solid rgb(207, 207, 207)",
                          padding: "8px",
                          width: "150px",
                          height: "50px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      ></td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
           
        </div>
      )}

      {/* Lógica para mostrar porProfesor */}
      {/* ... */}
    </div>
  );
};

export default Asignaciones;
