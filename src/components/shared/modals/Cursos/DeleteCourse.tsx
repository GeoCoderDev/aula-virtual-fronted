import { ModalNoActions } from "@/interfaces/ModalNoActions";
import ModalContainer from "../../ModalContainer";
import { Course } from "@/interfaces/Course";
import Loader from "../../Loader";
import ErrorMessage from "../../messages/ErrorMessage";
import SuccessMessage from "../../messages/SuccessMessage";
import ButtonsYerOrNot from "../../ButtonsYerOrNot";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";
import { Dispatch, SetStateAction } from "react";

const DeleteCourse = ({
  setDeleteModalIsShowing,
  handleDeleteCourse,
  course: { Id_Curso, Grados, Nombre_Curso },
}: {
  course: Course;
  handleDeleteCourse: (id: number) => void;
  setDeleteModalIsShowing: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    fetchAPI,
    isSomethingLoading,
    setIsSomethingLoading,
    error,
    setError,
    successMessage,
    setSuccessMessage,
  } = useRequestAPIFeatures();

  const deleteCourse = async () => {
    try {
      const fetchCancelable = fetchAPI(`/api/courses/${Id_Curso}`, "DELETE");

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
          message: message ?? "Administrador Eliminado",
        }));
      }

      setIsSomethingLoading(false);
    } catch (e) {
      setError(() => ({
        message: "No se pudo eliminar el administrador",
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
          if (successMessage) handleDeleteCourse(Id_Curso);
          setDeleteModalIsShowing(false);
        }
        event.stopPropagation();
      }}
    >
      <div className="flex flex-col gap-y-2 items-center justify-center">
        <h3>
          ¿Estas seguro de eliminar el curso <b>{Nombre_Curso}</b>?
        </h3>

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
            <ButtonsYerOrNot
              onClickYes={deleteCourse}
              onClickNo={() => {
                setDeleteModalIsShowing(false);
              }}
            />
          </div>
        )}
      </div>
    </ModalContainer>
  );
};

export default DeleteCourse;
