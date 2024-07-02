import React from "react";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="-border-2 w-full flex flex-row min-h-[100svh] items-center justify-center py-12">
        {children}
      </div>
    </>
  );
};

export default LoginLayout;
