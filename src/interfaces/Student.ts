import { Aula } from "./Aula";
import { User } from "./User";

export interface Student extends User {
  DNI_Estudiante: string;
  Grado: string;
  Seccion: string;
}

export interface StudentEditionForm extends Aula {
  Nombres: string;
  Apellidos: string;
  Fecha_Nacimiento: string;
  Nombre_Usuario: string;
  Direccion_Domicilio: string;
  Telefono: string;
  Nombre_Contacto_Emergencia: string;
  Parentezco_Contacto_Emergencia: string;
  Telefono_Contacto_Emergencia: string;
}

export interface StudentRegisterForm extends StudentEditionForm {
  DNI_Estudiante: string;
  Contraseña_Usuario: string;
}

export interface StudentResponse extends StudentEditionForm {
  DNI_Estudiante: string;
  Estado: number;
  Foto_Perfil_URL?: string;
  Id_Usuario: number;
}
