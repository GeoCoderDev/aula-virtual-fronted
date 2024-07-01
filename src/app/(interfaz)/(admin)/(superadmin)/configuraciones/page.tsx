"use client";
import InterfazIcon from "@/components/icons/others/InterfazIcon";
import BackupIcon from "@/components/icons/others/BackupIcon";
import ScheduleIcon from "@/components/icons/others/ScheduleIcon";
import Link from "next/link";

import { RootState } from "@/store";
import { useSelector } from "react-redux";

const GestionBackups = () => {
  const windowHeight = useSelector(
    (state: RootState) => state.elementsDimensions.windowHeight
  );
  const headerHeight = useSelector(
    (state: RootState) => state.elementsDimensions.headerHeight
  );

  return (
    <div
      style={{ height: windowHeight - headerHeight - 64 + "px" }}
      className="flex justify-evenly items-center flex-wrap w-full -overflow-hidden gap-8 -border-2"
    >
      <Link
        href="/configuraciones/interfaz"
        as={"/configuraciones/interfaz"}
        className="text-xl font-semibold flex flex-col items-center"
      >
        <InterfazIcon className="mb-2" />
        <span>Interfaz</span>
      </Link>

      <Link
        href="/configuraciones/horario-calendario"
        as={"/configuraciones/horario-calendario"}
        className="text-xl font-semibold flex flex-col items-center"
      >
        <ScheduleIcon className="mb-2" />
        <span>Horario y Calendario</span>
      </Link>

      <Link
        href="/configuraciones/backups"
        as={"/configuraciones/backups"}
        className="text-xl font-semibold flex flex-col items-center"
      >
        <BackupIcon className="mb-2" />
        <span>Backups</span>
      </Link>
    </div>
  );
};

export default GestionBackups;
