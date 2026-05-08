import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function siteOriginFromEnv(mode: string): string {
  const env = loadEnv(mode, path.resolve(__dirname, "./config"), "");
  const raw = env.VITE_PUBLIC_SITE_URL ?? "https://rentflow.app";
  return raw.replace(/\/+$/, "");
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const siteOrigin = siteOriginFromEnv(mode);

  return {
    // VITE_* variables live in ./config/.env for this app
    envDir: path.resolve(__dirname, "./config"),
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      {
        name: "inject-public-site-url",
        transformIndexHtml(html) {
          return html.replaceAll("__SITE_ORIGIN__", siteOrigin);
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@assets": path.resolve(__dirname, "./src/assets"),
      },
    },
  };
});
