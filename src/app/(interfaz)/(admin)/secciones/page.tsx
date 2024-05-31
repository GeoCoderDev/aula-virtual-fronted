"use client";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import { GradosSecciones } from "@/interfaces/Classrooms";
import React, { useEffect, useState } from "react";
import Loader from "@/components/shared/Loader";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";
import { ErrorAPI } from "@/interfaces/API";
import SectionsRow from "./_components/SectionsRow";

const GestionSecciones = () => {
  const [sectionsByGrade, setSectionsByGrade] = useState<
    GradosSecciones | undefined
  >();

  const {
    error,
    setError,
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

        if (!res.ok) {
          const { message }: ErrorAPI = await res.json();
          if (!message) throw new Error();
          setError(() => ({ message }));
        }

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

  const addSectionInResults = (grado: string) => {
    // Verificamos si el grado existe en el estado
    if (sectionsByGrade && grado in sectionsByGrade) {
      // Clonamos el estado actual
      const updatedSectionsByGrade = { ...sectionsByGrade };
      // Obtenemos el array de secciones del grado especificado
      const sections = updatedSectionsByGrade[grado];
      // Obtenemos la última sección del array
      const lastSection = sections[sections.length - 1];
      // Generamos la nueva sección basada en la última sección existente
      const newSection = String.fromCharCode(lastSection.charCodeAt(0) + 1);
      // Agregamos la nueva sección al final del array de secciones del grado especificado
      updatedSectionsByGrade[grado].push(newSection);
      // Actualizamos el estado con la nueva información
      setSectionsByGrade(() => updatedSectionsByGrade);
    }
  };

  const removeSectionInResults = (grado: string) => {
    // Verificamos si el grado existe en el estado y si tiene secciones
    if (
      sectionsByGrade &&
      grado in sectionsByGrade &&
      sectionsByGrade[grado].length > 0
    ) {
      // Clonamos el estado actual
      const updatedSectionsByGrade = { ...sectionsByGrade };
      // Eliminamos la última sección del array de secciones del grado especificado
      updatedSectionsByGrade[grado].pop();
      // Actualizamos el estado con la nueva información
      setSectionsByGrade(() => updatedSectionsByGrade);
    }
  };

  return (
    <div className="flex items-start justify-start">
      <div
        style={{ maxWidth: "80vw" }}
        className="flex flex-col items-center justify-center gap-y-4"
      >
        {/* Ancho máximo de la ventana */}
        <div className="w-max flex flex-col items-start justify-center gap-y-6 h-full">
          <h1 className="section-tittle">Gestión de Secciones</h1>{" "}
          {/* Texto agregado */}
          <div className="max-h-full w-max overflow-auto relative">
            <table className="w-max ">
              <colgroup>
                <col className="w-[9rem]" />
                <col className="w-[4rem]" />
                <col className="w-[min(50vw,30rem)] max-w-[min(50vw,30rem)]" />
              </colgroup>
              <thead className="sticky top-0 ">
                <tr className="font-semibold bg-verde-spotify text-black rounded-lg">
                  <th className="px-3 py-2 "></th>
                  <th className="px-3 py-2 ">Grado</th>
                  <th className="px-6 py-2 ">Secciones</th>
                </tr>
              </thead>
              {sectionsByGrade && (
                <tbody>
                  {Object.keys(sectionsByGrade).map((grado, index) => (
                    <SectionsRow
                      addSectionInResults={addSectionInResults}
                      removeSectionInResults={removeSectionInResults}
                      key={index}
                      grado={grado}
                      sections={sectionsByGrade[grado]}
                    />
                  ))}
                </tbody>
              )}
            </table>
          </div>
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
  );
};

export default GestionSecciones;
