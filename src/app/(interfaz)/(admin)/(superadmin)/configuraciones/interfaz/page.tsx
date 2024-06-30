"use client";
import Link from 'next/link';
import React, { useState } from 'react';  // Asegúrate de importar useState
import EditarIcon from '@/components/icons/others/EditarIcon';
import ChangeInterfazColor from "@/components/shared/modals/Configuraciones/ChangeInterfazColor";  // Asegúrate de que el import sea correcto

const Interfaz = () => {
  const [viewChangeInterfazColor, setViewChangeInterfazColor] = useState(false);  // Cambié a `viewChangeInterfazColor` para reflejar el estado correcto

  return (
    <>
      <div className="p-8">
        <div className="flex">
          <Link href="/configuraciones">
            <div className="cursor-pointer hover:underline">Configuraciones</div>
          </Link>
          &nbsp;&gt;&nbsp;
          <Link href="/configuraciones/backups">
            <div className="cursor-pointer hover:underline">Interfaz</div>
          </Link>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Color</h2>
          <p className="mt-2 mb-4">
            Personaliza el color de la interfaz de usuario de la aplicación. Puedes elegir entre una variedad de opciones de color predefinidas o seleccionar un color personalizado para adaptarlo a tus preferencias visuales.
          </p>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xl font-semibold">Color Actual:</span>
            <div className="w-8 h-8 bg-green-500"></div>
            <span className="bg-gray-300 px-4 py-2 rounded-md text-xl">#06FC68</span>
            <button
              className="button-with-loader ml-0"
              onClick={() => {
                setViewChangeInterfazColor(true);
              }}
            >
              Modificar <EditarIcon />
            </button>
          </div>
        </div>
      </div>
      {viewChangeInterfazColor && (
        <ChangeInterfazColor
          eliminateModal={() => {
            setViewChangeInterfazColor(false);
          }}
        />
      )}
    </>
  );
};

export default Interfaz;
