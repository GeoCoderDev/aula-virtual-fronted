import { IconProps } from "@/components/icons/icon.interface";
import ArchivoIcon from "@/components/icons/RecursoTema/ArchivoIcon";
import CuestionarioIcon from "@/components/icons/RecursoTema/CuestionarioIcon";
import ForoIcon from "@/components/icons/RecursoTema/ForoIcon";
import TareaIcon from "@/components/icons/RecursoTema/TareaIcon";
import URLIcon from "@/components/icons/RecursoTema/URLIcon";
import { ResourceType } from "@/interfaces/RecursoTema";

export const RecursosIcon = {
  [ResourceType.Archivo]: (props: IconProps) => <ArchivoIcon {...props} />,
  [ResourceType.Foro]: (props: IconProps) => <ForoIcon {...props} />,
  [ResourceType.Tarea]: (props: IconProps) => <TareaIcon {...props} />,
  [ResourceType.URL]: (props: IconProps) => <URLIcon {...props} />,
  [ResourceType.Cuestionario]: (props: IconProps) => (
    <CuestionarioIcon {...props} />
  ),
};
