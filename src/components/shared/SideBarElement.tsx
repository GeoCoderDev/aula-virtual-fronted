"use client";
import { PageApp } from "@/app/assets/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBarElement = ({ IconTSX, route, text }: PageApp) => {
  const pathName = usePathname();
  const isSelected = pathName === `/${route}`;

  return (
    <Link href={route}>
      <li style={{borderRadius: "0 0 1rem 1rem"}} className={`flex items-center px-4 py-3 gap-x-4 ${isSelected && "bg-black"}`} title={text}>
        <IconTSX className="aspect-auto w-12" fillColor={isSelected ? "#fff" : "black"} />
        <span className={`w-max ${isSelected && "text-white"}`}>{text}</span>
      </li>
    </Link>
  );
};

export default SideBarElement;
