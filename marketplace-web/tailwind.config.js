/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        white: "#fbfbfa"
      },
      backgroundImage: {
        'half-gradient': 'linear-gradient(to top, #fbfbfa 50%, transparent 50%)',
      }
    },
  },
  plugins: [],
}
