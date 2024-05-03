import React from "react";

const Administradores = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <p className=" text-4xl   font-extrabold">Buscar Administrador</p>
        <button
          type="button"
          className="bg-verde-spotify rounded-full py-3 px-4 font-semibold flex items-center justify-center gap-x-2 disabled:grayscale-[0.5]"
        >
          Registrar Administrador
        </button>
      </div>

      <div className="flex justify-between items-center">
        <p className="font-semibold">NOMBRE DE USUARIO:</p>
        <input
          // onChange=''
          maxLength={100}
          name="username"
          required={true}
          style={{ boxShadow: "0 0 10px 4px #00FF6F50" }}
          className="outline-none w-[80%] px-4 rounded-[1rem] py-2 font-semibold placeholder:text-black"
          type="text"
          placeholder="Nombre de Usuario*"
          value=""
        />
      </div>

      <div>
        <table>
          <tr>
            <td>ID</td>
            <td>Nombre de Usuario</td>
            <td>Acciones


              {/* <button
                type="button"
                className="font-bold self-end text-sm mt-6 hover:underline"
              >
                Eliminar
              </button>
              <button
                type="button"
                className="font-bold self-end text-sm mt-6 hover:underline"
              >
                Cambiar Nombre de Usuario
              </button>
              <button
                type="button"
                className="font-bold self-end text-sm mt-6 hover:underline"
              >
                Cambiar Contraseña
              </button> */}
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Administradores;
