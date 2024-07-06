import React, {
  ChangeEventHandler,
  Dispatch,
  LegacyRef,
  useEffect,
  useRef,
  useState,
} from "react";
import DoubleChevronIcon from "../icons/others/DoubleChevronIcon";
import { useDelegacionEventos } from "../../lib/utils/delegacionDeEventos";
import SearchIcon from "../icons/others/SearchIcon";
import { MinimalTeacher, TeacherDNI } from "@/interfaces/Teacher";
import { SearchTermsTeacher } from "@/app/(interfaz)/(admin)/profesores/page";
import useBatchAPI from "@/app/hooks/useBatchAPI";
import Loader from "../shared/Loader";
import ErrorMessage from "../shared/messages/ErrorMessage";
import WarningMessage from "../shared/messages/WarningMessage";

const TeacherFinded = ({
  minimalTeacher: { DNI_Profesor, Nombres, Apellidos, Id_Usuario },
  closeResults,
}: {
  minimalTeacher: MinimalTeacher;
  closeResults: () => void;
}) => {
  return (
    <div
      onClick={closeResults}
      className="max-w-full flex font-normal text-[0.8rem] items-center justify-between gap-4"
    >
      <span
        title={`${Nombres} ${Apellidos}`}
        className=" flex-1 whitespace-nowrap text-ellipsis overflow-hidden"
      >
        {Nombres} {Apellidos}
      </span>
      <span>{DNI_Profesor}</span>
    </div>
  );
};

const searchTermsInitial: SearchTermsTeacher & { conjuncion: boolean } = {
  dni: "",
  nombre: "",
  apellidos: "",
  conjuncion: true,
};

const limitStudentsRequired = 10;

const TeachersFindedContainer = ({
  setForm,
  setViewTeachers,
  setUrlImageTeacherSelected,
  setSelectedTeacher,
}: {
  setViewTeachers: Dispatch<React.SetStateAction<boolean>>;
  setForm: Dispatch<React.SetStateAction<TeacherDNI>>;
  setUrlImageTeacherSelected?: Dispatch<
    React.SetStateAction<string | undefined>
  >;
  setSelectedTeacher: Dispatch<
    React.SetStateAction<MinimalTeacher | undefined>
  >;
}) => {
  const [searchTerms, setSearchTerms] = useState(searchTermsInitial);
  const inputDNINombreApellido = useRef<HTMLInputElement>();

  const { results, isLoading, allResultsGetted, error } =
    useBatchAPI<MinimalTeacher>(
      "/api/teachers",
      limitStudentsRequired,
      0,
      searchTerms as any,
      [inputDNINombreApellido, inputDNINombreApellido, inputDNINombreApellido]
    );

  const handleChangeMultipleInput: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setSearchTerms((prev) => ({
      ...prev,
      apellidos: e.target.value,
      nombre: e.target.value,
      dni: e.target.value,
    }));
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      id="teacher-results"
      style={{ boxShadow: "0 0 8px 2px #00000040" }}
      className="animate__animated animate__fadeIn [animation-duration:150ms] absolute rounded-[0.5rem] top-full mt-2 left-0 flex flex-col bg-white w-full  max-h-[min(10rem,80vh)] overflow-auto"
    >
      <form className="sticky top-0 bg-white p-2">
        <label
          className="flex overflow-hidden gap-2"
          title="Busca por DNI, Nombre o Apellido"
        >
          <SearchIcon className="w-[1.2rem]" />
          <input
            onChange={handleChangeMultipleInput}
            ref={inputDNINombreApellido as LegacyRef<HTMLInputElement>}
            placeholder="Busca por DNI, Nombre o Apellido"
            className="placeholder:text-[#999] font-normal outline-none whitespace-nowrap text-ellipsis overflow-hidden text-[0.8rem] w-full"
            type="text"
            maxLength={35}
          />
        </label>
        <hr className="mt-2" />
      </form>
      <div className="flex flex-col gap-2 max-w-full px-2 pb-2 text-black">
        {!error && isLoading && (
          <Loader
            className="self-center"
            color="black"
            durationSegundos={1}
            backgroundSize="6px"
            width="20px"
          />
        )}

        {error && !isLoading && <ErrorMessage message={error.message} />}

        {!error && !isLoading && results.length === 0 && (
          <WarningMessage message="No se encontraron resultados" />
        )}

        {results.map((minimalTeacher, index) => (
          <TeacherFinded
            minimalTeacher={minimalTeacher}
            key={index}
            closeResults={() => {
              setViewTeachers(false);
              setSelectedTeacher(() => minimalTeacher);
              setForm((prev) => ({
                ...prev,
                DNI_Profesor: minimalTeacher.DNI_Profesor,
              }));
              setUrlImageTeacherSelected?.(
                () => minimalTeacher.Foto_Perfil_URL
              );
            }}
          />
        ))}
      </div>
    </div>
  );
};

const TeacherSelector = ({
  className = "",
  setForm,
  setUrlImageTeacherSelected,
}: {
  className?: string;
  setForm: Dispatch<React.SetStateAction<TeacherDNI>>;
  setUrlImageTeacherSelected?: Dispatch<
    React.SetStateAction<string | undefined>
  >;
}) => {
  const [viewTeachers, setViewTeachers] = useState(false);

  const { delegarEvento, eliminarEvento } = useDelegacionEventos();

  const [selectedTeacher, setSelectedTeacher] = useState<MinimalTeacher>();

  useEffect(() => {
    if (!delegarEvento) return;

    delegarEvento(
      "click",
      "#teacher-selector, #teacher-selector *, #teacher-results, #teacher-results *",
      (e) => {
        setViewTeachers(false);
      },
      true
    );
  }, [delegarEvento, eliminarEvento]);

  return (
    <div
      id="teacher-selector"
      className={`relative flex justify-between gap-4 custom-input w-[15rem] items-center cursor-pointer hover:grayscale-[0.5] select-none ${
        viewTeachers ? "text-[#888]" : "text-black"
      } ${className}`}
      onClick={() => setViewTeachers((prev) => !prev)}
    >
      <div className="flex-1 flex justify-between gap-4 whitespace-nowrap text-ellipsis overflow-hidden text-[0.9rem]">
        {(selectedTeacher && (
          <>
            <span
              title={`${selectedTeacher.Nombres} ${selectedTeacher.Apellidos}`}
              className=" flex-1 whitespace-nowrap text-ellipsis overflow-hidden"
            >
              {selectedTeacher.Nombres} {selectedTeacher.Apellidos}
            </span>
            <span>{selectedTeacher.DNI_Profesor}</span>
          </>
        )) ||
          "Selecciona un Profesor"}
      </div>
      <DoubleChevronIcon className="w-[1rem]" title="Seleccionar" />

      {viewTeachers && (
        <TeachersFindedContainer
          setForm={setForm}
          setSelectedTeacher={setSelectedTeacher}
          setViewTeachers={setViewTeachers}
          setUrlImageTeacherSelected={setUrlImageTeacherSelected}
        />
      )}
    </div>
  );
};

export default TeacherSelector;
