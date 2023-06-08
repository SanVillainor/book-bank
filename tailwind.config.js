module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        custom: {
          green: "#228b22",
          light: "#90EE90",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
