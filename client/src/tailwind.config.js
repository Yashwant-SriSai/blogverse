/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#E6E9EF",
        ink: "#3B4252",
        muted: "#7A8496",
        accent: { DEFAULT: "#5B5FEF", dark: "#4548C4" },
        coral: "#F0684F",
      },
      boxShadow: {
        "neu-flat": "8px 8px 16px #c5c9d0, -8px -8px 16px #ffffff",
        "neu-sm": "4px 4px 8px #c5c9d0, -4px -4px 8px #ffffff",
        "neu-pressed": "inset 4px 4px 8px #c5c9d0, inset -4px -4px 8px #ffffff",
      },
      borderRadius: { neu: "20px" },
    },
  },
  plugins: [],
};