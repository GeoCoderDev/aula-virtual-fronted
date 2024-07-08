"use client";
import { logout } from "@/lib/helpers/logout";
import { useUserSessionData } from "@/lib/utils/UserSessionData";
import React from "react";

const Home = () => {
  const { UserSessionData } = useUserSessionData();

  return (
    <>
      {UserSessionData && (
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
            <h1 style={{ fontSize: "4em", fontWeight: "bold" }}>
              {UserSessionData.Nombres
                ? `${UserSessionData.Nombres} ${UserSessionData.Apellidos}`
                : UserSessionData.username}
            </h1>

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
                <h4 className="text-[1.1rem] font-semibold">
                  Desarrolladores:
                </h4>
                <ul className="list-disc ml-6">
                  <li>Juan Manuel Chavez Saldaña</li>
                  <li>Gustavo Alonso Fernández Gutiérrez</li>
                  <li>Andry Emilio Diego Calagua</li>
                  <li>Jesús Ernesto Guevara Ramos</li>
                  <li>Camilo Acevedo Centeno</li>
                  <li>Victor Curipaco Marquez</li>
                  <li>Deivis Quinteros Baldoseda</li>
                  <li>Yrvin Pachas Saravia</li>
                </ul>
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
      )}
    </>
  );
};

export default Home;
