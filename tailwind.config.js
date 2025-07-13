/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./utils/**/*.{js,jsx,ts,tsx}",
    "./theme/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#B80019",
        secondary: "#EDEDED",
        secondary_dark: "#121212",
        hidden_text: "#FF9BB0",
        background: "#f2f2f2",
        background_dark: "#0D0D0D"
      },
    },
  },
  plugins: [],
};