import { Asignacion, diasSemana } from "@/interfaces/Asignation";
import { HorarioCursoAula } from "@/interfaces/Horario";
import { relativeDistanceAmongElements } from "@/lib/helpers/functions/relativeDistanceAmongElements";
import React, { MutableRefObject, useEffect, useState } from "react";

const HorarioCursoAulaComponent = ({
  horarioCursoAula: {
    Nombre_Profesor,
    Apellido_Profesor,
    Nombre_Curso,
    Cant_Horas_Academicas,
    Id_Hora_Academica,
    Dia_Semana,
    Grado,
    Seccion,
  },
  celdas,
  asignationsTable,
}: {
  horarioCursoAula: HorarioCursoAula;
  celdas: NodeListOf<Element>;
  asignationsTable: MutableRefObject<HTMLTableElement | undefined>;
  forTeacher?: boolean;
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
          {Nombre_Profesor && (
            <div className="text-center flex h-max -overflow-hidden text-ellipsis -border-2 leading-5 flex-wrap">
              Prof. {Nombre_Profesor} {Apellido_Profesor}
            </div>
          )}

          <i className="text-center">{Nombre_Curso}</i>

          <i className="text-center">
            {Grado}
            {Seccion}
          </i>
        </div>
      )}
    </>
  );
};

export default HorarioCursoAulaComponent;
