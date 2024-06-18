import React from 'react';
import EditarIcon from '@/components/icons/others/EditarIcon';
import EliminarIcon from '@/components/icons/others/EliminarIcon';
import PlusIcon from '@/components/icons/others/PlusIcon';
// import PlusIcon from '@/components/icons/others/PlusIcon';

const HorarioCalendario = () => {
  return (
    <div className="flex flex-col items-start justify-center w-full">
      <h1 className="text-3xl font-bold mb-4">Horario y Calendario</h1>
      
      {/* Inicio y Fin de Año Escolar */}
      <div className="mb-6 p-4 bg-white rounded w-full">
        <h2 className="text-xl font-semibold">Inicio y Fin de Año Escolar</h2>
        <p className="mt-2 border-t pt-2">
          Establece las fechas de inicio y fin del año escolar. Estas fechas son cruciales para programar correctamente el calendario escolar y eventos importantes relacionados con el año escolar.
        </p>
        <div className="flex items-center mt-4 pt-4">
          <div className="flex-2">
            <div className="flex items-center">
                <div className="flex space-x-4">
                <p>
                  <span className="font-bold italic">Inicio:</span> 23/03/2024
                </p>
                <p>
                  <span className="font-bold italic">Fin:</span> 18/12/2024
                </p>
              </div>
              <button className="button-with-loader ml-10">
                  Modificar <EditarIcon />
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* Días de Clase */}
      <div className="mb-6 p-4 bg-white rounded w-full">
        <h2 className="text-xl font-semibold">Días de Clase</h2>
        <p className="mt-2 border-t pt-2">
          Establece los días de la semana en los que se impartirán clases. Normalmente, las instituciones educativas tienen clases de lunes a viernes, pero puedes seleccionar los días específicos según tus necesidades.
        </p>
        <div>
          <div className="flex items-center mt-4 pt-4">
            <div className="flex-2">
              <div className="flex items-center">
                <div className="flex space-x-2">
                  {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map(day => (
                    <button key={day} className="px-4 py-2 bg-gray-200 rounded">{day}</button>
                  ))}
                </div>
                <button className="button-with-loader ml-10">
                  Modificar <EditarIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      
      {/* Duración Hora Académica */}
      <div className="mb-6 p-4 bg-white  rounded w-full">
        <h2 className="text-xl font-semibold">Duración Hora Académica</h2>
        <p className=" mt-2 border-t pt-2">Establece la duración de cada hora académica o período de clase. La duración de la hora académica es un factor clave para garantizar el cumplimiento de los requisitos de horas lectivas y la correcta planificación de los horarios de clase.</p>
        <div className="flex items-center mt-4 pt-4">
          <div className="flex-2">
            <div className="flex items-center">
                <div className="flex space-x-4">
                <p>
                  <span className="font-bold italic">Duración:</span> 45 Minutos
                </p>
              </div>
              <button className="button-with-loader ml-10">
                Modificar <EditarIcon /> 
              </button>
            </div>
          </div>
        </div>
      </div>

      
      
      {/* Recreos */}
      <div className="mb-6 p-4 bg-white rounded w-full">
        <h2 className="text-xl font-semibold">Recreos</h2>
        <p className=" mt-2 border-t pt-2">Establece la duración de cada hora académica o período de clase. La duración de la hora académica es un factor clave para garantizar el cumplimiento de los requisitos de horas lectivas y la correcta planificación de los horarios de clase.</p>
        <div className="flex items-center mt-4 pt-4">
          <div className="flex-2">
            <div className="flex items-center">
                <div className="flex space-x-4">
                <p>
                  <span className="font-bold italic">Duración:</span> 15 Minutos
                </p>
              </div>
              <button className="button-with-loader ml-10">
                Modificar <EditarIcon /> 
              </button>
            </div>
          </div>
        </div>
        

        {/* Agregar Recreo */}
        <div className="mt-4 pt-4 bg-verde-spotify bg-opacity-5 rounded-lg border-4 border-verde-spotify p-4 max-w-md ml-0">
          {[
            { id: 1, time: '11:00 - 11:15' },
            { id: 2, time: '16:25 - 16:40' },
          ].map(recreo => (
            <div key={recreo.id} className="flex items-center justify-between p-2 rounded mb-2">
              <div className="flex items-center">
              <p className="font-bold italic">Recreo {recreo.id}:</p>
              <p className="ml-10">{recreo.time}</p>
            </div>
              <div className="flex space-x-2">
                <button className="px-2 py-2 button-with-loader">
                  <EditarIcon className="ml-1 mr-1" />
                  {/* Botón Editar */}
                </button>
                <button className="px-2 py-2 bg-rojo-orange button-with-loader">
                  <EliminarIcon fillColor='white' className="ml-1 mr-1" /> 
                  {/* Botón Eliminar */}
                </button>
              </div>
            </div>
          ))}
          {/* Botón Agregar Recreo */}
          <div>
            <button className="button-with-loader">
              Agregar Recreo <PlusIcon fillColor='black'/>  
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HorarioCalendario;
