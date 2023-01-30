const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["VT323", ...defaultTheme.fontFamily.sans],
      },
      dropShadow: {
        md: "-3px 6px 3px rgba(0, 0, 0, 0.4)",
        lg: "-5px 10px 7px rgba(0, 0, 0, 0.7)",
        xl: "-7px 14px 14px rgba(0, 0, 0, 0.7)",
        highlight: "0 0 10px rgba(234, 107, 0, 0.7)",
      },
      width: {
        card: "10rem",
      },
      height: {
        card: "15rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
