"use client";

import React, { useState } from "react";

interface EditarPerfilProps {
  nombreUsuario: string;
  tipoUsuario: string;
}

const EditarPerfilProfesorEstudiante: React.FC<EditarPerfilProps> = ({
  nombreUsuario,
  tipoUsuario,
}) => {
  const [domicilio, setDomicilio] = useState("");
  const [telefono, setTelefono] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    alert("Cambios guardados exitosamente");
  };

  const inputStyle = {
    border: "2px solid #00FF6F",
    padding: "8px",
    borderRadius: "50px",
    width: "100%",
    marginTop: "1px",
    boxSizing: "border-box",
    backgroundColor: "#f9f9f9",
  };

  const boldLabelStyle = {
    fontWeight: "bold",
    display: "block",
    marginTop: "1px",
    fontSize: "20px",
  };
  const bLabelStyle = {
    fontWeight: "bold",
    display: "block",
    marginTop: "10px",
  };

  const buttonStyle = {
    backgroundColor: "#00FF6F",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "50px",
    cursor: "pointer",
    marginTop: "1px",
    width: "50%",
    textAlign: "aligt", // Esta línea parece tener un error tipográfico, debería ser 'textAlign: 'left''
    fontWeight: "bold",
    marginLeft: "180px", // Agrega margen a la izquierda
  };

  const headerStyle = {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "20px",
    fontFamily: "Roboto",
    textAlign: "center",
    marginLeft: "180px",
  };

  return (
    <div
      style={{
        padding: "50px",
        maxWidth: "900px",
        margin: "auto",
        borderRadius: "10px",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={headerStyle}>{nombreUsuario}JUAN GABRIEL PEREZ</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: "0 0 206.1px",
          }}
        >
          <img
            alt="Foto de Perfil"
            className="aspect-square w-[16rem]"
            src="/svg/No-Foto-Perfil.svg"
          />

          <button style={boldLabelStyle}>Cambiar foto de perfil</button>
        </div>
        <div style={{ flex: "1", marginLeft: "20px" }}>
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            <div style={{ flex: "1 1 45%" }}>
              <label style={boldLabelStyle}>Domicilio:</label>
              <input
                type="text"
                placeholder="Domicilio*"
                value={domicilio}
                onChange={(e) => setDomicilio(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={{ flex: "1 1 45%" }}>
              <label style={boldLabelStyle}>Teléfono:</label>
              <input
                type="text"
                placeholder="Teléfono*"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            <label style={boldLabelStyle}>Cambiar contraseña:</label>
            <div
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                marginBottom: "20px",
              }}
            >
              <div style={{ flex: "1 1 45%" }}>
                <label style={bLabelStyle}>Contraseña actual*</label>
                <input
                  type="password"
                  placeholder="Contraseña actual*"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="custom-input"
                />
              </div>
              <div style={{ flex: "1 1 45%" }}>
                <label style={bLabelStyle}>Nueva contraseña*</label>
                <input
                  type="password"
                  placeholder="Nueva contraseña*"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="custom-input"
                />
              </div>
              <div style={{ flex: "1 1 45%" }}>
                <label style={bLabelStyle}>Confirma tu nueva contraseña*</label>
                <input
                  type="password"
                  placeholder="Confirma tu nueva contraseña*"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="custom-input"
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            <label style={bLabelStyle}>
              En caso de emergencia comunicarse con:
            </label>
            <div style={{ flex: "1 1 45%" }}>
              <input
                type="text"
                placeholder="Nombre*"
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
                className="custom-input"
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                marginBottom: "20px",
              }}
            >
              <div style={{ flex: "1 1 45%" }}>
                <label style={bLabelStyle}>Parentesco:</label>
                <input
                  type="text"
                  placeholder="Parentesco*"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="custom-input"
                />
              </div>
              <div style={{ flex: "1 1 45%" }}>
                <label style={bLabelStyle}>Teléfono:</label>
                <input
                  type="text"
                  placeholder="Teléfono*"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  className="custom-input"
                />
              </div>
            </div>
          </div>
          <button onClick={handleSaveChanges} className="button-with-loader">
            GUARDAR CAMBIOS
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarPerfilProfesorEstudiante;
