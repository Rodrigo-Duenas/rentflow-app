import { useEffect } from "react";
import { useTheme } from "@/application/theme/useTheme";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return <>{children}</>;
};
