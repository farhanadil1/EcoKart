/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#375534',      // Sage Green → Buttons, highlights
        secondary: '#779b7f',    // Soft Mint → hover, subtle accents
        cardBg: '#E3EED4',       // Pale/Light Green → Product cards, sections
        pageBg: '#e7efda',       // Almond Cream → Main page background
        accent: '#OF2A1D',       // Optional extra accent → banners, highlights
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        audiowide: ['Audiowide', 'cursive'],
      },
      animation: {
        "slide-down": "slideDown 0.3s ease-out forwards",
      },
      keyframes: {
        slideDown: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
