"use client";
import { PageApp } from "@/app/assets/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserSessionData } from "../../lib/utils/UserSessionData";

const SideBarElement = ({ IconTSX, route, text, allowedRoles }: PageApp) => {
  const pathName = usePathname();

  //No renderizar el componente si no tiene el rol requerido
  if (allowedRoles.indexOf(UserSessionData.role!) === -1) return null;

  const isSelected = pathName.startsWith(`/${route}`);

  return (
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
  );
};

export default SideBarElement;
