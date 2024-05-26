import React from "react";

const RegistrarProfesor = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-wrap w-full justify-start gap-6 items-center">
        <h1 className="section-tittle">Registrar Docente</h1>
        <form className="flex flex-wrap gap-x-6 gap-y-8 py-5 justify-between w-full">
          <div className="mb-4">
            <label className="flex flex-col gap-y-2 font-bold">
              Nombres:
              <input
                className="custom-input w-[30rem]"
                minLength={1}
                maxLength={100}
                type="text"
                name="Nombres"
              ></input>
            </label>
          </div>

          <div className="mb-4">
            <label className="flex flex-col gap-y-2 font-bold">
              Apellidos:
              <input
                className="custom-input w-[30rem]"
                minLength={4}
                maxLength={100}
                type="text"
                name="Apellidos"
              ></input>
            </label>
          </div>

          <div className="mb-4">
            <label className="flex flex-col gap-y-2 font-bold">
              DNI:
              <input
                className="custom-input w-[13rem]"
                minLength={8}
                maxLength={8}
                type="text"
                name="DNI_Docente"
              ></input>
            </label>
          </div>

          <div className="mb-4">
            <label className="flex flex-col gap-y-2 font-bold">
              Nombre Usuario:
              <input
                className="custom-input w-[20rem]"
                minLength={8}
                maxLength={30}
                type="text"
                name="Nombre_Usuario"
              ></input>
            </label>
          </div>

          <div className="mb-4">
            <label className="flex flex-col gap-y-2 font-bold">
              Contraseña:
              <input
                className="custom-input w-[20rem]"
                minLength={8}
                maxLength={30}
                type="text"
                name="Nombre_Usuario"
              ></input>
            </label>
          </div>

          <div className="mb-4">
            <label className="flex flex-col gap-y-2 font-bold">
              Fecha de Nacimiento:
              <input
                className="custom-input w-[11rem]"
                placeholder="dd / mm / aa"
                type="date"
                name="Fecha_Nacimiento"
              ></input>
            </label>
          </div>

          <div className="mb-4">
            <label className="flex flex-col gap-y-2 font-bold">
              Domicilio:
              <input
                className="custom-input w-[25rem]"
                minLength={1}
                maxLength={200}
                type="text"
                name="Direccion_Domicilio"
              ></input>
            </label>
          </div>

          <div className="mb-4">
            <label className="flex flex-col gap-y-2 font-bold">
              Foto de perfil:
              <input
                className="hidden"
                accept=".png , .jpg , .jpeg"
                type="file"
                name="Foto_Perfil"
              ></input>
              <span className="w-max max-w-[8.5rem] text-wrap text-center bg-black py-1 leading-5 rounded-lg cursor-pointer break-words text-[0.9rem] px-3 text-white">
                Seleccionar Archivo
              </span>
            </label>
          </div>

          <div className="mb-4">
            <label className="flex flex-col gap-y-2 font-bold">
              En caso de emergencia comunicarse con:
              <input
                className="custom-input w-[30rem]"
                minLength={1}
                maxLength={200}
                type="text"
                name="Direccion_Contacto_Emergencia"
              ></input>
            </label>
          </div>

          <div className="mb-4">
            <label className="flex flex-col gap-y-2 font-bold">
              Parentezco:
              <input
                className="custom-input w-[13rem]"
                minLength={1}
                maxLength={40}
                type="text"
                name="Parentezco_Contacto_Emergencia"
              ></input>
            </label>
          </div>

          <div className="mb-4">
            <label className="flex flex-col gap-y-2 font-bold">
              Teléfono:
              <input
                className="custom-input w-[13rem]"
                minLength={4}
                maxLength={9}
                type="text"
                name="Telefono_Contacto_Emergencia"
              ></input>
            </label>
          </div>

          <div className="mb-4">
            <label className="flex flex-col gap-y-2 font-bold">
              Asignar cursos:
            </label>
          </div>

          <table className="w-full min-w-full">
            <colgroup>
              <col className="w-[10rem]"></col>
              <col className="w-[10rem]"></col>
              <col className="w-[10rem]"></col>
              <col className="w-[10rem]"></col>
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
                    <button className="font-medium px-2 py-1 rounded-lg bg-rojo">
                      Desasignar
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="-border-2">
                <td className="p-4 text-center">Aritmètica</td>
                <td className="p-4 text-center">4</td>
                <td className="p-4 text-center">C</td>
                <td>
                  <div className="w-full flex justify-center gap-x-4">
                    <button className="font-medium px-2 py-1 rounded-lg bg-rojo">
                      Desasignar
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="-border-2">
                <td className="p-4 text-center">Quìmica</td>
                <td className="p-4 text-center">4</td>
                <td className="p-4 text-center">A</td>
                <td>
                  <div className="w-full flex justify-center gap-x-4">
                    <button className="font-medium px-2 py-1 rounded-lg bg-rojo">
                      Desasignar
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="w-full flex flex-col gap-y-2 justify-center items-center">
            <button
              className="button-with-loader max-w-[70%] py-2 self-center"
              type="submit"
            >
              Registrar Docente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrarProfesor;
