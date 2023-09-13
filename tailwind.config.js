const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // overwrite the default gray color palette with the $grey-palette from @angular/material
        gray: {
          50:  '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        }
      }
    },
  },
  plugins: [
    // TODO: maybe contribute to TailwindCSS
    plugin(function ({addVariant}){
      addVariant('clear-button', ['&::-webkit-search-cancel-button', '&::-ms-clear'])
    })
  ],
  important: true, // TailwindCSS classes should take precedent over Angular Material theme
}

