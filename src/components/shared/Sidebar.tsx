"use client";

import allPagesApp from "@/app/assets/routes";
// Sidebar.tsx
import { usePathname } from "next/navigation";
import SideBarElement from "./SideBarElement";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { switchSidebarIsOpen } from "@/state/Flags/sidebarIsOpen";

const Sidebar = () => {
  const dispatch = useDispatch();

  const pathname = usePathname();
  const isLoginPage = pathname.startsWith("/login");

  const headerHeight = useSelector(
    (state: RootState) => state.elementsDimensions.headerHeight
  );
  const windowHeight = useSelector(
    (state: RootState) => state.elementsDimensions.windowHeight
  );

  const windowWidth = useSelector(
    (state: RootState) => state.elementsDimensions.windowWidth
  );

  const sidebarIsOpen = useSelector(
    (state: RootState) => state.flags.sidebarIsOpen
  );

  if (isLoginPage) return null; // No renderizar el componente en la ruta /login

  return (
    <>
      <nav
        id="sidebar"        
        className={`sticky overflow-auto bg-white top-0`}
        onClick={() => {
          if (windowWidth < 768) dispatch(switchSidebarIsOpen(null));
        }}
      >
        <ul id="sidebar-ul" className="">
          {allPagesApp.map((props, index) => {
            return <SideBarElement key={index} {...props} />;
          })}
        </ul>
      </nav>
      <style>
        {`
          #sidebar{
            width: max-content;
            max-width: 100vw;
            box-shadow: 1px 0 4px 2px #00000020;
            top:${headerHeight}px;                           
            height: ${windowHeight - headerHeight}px;
            max-height: ${windowHeight - headerHeight}px;      
            display: ${
              sidebarIsOpen ? "block" : "none"
            };                                 
          }
  
          #sidebar-ul{
            background-color: white;
            height: 100%;
            width: 100%;
          }
  
          @media screen and (max-width: 768px){
            #sidebar{
              width: 100vw;
              position: fixed;
              top: 0;
              min-height: 100dvh;
              left: 0;        
              background-color:${sidebarIsOpen ? "#00000080" : "transparent"};
              z-index: 102;
            }
  
            #sidebar-ul{
              background-color: white;
              height: 100%;
              width: max-content;
              max-width: 80%;
            }
  
          }
                    
      `}
      </style>
    </>
  );
};

export default Sidebar;
