import useBatchAPI from "@/app/hooks/useBatchAPI";
import AulaSelector from "@/components/inputs/AulaSelector";
import Loader from "@/components/shared/Loader";
import AddAsignationByAula from "@/components/shared/modals/Asignaciones/AddAsignationByAula";
import {
  AsignacionResponse,
  diasSemana,
  HoraAcademica,
} from "@/interfaces/Asignation";
import { Aula } from "@/interfaces/Aula";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";

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

  return (
    <>
      <div className="w-full flex flex-col items-start justify-start gap-y-4">
        <div className="flex flex-wrap max-w-full items-center gap-x-5 gap-y-4 justify-between">
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
                <div style={{ maxWidth: "80vw" }}>
                  <label className="font-semibold flex w-auto flex-row items-center gap-x-3 whitespace-nowrap text-[1.5rem]">
                    AULA: {searchTerms.Grado}
                    {searchTerms.Seccion}
                  </label>
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
                      {diasSemana.map((day) => (
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
              </>
            )}
          </>
        ) : (
          <div className="w-full -border-2 flex flex-col items-center justify-center">
            {!error && isLoading && searchTerms.Seccion !== "" ? (
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
