import InterfazIcon from "@/components/icons/others/InterfazIcon";
import BackupIcon from "@/components/icons/others/BackupIcon";
import ScheduleIcon from "@/components/icons/others/ScheduleIcon";
const GestionBackups = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full overflow-hidden">
      <div className="flex space-x-20 text-center">
        <div>
          <a href="/configuraciones/interfaz" className="text-xl font-semibold flex flex-col items-center">
            <InterfazIcon className="mb-2" />
            <span>Interfaz</span>
          </a>
        </div>
        <div>
          <a href="/configuraciones/horario-calendario" className="text-xl font-semibold flex flex-col items-center">
            <ScheduleIcon className="mb-2" />
            <span>Horario y Calendario</span>
          </a>
        </div>
        <div>
          <a href="/configuraciones/backups" className="text-xl font-semibold flex flex-col items-center">
            <BackupIcon className="mb-2" />
            <span>Backups</span>
          </a>
        </div>
      </div>
    </div>
  )
};

export default GestionBackups;
