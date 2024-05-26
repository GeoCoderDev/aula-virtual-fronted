import React from 'react';

const HorarioEstudiante = () => {
  // Definir los días de la semana
  const daysOfWeek = ['Horario','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes','Sábado'];
  
  // Definir los horarios
  const PrimeraHora= ['', ' ', '', '', '', '', ''];
  const SegundaHora= ['', '', '', '', '', '', ''];
  const TerceraHora= ['', '', '', '', '', '', ''];
  const CuartaHora= ['', '', '', '', '', '', ''];
  const QuintaHora= ['', '', '', '', '', '', ''];
  const SextaHora= ['', '', '', '', '', '', ''];


  // Estilo común para las celdas de la tabla
  const cellStyle = {
    border: '2px solid #cfcfcf', // Cambiar el color de las líneas de las celdas a gris claro
    padding: '8px',
    width: '150px', // Ancho de celda fijo
    height: '50px', // Alto de celda fijo
    whiteSpace: 'nowrap', // Evitar que el contenido se desborde
    overflow: 'hidden', // Ocultar el contenido que se desborda
    textOverflow: 'ellipsis', // Mostrar puntos suspensivos cuando el contenido se desborda
  };

  return (
    <div style={{ overflowX: 'auto', margin: '0', padding: '0' }}>
      <div style={{ margin: '0 auto', maxWidth: '80vw' }}> {/* Ancho máximo de la ventana */}
        {/* Carta en la parte superior */}
        <div className="px-4 py-3 rounded-[0.5rem] bg-verde-spotify font-bold" style={{ marginBottom: '1rem', maxWidth: 'calc(100vw - 16px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>HORARIO - DOCENTE: JUAN GABRIEL PEREZ</div>
      <div>
        <select className="px-4 py-3 rounded-[0.5rem] bg-verde-spotify font-bold" style={{ color: 'black', marginRight: '10px' }}>
          <option value="FILTRAR CURSOS">FILTRAR CURSOS ↓</option>
          <option value="matematica">Matemática</option>
          <option value="fisica">Física</option>
        </select>
        <div id="algebraOptions" style={{ display: 'none' }}>
          <input type="checkbox" id="algebra" name="curso" value="algebra" />
          <label htmlFor="algebra">Álgebra</label>
        </div>
        <div id="matematicaOptions" style={{ display: 'none' }}>
          <input type="checkbox" id="matematica" name="curso" value="matematica" />
          <label htmlFor="matematica">Matemática</label>
        </div>
        <div id="fisicaOptions" style={{ display: 'none' }}>
          <input type="checkbox" id="fisica" name="curso" value="fisica" />
          <label htmlFor="fisica">Física</label>
        </div>
      </div>
      </div>
      
        <div style={{ maxWidth: '100vw', overflowX: 'auto' }}> {/* Contenedor con desplazamiento horizontal */}
          <table style={{ borderCollapse: 'collapse', margin: '0', padding: '0', tableLayout: 'fixed', maxWidth: '100%' }}> {/* Ancho máximo de la tabla */}
            <thead>
              <tr>
                {daysOfWeek.map((day, index) => (
                  <th
                    key={index}
                    style={{
                      ...cellStyle,
                      backgroundColor: '#cfcfcf',
                      color: 'black',
                      borderTopLeftRadius: index === 0 ? '10px' : '0',
                      borderTopRightRadius: index === daysOfWeek.length - 1 ? '10px' : '0',
                      borderLeft: index !== 0 ? '1px solid black' : 'none',
                      borderRight: index !== daysOfWeek.length - 1 ? '2px solid #B6B6B7' : 'none',
                      borderBottom: 'none',
                      borderTop: index === 0 && day !== 'Horario' ? '2px solid #B6B6B7' : 'none' // Aplicar borde superior solo a la primera celda del encabezado, excluyendo "Horario"
                    }}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* Aquí se definen las celdas de los horarios */}
                {PrimeraHora.map((time, index) => (
                  <td
                    key={index}
                    style={{
                      ...cellStyle,
                      borderBottomLeftRadius: index === 0 ? '10px' : '0',
                      borderBottomRightRadius: index === PrimeraHora.length - 1 ? '10px' : '0'
                    }}
                  >
                    {time}
                  </td>
                ))}
              </tr>
              <tr>
                {/* Aquí se definen las celdas de los horarios */}
                {SegundaHora.map((time, index) => (
                  <td
                    key={index}
                    style={{
                      ...cellStyle,
                      borderBottomRightRadius: index === SegundaHora.length - 1 ? '10px' : '0'
                    }}
                  >
                    {time}
                  </td>
                ))}
              </tr>
              <tr>
                {/* Aquí se definen las celdas de los horarios */}
                {TerceraHora.map((time, index) => (
                  <td
                    key={index}
                    style={{
                      ...cellStyle,
                      borderBottomRightRadius: index === TerceraHora.length - 1 ? '10px' : '0'
                    }}
                  >
                    {time}
                  </td>
                ))}
              </tr>
              <tr>
                {/* Aquí se definen las celdas de los horarios */}
                {TerceraHora.map((time, index) => (
                  <td
                    key={index}
                    style={{
                      ...cellStyle,
                      borderBottomRightRadius: index === TerceraHora.length - 1 ? '10px' : '0'
                    }}
                  >
                    {time}
                  </td>
                ))}
              </tr>
              <tr>
                {/* Aquí se definen las celdas de los horarios */}
                {TerceraHora.map((time, index) => (
                  <td
                    key={index}
                    style={{
                      ...cellStyle,
                      borderBottomRightRadius: index === TerceraHora.length - 1 ? '10px' : '0'
                    }}
                  >
                    {time}
                  </td>
                ))}
              </tr>
              <tr>
                {/* Aquí se definen las celdas de los horarios */}
                {CuartaHora.map((time, index) => (
                  <td
                    key={index}
                    style={{
                      ...cellStyle,
                      borderBottomRightRadius: index === CuartaHora.length - 1 ? '10px' : '0'
                    }}
                  >
                    {time}
                  </td>
                ))}
              </tr>
              <tr>
                {/* Aquí se definen las celdas de los horarios */}
                {QuintaHora.map((time, index) => (
                  <td
                    key={index}
                    style={{
                      ...cellStyle,
                      borderBottomRightRadius: index === QuintaHora.length - 1 ? '10px' : '0'
                    }}
                  >
                    {time}
                  </td>
                ))}
              </tr>
              <tr>
                {/* Aquí se definen las celdas de los horarios */}
                {SextaHora.map((time, index) => (
                  <td
                    key={index}
                    style={{
                      ...cellStyle,
                      borderBottomRightRadius: index === SextaHora.length - 1 ? '10px' : '0'
                    }}
                  >
                    {time}
                  </td>
                ))}
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HorarioEstudiante;

