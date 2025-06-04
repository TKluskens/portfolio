"use client";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className={`fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-700 text-xl p-3 rounded-full shadow-lg transition-colors transform transition-transform duration-300 ${theme === "dark" ? "rotate-180" : "rotate-0"}`}
    >
      {theme === "dark" ? <FaMoon /> : <FaSun />}
    </button>
  );
}
