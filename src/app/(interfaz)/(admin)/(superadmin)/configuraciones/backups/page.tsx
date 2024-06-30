"use client";
import { useState } from 'react';
import EditarIcon from '@/components/icons/others/EditarIcon';
import RestaurarIcon from '@/components/icons/others/RestaurarIcon';
import ChangeDayBackup from "@/components/shared/modals/Configuraciones/ChangeDayBackup";

const Backups = () => {
  const [viewChangeDayBackup, setViewChangeDayBackup] = useState(false);

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex">
          <a href="/configuraciones">
            <div className="cursor-pointer hover:underline">Configuraciones</div>
          </a>
          &nbsp;&gt;&nbsp;
          <a href="/configuraciones/backups">
            <div className="cursor-pointer hover:underline">Backups</div>
          </a>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Frecuencia</h2>
          <p className="mt-2 mb-4">
            Establece la frecuencia con la que se realizarán copias de seguridad (backups) de los datos del sistema. Las copias de seguridad periódicas son esenciales para proteger la información contra posibles pérdidas o daños, y facilitar la recuperación en caso de ser necesario.
          </p>
          <li className="flex items-center gap-4">
            <span className="text-xl font-semibold">Cada:</span>
            <span className="bg-gray-300 px-4 py-2 rounded-md text-xl">10 días y 8 horas</span>
            <button
              className="button-with-loader ml-0"
              onClick={() => {
                setViewChangeDayBackup(true);
              }}
            >
              Modificar <EditarIcon />
            </button>
          </li>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Restaurar Backup:</h2>
          <p className="mb-4">
            Restaurar los datos del sistema a partir de una copia de seguridad (backup) previamente realizada. La restauración de backups es un proceso crítico que puede ser necesario en caso de pérdida de datos por errores, fallos del sistema o incidentes imprevistos.
          </p>
          <p className="text-sm font-semibold text-red-600 mb-4">
            Importante: La restauración desde un backup sobrescribirá los datos actuales. Se recomienda realizar esta acción con precaución y solo cuando sea estrictamente necesario.
          </p>
          <button className="button-with-loader ml-0">
            Restaurar <RestaurarIcon />
          </button>
        </div>
      </div>

      {viewChangeDayBackup && (
        <ChangeDayBackup
          eliminateModal={() => {
            setViewChangeDayBackup(false);
          }}
        />
      )}
    </>
  );
};

export default Backups;
