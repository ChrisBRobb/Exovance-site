/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: '#2B2F77',
          teal: '#00C6AE',
          sky: '#57A0FF',
          graphite: '#4A4A4A',
          sand: '#E8E5DB',
        },
      },
    },
  },
  plugins: [],
}