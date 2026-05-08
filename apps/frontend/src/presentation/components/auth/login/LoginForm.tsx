import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useLogin } from "@/application/auth/hooks/useLogin";
import { useTheme } from "@/application/theme/useTheme";
import { loginSchema } from "@/domain/auth/auth.schema";
import type { LoginSchema } from "@/domain/auth/auth.schema";

import { IconEye, IconGoogle, IconShield } from "./icons";

const LoginBrandIcon = () => (
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

export const LoginForm = () => {
  const { t } = useTranslation();
  const theme = useTheme((s) => s.theme);
  const toggleTheme = useTheme((s) => s.toggleTheme);
  const { login, isLoading, error } = useLogin();

  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    await login(data);
  };

  const busy = isLoading || isSubmitting;

  return (
    <div className="login-card">
      <button
        type="button"
        className="login-theme-toggle"
        onClick={toggleTheme}
        aria-label={t("login.form.themeToggle")}
        title={t("login.form.themeToggle")}
      >
        <span aria-hidden="true">{theme === "light" ? "🌙" : "☀️"}</span>
      </button>

      <div className="login-logo">
        <LoginBrandIcon />
      </div>
      <div className="login-app-title">{t("login.form.appTitle")}</div>

      <h1 className="login-welcome">{t("login.form.title")}</h1>
      <p className="login-sub">{t("login.form.subtitle")}</p>

      <form
        className="login-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="login-field">
          <label className="login-label" htmlFor="auth-email">
            {t("login.form.emailLabel")}
          </label>
          <div className="login-input-wrap">
            <input
              id="auth-email"
              className="login-input"
              type="email"
              placeholder={t("login.form.emailPlaceholder")}
              autoComplete="email"
              aria-invalid={errors.email ? "true" : undefined}
              aria-describedby={
                errors.email ? "auth-email-error" : undefined
              }
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p id="auth-email-error" className="login-field-error" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="login-field">
          <label className="login-label" htmlFor="auth-password">
            {t("login.form.passwordLabel")}
          </label>
          <div className="login-input-wrap">
            <input
              {...register("password")}
              id="auth-password"
              className="login-input login-input--password"
              type={showPwd ? "text" : "password"}
              placeholder={t("login.form.passwordPlaceholder")}
              autoComplete="current-password"
              aria-invalid={errors.password ? "true" : undefined}
              aria-describedby={
                errors.password ? "auth-password-error" : undefined
              }
            />
            <button
              type="button"
              className="login-pwd-toggle"
              onClick={() => setShowPwd((v) => !v)}
              aria-label={
                showPwd
                  ? t("login.form.hidePassword")
                  : t("login.form.showPassword")
              }
            >
              <IconEye open={showPwd} />
            </button>
          </div>
          {errors.password && (
            <p
              id="auth-password-error"
              className="login-field-error"
              role="alert"
            >
              {errors.password.message}
            </p>
          )}
        </div>

        {error && (
          <div className="login-alert" role="alert">
            {error}
          </div>
        )}

        <div className="login-options">
          <label className="login-remember">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember((v) => !v)}
            />
            {t("login.form.remember")}
          </label>
          <a href="#" className="login-forgot">
            {t("login.form.forgot")}
          </a>
        </div>

        <button
          type="submit"
          className="login-btn-primary"
          disabled={busy}
        >
          {busy ? (
            <span className="login-spinner" aria-hidden="true" />
          ) : (
            t("login.form.submit")
          )}
        </button>

        <div className="login-divider">
          <span>{t("login.form.dividerOr")}</span>
        </div>

        <button type="button" className="login-btn-social">
          <IconGoogle />
          {t("login.form.google")}
        </button>
      </form>

      <p className="login-register">
        {t("login.form.registerPrefix")}{" "}
        <a href="#">{t("login.form.registerLink")}</a>
      </p>

      <p className="login-security">
        <IconShield />
        {t("login.form.securityNote")}
      </p>
    </div>
  );
};
