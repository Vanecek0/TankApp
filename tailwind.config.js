/** @type {import('tailwindcss').Config} */

var baseFontSize = 14;

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
        background: "#f2f2f2",
        background_dark: "#0D0D0D"
      }
    },
    fontSize: {
      xs: [
        `${(16 * 0.75) / baseFontSize}rem`, /* 12px */
        {
          lineHeight: `${(16 * 1) / baseFontSize}rem` /* 16px */,
        },
      ],
      sm: [
        `${(16 * 0.875) / baseFontSize}rem`, /* 14px */
        {
          lineHeight: `${(16 * 1.25) / baseFontSize}rem` /* 20px */,
        },
      ],
      base: [
        `${(16 * 1) / baseFontSize}rem`, /* 16px */
        {
          lineHeight: `${(16 * 1.5) / baseFontSize}rem` /* 24px */,
        },
      ],
      lg: [
        `${(16 * 1.125) / baseFontSize}rem`, /* 18px */
        {
          lineHeight: `${(16 * 1.75) / baseFontSize}rem` /* 28px */,
        },
      ],
      xl: [
        `${(16 * 1.25) / baseFontSize}rem`, /* 20px */
        {
          lineHeight: `${(16 * 1.75) / baseFontSize}rem` /* 28px */,
        },
      ],
      "2xl": [
        `${(16 * 1.5) / baseFontSize}rem`, /* 24px */
        {
          ineHeight: `${(16 * 2) / baseFontSize}rem` /* 32px */,
        },
      ],
      "3xl": [
        `${(16 * 1.875) / baseFontSize}rem`, /* 30px */
        {
          lineHeight: `${(16 * 2.25) / baseFontSize}rem` /* 36px */,
        },
      ],
      "4xl": [
        `${(16 * 2.25) / baseFontSize}rem`, /* 36px */
        {
          lineHeight: `${(16 * 2.5) / baseFontSize}rem` /* 40px */,
        },
      ],
      "5xl": [
        `${(16 * 3) / baseFontSize}rem`, /* 48px */
        {
          lineHeight: (16 * 1) / baseFontSize,
        },
      ],
      "6xl": [
        `${(16 * 3.75) / baseFontSize}rem`, /* 60px */
        {
          lineHeight: (16 * 1) / baseFontSize,
        },
      ],
      "7xl": [
        `${(16 * 4.5) / baseFontSize}rem`, /* 72px */
        {
          lineHeight: (16 * 1) / baseFontSize,
        },
      ],
      "8xl": [
        `${(16 * 6) / baseFontSize}rem`, /* 96px */
        {
          lineHeight: (16 * 1) / baseFontSize,
        },
      ],
      "9xl": [
        `${(16 * 8) / baseFontSize}rem`, /* 128px */
        {
          lineHeight: (16 * 1) / baseFontSize,
        },
      ],
    }
  },
  plugins: [],
}