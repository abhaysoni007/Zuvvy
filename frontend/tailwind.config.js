/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        zuvvy: {
          purple: '#6C5CE7',
          teal: '#00D1B2',
          yellow: '#FFD166',
          blue: '#4DA8DA',
          white: '#FFFFFF',
          ink: '#1A1A1A'
        }
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['Patrick Hand', 'Comic Neue', 'cursive']
      },
      boxShadow: {
        bubble: '0 24px 64px rgba(108, 92, 231, 0.2)',
        soft: '0 18px 40px rgba(26, 26, 26, 0.12)',
        glow: '0 0 0 1px rgba(255,255,255,0.5), 0 24px 64px rgba(108, 92, 231, 0.18)'
      }
    }
  },
  plugins: []
};
