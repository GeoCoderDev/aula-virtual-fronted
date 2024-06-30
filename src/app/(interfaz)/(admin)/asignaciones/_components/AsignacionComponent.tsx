import { Asignacion, diasSemana } from "@/interfaces/Asignation";
import { relativeDistanceAmongElements } from "@/lib/helpers/functions/relativeDistanceAmongElements";
import React, { MutableRefObject, useEffect, useState } from "react";
import HorarioCursoAulaComponent from "../../../../../components/shared/HorarioCursoAulaComponent";

const AsignacionComponent = ({
  asignacion,
  celdas,
  asignationsTable,
}: {
  asignacion: Asignacion;
  celdas: NodeListOf<Element>;
  asignationsTable: MutableRefObject<HTMLTableElement | undefined>;
}) => {
  return (
    <HorarioCursoAulaComponent
      celdas={celdas}
      asignationsTable={asignationsTable}
      horarioCursoAula={asignacion}
    />
  );
};

export default AsignacionComponent;
