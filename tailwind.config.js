/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mandik: {
          steel: "#506077",
          "steel-90": "#5a6c84",
          "steel-80": "#647890",
          "steel-70": "#8090a5",
          ink: "#1a1a1a",
          paper: "#ffffff",
          "paper-soft": "#f4f5f7",
          rule: "#e1e3e8",
        },
        cat: {
          vzt: "#74d1ea",
          ahu: "#26d07c",
          heat: "#f2a900",
          special: "#ffd700",
        },
        accent: "#26d07c",
      },
      fontFamily: {
        display: ['"Saira Semi Condensed"', "Eurostile", "Arial", "sans-serif"],
        sans: ['Arial', '"Helvetica Neue"', "sans-serif"],
        mono: ['"JetBrains Mono"', '"Roboto Mono"', "monospace"],
      },
      letterSpacing: {
        hair: "0.18em",
      },
      maxWidth: {
        // Sirka obsahu celeho webu (puvodne 1320px). Zmena zde se propise vsude.
        site: "1440px",
      },
    },
  },
  plugins: [],
};
