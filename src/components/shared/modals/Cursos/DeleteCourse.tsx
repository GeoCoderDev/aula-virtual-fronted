import { ModalNoActions } from "@/interfaces/ModalNoActions";
import ModalContainer from "../../ModalContainer";

const DeleteCourse = ({ eliminateModal }: ModalNoActions) => {
  return (
    <ModalContainer eliminateModal={eliminateModal}>
      <div>DeleteCourse</div>
    </ModalContainer>
  );
};

export default DeleteCourse;
