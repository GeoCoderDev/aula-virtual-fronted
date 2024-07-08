import { RespuestaForo } from "@/interfaces/Foro";
import React from "react";

const StudentForoResponse = ({
  respuestaForo: {
    Estudiante: { Apellidos, Id_Usuario, Nombres, Foto_Perfil_URL },
    Id_Respuesta_Foro,
    Respuesta,
  },
}: {
  respuestaForo: RespuestaForo;
}) => {
  return (
    <div
      style={{ boxShadow: "0 0 6px 2px #00000050" }}
      className="flex flex-col w-full p-4 rounded-[0.5rem] gap-2"
    >
      <div className="flex items-center flex-wrap gap-4">
        <img
          className="rounded-[50%] aspect-square w-[2.8rem]"
          src={Foto_Perfil_URL ?? "/svg/No-Foto-Perfil.svg"}
          alt={`Foto de ${Nombres} ${Apellidos}`}
          title={`Foto de ${Nombres} ${Apellidos}`}
        />
        <h5 className="text-[1.1rem] font-semibold">
          {Nombres} {Apellidos}
        </h5>
      </div>

      <p className="ml-[3.75rem] mb-4">{Respuesta}</p>
    </div>
  );
};

export default StudentForoResponse;
