import Link from "next/link";
import React from "react";

const Estudiantes = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-wrap flex-col w-full -border-2">
        <div className="flex">
            <Link href={`../estudiantes`}>
            <div className="cursor-pointer hover:underline">Gestion de Estudiantes</div>
            </Link>
        </div>
        {children}
      </div>
    </>
  );
};

export default Estudiantes;
