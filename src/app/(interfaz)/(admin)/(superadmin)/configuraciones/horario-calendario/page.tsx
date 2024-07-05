"use client";
import React, { useState } from "react";
import EditarIcon from '@/components/icons/others/EditarIcon';
import EliminarIcon from '@/components/icons/others/EliminarIcon';
import PlusIcon from '@/components/icons/others/PlusIcon';
import ChangeDate from "@/components/shared/modals/Horario-Calendario/ChangeDate";
import ChangeDay from "@/components/shared/modals/Horario-Calendario/ChangeDay";
import ChangeAcademicTime from "@/components/shared/modals/Horario-Calendario/ChangeAcademicTime";
import ChangeDurationBreak from "@/components/shared/modals/Horario-Calendario/ChangeDurationBreak";
import AddBreak from "@/components/shared/modals/Horario-Calendario/AddBreak";

const HorarioCalendario = () => {
  const [viewChangeDate, setViewChangeDate] = useState(false);
  const [viewChangeDay, setViewChangeDay] = useState(false);
  const [viewChangeAcademicTime, setViewChangeAcademicTime] = useState(false);
  const [viewChangeDurationBreak, setViewChangeDurationBreak] = useState(false);
  const [viewAddBreak, setViewAddBreak] = useState(false);
  
  return (
    <>
    <div className="flex flex-col items-start justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center mb-4">
        <a href="/configuraciones" className="mr-2">
          <div className="cursor-pointer hover:underline">Configuraciones</div>
        </a>
        <span className="mx-2">&gt;</span>
        <a href="/configuraciones/horario-calendario">
          <div className="cursor-pointer hover:underline">Horario y calendario</div>
        </a>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Horario y Calendario</h1>
      
      {/* Inicio y Fin de Año Escolar */}
      <div className="mb-6 p-4 bg-white rounded w-full">
        <h2 className="text-lg sm:text-xl font-semibold">Inicio y Fin de Año Escolar</h2>
        <p className="mt-2 border-t pt-2 text-sm sm:text-base">
          Establece las fechas de inicio y fin del año escolar. Estas fechas son cruciales para programar correctamente el calendario escolar y eventos importantes relacionados con el año escolar.
        </p>
        <div className="flex flex-wrap items-center mt-4 pt-4">
          <div className="w-full sm:w-auto mb-2 sm:mb-0 mr-4">
            <p className="text-sm sm:text-base">
              <span className="font-bold italic">Inicio:</span> 23/03/2024
            </p>
            <p className="text-sm sm:text-base mt-1 sm:mt-0">
              <span className="font-bold italic">Fin:</span> 18/12/2024
            </p>
          </div>
          <button 
            onClick={() => setViewChangeDate(true)}
            className="button-with-loader w-full sm:w-auto mt-2 sm:mt-0">
            Modificar <EditarIcon />
          </button>
        </div>
      </div>

      {/* Días de Clase */}
      <div className="mb-6 p-4 bg-white rounded w-full">
        <h2 className="text-lg sm:text-xl font-semibold">Días de Clase</h2>
        <p className="mt-2 border-t pt-2 text-sm sm:text-base">
          Establece los días de la semana en los que se impartirán clases. Normalmente, las instituciones educativas tienen clases de lunes a viernes, pero puedes seleccionar los días específicos según tus necesidades.
        </p>
        <div className="flex flex-wrap items-center mt-4 pt-4">
          <div className="flex flex-wrap gap-2 mb-2 sm:mb-0">
            {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map(day => (
              <button key={day} className="px-2 sm:px-4 py-1 sm:py-2 bg-gray-200 rounded text-sm sm:text-base">{day}</button>
            ))}
          </div>
          <div className="w-full flex justify-center sm:justify-start mt-4 sm:mt-6">
          <button 
            onClick={() => setViewChangeDay(true)}
            className="button-with-loader w-full sm:w-auto px-4 py-2 flex items-center justify-center gap-2">
            <span>Modificar</span>  
            <EditarIcon className="w-5 h-5"/>
          </button>
          </div>
        </div>
      </div>

      {/* Duración Hora Académica */}
      <div className="mb-6 p-4 bg-white rounded w-full">
        <h2 className="text-lg sm:text-xl font-semibold">Duración Hora Académica</h2>
        <p className="mt-2 border-t pt-2 text-sm sm:text-base">Establece la duración de cada hora académica o período de clase. La duración de la hora académica es un factor clave para garantizar el cumplimiento de los requisitos de horas lectivas y la correcta planificación de los horarios de clase.</p>
        <div className="flex flex-wrap items-center mt-4 pt-4">
          <p className="text-sm sm:text-base mr-4 mb-2 sm:mb-0">
            <span className="font-bold italic">Duración:</span> 45 Minutos
          </p>
          <button 
            onClick={() => setViewChangeAcademicTime(true)}
            className="button-with-loader w-full sm:w-auto">
            Modificar <EditarIcon /> 
          </button>
        </div>
      </div>

      {/* Recreos */}
      <div className="mb-6 p-4 bg-white rounded w-full">
        <h2 className="text-lg sm:text-xl font-semibold">Recreos</h2>
        <p className="mt-2 border-t pt-2 text-sm sm:text-base">Establece la duración de cada hora académica o período de clase. La duración de la hora académica es un factor clave para garantizar el cumplimiento de los requisitos de horas lectivas y la correcta planificación de los horarios de clase.</p>
        <div className="flex flex-wrap items-center mt-4 pt-4">
          <p className="text-sm sm:text-base mr-4 mb-2 sm:mb-0">
            <span className="font-bold italic">Duración:</span> 15 Minutos
          </p>
          <button 
            onClick={() => setViewChangeDurationBreak(true)}
            className="button-with-loader w-full sm:w-auto">
            Modificar <EditarIcon />
          </button>
        </div>

        {/* Agregar Recreo */}
        <div className="mt-4 pt-4 bg-white rounded-lg border-4 border-verde-spotify p-4 max-w-md ml-0">
          {[
            { id: 1, time: '11:00 - 11:15' },
            { id: 2, time: '16:25 - 16:40' },
          ].map(recreo => (
            <div key={recreo.id} className="flex flex-wrap items-center justify-between p-2 rounded mb-2">
              <div className="flex items-center mb-2 sm:mb-0">
                <p className="font-bold italic text-sm sm:text-base">Recreo {recreo.id}:</p>
                <p className="ml-2 sm:ml-10 text-sm sm:text-base">{recreo.time}</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  className="px-2 py-2 button-with-loader"
                  onClick={() => setViewChangeDurationBreak(true)}
                >
                  <EditarIcon className="ml-1 mr-1" />
                </button>
                <button className="px-2 py-2 bg-rojo-orange button-with-loader">
                  <EliminarIcon fillColor='white' className="ml-1 mr-1" /> 
                </button>
              </div>
            </div>
          ))}
          <div>
            <button 
              onClick={() => setViewAddBreak(true)}
              className="button-with-loader w-full sm:w-auto mt-2 sm:mt-0"
            >
              Agregar Recreo <PlusIcon fillColor='black'/>  
            </button>
          </div>
        </div>
      </div>
    </div>

    {viewChangeDate && (
      <ChangeDate eliminateModal={() => setViewChangeDate(false)} />
    )}
    {viewChangeDay && (
      <ChangeDay eliminateModal={() => setViewChangeDay(false)} />
    )}
    {viewChangeAcademicTime && (
      <ChangeAcademicTime eliminateModal={() => setViewChangeAcademicTime(false)} />
    )}
    {viewChangeDurationBreak && (
      <ChangeDurationBreak eliminateModal={() => setViewChangeDurationBreak(false)} />
    )}
    {viewAddBreak && (
      <AddBreak eliminateModal={() => setViewAddBreak(false)} />
    )}
    </>
  );
};

export default HorarioCalendario;