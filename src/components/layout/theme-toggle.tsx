"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("aaa-theme");
    const isDark = stored === "dark"; // Default is LIGHT theme unless user explicitly chooses dark
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("aaa-theme", next ? "dark" : "light");
  };

  if (!mounted) {
    return (
      <div className={cn("h-8 w-8 sm:h-9 sm:w-9 rounded-lg border border-amber-500/30 bg-amber-500/10", className)} />
    );
  }

  return (
    <button
      suppressHydrationWarning
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-amber-500/40 bg-amber-500/15 text-amber-400 hover:bg-amber-500/25 hover:text-amber-300 shadow-sm transition-all focus:outline-none",
        className
      )}
    >
      {dark ? (
        <Sun className="h-4 w-4 text-amber-400 animate-in spin-in-90 duration-300" />
      ) : (
        <Moon className="h-4 w-4 text-amber-400 animate-in spin-in-90 duration-300" />
      )}
    </button>
  );
}
