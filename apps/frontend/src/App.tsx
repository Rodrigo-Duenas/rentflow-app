import { ThemeToggle } from "@/presentation/components/ThemeToggle";

export const App = () => {
  return (
    <div
      style={{
        background: "var(--color-bg-primary)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "var(--color-bg-card)",
          color: "var(--color-text-primary)",
          padding: "40px",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-soft)",
          textAlign: "center",
        }}
      >
        <ThemeToggle />
        Hola mundo premium 😎
      </div>
    </div>
  );
};
