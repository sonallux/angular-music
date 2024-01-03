const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  safelist: [{ pattern: /grid-cols-[0-9]+/ }],
  theme: {
    extend: {
      colors: {
        "spotify-green": {
          50: "#e6f7ae",
          100: "#c3eacb",
          200: "#9cdcaa",
          300: "#71cf88",
          400: "#4cc46e",
          500: "#1db954",
          600: "#10aa4a",
          700: "#00973e",
          800: "#006833",
          900: "#00671e",
        },

        // overwrite the default gray color palette with the $grey-palette from @angular/material
        gray: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#eeeeee",
          300: "#e0e0e0",
          400: "#bdbdbd",
          500: "#9e9e9e",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121",
        },
      },
    },
    filterOpacity: {
      0: 0,
      5: 0.05,
      10: 0.1,
      20: 0.2,
      25: 0.25,
      30: 0.3,
      40: 0.4,
      50: 0.5,
      60: 0.6,
      70: 0.7,
      75: 0.75,
      80: 0.8,
      90: 0.9,
      95: 0.95,
      100: 1,
    },
  },
  plugins: [
    // https://github.com/tailwindlabs/tailwindcss/discussions/10190
    plugin(({ addVariant }) =>
      addVariant("search-cancel-button", "&::-webkit-search-cancel-button"),
    ),
    plugin(({ matchUtilities, theme }) =>
      matchUtilities(
        { "filter-opacity": (value) => ({ filter: `opacity(${value})` }) },
        { values: theme("filterOpacity") },
      ),
    ),
  ],
};
