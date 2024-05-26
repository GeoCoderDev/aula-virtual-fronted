import React from "react";
import { ModalNoActions } from "@/interfaces/ModalNoActions";
import ModalContainer from "@/components/shared/ModalContainer";

const RegisterCourse = ({ eliminateModal }: ModalNoActions) => {
  return (
    <ModalContainer eliminateModal={eliminateModal}>
      <figure className="flex flex-col justify-center gap-y-6">
        <img
          width={50}
          height={50}
          className="aspect-auto w-[min(80vw,40rem)] rounded-lg -semi-transparent-border-black"
          alt="imagen de formato csv para registrar Cursos"
          src={"/png/Help/RegisterCourseCSVFormat.png"}
        />
        <figcaption className="max-w-[min(80vw,40rem)] w-full text-wrap break-words italic font-normal">
          Formato de CSV para registro de Cursos
        </figcaption>
      </figure>
    </ModalContainer>
  );
};

export default RegisterCourse;
