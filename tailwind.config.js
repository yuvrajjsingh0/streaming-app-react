/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensures Tailwind scans all source files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
