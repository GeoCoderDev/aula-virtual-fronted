import { IconProps } from "@/components/icons/icon.interface";
import { ReactElement } from "react";
import MyCoursesIcon from "../../../components/icons/sidebar/MyCoursesIcon";

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
      return <MyCoursesIcon {...props} />
    },
  },
];


export default pagesApp;