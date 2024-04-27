"use client";
import LoginForm from "@/components/shared/LoginForm";
import { useState } from "react";



const initialForm = {
  username: "",
  password:""
}


export default function Home() {


  const [form, setForm] = useState(initialForm);


  //INICIO DE SESION DE PROFESORES Y ALUMNOS
  return (
    <>
      <LoginForm Api_Endpoint="http//localhost/api/auth/login" welcomeMessageRole="Sepulvedano"/>
    </>
  );
}
