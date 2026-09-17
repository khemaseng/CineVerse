
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";

export function ThemeToggleComponent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-gold/30 bg-primary-gold text-navy-blue transition-all duration-300 hover:bg-navy-blue hover:text-primary-gold dark:bg-primary-gold dark:text-navy-blue dark:hover:bg-navy-blue dark:hover:text-primary-gold"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}