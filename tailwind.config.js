/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#9DC0DE',
        'primary-dark': '#6F97BB',
        'primary-light': '#CBE0EE',
        accent: '#C9A66B',
        'accent-dark': '#A98449',
        background: '#FBF9F4',
        surface: '#FFFFFF',
        ink: '#292521',
        muted: '#7C7469',
        divider: '#E8E1D3',
        deep: '#1B2A33',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        arabic: ['"Cairo"', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '4rem',
      },
      animation: {
        'float': 'float 7s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
