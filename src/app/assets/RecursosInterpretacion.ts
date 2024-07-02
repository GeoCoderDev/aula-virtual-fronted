import { ResourceType } from "@/interfaces/RecursoTema";

export const RecursosTipoInterpretacion: { [key: string]: string } = {
  [ResourceType.Archivo]: "Archivo",
  [ResourceType.Foro]: "Foro",
  [ResourceType.Tarea]: "Tarea",
  [ResourceType.URL]: "URL",
  [ResourceType.Cuestionario]: "Cuestionario",
};
