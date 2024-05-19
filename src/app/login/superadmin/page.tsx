import LoginForm from "@/components/shared/forms/LoginForm";

const LoginSuperadmin = () => {
  return (
    <>
      <LoginForm
        endpoint="/api/auth/superadmin/login"
        welcomeMessageRole="Superadmin"
      />
    </>
  );
};

export default LoginSuperadmin;
