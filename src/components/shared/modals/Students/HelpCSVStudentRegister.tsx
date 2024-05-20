import { ModalNoActions } from "@/interfaces/ModalNoActions";
import React from "react";
import ModalContainer from "../../ModalContainer";

const HelpCSVStudentRegister = ({ eliminateModal }: ModalNoActions) => {
  return (
    <ModalContainer eliminateModal={eliminateModal}>
      <div>HelpCSVStudentRegister</div>
    </ModalContainer>
  );
};

export default HelpCSVStudentRegister;
