"use client";
import { PageApp } from "@/app/assets/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBarElement = ({ IconTSX, route, text }: PageApp) => {
  const pathName = usePathname();
  const isSelected = pathName === `/${route}`;

  return (
    <Link href={route}>
      <li  className={`flex items-center pl-5 pr-8 h-[4.2rem] gap-x-4 ${!isSelected && "hover:bg-gray-200"} ${isSelected && "bg-black"}`} title={text}>
        <IconTSX className="aspect-auto w-8" fillColor={isSelected ? "#fff" : "black"} />
        <span className={`w-max  text-[0.95rem] ${isSelected && "text-white"} `}>{text}</span>
      </li>
    </Link>
  );
};

export default SideBarElement;
