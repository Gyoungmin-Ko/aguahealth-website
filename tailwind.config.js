/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#285BAB',
          dark: '#1e4580',
          light: '#3d7bcc'
        }
      }
    },
  },
  plugins: [],
}
