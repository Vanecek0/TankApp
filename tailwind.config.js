/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#F50537",
        secondary: "#EDEDED",
        accent: "#0057D9"
      }
    },
  },
  plugins: [],
}