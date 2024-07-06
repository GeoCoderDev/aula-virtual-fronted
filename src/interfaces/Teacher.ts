import { MinimalUser, User } from "./User";

export interface TeacherDNI {
  DNI_Profesor: string;
}

export interface MinimalTeacher extends MinimalUser, TeacherDNI {}

export interface Teacher extends User, TeacherDNI {}

export interface TeacherEditionForm {
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

export interface TeacherRegisterForm extends TeacherEditionForm, TeacherDNI {
  Contraseña_Usuario: string;
}

export interface TeacherResponse extends TeacherEditionForm, TeacherDNI {
  Estado: number;
  Foto_Perfil_URL?: string;
  Id_Usuario: number;
}
