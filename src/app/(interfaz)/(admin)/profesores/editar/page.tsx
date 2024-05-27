import { min } from "date-fns";
import React from "react";

const EditarProfesor = () => {
  return (
<main className="flex-1 flex items-center justify-center">
    <div id="main-content" className=" w-full flex items-start justify-center p-8">
      <div className="flex flex-wrap flex-col w-full -border-2">
        <div className="flex">
          <a href="/profesores">
            <div className="cursor-pointer hover:underline">Docentes</div>
          </a>  
          &nbsp;&gt;&nbsp;
          <div className="cursor-pointer hover:underline">Editar Docente</div>
        </div>
        <h1 className="section-tittle">Editar Docente</h1>
        <form className="flex w-full flex-wrap gap-x-18 items-center content-center">
          <div className="py-5 flex-col gap-y-4 flex items-center justify-start -border-2">
            <img className="aspect-square border-2 w-40 rounded-[50%] bg-contain object-cover bg-no-repeat bg-center" src="https://aula-prueba.s3.us-east-2.amazonaws.com/foto35.jpg?X-Amz-Content…Signature=ad71d47…" alt="Foto Perfil"/>
            <label className="flex flex-col gap-y-2 font-bold">
            <input className="hidden" accept=".png, .jpg, .jpeg" type="file" name="Foto_Perfil"></input>
            <span className="w-max max-w-[8.5rem] text-wrap text-center bg-black py-1 leading-5 rounded-lg cursor-pointer break-words text-[0.9rem] px-3 text-white">Cambiar foto de perfil</span>
            </label>
          </div>

          <div className="flex items-center flex-1 justify-between item-center w-full flex-wrap gap-x-6 gap-y-8 py-5">
              <label className="flex flex-col gap-y-2 font-bold">Nombres:
                  <input className="custom-input w-[15rem]" minLength="1" maxLength="100" type="text" name="Nombres" />
              </label>

              <label className="flex flex-col gap-y-2 font-bold">Apellidos:
                <input className="custom-input w-[15rem]" minLength="4" maxLength="100" type="text" name="Apellidos" />
              </label>

              <label className="flex flex-col gap-y-2 font-bold">DNI:
                <input className="custom-input w-[8rem]" minLength="8" maxLength="8" type="text" name="DNI_Docente" />
              </label>

              <label className="flex flex-col gap-y-2 font-bold">Nombre Usuario:
                <input className="custom-input w-[14rem]" minLength="8" maxLength="30" type="text" name="Nombre_Usuario" />
              </label>

              <label className="flex flex-col gap-y-2 font-bold">Fecha de Nacimiento:
                <input className="custom-input w-[11rem]" placeholder="dd / mm / aa" type="date" name="Fecha_Nacimiento" />
              </label>

              <label className="flex flex-col gap-y-2 font-bold">Domicilio:
                <input className="custom-input w-[18rem]" minLength="1" maxLength="200" type="text" name="Direccion_Domicilio" />
              </label>

              <label className="flex flex-col gap-y-2 font-bold">En caso de emergencia comunicarse con:
                <input className="custom-input w-[15rem]" minLength="1" maxLength="200" type="text" name="Direccion_Contacto_Emergencia" />
              </label>

              <label className="flex flex-col gap-y-2 font-bold">Parentezco:
                <input className="custom-input w-[10rem]" minLength="1" maxLength="40" type="text" name="Parentezco_Contacto_Emergencia" />
              </label>

              <label className="flex flex-col gap-y-2 font-bold">Teléfono:
                <input className="custom-input w-[10rem]" minLength="4" maxLength="9" type="text" name="Telefono_Contacto_Emergencia" />
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

          <div className="min-w-full flex items-center justify-center">
            <button className="button-with-loader max-w-[70%] py-2 self-center" type="submit">Guardar Cambios</button>
          </div>

        </form>
      </div>
    </div>
</main>
);
}

export default EditarProfesor;
