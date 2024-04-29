"use client";
import { PageApp } from "@/app/assets/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBarElement = ({ IconTSX, route, text }: PageApp) => {
  const pathName = usePathname();
  const isSelected = pathName === `/${route}`;

  return (
    <Link href={route}>
      <li className="flex items-center border-black border-r-[1px] px-4 py-3 gap-x-4" title={text}>
        <IconTSX className="" fillColor="black" />
        <span className="w-max">{text}</span>
      </li>
    </Link>
  );
};

export default SideBarElement;
