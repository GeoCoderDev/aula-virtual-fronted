"use client";
import ChevronIcon from "@/components/icons/others/ChevronIcon";
import MoreOptionsIcon from "@/components/icons/others/MoreOptionsIcon";
import { Topic } from "@/interfaces/Topic";
import { LegacyRef, useEffect, useRef, useState } from "react";
import DropdownOptions from "./DropDownOptions";
import { delegarEvento } from "@/lib/utils/delegacionDeEventos";
import AddFileToTopic from "@/components/shared/modals/Recursos-Tema/AddFileToTopic";
import ChangeTopicName from "@/components/shared/modals/Temas/ChangeTopicName";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import Loader from "@/components/shared/Loader";
import { RecursosTemaResponse, RecursoTema } from "@/interfaces/RecursoTema";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";
import RecursoTemaComponent from "./RecursoTema";
import { current } from "@reduxjs/toolkit";

const DropDownTopic = ({
  topic,
  index,
  isTeacher,
  CursoAula_ID,
  Nombre_Curso,
  Grado,
  Seccion,
  changeNameTopicFrontend,
}: {
  topic: Topic;
  index: number;
  isTeacher: boolean;
  changeNameTopicFrontend: (idTema: number, newName: string) => void;
  CursoAula_ID: number;
  Nombre_Curso: string;
  Grado: string;
  Seccion: string;
}) => {
  const IDMoreOptionsIcon = `LIST-${index}`;
  const [moreOptionsDisplayed, setMoreOptionsDisplayed] = useState(false);

  const [isExpand, setIsExpand] = useState(false);

  const [viewChangeTopicName, setViewChangeTopicName] = useState(false);

  const [viewAddFileToTopicModal, setViewAddFileToTopicModal] = useState(false);

  const [topicResources, setTopicResources] = useState<RecursoTema[]>([]);

  const expandibleElement = useRef<HTMLDivElement>();

  const {
    error,
    fetchAPI,
    fetchCancelables,
    isSomethingLoading,
    setError,
    setIsSomethingLoading,
  } = useRequestAPIFeatures();

  const toggleExpand = () => {
    if (expandibleElement.current) {
      setIsExpand((prev) => !prev);
      if (isExpand) {
        expandibleElement.current.style.height = "0px";
      } else {
        expandibleElement.current.style.height =
          expandibleElement.current.scrollHeight + 40 + "px";
      }
      expandibleElement.current.classList.toggle("border-2");
      expandibleElement.current.classList.toggle("p-5");
    }
  };

  useEffect(() => {
    delegarEvento(
      "click",
      `#${IDMoreOptionsIcon}, #${IDMoreOptionsIcon} *`,
      (e) => {
        setMoreOptionsDisplayed(false);
      },
      true
    );
  }, []);

  const handleExpand = async () => {
    if (isExpand) return toggleExpand();

    const fetchCancelable = fetchAPI(
      `/api/topicResources/${topic.Id_Tema}`,
      "GET"
    );

    if (!fetchCancelable) return;

    try {
      setIsSomethingLoading(true);
      const res = await fetchCancelable.fetch();

      if (!res.ok) {
        const { message }: ErrorAPI = await res.json();

        if (!message) throw new Error();

        setError(() => ({
          message,
        }));
      } else {
        const recursosTema: RecursoTema[] = await res.json();

        setTopicResources(() => recursosTema);

        toggleExpand();
      }

      setIsSomethingLoading(false);
    } catch (e) {
      setError(() => ({
        message: "No se pudieron obtener los recursos del tema",
      }));
      setIsSomethingLoading(false);
    }
  };

  return (
    <>
      <div className="flex-col flex gap-4 w-[95%] flex-wrap">
        <div className="flex gap-4 flex-wrap items-center relative">
          <button
            disabled={isSomethingLoading}
            onClick={handleExpand}
            title={isSomethingLoading ? "" : "Expandir Tema"}
            className={`${
              isSomethingLoading ? "grayscale-[0.5]" : "hover:grayscale-[0.5]"
            } flex items-center justify-center aspect-square w-10 bg-verde-spotify rounded-[0.4rem]`}
          >
            {isSomethingLoading ? (
              <Loader backgroundSize="8px" width="25px" color="black" />
            ) : (
              <ChevronIcon className="w-[0.6rem] flex" />
            )}
          </button>
          <h4
            className="text-[1.2rem] flex-1 cursor-pointer hover:bg-[#ddd] py-2 px-[0.5rem] rounded-[0.5rem]"
            title="Expandir Tema"
            onClick={handleExpand}
          >
            TEMA {index}: {topic.Nombre_Tema}
          </h4>

          {isTeacher && (
            <>
              <MoreOptionsIcon
                title="Mas Opciones"
                Id={IDMoreOptionsIcon}
                className={`transition-all w-2 self-end cursor-pointer ${
                  moreOptionsDisplayed ? "rotate-12" : "rotate-0"
                }`}
                onClick={() => {
                  setMoreOptionsDisplayed(!moreOptionsDisplayed);
                }}
              />
              {moreOptionsDisplayed && (
                <DropdownOptions
                  CursoAula_ID={CursoAula_ID}
                  Id_Tema={topic.Id_Tema}
                  setViewChangeTopicName={setViewChangeTopicName}
                  setViewAddFileToTopicModal={setViewAddFileToTopicModal}
                />
              )}
            </>
          )}
        </div>

        <div
          style={{ transition: "all 300ms" }}
          className="rounded-[1rem] border-t-2 border-black h-0 overflow-hidden flex flex-col gap-4"
          ref={expandibleElement as LegacyRef<HTMLDivElement>}
        >
          {topicResources.map((topicResource, index) => (
            <RecursoTemaComponent topicResource={topicResource} key={index} />
          ))}
        </div>
      </div>

      {viewChangeTopicName && (
        <ChangeTopicName
          changeNameTopicFrontend={changeNameTopicFrontend}
          topic={topic}
          eliminateModal={() => {
            setViewChangeTopicName(false);
          }}
        />
      )}

      {viewAddFileToTopicModal && (
        <AddFileToTopic
          Nombre_Curso={Nombre_Curso}
          Grado={Grado}
          Seccion={Seccion}
          topic={topic}
          index={index}
          eliminateModal={() => {
            setViewAddFileToTopicModal(false);
          }}
        />
      )}
    </>
  );
};

export default DropDownTopic;
