import React from "react";

const Estudiantes = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-wrap flex-col w-full border-2">
        <div className="">
            <div className="">Gestion de Estudiantes</div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Estudiantes;
