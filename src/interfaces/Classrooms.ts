import { HoraAcademica } from "./Horario";

export type Grado = "1" | "2" | "3" | "4" | "5";

export interface GradosSecciones {
  [grado: string]: string[];
}

export interface CursoAula {
  Id_Curso_Aula: number;
  Nombre: string;
}

export interface ClassroomAdditionalDataResponse {
  Cursos_Aula: CursoAula[];
  Id_Aula: number;
  Horas_Academicas: HoraAcademica[];
}
