import { EstadosInterpretacion } from "@/app/assets/EstadosInterpretacion";
import { Student } from "@/interfaces/Student";

const StudentRow = ({DNI_Estudiante, Nombres, Apellidos, Grado, Seccion, Estado}:Student) => {
  return (
    <tr className="-border-2">
      <td className="p-4 text-center">{DNI_Estudiante}</td>
      <td className="p-4 text-center">{Nombres}</td>
      <td className="p-4 text-center">{Apellidos}</td>
      <td className="p-4 text-center">{Grado}</td>
      <td className="p-4 text-center">{Seccion}</td>
      <td className="p-4 text-center">{EstadosInterpretacion[Estado]}</td>
      <td >
        <div className="w-full flex justify-center gap-x-4">
          <button  className="text-white font-medium px-2 py-1 rounded-lg bg-amarillo-pooh" >Editar</button>
          <button className="text-white font-medium px-2 py-1 rounded-lg bg-azul-pablo" >Ver</button>
          <button  className={`text-white font-medium px-2 py-1 rounded-lg ${Estado===1?'bg-rojo-orange': 'bg-teal-400'}`}>{Estado===1?"Deshabilitar":"Habilitar"}</button>
        </div>
      </td>
    </tr>
  );
};

export default StudentRow;
