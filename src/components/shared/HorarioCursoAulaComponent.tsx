import { Asignacion, diasSemana } from "@/interfaces/Asignation";
import { HorarioCursoAula } from "@/interfaces/Horario";
import { relativeDistanceAmongElements } from "@/lib/helpers/functions/relativeDistanceAmongElements";
import { useDelegacionEventos } from "@/lib/utils/delegacionDeEventos";
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
  withOptions = false,
  Id_Asignacion,
  index,
}: {
  horarioCursoAula: HorarioCursoAula;
  celdas: NodeListOf<Element>;
  asignationsTable: MutableRefObject<HTMLTableElement | undefined>;
  index: number;
  withOptions?: boolean;
  Id_Asignacion?: number;
}) => {
  const [celdaInicio, setCeldaInicio] = useState<Node>();
  const [celdaFinal, setCeldaFinal] = useState<Node>();
  const [options, setOptions] = useState(false);

  const CLASE_LISTA_OPCIONES = `asignation-options-${index}`;

  const { delegarEvento, eliminarEvento } = useDelegacionEventos();

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
    if (!withOptions) return;

    const eventId = delegarEvento?.(
      "click",
      `.${CLASE_LISTA_OPCIONES}, .${CLASE_LISTA_OPCIONES} *`,
      (e) => {
        setOptions(false);
      },
      true
    );

    return () => eliminarEvento?.("click", eventId!);
  }, [delegarEvento]);

  return (
    <>
      {celdaInicio && celdaFinal && asignationsTable.current && (
        <div
          onClick={() => {
            setOptions((prev) => !prev);
          }}
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
          className={`${CLASE_LISTA_OPCIONES} absolute flex flex-col bg-[#82ff6cf1] backdrop-blur-[30] items-center justify-center p-2 overflow-visible`}
        >
          <div className="flex flex-col justify-center gap-y-2 relative">
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

            {withOptions && options && (
              <ul
                style={{ boxShadow: "0 0 6px 3px #00000050" }}
                className=" absolute bg-white w-[5rem] flex flex-col justify-center items-center gap-2 text-[0.8rem] rounded-[0.5rem] -h-[4rem] translate-x-full"
              >
                <li className="hover:font-semibold cursor-pointer border-b-[1px] w-[75%] text-center p-2 pb-1 border-[#ccc]">
                  Editar
                </li>

                <li className="hover:font-semibold cursor-pointer w-[75%] text-center p-2 pt-1">
                  Eliminar
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HorarioCursoAulaComponent;
