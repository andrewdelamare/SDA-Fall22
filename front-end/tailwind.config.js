/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Rajdhani",
        serif: "Fredericka the Great",
      },
      height: {
        400: "400px",
        500: "500px",
        600: "600px",
        700: "700px",
        800: "800px",
        900: "900px",
        1000: "1000px",
        1100: "1100px",
        1200: "1200px",
      },
      width: {
        400: "400px",
        700: "700px",
        1000: "1000px",
        1200: "1200px",
        1300: "1300px",
        1400: "1400px",
        1500: "1500px",
        1600: "1600px",
      },
      backgroundImage: {
        stations: "url('images/annie-spratt-AFB6S2kibuk-unsplash.jpg')",
        data: "url('images/markus-winkler-IrRbSND5EUc-unsplash.jpg')",
        upload: "url('images/thomas-lefebvre-gp8BLyaTaA0-unsplash.jpg')",
        trips: "url('images/william-f-santos-Lbe4a4ExlQY-unsplash.jpg')",
      },
      minWidth: {
        96: "366px",
      },
    },
  },
  plugins: [],
};
