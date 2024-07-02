import { Topic } from "./Topic";

export interface Course {
  Id_Curso: number;
  Nombre_Curso: string;
  Grados: string;
}

export interface CourseResponse {
  Id_Curso_Aula: number;
  Nombre_Curso: string;
  Grado: string;
  Seccion: string;
}

export interface CourseDataResponse {
  Id_Curso_Aula: number;
  Grado: string;
  Seccion: string;
  Nombre_Curso: string;
  Temas?: Topic[];
  Profesor_Asociado?: string;
}

