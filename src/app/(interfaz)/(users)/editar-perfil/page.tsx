import React from "react";
import { FaUser } from "react-icons/fa";

const EditarPerfil = ({
  nombreUsuario,
  tipoUsuario,
}: {
  nombreUsuario: string;
  tipoUsuario: string;
}) => {
  const cellStyle = {
    border: "2px solid #00FF6F",
    padding: "8px",
    borderRadius: "50px",
    width: "100%",
    marginTop: "10px",
    boxSizing: "border-box",
  };

  const boldLabelStyle = {
    fontWeight: "bold",
  };

  const requiredFieldStyle = {
    ...cellStyle,
    backgroundColor: "#f9f9f9", // Cambiar el color de fondo para resaltar campos requeridos
  };

  const botonStyle = {
    backgroundColor: "#1db954",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "50px",
    cursor: "pointer",
    marginTop: "20px",
    width: "calc(100% / 3)",
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        maxWidth: "900px",
        margin: "auto",
        borderRadius: "10px",
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
        }}
      >
        <FaUser
          style={{
            width: "100px",
            height: "100px",
            marginBottom: "10px",
            color: "#1db954",
          }}
        />
        <button
          style={{
            background: "none",
            border: "none",
            color: "#1db954",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Cambiar foto de perfil
        </button>
      </div>
      <div style={{ flex: 3 }}>
        <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
          {nombreUsuario}
        </h2>
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1 }}>
            <label style={boldLabelStyle}>Domicilio:</label>
            <input
              type="text"
              placeholder="Domicilio*"
              className="custom-input"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={boldLabelStyle}>Teléfono:</label>
            <input
              type="text"
              placeholder="Teléfono*"
              className="custom-input"
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1 }}>
            <label style={boldLabelStyle}>Cambiar contraseña:</label>
            <br />
            <label>Contraseña actual*</label>
            <input
              type="password"
              placeholder="Contraseña actual*"
              className="custom-input"
            />
            <label>
              Nueva contraseña<abbr title=""></abbr>*
            </label>
            <input
              type="password"
              placeholder="Nueva contraseña*"
              className="custom-input"
            />
            <label>Confirma tu nueva contraseña*</label>
            <input
              type="password"
              placeholder="Confirma tu nueva contraseña*"
              className="custom-input"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>En caso de emergencia comunicarse con:</label>
            <input type="text" placeholder="Nombre*" className="custom-input" />
            <div
              style={{
                display: "flex",
                gap: "20px",
                marginBottom: "20px",
                alignItems: "center",
              }}
            >
              <div style={{ flex: 1 }}>
                <label>Parentesco:</label>
                <input
                  type="text"
                  placeholder="Parentesco*"
                  className="custom-input"
                />
              </div>
              <div style={{ flex: 1 }}>
                <label>Teléfono:</label>
                <input
                  type="text"
                  placeholder="Teléfono*"
                  className="custom-input"
                />
              </div>
            </div>
          </div>
        </div>
        <button style={botonStyle}>GUARDAR CAMBIOS</button>
      </div>
    </div>
  );
};

export default EditarPerfil;
