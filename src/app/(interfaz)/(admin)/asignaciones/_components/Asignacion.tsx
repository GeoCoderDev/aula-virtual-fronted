import { Asignacion, diasSemana } from "@/interfaces/Asignation";
import { relativeDistanceAmongElements } from "@/lib/helpers/functions/relativeDistanceAmongElements";
import React, { MutableRefObject, useEffect, useState } from "react";

const AsignacionComponent = ({
  asignacion: {
    Nombre_Profesor,
    Apellido_Profesor,
    Nombre_Curso,
    Cant_Horas_Academicas,
    Id_Hora_Academica,
    Dia_Semana,
  },
  celdas,
  asignationsTable,
}: {
  asignacion: Asignacion;
  celdas: NodeListOf<Element>;
  asignationsTable: MutableRefObject<HTMLTableElement | undefined>;
}) => {
  const [celdaInicio, setCeldaInicio] = useState<Node>();
  const [celdaFinal, setCeldaFinal] = useState<Node>();

  useEffect(() => {
    const indiceDiaSemana = diasSemana.indexOf(Dia_Semana);

    setCeldaInicio(
      () => celdas[(Id_Hora_Academica - 1) * 7 + indiceDiaSemana + 1]
    );
    setCeldaFinal(
      () =>
        celdas[
          (Id_Hora_Academica + Cant_Horas_Academicas - 2) * 7 +
            indiceDiaSemana +
            1
        ]
    );
  }, []);

  useEffect(() => {
    if (!(celdaInicio && celdaFinal && asignationsTable.current))
      return console.log("ERR");
    console.log({
      top: `${
        relativeDistanceAmongElements(
          asignationsTable.current,
          celdaInicio as HTMLElement
        ).distanciaVerticalPX
      }px`,
      left: `${
        relativeDistanceAmongElements(
          asignationsTable.current,
          celdaInicio as HTMLElement
        ).distanciaHorizontalPX
      }px`,
      width: parseFloat(getComputedStyle(celdaInicio as Element).width) + "px",
      height:
        parseFloat(getComputedStyle(celdaInicio as Element).height) *
          Cant_Horas_Academicas +
        "px",
    });
  }, [celdaFinal]);

  return (
    <>
      {celdaInicio && celdaFinal && asignationsTable.current && (
        <div
          style={{
            top: `${
              relativeDistanceAmongElements(
                asignationsTable.current,
                celdaInicio as HTMLElement
              ).distanciaVerticalPX
            }px`,
            left: `${
              relativeDistanceAmongElements(
                asignationsTable.current,
                celdaInicio as HTMLElement
              ).distanciaHorizontalPX
            }px`,
            width:
              parseFloat(getComputedStyle(celdaInicio as Element).width) + "px",
            height:
              parseFloat(getComputedStyle(celdaInicio as Element).height) *
                Cant_Horas_Academicas +
              "px",
          }}
          draggable
          className="absolute flex flex-col bg-[#82ff6cf1] backdrop-blur-[30] items-center justify-center gap-y-2 p-2"
        >
          <span className="text-center h-max-[2rem] overflow-hidden text-ellipsis ">
            Prof. {Nombre_Profesor} {Apellido_Profesor}
          </span>
          <i className="text-center">{Nombre_Curso}</i>
        </div>
      )}
    </>
  );
};

export default AsignacionComponent;
