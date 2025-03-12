/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: "#1C262D",
        background: "#12191D",
        secondary: "#26363E",
        text: "#F4F4F4",
        button: "#0072E9",
        muted: "#7C98A9"
      }
    },
  },
  plugins: [],
};
