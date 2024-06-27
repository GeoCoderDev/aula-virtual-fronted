"use client";
import ChevronIcon from "@/components/icons/others/ChevronIcon";
import MoreOptionsIcon from "@/components/icons/others/MoreOptionsIcon";
import { Topic } from "@/interfaces/Topic";
import { useEffect, useState } from "react";
import DropdownOptions from "./DropDownOptions";
import { delegarEvento } from "@/lib/utils/delegacionDeEventos";
import AddFileToTopic from "@/components/shared/modals/Recursos-Tema/AddFileToTopic";
import ChangeTopicName from "@/components/shared/modals/Temas/ChangeTopicName";
import AddHomeworkToTopic from "@/components/shared/modals/Recursos-Tema/AddHomeworkToTopic";

const DropDownTopic = ({
  topic,
  index,
  isTeacher,
  Nombre_Curso,
  Grado,
  Seccion,
  changeNameTopicFrontend,
}: {
  topic: Topic;
  index: number;
  isTeacher: boolean;
  changeNameTopicFrontend: (idTema: number, newName: string) => void;
  Nombre_Curso: string;
  Grado: string;
  Seccion: string;
}) => {
  const IDMoreOptionsIcon = `LIST-${index}`;
  const [moreOptionsDisplayed, setMoreOptionsDisplayed] = useState(false);

  const [viewChangeTopicName, setViewChangeTopicName] = useState(false);

  const [viewAddFileToTopicModal, setViewAddFileToTopicModal] = useState(false);

  const [viewAddHomeworkTopic, setViewAddHomeworkTopic] = useState(false);

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

  return (
    <>
      <div className="flex-col flex gap-4 w-[95%] flex-wrap">
        <div className="flex gap-4 flex-wrap items-center relative">
          <button className="hover:grayscale-[0.5] flex items-center justify-center aspect-square w-10 bg-verde-spotify rounded-[0.4rem]">
            <ChevronIcon className="w-[0.6rem] flex" />
          </button>
          <h4 className="text-[1.2rem] flex-1 cursor-pointer hover:bg-[#ddd] py-2 px-[0.5rem] rounded-[0.5rem]">
            TEMA {index}: {topic.Nombre_Tema}
          </h4>

          {isTeacher && (
            <>
              <MoreOptionsIcon
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
                  setViewAddHomeworkTopic={setViewAddHomeworkTopic}
                  setViewChangeTopicName={setViewChangeTopicName}
                  setViewAddFileToTopicModal={setViewAddFileToTopicModal}
                />
              )}
            </>
          )}
        </div>
        <div className="border-t-2 border-black"></div>
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

      {viewAddHomeworkTopic && (
        <AddHomeworkToTopic
          Nombre_Curso={Nombre_Curso}
          Grado={Grado}
          Seccion={Seccion}
          topic={topic}
          index={index}
          eliminateModal={() => {
            setViewAddHomeworkTopic(false);
          }}
        />
      )}
    </>
  );
};

export default DropDownTopic;
