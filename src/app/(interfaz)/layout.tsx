import React from "react";

const InterfazLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>Layout Gestion de cursos</div>
      {children}
    </>
  );
};

export default InterfazLayout;
