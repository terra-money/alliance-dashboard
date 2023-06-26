/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      minWidth: {
        '8r': '8rem',
        '1/2': '50%',
        '1/3': '33.333333%',
        '1/4': '25%',
        '1/5': '20%',
        '2/3': '66.666666%'
      },
      animation: {
        'slide-in-right': 'slide-in-right 1s ease-in 300ms',
        'fade-in-right': 'fade-in-right 0.6s ease-in both'
      },
      keyframes: {
        'slide-in-right': {
          '0%': { transform: 'translateX(500px)' },
          '100%': { transform: 'translateX(0)' }
        },
        'fade-in-right': {
          '0%': { transform: 'translateX(500px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 }
        }
      }
    },
  },
  plugins: [],
}