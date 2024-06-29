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
    <div className="flex flex-col">
      {RecursosTipoInterpretacion[Tipo]}
      {Titulo}
      <IconComponent className="w-[2rem]" />
    </div>
  );
};

export default RecursoTemaComponent;
