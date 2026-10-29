/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0B1B3A',
        accent: {
          DEFAULT: '#4F7CFF',
          50: '#EEF3FF',
          100: '#DCE7FF',
          200: '#BBD0FF',
          300: '#8FB0FF',
          400: '#6E96FF',
          500: '#4F7CFF',
          600: '#3A62E0',
          700: '#2C4CB8',
          800: '#223C90',
          900: '#1A2E6E',
        },
        highlight: '#FFB547',
        bg: '#EEF2FA',
        surface: '#FFFFFF',
        ink: '#0B1B3A',
        muted: '#5A6785',
        line: '#D5DCEB',
      },
      fontFamily: {
        heading: ['Manrope', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '6px',
        lg: '8px',
        xl: '12px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,27,58,0.04), 0 4px 16px rgba(11,27,58,0.04)',
        pop: '0 8px 30px rgba(11,27,58,0.10)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        draw: {
          '0%': { 'stroke-dashoffset': 'var(--len)' },
          '100%': { 'stroke-dashoffset': '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'fade-in': 'fade-in 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};
