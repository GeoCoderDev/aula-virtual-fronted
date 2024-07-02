import { IconProps } from "@/components/icons/icon.interface";
import { ReactElement } from "react";
import MyCoursesIcon from "../../../components/icons/sidebar/MyCoursesIcon";
import HorarioIcon from "@/components/icons/sidebar/HorarioIcon";
import AsistenciaIcon from "@/components/icons/sidebar/AsistenciaIcon";

import { Role } from "@/interfaces/Role";
import EstudiantesIcon from "@/components/icons/sidebar/EstudiantesIcon";
import ProfesoresIcon from "@/components/icons/sidebar/ProfesoresIcon";
import CursosIcon from "@/components/icons/sidebar/CursosIcon";
import SeccionesIcon from "@/components/icons/sidebar/SeccionesIcon";
import AsignacionesIcon from "@/components/icons/sidebar/AsignacionesIcon";
import ConfiguracionesIcon from "@/components/icons/sidebar/ConfiguracionesIcon";
import AdministradoresIcon from "@/components/icons/sidebar/AdministradoresIcon";

export interface PageApp {
  route: string;
  text: string;
  IconTSX: (props: IconProps) => ReactElement;
  allowedRoles: Role[]; // Propiedad para roles permitidos
}

const pagesApp: PageApp[] = [

  {
    route: "administradores",
    text: "Administradores",
    IconTSX: (props: IconProps) => {
      return <AdministradoresIcon  {...props} />;
    },
    allowedRoles: ["superadmin" ]
  },

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
    route: "estudiantes",
    text: "Estudiantes",
    IconTSX: (props: IconProps) => {
      return <EstudiantesIcon {...props} />;
    },
    allowedRoles: ["admin", "superadmin" ]
  },

  {
    route: "profesores",
    text: "Profesores",
    IconTSX: (props: IconProps) => {
      return <ProfesoresIcon  {...props} />;
    },
    allowedRoles: ["admin", "superadmin" ]
  },

  {
    route: "cursos",
    text: "Cursos",
    IconTSX: (props: IconProps) => {
      return <CursosIcon  {...props} />;
    },
    allowedRoles: ["admin", "superadmin" ]
  },

  {
    route: "secciones",
    text: "Secciones",
    IconTSX: (props: IconProps) => {
      return <SeccionesIcon  {...props} />;
    },
    allowedRoles: ["admin", "superadmin" ]
  },
  {
    route: "asignaciones",
    text: "Asignaciones",
    IconTSX: (props: IconProps) => {
      return <AsignacionesIcon  {...props} />;
    },
    allowedRoles: ["admin", "superadmin" ]
  },

  {
    route: "configuraciones",
    text: "Configuraciones",
    IconTSX: (props: IconProps) => {
      return <ConfiguracionesIcon  {...props} />;
    },
    allowedRoles: ["admin", "superadmin" ]
  }

  



];

export default pagesApp;
