import { MinimalStudent } from "./Student";
import { Aula } from "./Aula";
import { RecursoTemaRegisterFields } from "./RecursoTema";

export interface RespuestaForo {
  Id_Respuesta_Foro: number;
  Respuesta: string;
  Estudiante: MinimalStudent;
}

export interface ForoDataResponse extends Aula, RecursoTemaRegisterFields {
  Nombre_Tema: string;
  Nombre_Curso: string;
  Id_Foro: number;
  Descripcion_Imagen_URL?: string;
  Respuestas: RespuestaForo[];
  isTeacher: boolean;
  isAnswered: boolean;
}
