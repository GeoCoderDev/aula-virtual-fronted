import {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ModalContainer from "../../ModalContainer";
//import { Course } from "@/interfaces/Course";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";
import Loader from "@/components/shared/Loader";
import ErrorMessage from "../../messages/ErrorMessage";
import SuccessMessage from "../../messages/SuccessMessage";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";

interface UpdateCourseNameForm {
  newCourseName: string;
}

const initialForm: UpdateCourseNameForm = {
  newCourseName: "",
};

const CourseChangeNameModal = ({
  course: { Id_Course, Course_Name },
  handleUpdateCourseName,
  setDeleteModalIsShowing,
}: {
  course: Course;
  setDeleteModalIsShowing: Dispatch<SetStateAction<boolean>>;
  handleUpdateCourseName: (idCourse: number, courseName: string) => void;
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

  const [form, setForm] = useState<UpdateCourseNameForm>(initialForm);

  const updateCourseName = async () => {
    try {
      setIsSomethingLoading(true);

      const fetchCancelable = fetchAPI(
        `/api/courses/updateName/${Id_Course}`,
        "PUT",
        null,
        JSON.stringify(form)
      );

      if (fetchCancelable === undefined) return;

      const response = await fetchCancelable.fetch();

      if (!response.ok) {
        const { message }: ErrorAPI = await response.json();
        if(!message) throw new Error();
        setError(() => ({
          message
        }));
      } else {
        const { message }: SuccessMessageAPI = await response.json();
        setSuccessMessage(() => ({ message }));
        handleUpdateCourseName(Id_Course, form.newCourseName);
      }

      setIsSomethingLoading(false);
    } catch (e) {
      setError(() => ({
        message: "No se pudo actualizar el curso",
      }));
      setIsSomethingLoading(false);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSuccessMessage(null);
    setError(null);
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    updateCourseName();
  };

  useEffect(() => {
    setForm(() => ({ newCourseName: Course_Name }));
  }, []);

  return (
    <ModalContainer
      eliminateModal={(
        event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
      ) => {
        if (!isSomethingLoading) {
          setDeleteModalIsShowing(false);
        }
        event.stopPropagation();
      }}
    >
      <form
        className="w-full flex flex-col items-center justify-center gap-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-2xl">Cambiar Nombre del Curso</h2>
        <input
          disabled={isSomethingLoading}
          required
          className="custom-input w-44 text-[1rem] py-2"
          type="text"
          name="newCourseName"
          onChange={handleChange}
          value={form.newCourseName}
        />

        {!successMessage && !isSomethingLoading && error && (
          <ErrorMessage message={error.message} />
        )}

        {!error && !isSomethingLoading && successMessage && (
          <SuccessMessage
            className="text-rojo-orange"
            message={successMessage.message}
          />
        )}

        <button
          className="button-with-loader py-2"
          disabled={
            Boolean(error) ||
            Boolean(successMessage) ||
            isSomethingLoading ||
            form.newCourseName === Course_Name
          }
          type="submit"
        >
          Guardar Cambios{" "}
          {isSomethingLoading && (
            <Loader backgroundSize="8px" width="25px" color="black" />
          )}
        </button>
      </form>
    </ModalContainer>
  );
};

export default CourseChangeNameModal;