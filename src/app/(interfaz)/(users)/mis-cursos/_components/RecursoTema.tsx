import { RecursosIcon } from "@/app/assets/RecursosIcon";
import { RecursosTipoInterpretacion } from "@/app/assets/RecursosInterpretacion";
import { RecursoTema } from "@/interfaces/RecursoTema";
import React from "react";

const RecursoTemaComponent = ({
  topicResource: {
    Id_Recurso_Tema,
    Descripcion_Recurso,
    Imagen_Key_S3,
    Tipo,
    Titulo,
  },
}: {
  topicResource: RecursoTema;
}) => {
  const IconComponent = RecursosIcon[Tipo];

  return (
    <div className="flex flex-wrap items-center px-2 py-3 w-full hover:bg-[#00000020] rounded-[0.5rem] cursor-pointer gap-4">
      <IconComponent className="w-[2.2rem]" />
      <div className="flex flex-col">
        {RecursosTipoInterpretacion[Tipo]}
        <h3 className="text-[1rem] font-semibold">{Titulo}</h3>
      </div>
    </div>
  );
};

export default RecursoTemaComponent;
