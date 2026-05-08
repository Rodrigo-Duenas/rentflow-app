import { LoginForm } from "@/presentation/components/auth/login";
import "@/presentation/styles/auth/index.css";

export const LoginView = () => {
  return (
    <div className="auth-page auth-page--login">
      <LoginForm />
    </div>
  );
};
