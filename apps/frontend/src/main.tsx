import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./i18n";
import "./index.css";
// import { App } from "@/App.tsx";
import { ThemeProvider } from "@/presentation/providers/ThemeProvider";
import { AppRouter } from "@/presentation/routes/AppRouter";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  </StrictMode>,
);
