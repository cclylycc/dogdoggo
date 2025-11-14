import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3f2',
          100: '#ffe4e1',
          200: '#ffcdc8',
          300: '#ffa99f',
          400: '#ff7667',
          500: '#ff4d37',
          600: '#ed3318',
          700: '#c8260f',
          800: '#a52310',
          900: '#882414',
          950: '#4b0e05',
        },
        accent: {
          50: '#fef8ee',
          100: '#fdefd6',
          200: '#fbdcac',
          300: '#f8c278',
          400: '#f5a142',
          500: '#f2851e',
          600: '#e36b13',
          700: '#bc5212',
          800: '#964117',
          900: '#793816',
          950: '#411b09',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 10px rgba(255, 77, 55, 0.5)' },
          'to': { boxShadow: '0 0 20px rgba(255, 77, 55, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}

export default config

