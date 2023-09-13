/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs    : "376px",
        sm    : "640px",
        md    : "768px",
        lg    : "1024px",
        xl    : "1280px",
        "2xl" : "1536px",
      },
      transformOrigin: {
        0: "0%",
      },
      zIndex: {
        "-1": "-1",
      },
      height: {
        auth: "720px",
      },
      minWidth: {
        sidebar: "320px",
      },
      fontSize: {
        xxs: [ "10px", "14px" ],
      },
      colors: {
        primary: {
          dark  : "#E40520",
          light : "#EE3F44",
        },
        basic: {
          one   : "#FFFFFF",
          two   : "#F4F4F4",
          three : "#E0E0E0",
          four  : "#999999",
          five  : "#6A6A6A",
          six   : "#2C2C2C",
        },
        green: {
          dark  : "#3E920F",
          light : "#AADD66",
        },
        blue: {
          dark  : "#376EDA",
          light : "#6F9EF8",
        },
        orange: {
          dark  : "#E58021",
          light : "#F7953A",
        },
        grey: {
          light: "#444444",
        },
        shadow: {
          dark  : "#FFFFFF",
          light : "#FFFFFF",
        },
        black      : "#231F20",
        background : {
          auth : "#E6E6E6",
          main : "#E3E3E3",
        },
        graph: {
          red   : "#E74C3C",
          green : "#2ECC71",
          black : "#000000",
        },
      },
    },
  },
  plugins: [],
};
