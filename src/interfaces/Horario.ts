import { DiaSemana } from "./Asignation";
import { Aula } from "./Aula";

export interface HoraAcademica {
  Id_Hora_Academica: number;
  Valor: string;
}

export interface HorarioCursoAula {
  Id_Horario_Curso_Aula: number;
  Dia_Semana: DiaSemana;
  Id_Hora_Academica: number;
  Cant_Horas_Academicas: number;
  Nombre_Curso: string;
  DNI_Profesor?: string;
  Nombre_Profesor?: string;
  Apellido_Profesor?: string;
  Grado?: string;
  Seccion?: string;
}

export interface HorarioResponse {
  Horas_Academicas: HoraAcademica[];
  Horario: HorarioCursoAula[];
  isTeacher: boolean;
  Nombre_Profesor?: string;
  Apellido_Profesor?: string;
  Grado?: string;
  Seccion?: string;
}
