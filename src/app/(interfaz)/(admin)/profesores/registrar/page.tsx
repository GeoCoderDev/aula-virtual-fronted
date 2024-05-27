import React from 'react'

const RegistrarProfesor = () => {
  return (
    <main className="flex-1 flex items-center justify-center">
    <div className="w-full flex flex-col">
      <div className="flex flex-wrap w-full justify-start gap-6 items-center">
        <h1 className="section-tittle">Registrar Docente</h1>
        <button className="flex text-wrap flex-wrap items-center justify-center font-bold text-[0.8rem] px-3 rounded-lg py-2 max-w-44 w-max text-center bg-[#d3d3d3] leading-4 gap-1">
        <span className='text-ellipsis text-wrap text-center flex-auto max-[70%] w-min'>Registrar con CSV</span>
        <img alt="Logo CSV" loading="lazy" width="25" height="25" decoding="async" data-nimg="1" className="aspect-auto" src="/svg/CSV Icon.svg" style={{ color: 'transparent' }} />
      </button>
        <form className="flex flex-wrap gap-x-6 gap-y-8 py-5 justify-between w-full">

          <div className="mb-4">
            <label className="flex flex-col gap-y-2 font-bold">Nombres:
              <input className="custom-input w-[15rem]" minLength="1" maxLength="100" type="text" name="Nombres" />
            </label>
          </div>

          <div className="mb-4">
            <label className="flex flex-col gap-y-2 font-bold">Apellidos:
              <input className="custom-input w-[15rem]" minLength="4" maxLength="100" type="text" name="Apellidos" />
            </label>
          </div>

          <div className="mb-4">
            <label className="flex flex-col gap-y-2 font-bold">DNI:
              <input className="custom-input w-[8rem]" minLength="8" maxLength="8" type="text" name="DNI_Docente" />
            </label>
          </div>

          <div className="mb-4">
            <label className="flex flex-col gap-y-2 font-bold">Nombre Usuario:
              <input className="custom-input w-[14rem]" minLength="8" maxLength="30" type="text" name="Nombre_Usuario" />
            </label>
          </div>

          <div className="mb-4">
            <label className="flex flex-col gap-y-2 font-bold">Contraseña:
              <input className="custom-input w-[19rem]" minLength="8" maxLength="30" type="text" name="Nombre_Usuario" />
            </label>
          </div>

          <div className="mb-4">
            <label className="flex flex-col gap-y-2 font-bold">Fecha de Nacimiento:
              <input className="custom-input w-[11rem]" placeholder="dd / mm / aa" type="date" name="Fecha_Nacimiento" />
            </label>
          </div>

          <div className="mb-4">
            <label className="flex flex-col gap-y-2 font-bold">Foto de perfil:
              <input className="hidden" accept='.png , .jpg , .jpeg' type="file" name="Foto_Perfil" />
              <span className='w-max max-w-[8.5rem] text-wrap text-center bg-black py-1 leading-5 rounded-lg cursor-pointer break-words text-[0.9rem] px-3 text-white'>Seleccionar Archivo</span>
            </label>
          </div>

          <div className="mb-4">
            <label className="flex flex-col gap-y-2 font-bold">En caso de emergencia comunicarse con:
              <input className="custom-input w-[15rem]" minLength="1" maxLength="200" type="text" name="Direccion_Contacto_Emergencia" />
            </label>
          </div>

          <div className="mb-4">
            <label className="flex flex-col gap-y-2 font-bold">Parentezco:
              <input className="custom-input w-[10rem]" minLength="1" maxLength="40" type="text" name="Parentezco_Contacto_Emergencia" />
            </label>
          </div>

          <div className="mb-4">
            <label className="flex flex-col gap-y-2 font-bold">Teléfono:
              <input className="custom-input w-[10rem]" minLength="4" maxLength="9" type="text" name="Telefono_Contacto_Emergencia" />
            </label>
          </div>

          <div className="mb-4">
            <label className="flex flex-col gap-y-2 font-bold">Domicilio:
              <input className="custom-input w-[18rem]" minLength="1" maxLength="200" type="text" name="Direccion_Domicilio" />
            </label>
          </div>

          <div className="w-full">
            <div className="mb-4 text-left font-bold">Asignar cursos:</div>
            <table className="w-full min-w-full">
              <colgroup>
                <col className='w-[10rem]' />
                <col className='w-[10rem]' />
                <col className='w-[10rem]' />
                <col className='w-[10rem]' />
              </colgroup>
              <thead>
                <tr className="font-semibold bg-verde-spotify text-black">
                  <th className="text-center px-4 py-2">Curso</th>
                  <th className="text-center px-4 py-2">Grado</th>
                  <th className="text-center px-4 py-2">Sección</th>
                  <th className="text-center px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="-border-2">
                  <td className="p-4 text-center">Àlgebra</td>
                  <td className="p-4 text-center">3</td>
                  <td className="p-4 text-center">A</td>
                  <td>
                    <div className="w-full flex justify-center gap-x-4">
                      <button className="bg-rojo-orange text-white py-0.5 px-5 rounded font-bold">Desasignar</button>
                    </div>
                  </td>
                </tr>
                <tr className="-border-2">
                  <td className="p-4 text-center">Aritmètica</td>
                  <td className="p-4 text-center">4</td>
                  <td className="p-4 text-center">C</td>
                  <td>
                    <div className="w-full flex justify-center gap-x-4">
                      <button className="bg-rojo-orange text-white py-0.5 px-5 rounded font-bold">Desasignar</button>
                    </div>
                  </td>
                </tr>
                <tr className="-border-2">
                  <td className="p-4 text-center">Quìmica</td>
                  <td className="p-4 text-center">4</td>
                  <td className="p-4 text-center">A</td>
                  <td>
                    <div className="w-full flex justify-center gap-x-4">
                      <button className="bg-rojo-orange text-white py-0.5 px-5 rounded font-bold">Desasignar</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="w-full flex flex-col gap-y-2 justify-center items-center">
            <button className="button-with-loader max-w-[70%] py-2 self-center" type='submit'>Registrar Docente</button>
          </div>
        </form>
      </div>
    </div>
    </main>
  );
}

export default RegistrarProfesor
