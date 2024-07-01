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
import { useDispatch, useSelector } from "react-redux";
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
import { RootState } from "@/store";
import { logout } from "@/lib/helpers/logout";

const Header = () => {
  const urlAPI = useSelector(
    (state: RootState) => state.globalConstants.urlAPI
  );

  const sidebarIsOpen = useSelector(
    (state: RootState) => state.flags.sidebarIsOpen
  );
  const uyuy = useSelector(
    (state: RootState) => state.elementsDimensions.windowHeight
  );

  const pathname = usePathname();
  const isLoginPage = pathname.startsWith("/login");

  const dispatch = useDispatch();

  //Estado para controlar la visibilidad del menú desplegable
  const [menuVisible, setMenuVisible] = useState(false);

  // Función para cambiar la visibilidad del menú
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
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

    const getPhotoPerfilImage = async () => {
      if (isLoginPage) return;

      const resToken = await fetch("/api/auth/myToken");
      if (!resToken.ok) return;

      const { token } = await resToken.json();

      const resImage = await fetch(`${urlAPI}/api/auth/me/image`, {
        method: "GET",
        headers: { Authorization: token },
      });

      if (resImage.ok) {
        const { Foto_Perfil_URL } = await resImage.json();
        UserSessionData.urlImage = Foto_Perfil_URL;
      }
    };

    // Solicitando la imagen de perfil del usuario
    if (
      UserSessionData.role === "student" ||
      UserSessionData.role === "teacher"
    ) {
      getPhotoPerfilImage();
    }

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
      className="flex w-screen text-center z-[5] bg-verde-spotify py-2.5 sticky top-0 left-0 max-w-full pl-4 pr-2 sm:pl-6 sm:pr-4 text-xs sm:text-base "
    >
      <div className="flex items-center justify-between w-full gap-x-4 sm:gap-x-7 flex-wrap">
        <div className="flex items-center">
          <div
            className="cursor-pointer select-none"
            onClick={() => dispatch(switchSidebarIsOpen(null))}
          >
            <HamburguesaIcon
              title={sidebarIsOpen ? "Ocultar Sidebar" : "Mostrar Sidebar"}
              className="aspect-auto w-5 sm:w-7"
              fillColor="black"
            />
          </div>

          <div
            style={{ boxShadow: "0 0 7px 1px #00000040" }}
            className="bg-white rounded-xl px-3 sm:px-3 py-1 flex items-center ml-4"
          >
            <img
              src="/svg/Logo Colegio.svg"
              alt="Logo Colegio"
              className="w-auto h-8 sm:h-10"
            />
            <div className="text-left text-xxs sm:text-xs hidden sm:flex flex-col justify-center ml-2">
              <p className="font-bold leading-tight mb-0.1">
                JOSÉ BUENAVENTURA
              </p>
              <p className="font-bold leading-tight">SEPÚLVEDA FERNÁNDEZ</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-x-1 sm:gap-x-2 ">
        <div className="flex flex-col items-start mr-2 justify-center gap-y-1">
          <h1 className="font-extrabold text-left text-[1.1rem] leading-5">
            {UserSessionData.username}
          </h1>
          <p className="text-left text-[0.9rem] leading-4 italic">
            {RolesEspañol[UserSessionData.role!]}
          </p>
        </div>

        <div className="flex items-center justify-end gap-x-1 sm:gap-x-2">
          <div className="hidden sm:flex items-center gap-x-2">
            <MensajesIcon
              className="aspect-auto w-8 cursor-pointer"
              fillColor="black"
              title="Chat"
            />
            <NotificacionesIcon
              className="aspect-auto w-8 cursor-pointer"
              fillColor="black"
              title="Notificaciones"
            />
          </div>
          <div className="flex items-center justify-center">
            {UserSessionData.urlImage ? (
              <img
                style={{ boxShadow: "0 0px 8px rgba(0, 0, 0, 0.2)" }}
                className="aspect-square min-w-10 max-w-10  max-md:mr-2 -border-2  rounded-[50%] border border-black bg-contain object-cover bg-no-repeat bg-center"
                src={UserSessionData.urlImage}
                alt="Tu foto de perfil"
              />
            ) : (
              <PerfilIcon
                className="aspect-square w-10 max-md:mr-2"
                fillColor="black"
              />
            )}

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
              <div className="flex sm:hidden items-center justify-center gap-x-4  h-10 w-[7rem]">
                <MensajesIcon
                  title="Chat"
                  className="aspect-auto w-5 sm:w-7 mr-2 cursor-pointer"
                  fillColor="black"
                />
                <NotificacionesIcon
                  title="Notificaciones"
                  className="aspect-auto w-5 sm:w-7 cursor-pointer"
                  fillColor="black"
                />
              </div>
              <Link href={"/editar_perfil"} as={"/editar-perfil"}>
                <li className="hover:font-bold cursor-pointer h-10 flex items-center justify-center px-3 border-t border-gray-200 w-[8rem]">
                  Editar Perfil
                </li>
              </Link>
              <li
                className="border-t border-gray-200 h-10 hover:font-bold cursor-pointer flex items-center justify-center px-3 w-[8rem]"
                onClick={logout}
              >
                Cerrar Sesión
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
