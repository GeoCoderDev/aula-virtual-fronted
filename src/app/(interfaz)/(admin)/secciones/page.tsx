"use client";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import { GradosSecciones } from "@/interfaces/Classrooms";
import React, { useEffect, useState } from "react";
import Loader from "@/components/shared/Loader";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";
import { ErrorAPI } from "@/interfaces/API";
import SectionsRow from "./_components/SectionsRow";

const GestionSecciones = () => {
  const [sectionsByGrade, setSectionsByGrade] = useState<GradosSecciones | undefined>(undefined);

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
    if (sectionsByGrade && grado in sectionsByGrade) {
      const updatedSectionsByGrade = { ...sectionsByGrade };
      const sections = updatedSectionsByGrade[grado];
      const lastSection = sections[sections.length - 1];
      const newSection = String.fromCharCode(lastSection.charCodeAt(0) + 1);
      updatedSectionsByGrade[grado].push(newSection);
      setSectionsByGrade(() => updatedSectionsByGrade);
    }
  };

  const removeSectionInResults = (grado: string) => {
    if (
      sectionsByGrade &&
      grado in sectionsByGrade &&
      sectionsByGrade[grado].length > 0
    ) {
      const updatedSectionsByGrade = { ...sectionsByGrade };
      updatedSectionsByGrade[grado].pop();
      setSectionsByGrade(() => updatedSectionsByGrade);
    }
  };

  return (
    <div className="flex items-start justify-start w-full">
      <div className="w-full flex flex-col items-center justify-center gap-y-4">
        <div className="w-full flex flex-col items-start justify-center gap-y-6 h-full">
          <h1 className="section-tittle text-2xl md:text-3xl lg:text-4xl">Gestión de Secciones</h1>
          <div className="max-h-full w-full overflow-auto relative">
            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-max">
                <colgroup>
                  <col className="w-[20%]" />
                  <col className="w-[20%]" />
                  <col className="w-[60%]" />
                </colgroup>
                <thead className="sticky top-0">
                  <tr className="font-semibold bg-verde-spotify text-black rounded-lg">
                    <th className="px-2 py-2 text-sm"></th>
                    <th className="px-2 py-2 text-sm">Grado</th>
                    <th className="px-4 py-2 text-sm">Secciones</th>
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