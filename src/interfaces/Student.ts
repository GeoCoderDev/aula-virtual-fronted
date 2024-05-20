import { User } from "./User";

export interface Student extends User {
  DNI_Estudiante: string;
  Grado: string;
  Seccion: string;
}

export interface StudentForm {
  DNI_Estudiante: string;
  Grado: string;
  Seccion: string;
  Nombres: string;
  Apellidos: string;
  Fecha_Nacimiento: string;
  Nombre_Usuario: string;
  Contraseña_Usuario: string;
  Direccion_Domicilio: string;
  Nombre_Contacto_Emergencia: string;
  Parentezco_Contacto_Emergencia: string;
  Telefono_Contacto_Emergencia: string;
}
