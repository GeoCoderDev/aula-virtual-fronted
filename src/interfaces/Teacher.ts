import { User } from "./User";

export interface Teacher extends User {
  DNI_Profesor: string;
}

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

export interface TeacherRegisterForm extends TeacherEditionForm {
  DNI_Profesor: string;
  Contraseña_Usuario: string;
}

export interface TeacherResponse extends TeacherEditionForm {
    DNI_Profesor: string;
    Estado: number;
    Foto_Perfil_URL?: string;
    Id_Usuario: number;
  }
  