import { ModalNoActions } from "@/interfaces/ModalNoActions";
import ModalContainer from "../../ModalContainer";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import Loader from "../../Loader";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import ErrorMessage from "../../messages/ErrorMessage";
import SuccessMessage from "../../messages/SuccessMessage";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";
import { setToCommaSeparatedString } from "@/lib/helpers/setToCommaSeparatedString";

interface RegisterCourseForm {
  nombre: string;
  grados: Set<Number>;
}

const initialForm: RegisterCourseForm = {
  nombre: "",
  grados: new Set(),
};

const RegisterCourse = ({
  eliminateModal,
  handleAddNewCourseRow,
}: ModalNoActions & {
  handleAddNewCourseRow: (id: number, nombre: string, grados: string) => void;
}) => {
  const [form, setForm] = useState(initialForm);

  const {
    fetchAPI,
    isSomethingLoading,
    setIsSomethingLoading,
    error,
    setError,
    successMessage,
    setSuccessMessage,
  } = useRequestAPIFeatures();

  const handleChangeInputText: ChangeEventHandler<HTMLInputElement> = (e) => {
    setError(() => null);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setError(() => null);

    const gradoSeleccionado = parseInt(e.target.value); // Obtén el número de grado seleccionado

    setForm((prevForm) => {
      const nuevoConjuntoGrados = new Set(prevForm.grados); // Crea una copia del conjunto de grados

      if (e.target.checked) {
        nuevoConjuntoGrados.add(gradoSeleccionado); // Agrega el grado seleccionado al conjunto
      } else {
        nuevoConjuntoGrados.delete(gradoSeleccionado); // Elimina el grado deseleccionado del conjunto
      }

      return { ...prevForm, grados: nuevoConjuntoGrados }; // Actualiza el estado con el nuevo conjunto de grados
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (form.grados.size === 0)
      return setError(() => ({
        message: "Debes seleccionar almenos un grado",
      }));

    // Convertir el Set de grados a una cadena separada por comas
    const gradosSeleccionados = setToCommaSeparatedString(form.grados);

    try {
      const fetchCancelable = fetchAPI(
        "/api/courses",
        "POST",
        null,
        JSON.stringify({
          nombre: form.nombre,
          grados: gradosSeleccionados,
        })
      );

      if (!fetchCancelable) return;

      setIsSomethingLoading(true);

      const res = await fetchCancelable.fetch();
      if (!res.ok) {
        const { message }: ErrorAPI = await res.json();
        if (!message) throw new Error();
        setError(() => ({
          message,
        }));
      } else {
        const { message, Id }: SuccessMessageAPI = await res.json();

        if (Id) {
          handleAddNewCourseRow(Id, form.nombre, gradosSeleccionados);
        }

        setSuccessMessage(() => ({
          message: message ?? "Curso Registrado",
        }));
      }

      setIsSomethingLoading(false);
    } catch (e) {
      setError(() => ({
        message: "No se pudo registrar el curso",
      }));
      setIsSomethingLoading(false);
    }
  };

  return (
    <ModalContainer eliminateModal={eliminateModal}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center gap-y-6 items-center"
      >
        <h2 className="section-tittle text-[1.6rem]">Agregar Curso</h2>
        <label className="text-base font-bold flex flex-wrap gap-x-4 max-w-[min(25rem,80vw)] items-center">
          Nombre del curso:
          <input
            required
            type="text"
            className="custom-input w-[12rem] text-[0.9rem] font-normal"
            onChange={handleChangeInputText}
            name="nombre"
            minLength={2}
            maxLength={40}
          />
        </label>

        <div className="flex flex-col justify-center w-full items-center">
          <label className="text-base font-bold self-start justify-self-start">
            Grados:
          </label>
          <div className="flex justify-evenly flex-wrap max-w-[10rem]">
            <label className="flex gap-x-2 p-2">
              <input
                onChange={handleCheckboxChange}
                type="checkbox"
                value={1}
                checked={form.grados.has(1)}
              />
              1
            </label>

            <label className="flex gap-x-2 p-2">
              <input
                onChange={handleCheckboxChange}
                type="checkbox"
                value={2}
                checked={form.grados.has(2)}
              />
              2
            </label>

            <label className="flex gap-x-2 p-2">
              <input
                onChange={handleCheckboxChange}
                type="checkbox"
                value={3}
                checked={form.grados.has(3)}
              />
              3
            </label>

            <label className="flex gap-x-2 p-2">
              <input
                onChange={handleCheckboxChange}
                type="checkbox"
                value={4}
                checked={form.grados.has(4)}
              />
              4
            </label>

            <label className="flex gap-x-2 p-2">
              <input
                onChange={handleCheckboxChange}
                type="checkbox"
                value={5}
                checked={form.grados.has(5)}
              />
              5
            </label>
          </div>
        </div>

        {!successMessage && !isSomethingLoading && error && (
          <ErrorMessage message={error.message} />
        )}

        {!error && !isSomethingLoading && successMessage && (
          <SuccessMessage
            className="text-rojo-orange"
            message={successMessage.message}
          />
        )}

        {!successMessage && (
          <button
            className="button-with-loader py-2"
            disabled={
              Boolean(error) || Boolean(successMessage) || isSomethingLoading
            }
            type="submit"
          >
            Registrar Curso{" "}
            {isSomethingLoading && (
              <Loader backgroundSize="8px" width="25px" color="black" />
            )}
          </button>
        )}
      </form>
    </ModalContainer>
  );
};

export default RegisterCourse;
