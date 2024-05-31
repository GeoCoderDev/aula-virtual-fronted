"use client";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import { GradosSecciones } from "@/interfaces/Classrooms";
import React, { useEffect, useState } from "react";
import SectionElement from "./_components/SectionElement";
import Loader from "@/components/shared/Loader";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";

const GestionSecciones = () => {
  const [sectionsByGrade, setSectionsByGrade] = useState<
    GradosSecciones | undefined
  >();

  const {
    error,
    setError,
    fetchCancelables,
    isSomethingLoading,
    setIsSomethingLoading,

    fetchAPI,
  } = useRequestAPIFeatures();

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const fetchCancelable = fetchAPI("/api/classrooms", "GET");

        if (!fetchCancelable) return;

        setIsSomethingLoading(true);

        const res = await fetchCancelable.fetch();

        if (!res.ok) throw new Error();

        const resp: GradosSecciones = await res.json();

        setSectionsByGrade(() => resp);

        setIsSomethingLoading(false);
      } catch (e) {
        setError(() => ({
          message: "No se pudo obtener las secciones de cada grado",
        }));
        setIsSomethingLoading(false);
      }
    };

    fetchSections();
  }, [fetchAPI]);

  // Estilo común para las celdas de la tabla
  const cellStyle = {
    border: "2px solid #black", // Cambiar el color de las líneas de las celdas a gris claro
    padding: "13px",
    minWidth: "80px", // Ancho mínimo de celda
    whiteSpace: "nowrap", // Evitar que el contenido se desborde
    overflow: "hidden", // Ocultar el contenido que se desborda
    textOverflow: "ellipsis", // Mostrar puntos suspensivos cuando el contenido se desborda
  };

  return (
    <div
      style={{ overflowX: "auto", margin: "0", padding: "0" }}
      className="w-full flex items-start justify-start"
    >
      <div style={{ maxWidth: "80vw" }}>
        {" "}
        {/* Ancho máximo de la ventana */}
        <div className="flex flex-col items-start justify-center gap-y-6 h-full">
          <h1 className="section-tittle">Gestión de Secciones</h1>{" "}
          {/* Texto agregado */}
          <div className="max-h-full overflow-auto relative">
            <table
              className="min-w-full border-collapse border border-gray-200"
              style={{ border: "none" }}
            >
              <thead className="sticky top-0">
                <tr className="font-semibold bg-verde-spotify text-black">
                  <th
                    className="px-8 py-3 border border-r-0"
                    style={cellStyle}
                  ></th>
                  <th className="px-8 py-3 border border-r-0" style={cellStyle}>
                    Grado
                  </th>
                  <th className="px-8 py-3 border border-r-0" style={cellStyle}>
                    Secciones
                  </th>
                </tr>
              </thead>
              {sectionsByGrade && (
                <tbody>
                  {Object.keys(sectionsByGrade).map((grado) => (
                    <tr
                      key={grado}
                      className={`border-b-[0.1rem] border-black w-full`}
                    >
                      <td
                        className="py-4 text-center px-8"
                        style={{
                          ...cellStyle,
                          borderRight: "none",
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "auto-center",
                          alignItems: "auto-center",
                          gap: "0.9rem",
                        }}
                      >
                        <div className="w-full flex">
                          <button
                            type="button"
                            className="text-white bg-verde-spotify rounded-[1.0rem] py-1 px-3 font-semibold text-[0.9rem]"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            className="text-white bg-verde-spotify rounded-[1.0rem] py-1 px-3 font-semibold text-[0.9rem]"
                          >
                            -
                          </button>
                        </div>
                      </td>

                      <td
                        className="py-4 text-center px-8"
                        style={{
                          ...cellStyle,
                          borderRight: "none",
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "auto-center",
                          alignItems: "auto-center",
                          gap: "0.9rem",
                        }}
                      >
                        {grado}
                      </td>

                      <td className="flex">
                        {sectionsByGrade[grado].map((section, index) => (
                          <SectionElement key={index} section={section} />
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
          {!error && isSomethingLoading && (
            <Loader
              color="black"
              durationSegundos={1}
              backgroundSize="12px"
              width="40px"
            />
          )}
          {error && <ErrorMessage message={error.message} />}
        </div>
      </div>
    </div>
  );
};

export default GestionSecciones;
