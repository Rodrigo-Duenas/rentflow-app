import { useTheme } from "@/application/theme/useTheme";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        padding: "10px 16px",
        borderRadius: "12px",
        border: "1px solid var(--color-border)",
        background: "var(--color-bg-card)",
        color: "var(--color-text-primary)",
        cursor: "pointer",
      }}
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};
