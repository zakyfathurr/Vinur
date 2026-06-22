/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Remapped to VINUR-inspired palette
        brand: {
          50: '#ffd9de',
          100: '#ffdad6',
          200: '#ffb2be',
          500: '#b80049',
          600: '#e2165f',
          700: '#900038',
        },
        forest: {
          50: '#f0ffd0',
          100: '#b9f61d33',
          500: '#4b6700',
          600: '#384e00',
        },
        rose: {
          50: '#ffdad6',
          500: '#ba1a1a',
          600: '#93000a',
        },
        ink: {
          50: '#fafaf5',
          100: '#eeeee9',
          200: '#e3e3de',
          400: '#8f6f73',
          600: '#5b3f43',
          800: '#1a1c19',
          900: '#1a1c19',
        },
        lime: '#b9f61d',
        'lime-on': '#141f00',
        wood: '#D7CCC8',
        surface: {
          DEFAULT: '#fafaf5',
          low: '#f4f4ef',
          container: '#eeeee9',
          high: '#e8e8e3',
          highest: '#e3e3de',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(184, 0, 73, 0.08)',
        focus: '0 0 0 3px rgba(184, 0, 73, 0.2)',
      },
      animation: {
        'fade-up': 'fadeUp 0.35s ease-out',
        floating: 'floating 3s ease-in-out infinite',
        burst: 'burst 0.6s ease-out forwards',
        shake: 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        floating: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        burst: {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '60%': { transform: 'scale(1.04)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
        }
      },
    },
  },
  plugins: [],
}
