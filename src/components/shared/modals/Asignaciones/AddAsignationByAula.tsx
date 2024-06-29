import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import ModalContainer from "../../ModalContainer";
import { ModalNoActions } from "@/interfaces/ModalNoActions";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";

const AddAsignationByAula = ({ eliminateModal }: ModalNoActions & {}) => {
  const initialForm = {};

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

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const fetchCancelable = fetchAPI("/api/courses", "POST", null);

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
    <ModalContainer
      eliminateModal={(e) => {
        if (!isSomethingLoading) eliminateModal(e);
      }}
    >
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Añadir asignación</h2>
          <form className="flex flex-col gap-y-4">
            <label htmlFor="curso">Curso:</label>
            <select
              id="curso"
              name="curso"
              value="curso"
              className="border border-gray-300 p-2 rounded-md"
            >
              <option value="">Selecciona un curso</option>
              <option value="Curso 1">Curso 1</option>
              <option value="Curso 2">Curso 2</option>
              <option value="Curso 3">Curso 3</option>
            </select>

            <label htmlFor="dia">Día:</label>
            <select
              id="dia"
              name="dia"
              value="dia"
              className="border border-gray-300 p-2 rounded-md"
            >
              <option value="">Selecciona un día</option>
              <option value="Lunes">Lunes</option>
              <option value="Martes">Martes</option>
              <option value="Miércoles">Miércoles</option>
              <option value="Jueves">Jueves</option>
              <option value="Viernes">Viernes</option>
              <option value="Sábado">Sábado</option>
            </select>

            <label htmlFor="horaInicio">Hora de inicio:</label>
            <input
              type="time"
              id="horaInicio"
              name="horaInicio"
              value="horaInicio"
              className="border border-gray-300 p-2 rounded-md"
            />

            <label htmlFor="cantidadHoras">Cantidad de horas:</label>
            <select className="border border-gray-300 p-2 rounded-md">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>

            <div>
              <label htmlFor="profesorSeleccionado">Profesores:</label>
              <select
                id="profesorSeleccionado"
                name="profesorSeleccionado"
                value="profesorSeleccionado"
                className="border border-gray-300 p-2 rounded-md"
              >
                <option value="">Selecciona un profesor</option>
                <option value="profesor1">Profesor 1</option>
                <option value="profesor2">Profesor 2</option>
                <option value="profesor3">Profesor 3</option>
              </select>
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-300 px-4 py-2 rounded-lg font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                onClick={closeModal}
                className="bg-verde-spotify px-4 py-2 rounded-lg text-white font-semibold ml-2"
              >
                Aceptar
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalContainer>
  );
};

export default AddAsignationByAula;
