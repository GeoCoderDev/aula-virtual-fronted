import { Course } from "@/interfaces/Course";

const CourseRow = ({ course }: { course: Course }) => {
  return (
    <tr>
      <td className="text-center">{course.Id_Curso}</td>
      <td className="text-center">{course.Nombre_Curso}</td>
      <td className="text-center">{course.Grados}</td>
      <td className="flex justify-evenly">
        <button className="edition-button">Editar</button>
        <button className="deshabilitar-habilitar-button bg-rojo-orange">
          Deshabilitar
        </button>
      </td>
    </tr>
  );
};

export default CourseRow;
