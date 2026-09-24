/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        maison: {
          bg: '#FAF8F5',
          dark: '#231D18',
          card: '#F2EFEA',
          border: '#DFDCDA',
          gold: '#9B7C55',
          goldLight: '#C5A880',
          sand: '#EAE5DD',
          muted: '#71665D',
        }
      },
      keyframes: {
        'maison-marquee': {
          to: { transform: 'translate(calc(-50% - 0.375rem))' },
        },
        'maison-panel': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'maison-pulse': {
          '50%': {
            boxShadow: '0 0 0 9px rgba(197, 168, 128, 0.18), 0 14px 28px rgba(35, 29, 24, 0.2)',
          },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'subtle-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' }
        }
      },
      animation: {
        'marquee': 'maison-marquee 55s linear infinite',
        'panel': 'maison-panel 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-concierge': 'maison-pulse 3s ease-in-out infinite',
        'fade-in': 'fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'subtle-zoom': 'subtle-zoom 20s ease-in-out alternate infinite',
      }
    },
  },
  plugins: [],
}
