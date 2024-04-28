import LoginForm from "@/components/shared/LoginForm";

const LoginAdmin = () => {
  return (
    <>
      <LoginForm
        endpoint="/api/auth/admin/login"
        welcomeMessageRole="Admin"
      />
    </>
  );
};

export default LoginAdmin;
