module.exports = {
  darkMode: 'class',
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: { '2xl': '1400px' }
    },
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Clash Display"', 'Poppins', 'system-ui']
      },
      colors: {
        primary: {
          50: '#e6f6ff',
          100: '#ccedff',
          200: '#99dbff',
          300: '#66c9ff',
          400: '#33b7ff',
          500: '#00a5ff',
          600: '#0084cc',
          700: '#006399',
          800: '#004266',
          900: '#0a2540',
          DEFAULT: '#0a2540'
        },
        accent: '#00b4d8',
        brand: {
          aqua: '#00b4d8',
          teal: '#0088a9',
          navy: '#0a2540'
        }
      },
      backdropBlur: {
        xs: '2px'
      },
      boxShadow: {
        glow: '0 0 0 3px rgba(0,180,216,0.35)',
        'elevated': '0 8px 28px -6px rgba(10,37,64,.3),0 4px 12px -2px rgba(0,0,0,.15)'
      },
      animation: {
        'fade-in': 'fadeIn .6s ease-out',
        'slide-up': 'slideUp .6s cubic-bezier(.16,.8,.24,1)',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(24px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        pulseSoft: { '0%,100%': { opacity: 1 }, '50%': { opacity: .5 } }
      },
      gradientColorStops: theme => ({ ...theme('colors') }),
      backgroundImage: {
        'mesh-radial': 'radial-gradient(circle at 25% 25%, rgba(0,180,216,.15), transparent 60%), radial-gradient(circle at 75% 75%, rgba(10,37,64,.25), transparent 70%)',
        'hero-glow': 'radial-gradient(circle at 50% 50%, rgba(0,180,216,.25), rgba(10,37,64,.85))'
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
