/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',  // لازم تحدد 'class' مش 'media'
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
