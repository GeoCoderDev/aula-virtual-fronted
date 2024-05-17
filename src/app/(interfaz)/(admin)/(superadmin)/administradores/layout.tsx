import React from "react";

const Administradores = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <div className="flex flex-col w-full">
      <div>Administradores</div>
      {children}
    </div>
    </>
  );
};

export default Administradores;
