/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Origen público del sitio (sin barra final), p. ej. https://app.rentflow.com */
  readonly VITE_PUBLIC_SITE_URL?: string;
  readonly VITE_LANG?: "en" | "es-ES" | "es-CO" | "es-MX" | string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
