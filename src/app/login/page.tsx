import LoginForm from "@/components/shared/forms/LoginForm";

export default  function LoginUser() {
  //INICIO DE SESION DE PROFESORES Y ALUMNOS
  return (
    <>
      <LoginForm endpoint="/api/auth/login" welcomeMessageRole="Sepulvedano" />
    </>
  );
}
