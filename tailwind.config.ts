import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          soft: "rgb(var(--ink-soft) / <alpha-value>)",
          deep: "rgb(var(--ink-deep) / <alpha-value>)",
          800: "rgb(var(--ink-800) / <alpha-value>)",
          700: "rgb(var(--ink-700) / <alpha-value>)",
        },
        paper: "rgb(var(--paper) / <alpha-value>)",
        bone: {
          DEFAULT: "rgb(var(--bone) / <alpha-value>)",
          200: "rgb(var(--bone-200) / <alpha-value>)",
          300: "rgb(var(--bone-300) / <alpha-value>)",
        },
        brass: {
          DEFAULT: "rgb(var(--brass) / <alpha-value>)",
          light: "rgb(var(--brass-light) / <alpha-value>)",
          dark: "rgb(var(--brass-dark) / <alpha-value>)",
        },
        cos: {
          orange: {
            DEFAULT: "#f97316",
            dark: "#ea580c",
            light: "#fb923c",
            50: "#fff7ed",
            100: "#ffedd5",
            500: "#f97316",
            600: "#ea580c",
          },
          blue: {
            DEFAULT: "#1e3a5f",
            dark: "#0f2440",
            deep: "#091426",
            light: "#2d5a8e",
            50: "#eff6ff",
            100: "#dbeafe",
            500: "#2563eb",
            900: "#1e3a8a",
          },
          navy: {
            950: "#060c18",
            900: "#0b1528",
            800: "#111f38",
            700: "#1a2f52",
          },
          accent: "#f59e0b",
          emerald: "#10b981",
        },
      },
      boxShadow: {
        "glow-orange": "0 0 25px -5px rgba(249, 115, 22, 0.4)",
        "glow-blue": "0 0 25px -5px rgba(37, 99, 235, 0.35)",
        "glow-emerald": "0 0 25px -5px rgba(16, 185, 129, 0.35)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.08)",
        "glass-dark": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-out forwards",
        slideUp: "slideUp 0.8s ease-out forwards",
        fadeInLeft: "fadeInLeft 0.6s ease-out forwards",
        fadeInRight: "fadeInRight 0.6s ease-out forwards",
        scaleIn: "scaleIn 0.5s ease-out forwards",
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInLeft: {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInRight: {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(249, 115, 22, 0.25)" },
          "50%": { boxShadow: "0 0 35px rgba(249, 115, 22, 0.55)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
