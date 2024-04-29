import { IconProps } from "@/components/icons/icon.interface";
import { ReactElement } from "react";
import MyCoursesIcon from "../../../components/icons/sidebar/MyCoursesIcon";
import HorarioIcon from "@/components/icons/sidebar/HorarioIcon";
import AsistenciaIcon from "@/components/icons/sidebar/AsistenciaIcon";
import CalificacionesIcon from "@/components/icons/sidebar/CalificacionesIcon";
import ReportesIcon from "@/components/icons/sidebar/ReportesIcon";

export interface PageApp {
  route: string;
  text: string;
  IconTSX: (props: IconProps) => ReactElement;
}

const pagesApp: PageApp[] = [
  {
    route: "mis-cursos",
    text: "Mis Cursos",
    IconTSX: (props: IconProps) => {
      return <MyCoursesIcon {...props} />;
    },
  },
  {
    route: "horario",
    text: "Horario",
    IconTSX: (props: IconProps) => {
      return <HorarioIcon {...props} />;
    },
  },
  {
    route: "asistencia",
    text: "Asistencia",
    IconTSX: (props: IconProps) => {
      return <AsistenciaIcon {...props} />;
    },
  },
  {
    route: "calificaciones",
    text: "Calificaciones",
    IconTSX: (props: IconProps) => {
      return <CalificacionesIcon {...props} />;
    },
  },
  {
    route: "reportes",
    text: "Reportes",
    IconTSX: (props: IconProps) => {
      return <ReportesIcon {...props} />;
    },
  },
];

export default pagesApp;
