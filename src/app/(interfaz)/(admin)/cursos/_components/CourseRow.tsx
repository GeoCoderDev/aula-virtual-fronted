import { Course } from "@/interfaces/Course";

const CourseRow = ({ course }: { course: Course }) => {
  return (
    <tr className="">
      <td className="p-3 text-center">{course.Id_Curso}</td>
      <td className="p-3 text-center">{course.Nombre_Curso}</td>
      <td className="p-3 text-center">{course.Grados}</td>
      <td className="flex justify-evenly">
      <td className=" p-3 h-full flex items-center justify-center">
        <div className=" w-full flex items-center justify-center gap-x-4 h-full">
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
