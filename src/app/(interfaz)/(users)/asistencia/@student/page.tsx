import React from 'react';

const AsistenciaEstudiante = () => {
  const data = [
    { id: 1, nombre: 'Algebra', grado: '1', seccion: 'A' },
    { id: 2, nombre: 'Geometría', grado: '3', seccion: 'A' },
    { id: 3, nombre: 'Trigonometría', grado: '4', seccion: 'B' },
    // Agrega más datos según sea necesario
  ];

  const allData = [...data];

  // Estilo común para las celdas de la tabla
  const cellStyle = {
    border: '2px solid #black', // Cambiar el color de las líneas de las celdas a gris claro
    padding: '13px',
    minWidth: '200px', // Ancho mínimo de celda
    whiteSpace: 'nowrap', // Evitar que el contenido se desborde
    overflow: 'hidden', // Ocultar el contenido que se desborda
    textOverflow: 'ellipsis', // Mostrar puntos suspensivos cuando el contenido se desborda
  };

  return (
    <div style={{ overflowX: 'auto', margin: '0', padding: '0' }}>
      <div style={{ margin: '0 auto', maxWidth: '90vw' }}> {/* Ancho máximo de la ventana */}
        <div className="flex flex-col items-start justify-center gap-y-6 h-full">
          <div className="max-h-full overflow-auto">
            <table className="min-w-full border-collapse border border-gray-200" style={{ border: 'none' }}>
              <thead>
                <tr className="font-semibold bg-verde-spotify text-black">
                  <th className="px-8 py-3 border border-r-0" style={cellStyle}>Nombre</th>
                  <th className="px-8 py-3 border border-r-0" style={cellStyle}>Grado</th>
                  <th className="px-8 py-3 border border-r-0" style={cellStyle}>Sección</th>
                  <th className="px-8 py-3 border border-l-0" style={cellStyle}></th>
                </tr>
              </thead>
              <tbody>
                {allData.map((item, index) => (
                  <tr key={item.id} className={`border-b-[0.1rem] border-black ${index === allData.length - 1 ? 'w-full' : ''}`}>
                    <td className="py-4 text-center px-8" style={{ ...cellStyle, borderRight: 'none' }}>{item.nombre}</td>
                    <td className="py-4 text-center px-8" style={{ ...cellStyle, borderRight: 'none' }}>{item.grado}</td>
                    <td className="py-4 text-center px-8" style={{ ...cellStyle, borderRight: 'none' }}>{item.seccion}</td>
                    <td className="py-4 flex items-center justify-center gap-x-8" style={{ ...cellStyle, borderLeft: 'none', borderRight: 'none' }}> {/* Separación adicional de 4 */}
    
                      <button
                        type="button"
                        className="text-white bg-azul-pablo rounded-[0.5rem] py-2 px-4 font-semibold text-[0.9rem] disabled:grayscale-[0.5]"
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsistenciaEstudiante;
