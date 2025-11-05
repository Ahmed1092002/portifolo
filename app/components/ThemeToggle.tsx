"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-[30px] h-[30px] flex items-center justify-center text-(--text-muted) hover:text-(--accent-primary) transition-all duration-300 group"
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
    >
      {theme === "dark" ? (
        <Sun className="w-6 h-6 rotate-0 scale-100 transition-transform duration-300 group-hover:rotate-12" />
      ) : (
        <Moon className="w-6 h-6 rotate-0 scale-100 transition-transform duration-300 group-hover:-rotate-12" />
      )}
    </button>
  );
}
