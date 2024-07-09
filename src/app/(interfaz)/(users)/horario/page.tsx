"use client";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import Loader from "@/components/shared/Loader";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";
import { ErrorAPI } from "@/interfaces/API";
import { HorarioResponse } from "@/interfaces/Horario";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { diasSemana } from "@/interfaces/Asignation";
import { formatterHoursAndMinutes } from "@/lib/helpers/functions/formatterHoursAndMinutes";
import HorarioCursoAulaComponent from "@/components/shared/HorarioCursoAulaComponent";

const HorarioEstudiante = () => {

  const asignationsTable = useRef<HTMLTableElement>();

  const [horario, setHorario] = useState<HorarioResponse>();
  
  const [celdas, setCeldas] = useState<NodeListOf<Element> | null>(null);

  const {
    error,
    setError,
    isSomethingLoading,
    setIsSomethingLoading,
    fetchAPI,
  } = useRequestAPIFeatures();

  //Para acomodar con las celdas cuando se cambia el tamaño de la ventana
  const actualizarCeldas = () => {
    const celdasHTML = document.querySelectorAll(
      "#tabla-asignaciones-por-aula td"
    );
    setCeldas(() => celdasHTML);
  };

  useEffect(() => {
    window.addEventListener("resize", actualizarCeldas);

    return () => window.removeEventListener("resize", actualizarCeldas);
  }, []);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const fetchCancelable = fetchAPI(`/api/mySchedule`, "GET");
        if (fetchCancelable === undefined) return;
        setIsSomethingLoading(true);

        const res = await fetchCancelable?.fetch();

        if (!res.ok) {
          const { message }: ErrorAPI = await res.json();
          if (!message) throw new Error();
          setError(() => ({ message }));
        } else {
          const horarioResponse: HorarioResponse = await res.json();

          setHorario(() => horarioResponse);
          setTimeout(() => {
            actualizarCeldas();
          }, 200);
        }

        setIsSomethingLoading(false);
      } catch (e) {
        setError(() => ({
          message: "No se pudo obtener el horario",
        }));

        setIsSomethingLoading(false);
      }
    };

    fetchSchedule();
  }, [fetchAPI]);

  return (
    <div className="w-full -border-2 flex flex-col">
      {error && (
        <ErrorMessage
          message={
            error.message ?? "No se pudieron obtener los datos del estudiante"
          }
        />
      )}

      {isSomethingLoading && (
        <Loader
          color="black"
          className="self-center mt-6"
          durationSegundos={1}
          backgroundSize="12px"
          width="40px"
        />
      )}

      {horario && (
        <>
          <div className="px-4 py-3 rounded-[0.5rem] bg-verde-spotify font-bold flex flex-col flex-wrap break-words justify-between items-center mb-4">
            {horario.isTeacher
              ? `HORARIO - DOCENTE: ${horario.Nombre_Profesor} ${horario.Apellido_Profesor}`
              : `HORARIO - AULA ${horario.Grado}${horario.Seccion}`}
          </div>

          <div
            className="max-w-[80vw] overflow-auto relative max-h-[400px] w-max "
            style={{ overflowX: "auto", margin: "0", padding: "0" }}
          >
            <table
              id="tabla-asignaciones-por-aula"
              ref={asignationsTable as LegacyRef<HTMLTableElement>}
              className=" border-collapse table-fixed p-0 max-w-full relative"
            >
              <thead className="rounded-[1rem] sticky top-0 z-[10] font-semibold bg-verde-spotify text-black overflow-hidden">
                <tr>
                  <th
                    style={{
                      borderTopLeftRadius: "0.5rem",
                    }}
                    className="[border-top:none] [border-bottom:none] p-[0.5rem] min-w-[9.2rem] h-[3rem] whitespace-nowrap overflow-hidden text-ellipsis bg-[#cfcfcf]"
                  >
                    Hora
                  </th>
                  {diasSemana.map((day, index) => (
                    <th
                      className="[border-top:none] [border-bottom:none] p-[0.5rem] min-w-[9.2rem] h-[3rem] whitespace-nowrap overflow-hidden text-ellipsis bg-[#cfcfcf]"
                      style={{
                        borderTopRightRadius:
                          index === diasSemana.length - 1 ? "0.5rem" : "",
                      }}
                      key={day}
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="">
                {formatterHoursAndMinutes(horario.Horas_Academicas).map(
                  (time, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="relative border-2 border-[rgb(207,207,207)] text-center min-w-[9.2rem] h-[3rem] p-[0.5rem] text-ellipsis overflow-hidden [border-bottom-left-radius:10px] whitespace-nowrap">
                        {time}
                      </td>
                      {Array(6)
                        .fill(null)
                        .map((_, colIndex) => (
                          <td
                            key={colIndex}
                            className="relative border-2 border-[rgb(207,207,207)] text-center min-w-[9.2rem] h-[3rem] p-[0.5rem] text-ellipsis overflow-hidden [border-bottom-left-radius:10px] whitespace-nowrap"
                          ></td>
                        ))}
                    </tr>
                  )
                )}

                {celdas &&
                  celdas?.length !== 0 &&
                  horario.Horario.map((horarioCursoAula, index) => (
                    <HorarioCursoAulaComponent
                      index={index}
                      asignationsTable={asignationsTable}
                      celdas={celdas}
                      horarioCursoAula={horarioCursoAula}
                      key={index}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default HorarioEstudiante;
