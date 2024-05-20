"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Estudiantes = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <>
      <div className="flex flex-wrap flex-col w-full -border-2">
        <div className="flex">
          <Link href={`../estudiantes`}>
            <div className="cursor-pointer hover:underline">Estudiantes</div>
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

export default Estudiantes;
