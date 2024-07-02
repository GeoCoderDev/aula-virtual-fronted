"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Administradores = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex">
          <Link href="/administradores" as={"/administradores"}>
            <div className="cursor-pointer hover:underline">
              Administradores
            </div>
          </Link>

          {pathname.endsWith("registrar") && (
            <Link className="flex" href={"./registrar"}>
              &nbsp;&gt;&nbsp;
              <div className="cursor-pointer hover:underline">Registrar</div>
            </Link>
          )}
        </div>
        {children}
      </div>
    </>
  );
};

export default Administradores;
