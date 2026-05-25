
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"M PLUS Rounded 1c"', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
