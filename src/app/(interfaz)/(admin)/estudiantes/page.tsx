"use client";
import useToken from "@/app/hooks/useToken";
import { Student } from "@/interfaces/Student";
import React, { useEffect, useState } from "react";
import StudentRow from "./_components/StudentRow";

const limitStudentsRequired = 50;

const Estudiantes = () => {
  const [startFrom, setStartFrom] = useState(0);

  const [students, setStudents] = useState<Student[]>([]);

  const { fetchAPIWithToken } = useToken();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetchAPIWithToken("/api/students", "GET", {
          startFrom: startFrom,
          limit: limitStudentsRequired,
        });

        if (!res.ok) {
          if (res.status === 401) {
          }
          return;
        }

        const studentsFinded = await res.json();

        setStudents([...students, ...studentsFinded]);

        setStartFrom((start) => start + limitStudentsRequired);
      } catch (e) {}
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <table style={{ borderCollapse: "separate", borderSpacing: "0 1em" }}>
        <thead>
          <tr style={{ backgroundColor: "#d9ead3", color: "#000" }}>
            <th style={{ padding: "1em" }}>DNI</th>
            <th style={{ padding: "1em" }}>NOMBRE</th>
            <th style={{ padding: "1em" }}>APELLIDOS</th>
            <th style={{ padding: "1em" }}>GRADOS</th>
            <th style={{ padding: "1em" }}>SECCIÓN</th>
            <th style={{ padding: "1em" }}>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <StudentRow key={index} {...student} />
          ))}
          {/* Agrega más filas aquí */}
        </tbody>
      </table>
    </div>
  );
};

export default Estudiantes;
