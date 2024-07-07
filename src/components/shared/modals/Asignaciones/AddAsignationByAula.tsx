import React, {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  LegacyRef,
  useEffect,
  useRef,
  useState,
} from "react";
import ModalContainer from "../../ModalContainer";
import { ModalNoActions } from "@/interfaces/ModalNoActions";
import useRequestAPIFeatures from "@/app/hooks/useRequestAPIFeatures";
import { ErrorAPI, SuccessMessageAPI } from "@/interfaces/API";
import { ClassroomAdditionalDataResponse } from "@/interfaces/Classrooms";
import { Asignacion, DiaSemana, diasSemana } from "@/interfaces/Asignation";
import { Aula } from "@/interfaces/Aula";
import { HHMMSSToHHMM } from "@/lib/helpers/functions/HHMMSSToHHMM";
import TeacherSelector from "@/components/inputs/TeacherSelector";
import { MinimalTeacher, TeacherDNI } from "@/interfaces/Teacher";
import Loader from "../../Loader";
import { equalObjects } from "@/lib/helpers/equalObjects";
import ErrorMessage from "../../messages/ErrorMessage";
import SuccessMessage from "../../messages/SuccessMessage";

interface AsignationRegisterForm extends TeacherDNI {
  Id_Curso_Aula?: number;
  Dia_Semana: DiaSemana;
  Id_Hora_Academica_Inicio?: number;
  Cant_Horas_Academicas: number;
}

const initialState: AsignationRegisterForm = {
  DNI_Profesor: "",
  Cant_Horas_Academicas: 1,
  Dia_Semana: "Lunes",
};

const AddAsignationByAula = ({
  eliminateModal,
  Grado,
  Seccion,
  addAsignacionInFrontend,
}: ModalNoActions &
  Aula & { addAsignacionInFrontend: (asignacion: Asignacion) => void }) => {
  const [classroomAdditionalData, setClassroomAdditionalData] =
    useState<ClassroomAdditionalDataResponse>();

  const [form, setForm] = useState(initialState);
  const [urlImageTeacherSelected, setUrlImageTeacherSelected] =
    useState<string>();

  const [selectedTeacher, setSelectedTeacher] = useState<MinimalTeacher>();

  const selectCourse = useRef<HTMLSelectElement>();

  const {
    fetchAPI,
    isSomethingLoading,
    setIsSomethingLoading,
    error,
    setError,
    successMessage,
    setSuccessMessage,
  } = useRequestAPIFeatures();

  useEffect(() => {
    const fetchCancelable = fetchAPI(`/api/classrooms/additionalData`, "GET", {
      Grado,
      Seccion,
    });

    if (!fetchCancelable) return;

    const fetchClassroomAdditionalData = async () => {
      try {
        const res = await fetchCancelable.fetch();

        if (!res.ok) throw new Error();

        const resObject: ClassroomAdditionalDataResponse = await res.json();

        setClassroomAdditionalData(() => resObject);
      } catch (e) {
        setError(() => ({
          message:
            "No se pudo obtener los datos para registrar una nueva asignación",
        }));
      }
    };

    fetchClassroomAdditionalData();
  }, [fetchAPI]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!form.DNI_Profesor)
      return setError(() => ({ message: "Debes seleccionar un profesor" }));

    try {
      const fetchCancelable = fetchAPI(
        "/api/asignations",
        "POST",
        null,
        JSON.stringify(form)
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
        const { message, Id, Id2 }: SuccessMessageAPI = await res.json();

        if (Id && Id2) {
          const newAsignation: Asignacion = {
            Id_Asignacion: Id,
            Dia_Semana: form.Dia_Semana,
            Cant_Horas_Academicas: form.Cant_Horas_Academicas,
            DNI_Profesor: form.DNI_Profesor,
            Id_Curso_Aula: form.Id_Curso_Aula!,
            Id_Hora_Academica: form.Id_Hora_Academica_Inicio!,
            Id_Horario_Curso_Aula: Id2,
            Nombre_Curso:
              selectCourse.current?.options[selectCourse.current.selectedIndex]
                .text!,
          };

          addAsignacionInFrontend(newAsignation);
        }

        setSuccessMessage(() => ({
          message: message ?? "Asignacion añadida correctamente",
        }));
        setForm(() => initialState);
        setSelectedTeacher(undefined);
      }

      setIsSomethingLoading(false);
    } catch (e) {
      setError(() => ({
        message: "No se pudo añadir la asignacion",
      }));
      setIsSomethingLoading(false);
    }
  };

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setError(null);
    setSuccessMessage(null);
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <ModalContainer
      eliminateModal={(e) => {
        if (!isSomethingLoading) eliminateModal(e);
      }}
    >
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
        <h3 className="section-tittle min-w-full text-center text-[1.5rem] flex justify-center mb-2">
          AULA - {Grado}
          {Seccion} &nbsp;&nbsp;|&nbsp;&nbsp; Agregar Asignación
        </h3>
        <div className="flex gap-6 items-stretch">
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-x-4 gap-y-2 ">
              Curso:
              <select
                onChange={handleChange}
                disabled={!classroomAdditionalData}
                name="Id_Curso_Aula"
                className="custom-input w-[10rem] max-w-[10rem] text-center"
                value={form.Id_Curso_Aula ?? ""}
                required
                ref={selectCourse as LegacyRef<HTMLSelectElement>}
              >
                <option disabled value={""}>
                  - seleccione -
                </option>
                {classroomAdditionalData &&
                  classroomAdditionalData.Cursos_Aula.map(
                    ({ Id_Curso_Aula, Nombre }, index) => (
                      <option key={index} value={Id_Curso_Aula}>
                        {Nombre}
                      </option>
                    )
                  )}
              </select>
            </label>

            <label className=" flex flex-col gap-x-4 gap-y-2 ">
              Dia Semana:
              <select
                onChange={handleChange}
                name="Dia_Semana"
                className="custom-input w-[10rem] max-w-[10rem] text-center"
                value={form.Dia_Semana}
                required
              >
                {diasSemana.map((diaSem, index) => (
                  <option key={index} value={diaSem}>
                    {diaSem}
                  </option>
                ))}
              </select>
            </label>

            <label className=" flex flex-col gap-x-4 gap-y-2 ">
              Hora Inicio:
              <select
                onChange={handleChange}
                disabled={!classroomAdditionalData}
                name="Id_Hora_Academica_Inicio"
                className="custom-input w-[10rem] max-w-[10rem] text-center"
                value={form.Id_Hora_Academica_Inicio ?? ""}
                required
              >
                <option disabled value={""}>
                  - seleccione -
                </option>
                {classroomAdditionalData &&
                  classroomAdditionalData.Horas_Academicas.map(
                    ({ Id_Hora_Academica, Valor }, index, arr) =>
                      index !== arr.length - 1 ? (
                        <option key={index} value={Id_Hora_Academica}>
                          {HHMMSSToHHMM(Valor)}
                        </option>
                      ) : (
                        <></>
                      )
                  )}
              </select>
            </label>

            <label className=" flex flex-col gap-x-4 gap-y-2 ">
              Horas Academicas:
              <select
                onChange={handleChange}
                name="Cant_Horas_Academicas"
                className="custom-input w-[5rem] max-w-[5rem] text-center"
                value={form.Cant_Horas_Academicas}
                required
              >
                {Array.from({ length: 8 }, (_, index) => index + 1).map(
                  (num, index) => (
                    <option value={num} key={index}>
                      {num}
                    </option>
                  )
                )}
              </select>
            </label>
          </div>

          <fieldset className="flex flex-col -border-2 border-black w-max p-4 rounded-[1rem] gap-1 ">
            <label className=" text-[1.2rem] font-semibold ">Profesor:</label>

            <TeacherSelector
              selectedTeacher={selectedTeacher}
              setSelectedTeacher={setSelectedTeacher}
              setError={setError}
              setForm={setForm as Dispatch<React.SetStateAction<TeacherDNI>>}
              setUrlImageTeacherSelected={setUrlImageTeacherSelected}
            />

            <div className="flex-1 flex items-center justify-center">
              <img
                className={`aspect-square  w-40 rounded-[50%] bg-contain object-cover bg-no-repeat bg-center ${
                  urlImageTeacherSelected ? "border-2" : ""
                }`}
                src={urlImageTeacherSelected ?? "/svg/No-Foto-Perfil.svg"}
                alt="Foto Perfil"
              />
            </div>
          </fieldset>
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
        <button
          className="button-with-loader py-2 w-max self-center"
          disabled={
            Boolean(error) ||
            Boolean(successMessage) ||
            isSomethingLoading ||
            equalObjects(initialState, form)
          }
          type="submit"
        >
          Añadir Asignación{" "}
          {isSomethingLoading && (
            <Loader backgroundSize="8px" width="25px" color="black" />
          )}
        </button>
      </form>
    </ModalContainer>
  );
};

export default AddAsignationByAula;
