/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ["Pacifico"],
        robotomono: ["Roboto Mono"],
        rubik: ["Rubik"],
      },
    },
  },
  plugins: [],
};
