export enum ResourceType {
  Archivo,
  Foro,
  Tarea,
  URL,
  Cuestionario,
}

export interface RecursoTema {
  Id_Recurso_Tema: number;
  Titulo: string;
  Descripcion_Recurso: string | null;
  Imagen_Key_S3: string | null;
  Tipo: ResourceType;
}

export interface RecursoTemaRegisterFields {
  Titulo: string;
  Descripcion_Recurso?: string;
}

// Esta interfaz representa la respuesta JSON que se espera del endpoint
export interface RecursosTemaResponse {
  message?: string; // Mensaje de error o informativo en caso de ser necesario
  recursos?: RecursoTema[]; // Array de recursos (puede estar vacío si no hay recursos)
}
