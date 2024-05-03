
import Link from "next/link";
import React from "react";

const Administradores = () => {





  return (
    <div className="flex flex-col items-start justify-center gap-y-6">
      <div className="flex justify-between items-center w-full">
        <p className=" text-4xl  font-extrabold">Buscar Administrador</p>

        <Link href={"/administradores/registrar"}>
            <button className="px-4 py-3  rounded-[0.5rem] bg-verde-spotify font-bold">Registrar Administradores</button>      
        </Link>

      </div>

      <div className="flex  items-center gap-3">
        <p className="font-semibold">NOMBRE DE USUARIO:</p>
        <input

          maxLength={100}
          name="username"
          style={{ boxShadow: "0 0 10px 4px #00FF6F50" }}
          className="outline-none w-[50%] px-4 rounded-[1rem] py-2 font-semibold placeholder:text-black"
          type="text"
          placeholder="Nombre de Usuario*"
        />
      </div>

      <div>
        <table>
          <tr className="font-semibold bg-verde-spotify text-black">
            <td className="px-8 py-3 rounded-l">ID</td>
            <td className="px-8 py-3">Nombre de Usuario</td>
            <td className="px-60 py-3 rounded-r">Acciones</td>
          </tr>


          
        </table>
      </div>
    </div>
  );
};

export default Administradores;
