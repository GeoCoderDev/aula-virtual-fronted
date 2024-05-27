import { EstadosInterpretacion } from "@/app/assets/EstadosInterpretacion";
import { Student } from "@/interfaces/Student";
import Link from "next/link";

const StudentRow = ({
  DNI_Estudiante,
  Nombres,
  Apellidos,
  Grado,
  Seccion,
  Estado,
}: Student) => {
  return (
    <tr className="-border-2">
      <td className="p-4 text-center">{DNI_Estudiante}</td>
      <td className="p-4 text-center">{Nombres}</td>
      <td className="p-4 text-center">{Apellidos}</td>
      <td className="p-4 text-center">{Grado}</td>
      <td className="p-4 text-center">{Seccion}</td>
      <td className="p-4 text-center">{EstadosInterpretacion[Estado]}</td>
      <td>
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
            <button className="ver-button">
              Ver
            </button>
          </Link>
          <button
            className={`deshabilitar-habilitar-button ${
              Estado === 1 ? "bg-rojo-orange" : "bg-teal-400"
            }`}
          >
            {Estado === 1 ? "Deshabilitar" : "Habilitar"}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default StudentRow;
