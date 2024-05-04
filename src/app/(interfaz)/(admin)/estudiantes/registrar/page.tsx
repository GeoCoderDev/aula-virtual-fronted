const RegistrarEstudiante = () => {
  return (
    <div className="w-full h-screen p-4">
      <form className="w-full h-full">
        <h1 className="text-2xl font-bold mb-4">Nuevo Estudiante</h1>
        <div className="flex flex-row mb-4">
          <div className="w-1/2">
            <label
              className="block text-gray-700 font-bold mb-1"
              htmlFor="nombres"
            >
              Nombres:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nombres"
              type="text"
            />
          </div>
          <div className="w-1/2">
            <label
              className="block text-gray-700 font-bold mb-1"
              htmlFor="apellidos"
            >
              Apellidos:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="apellidos"
              type="text"
            />
          </div>
        </div>

        <div className="flex flex-row mb-4">
          <div className="w-1/3 mr-2">
            <label className="block text-gray-700 font-bold mb-1" htmlFor="dni">
              DNI:
              <input
                className="appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="dni"
                type="text"
              />
            </label>
          </div>
          <div className="w-1/3 mr-2">
            <label
              className="block text-gray-700 font-bold mb-1"
              htmlFor="username"
            >
              Username Generado:
            </label>
            <input
              className="appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
            />
          </div>
          <div className="w-1/3">
            <label
              className="block text-gray-700 font-bold mb-1"
              htmlFor="password"
            >
              Contraseña:
            </label>
            <input
              className="appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-1"
            htmlFor="birthdate"
          >
            Fecha de Nacimiento:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="birthdate"
            type="date"
            placeholder="dd / mm / aa"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-1" htmlFor="grade">
            Grado:
          </label>
          <select
            className="appearance-none border  w-full py-1 px-2 pr-8 rounded-lg shadow-md"
            id="grade"
          >
            <option value="">Seleccione...</option>
            <option value="1">1ro</option>
            <option value="2">2do</option>
            <option value="3">3ro</option>
            <option value="4">4to</option>
            <option value="5">5to</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-1"
            htmlFor="section"
          >
            Sección:
          </label>
          <select
            className="appearance-none border  w-full py-1 px-2 pr-8 rounded-lg shadow-md"
            id="section"
          >
            <option value="">Seleccione...</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-1"
            htmlFor="profilePicture"
          >
            Foto de Perfil:
          </label>
          <input
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="file"
            accept=".png, .jpg, .jpeg"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-1"
            htmlFor="relationship"
          >
            Parentezco:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="relationship"
            type="text"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-1" htmlFor="phone">
            Teléfono:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-1"
            htmlFor="emergencyContact"
          >
            En caso de emergencia comunicarse con:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="emergencyContact"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-1"
            htmlFor="address"
          >
            Domicilio:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
          />
        </div>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Registrar Estudiante
        </button>
      </form>
    </div>
  );
};

export default RegistrarEstudiante;
