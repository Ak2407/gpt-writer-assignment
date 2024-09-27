/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./entrypoints/**/*.{html,ts,tsx}",
    "./components/**/*.{html,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgWhite: "#F9FAFB",
        systemMsg: "#DBEAFE",
        userMsg: "#DFE1E7",
        primaryBtn: "#3B82F6",
      },
    },
  },
  plugins: [],
};
