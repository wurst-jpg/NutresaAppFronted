/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { navy: { 900: '#0b1220', 800: '#101a2e', 700: '#17233d' } },
    },
  },
  plugins: [],
};
