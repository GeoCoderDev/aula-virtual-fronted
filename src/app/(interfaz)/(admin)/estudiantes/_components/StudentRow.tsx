import { EstadosInterpretacion } from "@/app/assets/EstadosInterpretacion";
import ToggleStateModal from "@/components/shared/modals/ToggleStateModal";
import { Student, UserEstado } from "@/interfaces/Student";
import Link from "next/link";
import { useState } from "react";

const StudentRow = ({
  DNI_Estudiante,
  Nombres,
  Apellidos,
  Grado,
  Seccion,
  Estado,
  togleStateFunction,
}: Student & { togleStateFunction: (dni: string) => void }) => {
  const [viewModal, setViewModal] = useState(false);

  return (
    <tr className="-border-2">
      <td className="p-4 text-center">{DNI_Estudiante}</td>
      <td className="p-4 text-center">{Nombres}</td>
      <td className="p-4 text-center">{Apellidos}</td>
      <td className="p-4 text-center">{Grado}</td>
      <td className="p-4 text-center">{Seccion}</td>
      <td className="p-4 text-center">{EstadosInterpretacion[Estado]}</td>
      <td className=" px-6">
        <div className="w-full flex justify-center gap-x-4">
          <Link
            href={`/editar/${DNI_Estudiante}`}
            as={`estudiantes/editar/${DNI_Estudiante}`}
          >
            <button className="edition-button">Editar</button>
          </Link>
          <Link
            href={`/ver/${DNI_Estudiante}`}
            as={`estudiantes/ver/${DNI_Estudiante}`}
          >
            <button className="ver-button">Ver</button>
          </Link>
          <button
            onClick={() => {
              setViewModal(true);
            }}
            className={`deshabilitar-habilitar-button ${
              Estado === UserEstado.Habilitado
                ? "bg-rojo-orange"
                : "bg-teal-400"
            }`}
          >
            {Estado === UserEstado.Habilitado ? "Deshabilitar" : "Habilitar"}
          </button>

          {viewModal && (
            <ToggleStateModal
              DNI={DNI_Estudiante}
              toggleStateFunction={() => {
                togleStateFunction(DNI_Estudiante);
              }}
              eliminateModal={() => {
                setViewModal(false);
              }}
              currentState={Estado}
              userType="estudiante"
            />
          )}
        </div>
      </td>
    </tr>
  );
};

export default StudentRow;
