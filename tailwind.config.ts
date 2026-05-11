import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#192339",
        paper: "#fffaf4",
        sage: "#6b8f71",
        coral: "#d96c5f",
        gold: "#c99a3a",
        mist: "#eef4f1"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(25, 35, 57, 0.10)",
        line: "0 1px 0 rgba(25, 35, 57, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
