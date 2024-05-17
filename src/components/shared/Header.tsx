"use client";
// Header.tsx
import { usePathname } from "next/navigation";
import NotificacionesIcon from "../icons/header/NotificacionesIcon";
import MensajesIcon from "../icons/header/MensajesIcon";
import PerfilIcon from "../icons/header/PerfilIcon";
import DespliegueIcon from "../icons/header/DespliegueIcon";
import HamburguesaIcon from "../icons/header/HamburguesaIcon";
import { UserSessionData } from "@/lib/utils/UserSessionData";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHeaderHeight } from "@/state/ElementDimensions/headerHeight";
import { setWindowHeight } from "@/state/ElementDimensions/windowHeight";
import {
  setSidebarIsOpen,
  switchSidebarIsOpen,
} from "@/state/Flags/sidebarIsOpen";
import { setWindowWidth } from "@/state/ElementDimensions/windowWidth";
import { RolesEspañol } from "@/app/assets/RolesEspañol";

const Header = () => {
  const pathname = usePathname();
  const isLoginPage = pathname.startsWith("/login");

  const dispatch = useDispatch();

  useEffect(() => {
    const resizeObserverHeader = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        dispatch(
          setHeaderHeight({
            value: parseFloat(getComputedStyle(entry.target).height),
          })
        );
      });
    });

    if (window.innerWidth > 768) {
      dispatch(setSidebarIsOpen({ value: true }));
    }

    dispatch(setWindowHeight({ value: window.innerHeight }));
    dispatch(setWindowWidth({ value: window.innerWidth }));

    const handleResize = () => {
      dispatch(setWindowHeight({ value: window.innerHeight }));
      dispatch(setWindowWidth({ value: window.innerWidth }));
    };

    window.addEventListener("resize", handleResize);

    const headerHTML = document.getElementById("header");

    if (!headerHTML) return;

    resizeObserverHeader.observe(headerHTML);

    return () => {
      resizeObserverHeader.observe(headerHTML);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isLoginPage) return null; // No renderizar el componente en la ruta /login

  return (
    <header
      style={{ boxShadow: "0 0px 2px 2px rgba(0,0,0,0.2)" }}
      id="header"
      className="flex w-screen text-center z-[5] bg-verde-spotify py-2 sticky top-0 left-0 max-w-full pl-6 pr-4"
    >
      <div className="flex items-center justify-between w-full gap-x-7">
        <div className=" flex-1">
          <div className="cursor-pointer select-none" onClick={()=>dispatch(switchSidebarIsOpen(null))}>
            <HamburguesaIcon className="aspect-auto w-8" fillColor="black" />
          </div>
        </div>

        <div className="flex flex-col items-start">
          <h1
            className="font-extrabold text-left"
            style={{ margin: "-0.15rem 0" }}
          >
            {UserSessionData.username}
          </h1>
          <p className="text-left" style={{ margin: "-0.15rem 0" }}>
            {RolesEspañol[UserSessionData.role]}
          </p>
        </div>

        <div className="flex items-center justify-end gap-x-3">
          <MensajesIcon className="aspect-auto w-8" fillColor="black" />
          <NotificacionesIcon className="aspect-auto w-8" fillColor="black" />
          <div className="flex items-center justify-center">
            <PerfilIcon className="aspect-auto w-11" fillColor="black" />
            <DespliegueIcon className="aspect-auto w-8" fillColor="black" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
