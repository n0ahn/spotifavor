/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        spotify: {
          green: '#1DB954',
          greenDark: '#169c46',
          black: '#121212',
          gray: '#181818',
          graySoft: '#282828',
        },
      },
    },
  },
  plugins: [],
}

