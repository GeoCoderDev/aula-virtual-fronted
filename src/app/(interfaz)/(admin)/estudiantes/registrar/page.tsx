import "./RegistrarEstudiante.css";
const RegistrarEstudiante = () => {
  return (
    <>
      <div>RegistrarEstudiante</div>
        <form>
        <fieldset>
          <label>
            Nombres:
            <input type="text" name="nombres" required/>
          </label>
          <label>
            Apellidos:
            <input type="text" name="apellidos" required/>
          </label>
        <fieldset>
          <label>
            DNI:
            <input type="number" name="dni" required/>
          </label>
          <label>
            Username Generado:
            <input type="text" name="username" required/> 
          </label>
          <label>
            Contraseña:
            <input type="password" name="contrasena" required/>
          </label>
        </fieldset>
          
        </fieldset>


        <fieldset>
      <label>
            Fecha de Nacimiento:
            <input type="date" name="fechaNacimiento" required/>
          </label>
          <label>
            Grado:
            <select name="grado" required>
              <option value="">Seleccione...</option>
              <option value="1">1ro</option>
              <option value="2">2do</option>
              <option value="3">3ro</option>
              <option value="4">4to</option>
              <option value="5">5to</option>
            </select>
          </label>
          <label>
            Sección:
            <select name="seccion" required>
              <option value="">Seleccione...</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
          </label>
          <label>
            Foto de Perfil:
            <input type="file" name="fotoPerfil" />
          </label>
        </fieldset>	
        <fieldset>
          <legend>Contacto de Emergencia</legend>
          <label>
            En caso de emergencia comunicarse con:
            <input type="text" name="contactoEmergencia" required/>
          </label>
          <label>
            Parentezco:
            <input type="text" name="parentezco" required/>
          </label>
          <label>
            Teléfono:
            <input type="tel" name="telefono" required/>
          </label>
        </fieldset>

        <fieldset>
          <label>
            Domicilio:
            <input type="text" name="domicilio" required/>
          </label> 

        </fieldset>
    <button type="submit">REGISTRAR ESTUDIANTE</button>
  </form>
    </>
  );
};

export default RegistrarEstudiante;