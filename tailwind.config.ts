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
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          light: "#6366f1", // Lighter shade for dark mode
          DEFAULT: "#4f46e5", // Indigo
          dark: "#4338ca", // Darker shade
        },
        secondary: {
          light: "#f472b6",
          DEFAULT: "#ec4899",
          dark: "#db2777",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      animation: {
        gradient: "gradient 15s ease infinite",
        wave: "wave 8s ease-in-out infinite",
        "wave-slow": "wave 12s ease-in-out infinite",
        "gradient-x": "gradient-x 15s ease infinite",
        ping: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
        wave: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-25%)" },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
        ping: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
