import "../../styles/auth/index.css";
import { LoginForm, useLoginForm } from "../../components/auth/login";

export const LoginView = () => {
  const { state, actions } = useLoginForm();

  return (
    <div className="auth-page auth-page--apple">
      <LoginForm state={state} actions={actions} />
    </div>
  );
};
