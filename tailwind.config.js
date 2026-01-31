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
          DEFAULT: '#1e3a5f',
          dark: '#152a45',
          darker: '#0f1f33',
          light: '#285BAB',
          lighter: '#3d7bcc',
          accent: '#2563eb'
        },
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43'
        }
      },
      fontFamily: {
        sans: ['Noto Sans KR', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'pro': '0 4px 6px -1px rgba(15, 31, 51, 0.08), 0 2px 4px -2px rgba(15, 31, 51, 0.06)',
        'pro-lg': '0 10px 15px -3px rgba(15, 31, 51, 0.08), 0 4px 6px -4px rgba(15, 31, 51, 0.06)',
        'pro-xl': '0 20px 25px -5px rgba(15, 31, 51, 0.08), 0 8px 10px -6px rgba(15, 31, 51, 0.06)',
        'card': '0 1px 3px rgba(15, 31, 51, 0.06), 0 4px 12px rgba(15, 31, 51, 0.04)',
      }
    },
  },
  plugins: [],
}
