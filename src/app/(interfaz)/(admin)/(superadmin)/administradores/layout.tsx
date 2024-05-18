import Link from "next/link";
import React from "react";

const Administradores = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex">
          <Link href={"../administradores"}>
            <div className="cursor-pointer hover:underline">
              Administradores
            </div>
          </Link>

          <Link className="flex" href={"../administradores"}>
            &nbsp;&gt;&nbsp;
            <div className="cursor-pointer hover:underline">Registrar</div>
          </Link>
        </div>
        {children}
      </div>
    </>
  );
};

export default Administradores;
