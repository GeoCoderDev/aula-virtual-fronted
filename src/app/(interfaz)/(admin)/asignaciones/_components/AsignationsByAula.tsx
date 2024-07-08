import useBatchAPI from "@/app/hooks/useBatchAPI";
import AulaSelector from "@/components/inputs/AulaSelector";
import Loader from "@/components/shared/Loader";
import AddAsignationByAula from "@/components/shared/modals/Asignaciones/AddAsignationByAula";
import {
  Asignacion,
  AsignacionResponse,
  diasSemana,
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
import AsignacionComponent from "./AsignacionComponent";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";
import { formatterHoursAndMinutes } from "@/lib/helpers/functions/formatterHoursAndMinutes";

// Límite de asignaciones requeridas
const limitAsignationsRequired = 200;

// Interfaz extendida de Aula para términos de búsqueda
interface SearchTermsAula extends Aula {}

// Estado inicial de los términos de búsqueda
const searchTermsInitial: SearchTermsAula = {
  Grado: "",
  Seccion: "",
};

// Componente principal de Asignaciones por Aula
const AsignationsByAula = () => {
  // Estado para manejar la visibilidad del modal de añadir asignación
  const [viewAddAsignationByAulaModal, setViewAddAsignationByAulaModal] =
    useState(false);

  // Referencia a la tabla de asignaciones
  const asignationsTable = useRef<HTMLTableElement>();

  // Referencias a los selectores de Grado y Sección
  const selectGrado = useRef<HTMLSelectElement>();
  const selectSeccion = useRef<HTMLSelectElement>();

  // Estado para manejar los términos de búsqueda
  const [searchTerms, setSearchTerms] = useState(searchTermsInitial);

  // Hook personalizado para manejar la API
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

  // Formatear las horas y minutos
  const hoursAndMinutes = otherProperties["Horas_Academicas"]
    ? formatterHoursAndMinutes(otherProperties["Horas_Academicas"])
    : [];

  // Estado para manejar las celdas de la tabla
  const [celdas, setCeldas] = useState<NodeListOf<Element> | null>(null);

  // useEffect para actualizar las celdas al cambiar el tamaño de la ventana
  useEffect(() => {
    const actualizarCeldas = () => {
      const celdasHTML = document.querySelectorAll(
        "#tabla-asignaciones-por-aula td"
      );
      setCeldas(() => celdasHTML);
    };

    window.addEventListener("resize", actualizarCeldas);

    return () => window.removeEventListener("resize", actualizarCeldas);
  }, []);

  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);

  useEffect(() => {
    // Asignaciones obtenidas de la API

    setAsignaciones(() => otherProperties["Asignaciones"] ?? []);
  }, [otherProperties]);

  // useEffect para actualizar las celdas al cambiar los términos de búsqueda o las asignaciones
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
  }, [searchTerms, otherProperties]);

  const addAsignacionInFrontend = (asignacion: Asignacion) => {
    setAsignaciones(() => [...asignaciones, asignacion]);
  };

  return (
    <>
      <div className="w-full flex flex-col items-start justify-start gap-y-4">
        <div className="flex flex-wrap max-w-full items-center w-max gap-x-5 gap-y-4 ">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-y-4 sm:gap-x-5 flex-1 w-full sm:w-auto">
            <label className="font-semibold flex w-auto flex-row items-center gap-x-3 whitespace-nowrap mb-2 sm:mb-0">
              Selecciona un aula:
            </label>
            <div className="flex flex-row gap-4 w-full sm:w-auto">
              <AulaSelector
                tipo="search"
                selectGrado={selectGrado}
                searchTerms={searchTerms}
                setSearchTerms={
                  setSearchTerms as Dispatch<SetStateAction<Aula>>
                }
                selectSeccion={selectSeccion}
                className="flex flex-row gap-4 w-full sm:w-auto"
              />
            </div>
          </div>
          <button
            onClick={() => {
              setViewAddAsignationByAulaModal(true);
            }}
            disabled={
              isLoading ||
              !otherProperties["Horas_Academicas"] ||
              !otherProperties["Asignaciones"]
            }
            className="bg-verde-spotify rounded-lg py-3 px-4 font-semibold flex items-center justify-center gap-x-2 disabled:grayscale-[0.5]"
          >
            Añadir Asignación
          </button>
        </div>

        <div
          className={`w-full -border-2 flex flex-col items-center justify-center ${
            error || isLoading || searchTerms.Seccion === "" ? "" : "hidden"
          }`}
        >
          {error && <ErrorMessage message={error.message} />}

          {isLoading && searchTerms.Seccion !== "" && (
            <Loader
              color="black"
              durationSegundos={1}
              backgroundSize="12px"
              width="40px"
              className="mt-4"
            />
          )}

          {searchTerms.Seccion === "" && (
            <span className="justify-self-start self-start -border-black -border-2">
              Aun no has seleccionado un Aula
            </span>
          )}
        </div>

        {otherProperties["Horas_Academicas"] &&
          otherProperties["Asignaciones"] && (
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
                      onContextMenu={() => false}
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
                          asignaciones &&
                          asignaciones.map((asignacion, index) => (
                            <AsignacionComponent
                              asignationsTable={asignationsTable}
                              celdas={celdas}
                              asignacion={asignacion}
                              key={index}
                              index={index}
                            />
                          ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </>
          )}
      </div>

      {viewAddAsignationByAulaModal && (
        <AddAsignationByAula
          addAsignacionInFrontend={addAsignacionInFrontend}
          Grado={selectGrado!.current!.value}
          Seccion={selectSeccion!.current!.value}
          eliminateModal={() => {
            setViewAddAsignationByAulaModal(false);
          }}
        />
      )}
    </>
  );
};

export default AsignationsByAula;
