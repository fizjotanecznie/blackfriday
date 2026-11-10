import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0B0B0B",
        brand: {
          DEFAULT: "#E41679",
          hover: "#f02888",
          active: "#c81068",
        },
      },
      fontFamily: {
        sans: ["var(--font-main)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
