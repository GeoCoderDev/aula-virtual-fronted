import React from "react";

const Home = () => {
  return (
    <div style={{ textAlign: "left", marginLeft: "20px", marginTop: "20px" }}>
      <h1 style={{ fontSize: "4em", fontWeight: "bold" }}>¡Hola!</h1>
      <p style={{ fontSize: "2em" }}>Bienvenido de nuevo.</p>
      <h1 style={{ fontSize: "4em", fontWeight: "bold" }}>Juan Chaves</h1>
      <img
        src="/png/Logo Universidad.png"
        alt="Imagen 1"
        className="w-[18rem] aspect-auto"
        style={{ maxWidth: "200px", maxHeight: "200px", margin: "10px" }}
      />

      

      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          margin: "20px",
        }}
      >
        <div style={{ width: "30%" }}>
          <p>
            ¡Nos emociona presentar esta nueva y avanzada aula virtual! Diseñada
            por estudiantes de Ingeniería de Sistemas de la Universidad Nacional
            de Cañete con pasión y dedicación. ¡Bienvenidos al futuro de la
            educación!
          </p>
        </div>
        <div style={{ width: "50%", marginLeft: "220px" }}>
          <p>
            Desarrolladores:
            <br />
            Juan Manuel Chavez Saldaña
            <br />
            Gustavo Alonso Fernández Gutiérrez
            <br />
            Andry Emilio Diego Calagua
            <br />
            Jesús Ernesto Guevara Ramos
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
