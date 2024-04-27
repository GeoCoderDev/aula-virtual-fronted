
import LoginForm from "@/components/shared/LoginForm";

export default function Home() {

  //INICIO DE SESION DE PROFESORES Y ALUMNOS
  return (
    <>
      <LoginForm Api_Endpoint="http//localhost/api/auth/login" welcomeMessageRole="Sepulvedano"/>
    </>
  );
}
