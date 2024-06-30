import useBatchAPI from "@/app/hooks/useBatchAPI";
import AulaSelector from "@/components/inputs/AulaSelector";
import Loader from "@/components/shared/Loader";
import AddAsignationByAula from "@/components/shared/modals/Asignaciones/AddAsignationByAula";
import {
  Asignacion,
  AsignacionResponse,
  diasSemana,
  HoraAcademica,
} from "@/interfaces/Asignation";
import { Aula } from "@/interfaces/Aula";
import React, {
  Dispatch,
  LegacyRef,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import AsignacionComponent from "./Asignacion";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";

const formatTime = (time: string) => {
  return time.substring(0, 5); // Remove seconds
};

const generateHoursAndMinutes = (horasAcademicas: HoraAcademica[]) => {
  const hoursAndMinutes: string[] = [];
  for (let i = 0; i < horasAcademicas.length; i++) {
    const startHour = formatTime(horasAcademicas[i].Valor);
    const endHour =
      i < horasAcademicas.length - 1
        ? formatTime(horasAcademicas[i + 1].Valor)
        : null;
    if (endHour) {
      hoursAndMinutes.push(`${startHour} - ${endHour}`);
    }
  }
  return hoursAndMinutes;
};

const limitAsignationsRequired = 200;

interface SearchTermsAula extends Aula {}

const searchTermsInitial: SearchTermsAula = {
  Grado: "",
  Seccion: "",
};

const AsignationsByAula = () => {
  const [viewAddAsignationByAulaModal, setViewAddAsignationByAulaModal] =
    useState(false);

  const asignationsTable = useRef<HTMLTableElement>();

  const selectGrado = useRef<HTMLSelectElement>();
  const selectSeccion = useRef<HTMLSelectElement>();

  const [searchTerms, setSearchTerms] = useState(searchTermsInitial);

  const { isLoading, error, otherProperties } = useBatchAPI<AsignacionResponse>(
    "/api/asignations/byClassroom",
    limitAsignationsRequired,
    0,
    searchTerms as any,
    [selectGrado, selectSeccion],
    "GET",
    null,
    undefined,
    ["Asignaciones", "Horas_Academicas"]
  );

  const hoursAndMinutes = otherProperties["Horas_Academicas"]
    ? generateHoursAndMinutes(otherProperties["Horas_Academicas"])
    : [];

  const [celdas, setCeldas] = useState<NodeListOf<Element> | null>(null);

  const asignaciones: Asignacion[] = otherProperties["Asignaciones"] ?? [];

  useEffect(() => {
    //Para acomodar con las celdas cuando se cambia el tamaño de la ventana
    const actualizarCeldas = () => {
      const celdasHTML = document.querySelectorAll(
        "#tabla-asignaciones-por-aula td"
      );
      setCeldas(() => celdasHTML);
    };

    window.addEventListener("resize", actualizarCeldas);

    return () => window.removeEventListener("resize", actualizarCeldas);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (
        !otherProperties["Asignaciones"] ||
        otherProperties["Asignaciones"].length === 0
      )
        return;

      const celdasHTML = document.querySelectorAll(
        "#tabla-asignaciones-por-aula td"
      );

      setCeldas(() => celdasHTML);
    }, 200);
  }, [searchTerms, otherProperties["Asignaciones"]]);

  return (
    <>
      <div className="w-full flex flex-col items-start justify-start gap-y-4">
        <div className="flex flex-wrap max-w-full items-center w-full gap-x-5 gap-y-4 ">
          <div className="flex items-center gap-x-5 flex-1">
            <label className="font-semibold flex w-auto flex-row items-center gap-x-3 whitespace-nowrap">
              Selecciona un aula:
            </label>
            <AulaSelector
              tipo="search"
              selectGrado={selectGrado}
              searchTerms={searchTerms}
              setSearchTerms={setSearchTerms as Dispatch<SetStateAction<Aula>>}
              selectSeccion={selectSeccion}
            />
          </div>
          <button
            onClick={() => {
              setViewAddAsignationByAulaModal(true);
            }}
            className="bg-verde-spotify rounded-lg py-3 px-4 font-semibold flex items-center justify-center gap-x-2"
          >
            Añadir Asignación
          </button>
        </div>

        {otherProperties["Horas_Academicas"] &&
        otherProperties["Asignaciones"] ? (
          <>
            {!error && !isLoading && (
              <>
                <label className="font-semibold flex w-auto flex-row items-center gap-x-3 whitespace-nowrap text-[1.5rem]">
                  AULA: {searchTerms.Grado}
                  {searchTerms.Seccion}
                </label>
                <div
                  className="max-w-[80vw] overflow-auto relative max-h-[300px] w-max "
                  style={{ overflowX: "auto", margin: "0", padding: "0" }}
                >
                  <table
                    id="tabla-asignaciones-por-aula"
                    ref={asignationsTable as LegacyRef<HTMLTableElement>}
                    className=" border-collapse table-fixed p-0 max-w-full relative"
                  >
                    <thead className="rounded-[1rem] sticky top-0 z-[10] font-semibold bg-verde-spotify text-black overflow-hidden">
                      <tr>
                        <th className="[border-top:none] [border-bottom:none] p-[0.5rem] min-w-[9.2rem] h-[3rem] whitespace-nowrap overflow-hidden text-ellipsis">
                          Hora
                        </th>
                        {diasSemana.map((day) => (
                          <th
                            className="[border-top:none] [border-bottom:none] p-[0.5rem] min-w-[9.2rem] h-[3rem] whitespace-nowrap overflow-hidden text-ellipsis"
                            key={day}
                          >
                            {day}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody className="">
                      {hoursAndMinutes.map((time, rowIndex) => (
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
                      ))}

                      {celdas &&
                        celdas?.length !== 0 &&
                        asignaciones.map((asignacion, index) => (
                          <AsignacionComponent
                            asignationsTable={asignationsTable}
                            celdas={celdas}
                            asignacion={asignacion}
                            key={index}
                          />
                        ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full -border-2 flex flex-col items-center justify-center">
            {error && <ErrorMessage message={error.message} />}
            { isLoading && searchTerms.Seccion !== "" ? (
              <Loader
                color="black"
                durationSegundos={1}
                backgroundSize="12px"
                width="40px"
                className="mt-4"
              />
            ) : (
              <span className="justify-self-start self-start -border-black -border-2">
                Aun no has seleccionado un Aula
              </span>
            )}
          </div>
        )}
      </div>

      {viewAddAsignationByAulaModal && (
        <AddAsignationByAula
          eliminateModal={() => {
            setViewAddAsignationByAulaModal(false);
          }}
        />
      )}
    </>
  );
};

export default AsignationsByAula;
