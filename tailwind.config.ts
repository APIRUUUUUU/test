import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF8C00",
          light: "#FFAB40",
          dark: "#E67E00",
        },
        navy: {
          DEFAULT: "#1A237E",
          light: "#283593",
          dark: "#0D1854",
        },
        gold: {
          DEFAULT: "#FFD700",
          light: "#FFE44D",
          dark: "#E6C200",
        },
      },
      fontFamily: {
        sans: ["Noto Sans JP", "system-ui", "sans-serif"],
        display: ["Noto Sans JP", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;