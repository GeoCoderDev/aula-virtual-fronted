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
    <nav className="sticky w-max border-black border-r-[1px]">
      <ul>
        {allPagesApp.map((props, index) => {
          return <SideBarElement key={index} {...props} />;
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
