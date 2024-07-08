import { RecursosIcon } from "@/app/assets/RecursosIcon";
import { RecursosTipoInterpretacion } from "@/app/assets/RecursosInterpretacion";
import { RecursoTema, ResourceType } from "@/interfaces/RecursoTema";
import Link from "next/link";
import React from "react";

const RecursoTemaComponent = ({
  topicResource: {
    Id_Recurso_Tema,
    Descripcion_Recurso,
    Descripcion_Imagen_URL,
    Tipo,
    Titulo,
    Recurso_URL,
    Id_Foro,
  },
  CursoAula_ID,
  Id_Tema,
}: {
  topicResource: RecursoTema;
  CursoAula_ID: number;
  Id_Tema: number;
}) => {
  const IconComponent = RecursosIcon[Tipo];

  const contenido = (
    <>
      <div className="flex flex-wrap items-center gap-4">
        <IconComponent className="w-[2.2rem]" />
        <div className="flex flex-col">
          {RecursosTipoInterpretacion[Tipo]}
          <h3 className="text-[1rem] font-semibold">{Titulo}</h3>
        </div>
      </div>

      {Boolean(Descripcion_Recurso || Descripcion_Imagen_URL) && (
        <div className="flex flex-col ml-[3.2rem] gap-4">
          {Descripcion_Recurso && (
            <p className="text-[0.9rem]">{Descripcion_Recurso}</p>
          )}

          {Descripcion_Imagen_URL && (
            <img
              className="aspect-auto w-[min(20rem,80vw)]"
              src={Descripcion_Imagen_URL}
              alt="Imagen de descripcion de recurso del tema"
            />
          )}
        </div>
      )}
    </>
  );

  return (
    <>
      {Tipo === ResourceType.Archivo && (
        <a
          className="flex flex-col justify-center px-2 py-3 w-full hover:bg-[#00000020] rounded-[0.5rem] cursor-pointer gap-4"
          download={true}
          href={Recurso_URL}
          title={`Descargar archivo`}
        >
          {contenido}
        </a>
      )}
      {Tipo === ResourceType.Foro && (
        <Link
          title={`Ir al foro`}
          className="flex flex-col justify-center px-2 py-3 w-full hover:bg-[#00000020] rounded-[0.5rem] cursor-pointer gap-4"
          href={`/mis-cursos/${CursoAula_ID}/${Id_Tema}/foro/${Id_Foro}`}
          as={`/mis-cursos/${CursoAula_ID}/${Id_Tema}/foro/${Id_Foro}`}
        >
          {contenido}
        </Link>
      )}
      {Tipo === ResourceType.Tarea && (
        <Link
          title={`Ir a la tarea`}
          className="flex flex-col justify-center px-2 py-3 w-full hover:bg-[#00000020] rounded-[0.5rem] cursor-pointer gap-4"
          href={"/"}
        >
          {contenido}
        </Link>
      )}
      {Tipo === ResourceType.URL && (
        <a
          title={`Ir a ${Recurso_URL}`}
          className="flex flex-col justify-center px-2 py-3 w-full hover:bg-[#00000020] rounded-[0.5rem] cursor-pointer gap-4"
          href={Recurso_URL}
        >
          {contenido}
        </a>
      )}
      {Tipo === ResourceType.Cuestionario && (
        <Link
          title="Ir al Cuestionario"
          className="flex flex-col justify-center px-2 py-3 w-full hover:bg-[#00000020] rounded-[0.5rem] cursor-pointer gap-4"
          href={`/`}
          as={`/`}
        >
          {contenido}
        </Link>
      )}
    </>
  );
};

export default RecursoTemaComponent;
