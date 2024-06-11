import React from "react";

const Asignaciones = () => {
  const formatMinutes = (minutes: number) => {
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

  return (
    <div className="w-full flex flex-col items-start justify-start -border-2 gap-y-4">
      {/* Contenedor externo */}

      <h1 className="section-tittle">Asignaciones</h1>

      <div>
        <form className="flex flex-wrap max-w-full items-center gap-x-5 gap-y-4 justify-between">
          <div className="flex items-center gap-x-5 ">
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
              disabled
              className="bg-verde-spotify text-center outline-none px-3 py-2 rounded-[1rem]"
            >
              <option>Seccion</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-verde-spotify rounded-lg py-3 px-4 font-semibold flex items-center justify-center gap-x-2"
          >
            Añadir Asignación
          </button>
        </form>
        <div
          style={{
            maxWidth: "80vw",
          }}
        >
          <label className="font-semibold flex w-auto flex-row items-center gap-x-3 whitespace-nowrap">
            AULA:
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
        <thead className="font-semibold bg-verde-spotify text-black -border-2 overflow-hidden">
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
                .fill(0, 7)
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
  );
};

export default Asignaciones;
