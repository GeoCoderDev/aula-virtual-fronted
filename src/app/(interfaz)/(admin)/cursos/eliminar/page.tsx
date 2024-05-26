//import { Course } from "../../../../interfaces/Course";
import { Dispatch, SetStateAction, useState } from "react";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";
import Loader from "@/components/shared/Loader";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import ModalContainer from "@/components/shared/ModalContainer";
import SuccessMessage from "@/components/shared/messages/SuccessMessage";
import ErrorMessage from "@/components/shared/messages/ErrorMessage";

export interface CourseDeleteModalProps {
  course: Course;
  setDeleteModalIsShowing: Dispatch<SetStateAction<boolean>>;
  handleRemoveCourse: (idCourse: number) => void;
}

const CourseDeleteModal = ({
  course: { Id_Course, Course_Name },
  setDeleteModalIsShowing,
  handleRemoveCourse,
}: CourseDeleteModalProps) => {
  const {
    fetchAPI,
    isSomethingLoading,
    setIsSomethingLoading,
    error,
    setError,
    successMessage,
    setSuccessMessage,
  } = useRequestAPIFeatures();

  const eliminateCourse = async () => {
    try {
      const fetchCancelable = fetchAPI(`/api/courses/${Id_Course}`, "DELETE");

      if (fetchCancelable === undefined) return;

      setIsSomethingLoading(true);

      const res = await fetchCancelable?.fetch();

      if (!res.ok) {
        const { message }: ErrorAPI = await res.json();
        if (!message) throw new Error();
        setError(() => ({ message }));
      } else {
        const { message }: SuccessMessageAPI = await res.json();
        setSuccessMessage(() => ({
          message: message ?? "Curso Eliminado",
        }));
      }

      setIsSomethingLoading(false);
    } catch (e) {
      setError(() => ({
        message: "No se pudo eliminar el curso",
      }));

      setIsSomethingLoading(false);
    }
  };

  return (
    <ModalContainer
      eliminateModal={(
        event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
      ) => {
        if (!isSomethingLoading) {
          //Eliminando el curso de los resultados
          if (successMessage) handleRemoveCourse(Id_Course);
          setDeleteModalIsShowing(false);
        }
        event.stopPropagation();
      }}
    >
      <div className="flex flex-col gap-y-2 items-center justify-center">
        <h2>
          ¿Estas seguro de eliminar el curso <b>{Course_Name}</b>?
        </h2>

        {!successMessage && !error && isSomethingLoading && (
          <Loader color="black" width="30px" backgroundSize="9px" />
        )}

        {!successMessage && !isSomethingLoading && error && (
          <ErrorMessage message={error.message} />
        )}

        {!error && !isSomethingLoading && successMessage && (
          <SuccessMessage
            className="text-rojo-orange"
            message={successMessage.message}
          />
        )}

        {!successMessage && !error && !isSomethingLoading && (
          <div className="flex w-full items-center justify-center gap-x-3">
            <button
              onClick={eliminateCourse}
              className="w-10 py-2 text-black font-normal rounded-lg bg-verde-spotify"
            >
              Si
            </button>
            <button
              onClick={() => {
                setDeleteModalIsShowing(false);
              }}
              className="w-10 py-2 text-white font-normal rounded-lg bg-rojo-orange"
            >
              No
            </button>
          </div>
        )}
      </div>
    </ModalContainer>
  );
};

export default CourseDeleteModal;
