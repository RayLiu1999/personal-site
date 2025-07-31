/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './plugins/**/*.{js,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#F3EFEA',
          100: '#E8E0D9',
          200: '#D4C6BA',
          300: '#BFAA9A',
          400: '#A88D78',
          500: '#8F725A',
          600: '#745946',
          700: '#594135',
          800: '#3D2A23',
          900: '#211511'
        }
      }
    }
  },
  plugins: []
};
