/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          100: '#f5f0e1',
          200: '#e5dcc8',
          300: '#d4c2a8',
        },
        green: {
          800: '#2e5339',
        },
      },
    },
  },
  plugins: [],
}