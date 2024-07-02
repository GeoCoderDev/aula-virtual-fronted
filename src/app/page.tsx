import React from "react";

const Home = () => {
  return (
    <div
      style={{
        textAlign: "left",
        marginLeft: "20px",
        marginTop: "20px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div style={{ flex: "1", maxWidth: "calc(100% - 420px)" }}>
        <h1 style={{ fontSize: "4em", fontWeight: "bold" }}>¡Hola!</h1>
        <p style={{ fontSize: "2em" }}>Bienvenido de nuevo.</p>
        <h1 style={{ fontSize: "4em", fontWeight: "bold" }}>Juan Chaves</h1>
        <img
          src="/png/Logo Universidad.png"
          alt="Imagen 1"
          className="w-[18rem] aspect-auto"
          style={{
            maxWidth: "400px",
            maxHeight: "200px",
            margin: "10px",
            width: "100%",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              flex: "1 1 50%",
              boxSizing: "border-box",
              paddingRight: "10px",
            }}
          >
            <p>
              ¡Nos emociona presentar esta nueva y avanzada aula virtual!
              Diseñada por estudiantes de Ingeniería de Sistemas de la
              Universidad Nacional de Cañete con pasión y dedicación.
              ¡Bienvenidos al futuro de la educación!
            </p>
          </div>
          <div
            style={{
              flex: "1 1 50%",
              boxSizing: "border-box",
              paddingLeft: "10px",
            }}
          >
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
              <br />
              Camilo Acevedo Centeno
              <br />
              Victor Curipaco Marquez
              <br />
              Deivis Quinteros Baldoseda
              <br />
              Yrvin Pachas Saravia
            </p>
          </div>
        </div>
      </div>
      <img
        src="/gif/saludo.gif"
        alt="ola"
        style={{
          width: "445px",
          height: "433px",
          margin: "10px",
          transform: "rotate(330deg)",
          flexShrink: 0,
        }}
      />
    </div>
  );
};

export default Home;
