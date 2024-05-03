import React from "react";

const Administradores = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <div className="flex flex-col">
      <div>Administradores</div>
      {children}
    </div>
    </>
  );
};

export default Administradores;
