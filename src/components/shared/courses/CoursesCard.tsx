import { CourseResponse } from "@/interfaces/Course";
import React from "react";
import { GradosInterpretacion } from "../../../app/assets/GradosInterpretacion";
import Link from "next/link";

const CourseCard = ({
  course: { Grado, Id_Curso_Aula, Nombre_Curso, Seccion },
  backgroundImage,
}: {
  course: CourseResponse;
  backgroundImage: string;
}) => {
  return (
    <Link href={`/${Id_Curso_Aula}`} as={`/mis-cursos/${Id_Curso_Aula}`}>
      <div
        style={{ boxShadow: "0px 0px 18px 1px #00000060" }}
        className="cursor-pointer w-[300px] h-max rounded-lg  overflow-hidden  bg-gray-[#bbb]  -hover:outline-verde-spotify -hover:outline-4 -hover:outline flex flex-col p-4 gap-y-4 hover:rotate-2 transition-all"
      >
        <div
          className="w-full h-[10rem]  bg-cover bg-center rounded-[1rem]"
          style={{ backgroundImage }}
        ></div>
        <div className="h-max flex justify-between flex-wrap items-center gap-x-4 gap-y-2">
          <span className="bg-rojo-orange w-max text-center text-white py-1 px-2 rounded font-bold">
            {GradosInterpretacion[Grado]} - {Seccion}
          </span>
          <span className="text-lg break-words italic">{Nombre_Curso}</span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
