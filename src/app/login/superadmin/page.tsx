
import LoginForm from "@/components/shared/LoginForm";

const layout = () => {
  return (
    <>
      <LoginForm
        Api_Endpoint="http://localhost/api/auth/superadmin/login"
        welcomeMessageRole="Superadmin"
      />
    </>
  );
};

export default layout;
