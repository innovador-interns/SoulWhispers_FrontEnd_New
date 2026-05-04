export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        syne: ['"Syne"', 'sans-serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        forest: {
          50: '#f5f7f3',
          100: '#edf0e9',
          200: '#d6e0d2',
          500: '#6b8f6e',
          700: '#3d5c40',
          900: '#1a2e1c',
        },
        brand: {
          light: '#3bab35',
          DEFAULT: '#2a8c26',
          dark: '#1a6b12',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      keyframes: {
        spinSlow: { to: { transform: 'rotate(360deg)' } },
        pulseGlow: {
          '0%,100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.15)', opacity: '1' },
        },
      },
      animation: {
        'spin-slow': 'spinSlow 20s linear infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
