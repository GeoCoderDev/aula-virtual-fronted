import { Student } from "@/interfaces/Student";

const StudentRow = ({DNI_Estudiante, Nombres, Apellidos, Grado, Seccion}:Student) => {
  return (
    <tr>
      <td style={{ padding: "1em" }}>{DNI_Estudiante}</td>
      <td style={{ padding: "1em" }}>{Nombres}</td>
      <td style={{ padding: "1em" }}>{Apellidos}</td>
      <td style={{ padding: "1em" }}>{Grado}</td>
      <td style={{ padding: "1em" }}>{Seccion}</td>
      <td style={{ padding: "1em" }}>
        <button style={{ marginRight: "5px" }}>Eliminar</button>
        <button style={{ marginRight: "5px" }}>Editar</button>
        <button>Ver</button>
      </td>
    </tr>
  );
};

export default StudentRow;
