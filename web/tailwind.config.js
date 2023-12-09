/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },

  // eslint-disable-next-line
  plugins: ['prettier-plugin-tailwindcss', require('daisyui')]
}
