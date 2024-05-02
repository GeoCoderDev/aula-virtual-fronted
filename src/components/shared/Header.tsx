"use client";
// Header.tsx
import { usePathname } from "next/navigation";
import NotificacionesIcon from "../icons/header/NotificacionesIcon";
import MensajesIcon from "../icons/header/MensajesIcon";
import PerfilIcon from "../icons/header/PerfilIcon";
import DespliegueIcon from "../icons/header/DespliegueIcon";
import HamburguesaIcon from "../icons/header/HamburguesaIcon";

const Header: React.FC = () => {
  const pathname = usePathname();
  const isLoginPage = pathname.startsWith("/login");

  if (isLoginPage) {
    return null; // No renderizar el componente en la ruta /login
  }

  return (
    <header
      style={{ boxShadow: "0 0px 2px 2px rgba(0,0,0,0.2)" }}
      id="header"
      className="flex w-screen text-center z-[5] bg-verde-spotify py-3 sticky top-0 left-0 max-w-full px-4"
    >
      <div className="flex items-center justify-between w-full gap-x-7">
        <div className="flex-1 ">
          <HamburguesaIcon className="aspect-auto w-8" fillColor="black" />
        </div>


          
          <div className="flex flex-col items-start">
            <p className="text-left" style={{ margin: "-0.15rem 0" }}>
              Bienvenido!
            </p>
            <h1 className="font-extrabold text-left" style={{ margin: "-0.15rem 0" }}>
              JUAN GRABRIEL PEREZ
            </h1>
          </div>

          <div className="flex items-center justify-end gap-x-3">
            <MensajesIcon className="aspect-auto w-8" fillColor="black" />
            <NotificacionesIcon className="aspect-auto w-7" fillColor="black" />
            <div className="flex items-center justify-center">
              <PerfilIcon className="aspect-auto w-11" fillColor="black" />
              <DespliegueIcon className="aspect-auto w-7" fillColor="black" />
            </div>
          </div>

      </div>
    </header>
  );
};

export default Header;
