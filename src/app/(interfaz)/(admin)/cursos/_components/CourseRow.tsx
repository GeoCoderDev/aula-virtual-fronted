import { Course } from "@/interfaces/Course";

const CourseRow = ({ course }: { course: Course }) => {
  return (
    <tr className="-border-2">
      <td className="p-4 text-center">{course.Id_Curso}</td>
      <td className="p-4 text-center">{course.Nombre_Curso}</td>
      <td className="p-4 text-center">{course.Grados}</td>
      <td className="flex justify-evenly">
      <td>
        <div className="w-full flex justify-center gap-x-4">
          <button className="edition-button">Editar</button>
          <button className="deshabilitar-habilitar-button bg-rojo-orange">
            Deshabilitar
          </button>
        </div>
      </td>
      
      </td>
    </tr>
  );
};

export default CourseRow;
