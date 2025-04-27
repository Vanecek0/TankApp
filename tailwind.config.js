/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./theme/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#F50537",
        secondary: "#EDEDED",
        secondary_dark: "#121212",
        primary_hidden: "#FF9BB0",
        background: "#EBF0F5",
        background_dark: "#140f0a"
      }
    },
  },
  plugins: [],
}