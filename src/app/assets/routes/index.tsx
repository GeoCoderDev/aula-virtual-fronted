import { IconProps } from "@/components/icons/icon.interface";
import { ReactElement } from "react";
import MyCoursesIcon from "../../../components/icons/sidebar/MyCoursesIcon";
import HorarioIcon from "@/components/icons/sidebar/HorarioIcon";
import AsistenciaIcon from "@/components/icons/sidebar/AsistenciaIcon";
import CalificacionesIcon from "@/components/icons/sidebar/CalificacionesIcon";
import ReportesIcon from "@/components/icons/sidebar/ReportesIcon";
import { AllowedRoles } from "@/interfaces/Role";

export interface PageApp {
  route: string;
  text: string;
  IconTSX: (props: IconProps) => ReactElement;
  allowedRoles: AllowedRoles[]; // Propiedad para roles permitidos
}

const pagesApp: PageApp[] = [
  {
    route: "mis-cursos",
    text: "Mis Cursos",
    IconTSX: (props: IconProps) => {
      return <MyCoursesIcon {...props} />;
    },
    allowedRoles: ["teacher", "student"],
  },
  {
    route: "horario",
    text: "Horario",
    IconTSX: (props: IconProps) => {
      return <HorarioIcon {...props} />;
    },
    allowedRoles: ["teacher", "student"],
  },
  {
    route: "asistencia",
    text: "Asistencia",
    IconTSX: (props: IconProps) => {
      return <AsistenciaIcon {...props} />;
    },
    allowedRoles: ["teacher", "student"],
  },
  {
    route: "calificaciones",
    text: "Calificaciones",
    IconTSX: (props: IconProps) => {
      return <CalificacionesIcon {...props} />;
    },
    allowedRoles: ["teacher", "student"],
  },
  {
    route: "reportes",
    text: "Reportes",
    IconTSX: (props: IconProps) => {
      return <ReportesIcon {...props} />;
    },
    allowedRoles: ["teacher", "student"],
  },
];

export default pagesApp;
