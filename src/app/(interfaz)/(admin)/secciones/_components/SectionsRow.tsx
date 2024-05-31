import MinusIcon from "@/components/icons/others/MinusIcon";
import PlusIcon from "@/components/icons/others/PlusIcon";
import SectionElement from "./SectionElement";
import { useState } from "react";
import RemoveLastSection from "@/components/shared/modals/Sections/RemoveLastSection";
import AddSection from "@/components/shared/modals/Sections/AddSection";

const SectionsRow = ({
  grado,
  sections,
  addSectionInResults,
  removeSectionInResults,
}: {
  grado: string;
  sections: string[];
  addSectionInResults: (grado: string) => void;
  removeSectionInResults: (grado: string) => void;
}) => {
  const [viewDeleteSectionModal, setViewDeleteSectionModal] = useState(false);
  const [viewAgreeSectionModal, setViewAgreeSectionModal] = useState(false);

  return (
    <>
      <tr key={grado} className={`border-b-[0.1rem] border-black w-full`}>
        <td className="py-4 text-center w-max">
          <div className="w-full flex justify-center gap-x-6 ">
            <PlusIcon
              onClick={() => {
                setViewAgreeSectionModal(true);
              }}
              title="Añadir seccion"
              className="aspect-square w-8 cursor-pointer hover:grayscale-[0.3] hover:scale-[1.1]"
            />
            <MinusIcon
              onClick={() => {
                setViewDeleteSectionModal(true);
              }}
              title="Quitar ultima sección"
              className="aspect-square w-8 cursor-pointer hover:grayscale-[0.3] hover:scale-[1.1]"
            />
          </div>
        </td>

        <td className="py-4 text-center">{grado}</td>

        <td className="flex py-4 px-6 justify-evenly flex-wrap gap-x-6 gap-y-4">
          {sections.map((section, index) => (
            <SectionElement key={index} section={section} />
          ))}
        </td>
      </tr>
      {viewDeleteSectionModal && (
        <RemoveLastSection
          removeSectionInResults={removeSectionInResults}
          eliminateModal={() => {
            setViewDeleteSectionModal(false);
          }}
          grado={grado}
          sectionToDelete={sections[sections.length - 1]}
        />
      )}
      {viewAgreeSectionModal && (
        <AddSection
          addSectionInResults={addSectionInResults}
          eliminateModal={() => {
            setViewAgreeSectionModal(false);
          }}
          grado={grado}
        />
      )}
    </>
  );
};

export default SectionsRow;
