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

export interface Asignacion {
  Id_Asignacion: number;
  DNI_Profesor: string;
  Id_Horario_Curso_Aula: number;
  Nombre_Curso: string;
  Id_Curso_Aula: number;
  Grado: string;
  Seccion: string;
  Dia_Semana: DiaSemana;
  Id_Hora_Academica: number;
  Hora_Inicio: string;
  Cant_Horas_Academicas: number;
}

export interface HoraAcademica {
  Id_Hora_Academica: number;
  Valor: string;
}

export interface AsignacionResponse {
  Asignaciones: Asignacion[];
  Horas_Academicas: HoraAcademica[];
}
