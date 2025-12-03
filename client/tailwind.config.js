/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-primary': '#171717',
        'background-secondary': '#282828',
        'background-tertiary': '#3C3836',
        'blue': '#2d8074',
        'teal': '#5F875F',
        'green': '#78824B',
        'red': '#B36D43',
        'orange': '#BB7744',
        'yellow': '#C9A554',
        'off-white': '#D7C483',
        'custom-white': '#C2C2B0',
        'brown': '#685742',
        'custom-gray': '#666666',
        'dark-gray': '#222222',
        'black': '#080808'
      },
    },
  },
  plugins: [],
}

