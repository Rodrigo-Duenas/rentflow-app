import { useTranslation } from "react-i18next";

import { useTheme } from "@/application/theme/useTheme";

import { IconEye, IconGoogle, IconShield } from "./icons";
import type { LoginFormActions, LoginFormState } from "./login.types";

type LoginFormProps = {
  state: LoginFormState;
  actions: LoginFormActions;
};

const AppleHouseLogo = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M20 9L9 18v17h8V24h6v11h8V18L20 9z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const LoginForm = ({ state, actions }: LoginFormProps) => {
  const { t } = useTranslation();
  const theme = useTheme((s) => s.theme);
  const toggleTheme = useTheme((s) => s.toggleTheme);

  return (
    <div className="auth-apple-card">
      <button
        type="button"
        className="auth-apple-theme-toggle"
        onClick={toggleTheme}
        aria-label={t("login.form.themeToggle")}
        title={t("login.form.themeToggle")}
      >
        <span aria-hidden="true">{theme === "light" ? "🌙" : "☀️"}</span>
      </button>

      <div className="auth-apple-logo">
        <AppleHouseLogo />
      </div>
      <div className="auth-apple-app-title">{t("login.form.appTitle")}</div>

      <h1 className="auth-apple-welcome">{t("login.form.title")}</h1>
      <p className="auth-apple-sub">{t("login.form.subtitle")}</p>

      <form
        className="auth-apple-form"
        onSubmit={(e) => {
          e.preventDefault();
          void actions.submit();
        }}
      >
        <div className="auth-apple-field">
          <label className="auth-apple-label" htmlFor="auth-email">
            {t("login.form.emailLabel")}
          </label>
          <div className="auth-apple-input-wrap">
            <input
              id="auth-email"
              className="auth-apple-input"
              type="email"
              placeholder={t("login.form.emailPlaceholder")}
              value={state.email}
              onChange={(e) => actions.setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className="auth-apple-field">
          <label className="auth-apple-label" htmlFor="auth-password">
            {t("login.form.passwordLabel")}
          </label>
          <div className="auth-apple-input-wrap">
            <input
              id="auth-password"
              className="auth-apple-input auth-apple-input--password"
              type={state.showPwd ? "text" : "password"}
              placeholder={t("login.form.passwordPlaceholder")}
              value={state.password}
              onChange={(e) => actions.setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="auth-apple-pwd-toggle"
              onClick={actions.toggleShowPwd}
              aria-label={
                state.showPwd
                  ? t("login.form.hidePassword")
                  : t("login.form.showPassword")
              }
            >
              <IconEye open={state.showPwd} />
            </button>
          </div>
        </div>

        <div className="auth-apple-options">
          <label className="auth-apple-remember">
            <input
              type="checkbox"
              checked={state.remember}
              onChange={() => actions.toggleRemember()}
            />
            {t("login.form.remember")}
          </label>
          <a href="#" className="auth-apple-forgot">
            {t("login.form.forgot")}
          </a>
        </div>

        <button
          type="submit"
          className="auth-apple-btn-primary"
          disabled={state.loading}
        >
          {state.loading ? (
            <span className="auth-apple-spinner" aria-hidden="true" />
          ) : (
            t("login.form.submit")
          )}
        </button>

        <div className="auth-apple-divider">
          <span>{t("login.form.dividerOr")}</span>
        </div>

        <button type="button" className="auth-apple-btn-social">
          <IconGoogle />
          {t("login.form.google")}
        </button>
      </form>

      <p className="auth-apple-register">
        {t("login.form.registerPrefix")}{" "}
        <a href="#">{t("login.form.registerLink")}</a>
      </p>

      <p className="auth-apple-security">
        <IconShield />
        {t("login.form.securityNote")}
      </p>
    </div>
  );
};
