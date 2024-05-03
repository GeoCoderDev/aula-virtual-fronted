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
        <button style={{ marginRight: "5px" }}>ELIMINAR</button>
        <button style={{ marginRight: "5px" }}>EDITAR</button>
        <button>VER</button>
      </td>
    </tr>
  );
};

export default StudentRow;
