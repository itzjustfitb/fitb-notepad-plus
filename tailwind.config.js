/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: true,
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      padding: {
        50: 50,
      },
      rotate: {
        360: "360deg",
      },
      colors: {
        green: "#43e97b",
        "light-blue": "#38f9d7",
        pink: "#fa709a",
        yellow: "#fee140",
        violet: "#5f72bd",
        "light-violet": "#9b23ea",
        gray: "#e5e7eb",
        dark: "#292929",
        "dark-1": "#313131",
        "dark-2": "#1f1f1f",
      },
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "90%",
        md: "90%",
        lg: "90%",
        xl: "90%",
      },
    },
  },
  darkMode: "selector",
  plugins: [],
};
