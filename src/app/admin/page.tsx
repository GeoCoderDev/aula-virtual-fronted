import LoginForm from "@/components/shared/LoginForm";

const layout = () => {
  return (
    <>
      <LoginForm
        Api_Endpoint="http://localhost/api/auth/admin/login"
        welcomeMessageRole="Admin"
      />
    </>
  );
};

export default layout;
