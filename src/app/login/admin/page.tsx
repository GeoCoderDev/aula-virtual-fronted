import LoginForm from "@/components/shared/forms/LoginForm";

const LoginAdmin = () => {
  return (
    <>
      <LoginForm endpoint="/api/auth/admin/login" welcomeMessageRole="Admin" />
    </>
  );
};

export default LoginAdmin;
