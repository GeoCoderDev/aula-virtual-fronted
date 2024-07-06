import { EstadosInterpretacion } from "@/app/assets/EstadosInterpretacion";
import ToggleStateModal from "@/components/shared/modals/ToggleStateModal";
import { MinimalTeacher, Teacher } from "@/interfaces/Teacher";
import Link from "next/link";
import { useState } from "react";

const TeacherRow = ({
  DNI_Profesor,
  Nombres,
  Apellidos,
  Estado,
  togleStateFunction,
}: MinimalTeacher & { togleStateFunction: (dni: string) => void }) => {
  const [viewModal, setViewModal] = useState(false);

  return (
    <tr className="-border-2">
      <td className="p-4 text-center">{DNI_Profesor}</td>
      <td className="p-4 text-center">{Nombres}</td>
      <td className="p-4 text-center">{Apellidos}</td>
      <td className="p-4 text-center">{EstadosInterpretacion[Estado]}</td>
      <td className="px-6">
        <div className="w-full flex items-center justify-center gap-x-4">
          <Link
            href={`/editar/${DNI_Profesor}`}
            as={`profesores/editar/${DNI_Profesor}`}
          >
            <button className="edition-button">Editar</button>
          </Link>
          <Link
            href={`/ver/${DNI_Profesor}`}
            as={`profesores/ver/${DNI_Profesor}`}
          >
            <button className="ver-button">Ver</button>
          </Link>
          <button
            onClick={() => {
              setViewModal(true);
            }}
            className={`deshabilitar-habilitar-button ${
              Estado === 1 ? "bg-rojo-orange" : "bg-teal-400"
            }`}
          >
            {Estado === 1 ? "Deshabilitar" : "Habilitar"}
          </button>

          {viewModal && (
            <ToggleStateModal
              DNI={DNI_Profesor}
              toggleStateFunction={() => {
                togleStateFunction(DNI_Profesor);
              }}
              eliminateModal={() => {
                setViewModal(false);
              }}
              currentState={Estado}
              userType="profesor"
            />
          )}
        </div>
      </td>
    </tr>
  );
};

export default TeacherRow;
