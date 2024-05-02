"use client";

import allPagesApp from "@/app/assets/routes";
// Sidebar.tsx
import { usePathname } from "next/navigation";
import SideBarElement from "./SideBarElement";

const Sidebar = () => {
  const pathname = usePathname();
  const isLoginPage = pathname.startsWith("/login");

  
  if (isLoginPage) {
    return null; // No renderizar el componente en la ruta /login
  }

  return (
    <nav
      style={{ boxShadow: "0px 0 4px 2px #00000020" }}
      className="sticky w-max"
    >
      <ul className="">
        {allPagesApp.map((props, index) => {
          return <SideBarElement key={index} {...props} />;
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
