"use client";
import ChevronIcon from "@/components/icons/others/ChevronIcon";
import MoreOptionsIcon from "@/components/icons/others/MoreOptionsIcon";
import { Topic } from "@/interfaces/Topic";
import { LegacyRef, useEffect, useRef, useState } from "react";
import DropdownOptions from "./DropDownOptions";
import AddFileToTopic from "@/components/shared/modals/Recursos-Tema/AddFileToTopic";
import ChangeTopicName from "@/components/shared/modals/Temas/ChangeTopicName";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import Loader from "@/components/shared/Loader";
import { ErrorAPI } from "@/interfaces/API";
import RecursoTemaComponent from "./RecursoTema";
import { RecursoTema } from "@/interfaces/RecursoTema";
import AddForumToTopic from "@/components/shared/modals/Recursos-Tema/AddForumToTopic";
import { useDelegacionEventos } from "@/lib/utils/delegacionDeEventos";
import AddUrlToTopic from "@/components/shared/modals/Recursos-Tema/AddURLToTopic";
import AddURLToTopic from "@/components/shared/modals/Recursos-Tema/AddURLToTopic";

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
  const [viewAddForumModal, setViewAddForumModal] = useState(false);
  const [viewAddURLModal, setViewAddURLModal] = useState(false);

  const [topicResources, setTopicResources] = useState<RecursoTema[]>([]);

  const expandibleElement = useRef<HTMLDivElement>();

  const {
    error,
    fetchAPI,
    isSomethingLoading,
    setError,
    setIsSomethingLoading,
  } = useRequestAPIFeatures();

  const { delegarEvento } = useDelegacionEventos();

  const toggleExpand = () => {
    if (expandibleElement.current) {
      if (isExpand) {
        expandibleElement.current.style.height = "0px";
      } else {
        expandibleElement.current.style.height =
          expandibleElement.current.scrollHeight + 40 + "px";
      }
      expandibleElement.current.classList.toggle("border-2");
      expandibleElement.current.classList.toggle("p-5");
    }
    setIsExpand((prev) => !prev);
  };

  useEffect(() => {
    if (!delegarEvento) return;
    delegarEvento(
      "click",
      `#${IDMoreOptionsIcon}, #${IDMoreOptionsIcon} *`,
      (e) => {
        setMoreOptionsDisplayed(false);
      },
      true
    );
  }, [delegarEvento]);

  const handleExpand = async () => {
    if (isSomethingLoading) return;
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

        setTimeout(() => {
          toggleExpand();
        }, 150);
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
            title={isExpand ? "Ocultar Tema" : "Expandir Tema"}
            className={`${
              isSomethingLoading ? "grayscale-[0.5]" : "hover:grayscale-[0.5]"
            } flex items-center justify-center aspect-square w-10 bg-verde-spotify rounded-[0.4rem]`}
          >
            {isSomethingLoading ? (
              <Loader backgroundSize="8px" width="25px" color="black" />
            ) : (
              <ChevronIcon
                className={`w-[0.6rem] flex origin-center ${
                  isExpand && "rotate-90"
                }`}
              />
            )}
          </button>
          <h4
            className={`${
              isSomethingLoading ? "bg-[#ddd]" : "hover:bg-[#ddd]"
            } text-[1.2rem] select-none flex-1 cursor-pointer  py-2 px-[0.5rem] rounded-[0.5rem]`}
            title={isExpand ? "Ocultar Tema" : "Expandir Tema"}
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
                  setViewAddForumModal={setViewAddForumModal}
                  setViewURLForumModal={setViewAddURLModal}
                />
              )}
            </>
          )}
        </div>

        <div
          style={{ transition: "all 300ms" }}
          className={`rounded-[1rem] border-t-2 border-black h-0 overflow-hidden flex flex-col -flex-wrap gap-4 `}
          ref={expandibleElement as LegacyRef<HTMLDivElement>}
        >
          {topicResources.length !== 0
            ? topicResources.map((topicResource, index) => (
                <RecursoTemaComponent
                  topicResource={topicResource}
                  key={index}
                />
              ))
            : "Aun no se han agregado recursos"}
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

      {viewAddForumModal && (
        <AddForumToTopic
          topic={topic}
          index={index}
          Nombre_Curso={Nombre_Curso}
          Grado={Grado}
          Seccion={Seccion}
          eliminateModal={() => {
            setViewAddForumModal(false);
          }}
        />
      )}

      {viewAddURLModal && (
        <AddURLToTopic
          Grado={Grado}
          Nombre_Curso={Nombre_Curso}
          Seccion={Seccion}
          index={index}
          topic={topic}
          eliminateModal={() => {
            setViewAddURLModal(false);
          }}
        />
      )}
    </>
  );
};

export default DropDownTopic;
