"use client";
import { PageApp } from "@/app/assets/routes";
import { useUserSessionData } from "@/lib/utils/UserSessionData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SideBarElement = ({ IconTSX, route, text, allowedRoles }: PageApp) => {
  const pathName = usePathname();

  const { UserSessionData } = useUserSessionData();

  const [renderizar, setRenderizar] = useState(false);

  useEffect(() => {
    if (!UserSessionData) return;
    //No renderizar el componente si no tiene el rol requerido
    if (allowedRoles.indexOf(UserSessionData.role!) === -1) {
      setRenderizar(() => false);
    } else {
      setRenderizar(() => true);
    }
  }, [UserSessionData]);

  const isSelected = pathName.startsWith(`/${route}`);

  return renderizar ? (
    <Link href={`/${route}`} as={`/${route}`}>
      <li
        className={` flex items-center pl-5 pr-8 h-[4.2rem] gap-x-4 overflow-hidden min-w-[12.5rem] max-w-[25rem] text-ellipsis text-nowrap${
          !isSelected && "hover:bg-gray-200"
        } ${isSelected && "bg-black"}`}
        title={text}
      >
        <IconTSX
          className="aspect-auto w-8"
          fillColor={isSelected ? "#fff" : "black"}
        />
        <span className={`w-max text-[0.95rem] ${isSelected && "text-white"} `}>
          {text}
        </span>
      </li>
    </Link>
  ) : (
    <></>
  );
};

export default SideBarElement;
