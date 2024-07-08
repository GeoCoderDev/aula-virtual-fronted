"use client";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import Loader from "@/components/shared/Loader";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";
import { ErrorAPI } from "@/interfaces/API";
import { ForoDataResponse } from "@/interfaces/Foro";
import { RootState } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StudentForoResponse from "./_components/StudentForoResponse";

const Foro = ({
  params: { Tema_ID, CursoAula_ID, Foro_ID },
}: {
  params: { Tema_ID: number; CursoAula_ID: number; Foro_ID: number };
}) => {
  const headerHeight = useSelector(
    (state: RootState) => state.elementsDimensions.headerHeight
  );

  const {
    error,
    fetchAPI,
    setError,
    isSomethingLoading,
    setIsSomethingLoading,
    setSuccessMessage,
    successMessage,
  } = useRequestAPIFeatures();

  const [foroData, setForoData] = useState<ForoDataResponse>();

  useEffect(() => {
    const fetchTopicAdditionalData = async () => {
      try {
        const fetchCancelable = fetchAPI(`/api/forum/${Foro_ID}/data`, "GET");

        if (!fetchCancelable) return;

        setIsSomethingLoading(true);

        const res = await fetchCancelable.fetch();
        if (!res.ok) {
          const { message }: ErrorAPI = await res.json();
          if (!message) throw new Error();
          setError(() => ({
            message,
          }));
        } else {
          const foroDataResponse: ForoDataResponse = await res.json();

          setForoData(() => foroDataResponse);
        }

        setIsSomethingLoading(false);
      } catch (e) {
        setError(() => ({
          message: "No se pudo obtener los datos del foro",
        }));
        setIsSomethingLoading(false);
      }
    };

    fetchTopicAdditionalData();
  }, [fetchAPI]);

  return (
    <>
      {!foroData && isSomethingLoading && (
        <div className="w-full flex items-center justify-center">
          <Loader
            color="black"
            className="mt-6 self-start justify-self-center"
            durationSegundos={1}
            backgroundSize="12px"
            width="40px"
          />
        </div>
      )}

      {!foroData && error && (
        <div className="w-full flex items-center justify-center">
          <ErrorMessage
            className="mt-6 self-start justify-self-center"
            message={error.message}
          />
        </div>
      )}

      {foroData && (
        <div className="flex flex-col w-full">
          <div
            style={{ top: `${headerHeight}px` }}
            className="flex -border-2 break-words flex-wrap sticky left-0 bg-[#ffffff99] backdrop-blur-[30px] w-full py-2 border-black -border-b-[1px]"
          >
            <Link href="/mis-cursos" as={"/mis-cursos"}>
              <div className="cursor-pointer hover:underline">Mis Cursos</div>
            </Link>
            &nbsp;&gt;&nbsp;
            <Link
              href={`/mis-cursos/${CursoAula_ID}`}
              as={`/mis-cursos/${CursoAula_ID}`}
            >
              <div className="cursor-pointer hover:underline">
                {foroData.Nombre_Curso} - {foroData.Grado}
                {foroData.Seccion}
              </div>
            </Link>
            &nbsp;&gt;&nbsp;
            <div className="cursor-pointer hover:underline">
              {foroData.Nombre_Tema} - Foro
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full ">
            <h2 className="section-tittle">FORO | {foroData.Titulo}</h2>

            {foroData.Descripcion_Recurso && (
              <p className="">{foroData.Descripcion_Recurso}</p>
            )}

            {foroData.Descripcion_Imagen_URL && (
              <img
                src={foroData.Descripcion_Imagen_URL}
                className="aspect-auto w-[min(18rem,80vw)] self-center justify-self-center"
                alt={`Imagen del foro ${foroData.Titulo}`}
              />
            )}
          </div>

          <div className="flex flex-col ">
            <h3 className="text-[1.25rem] font-semibold italic">
              Respuestas:{" "}
            </h3>

            <div className="ml-6 flex flex-col pt-4 gap-4">
              {foroData.Respuestas.length===0? <span className="">Aun no hay respuestas</span>:foroData.Respuestas.map((respuestaForo, index) => (
                <StudentForoResponse
                  respuestaForo={respuestaForo}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Foro;
