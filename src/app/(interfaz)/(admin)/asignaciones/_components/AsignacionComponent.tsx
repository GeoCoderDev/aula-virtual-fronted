import { Asignacion, diasSemana } from "@/interfaces/Asignation";
import { relativeDistanceAmongElements } from "@/lib/helpers/functions/relativeDistanceAmongElements";
import React, { MutableRefObject, useEffect, useState } from "react";
import HorarioCursoAulaComponent from "../../../../../components/shared/HorarioCursoAulaComponent";

const AsignacionComponent = ({
  asignacion,
  celdas,
  asignationsTable,
  index,
}: {
  asignacion: Asignacion;
  celdas: NodeListOf<Element>;
  asignationsTable: MutableRefObject<HTMLTableElement | undefined>;
  index: number;
}) => {
  return (
    <HorarioCursoAulaComponent
      Id_Asignacion={asignacion.Id_Asignacion}
      celdas={celdas}
      asignationsTable={asignationsTable}
      horarioCursoAula={asignacion}
      withOptions={true}
      index={index}
    />
  );
};

export default AsignacionComponent;
