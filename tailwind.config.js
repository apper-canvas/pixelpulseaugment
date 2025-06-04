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
          DEFAULT: '#E1306C',
          light: '#E91E63',
          dark: '#C2185B'
        },
        secondary: {
          DEFAULT: '#405DE6',
          light: '#5C6BC0',
          dark: '#3949AB'
        },
        accent: '#FD1D1D',
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        },
        neutral: {
          50: '#FFFFFF',
          100: '#FAFAFA',
          200: '#F0F0F0',
          300: '#DBDBDB',
          400: '#8E8E8E',
          500: '#262626',
          600: '#000000'
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        heading: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif']
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 1px 3px rgba(0,0,0,0.12)',
        'neu-light': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        'neu-dark': '5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.05)'
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem'
      },
      maxWidth: {
        'feed': '935px'
      },
      height: {
        'header': '54px',
        'nav': '49px'
      },
      animation: {
        'bounce-soft': 'bounce 0.6s ease-in-out',
        'scale-heart': 'scaleHeart 0.3s ease-out',
        'pulse-like': 'pulseLike 0.8s infinite'
      },
      keyframes: {
        scaleHeart: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' }
        },
        pulseLike: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' }
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}