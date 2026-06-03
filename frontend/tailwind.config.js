/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          900: '#E8F5BD', // Main background (Lightest)
          800: '#C7EABB', // Card background (Light)
          700: '#A2CB8B', // Borders (Medium)
          600: '#A2CB8B',
          500: '#84B179',
          400: '#84B179', // Muted text (Dark)
          300: '#84B179', 
          200: '#84B179',
          100: '#84B179', 
          50: '#84B179',
        },
        white: '#84B179', // Replaces text-white and bg-white with the darkest shade
        cyan: { 400: '#84B179', 500: '#84B179' },
        indigo: { 400: '#84B179', 500: '#84B179', 600: '#84B179' },
        emerald: { 400: '#84B179', 500: '#84B179', 900: '#C7EABB' },
        amber: { 400: '#A2CB8B', 500: '#A2CB8B' },
        rose: { 400: '#84B179', 500: '#84B179', 900: '#C7EABB' }
      }
    },
  },
  plugins: [],
}
