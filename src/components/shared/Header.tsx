"use client";
// Header.tsx
import React, { useState } from "react";
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
import Link from "next/link";
import { delegarEvento } from "@/lib/utils/delegacionDeEventos";

const Header = () => {
  const pathname = usePathname();
  const isLoginPage = pathname.startsWith("/login");

  const dispatch = useDispatch();

  //Estado para controlar la visibilidad del menú desplegable
  const [menuVisible, setMenuVisible] = useState(false);

  // Función para cambiar la visibilidad del menú
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/close", { method: "PUT" });
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

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

    delegarEvento(
      "mouseup",
      "#Menu-deplegable, #Menu-deplegable *",
      () => {
        setMenuVisible(false);
      },
      true
    );

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
      className="flex w-screen text-center z-[5] bg-verde-spotify py-2 sticky top-0 left-0 max-w-full pl-4 pr-2 sm:pl-6 sm:pr-4 text-xs sm:text-base"
    >
      <div className="flex items-center justify-between w-full gap-x-4 sm:gap-x-7 flex-wrap">
        <div className="flex items-center">
          <div
            className="cursor-pointer select-none"
            onClick={() => dispatch(switchSidebarIsOpen(null))}
          >
            <HamburguesaIcon className="aspect-auto w-5 sm:w-7" fillColor="black" />
          </div>

          <div className="bg-white rounded-xl px-3 sm:px-4 py-1 shadow-xl flex items-center ml-3">
            <img src="/svg/Logo Colegio.svg" alt="Logo Colegio" className="w-auto h-8 sm:h-10 " />
            <div className="text-left text-xs hidden sm:block ml-1">
              <p className="font-semibold leading-tight text-xs sm:text-sm">JOSÉ BUENAVENTURA</p>
              <p className="font-semibold leading-tight text-xs sm:text-sm">SEPÚLVEDA FERNÁNDEZ</p>
            </div>
          </div>

          
        </div>
      </div>
      


      <div className="flex items-center gap-x-1 sm:gap-x-2">
        <div className="flex flex-col items-start">
          <h1
            className="font-extrabold text-left text-sm sm:text-base"
            style={{ margin: "-0.1rem 0" }}
          >
            {UserSessionData.username}
          </h1>
          <p className="text-left text-xs sm:text-sm" style={{ margin: "-0.1rem 0" }}>
            {RolesEspañol[UserSessionData.role]}
          </p>
        </div>

        <div className="flex items-center justify-end gap-x-1 sm:gap-x-2">
          <div className="hidden sm:flex items-center gap-x-1">
            <MensajesIcon className="aspect-auto w-5 sm:w-7" fillColor="black" />
            <NotificacionesIcon className="aspect-auto w-5 sm:w-7" fillColor="black" />
          </div>
          <div className="flex items-center justify-center">
            <PerfilIcon className="aspect-auto w-8 sm:w-8 md:w-9 mr-1 sm:mr-2" fillColor="black" />
            <div id="despliegue-icon" onClick={toggleMenu} className="relative">
              <DespliegueIcon
                className="aspect-auto w-5 sm:w-7 hover:cursor-pointer"
                fillColor="black"
              />
            </div>
          </div>

          

          
          {menuVisible && (
            <ul
              id="Menu-deplegable"
              style={{ boxShadow: "0px 0px 4px 2px rgba(0,0,0,0.2)" }}
              className="absolute bg-white w-auto max-w-[90vw] min-w-[9rem] flex flex-col items-center justify-center mt-3 rounded-lg top-full"
              onClick={() => {
                setMenuVisible(false);
              }}
            >
              <Link href={"/editar_perfil"} as={"/editar-perfil"}>
                <li className="hover:font-bold cursor-pointer h-10 flex items-center justify-center px-3 sm:px-4">
                  Editar Perfil
                </li>
              </Link>
              <li
                className="border-t border-gray-200 h-10 hover:font-bold cursor-pointer flex items-center justify-center px-3 sm:px-4"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </li>
              <div className="flex sm:hidden items-center">
                  <MensajesIcon className="aspect-auto w-5 sm:w-7 mr-2" fillColor="black" />
                  <NotificacionesIcon className="aspect-auto w-5 sm:w-7" fillColor="black" />
              </div>
            </ul>
          )}
        </div>
      </div>
    </header>
  );

};

export default Header;