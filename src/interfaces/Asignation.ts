import { HoraAcademica, HorarioCursoAula } from "./Horario";

export type DiaSemana =
  | "Lunes"
  | "Martes"
  | "Miercoles"
  | "Jueves"
  | "Viernes"
  | "Sabado";

// Crear un array con todos los valores posibles de DiaSemana
export const diasSemana: DiaSemana[] = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

export interface Asignacion extends HorarioCursoAula{
  Id_Asignacion: number;
  DNI_Profesor: string;
  Id_Curso_Aula: number;
  Hora_Inicio: string;
}


export interface AsignacionResponse {
  Asignaciones: Asignacion[];
  Horas_Academicas: HoraAcademica[];
}

