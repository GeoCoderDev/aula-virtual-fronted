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
      style={{ boxShadow: "0 3px 5px 4px rgba(0,0,0,0.1)" }}
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
