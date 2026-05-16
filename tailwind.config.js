/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        guardian: {
          cyan: '#00E5FF',
          'cyan-dim': '#4DD0E1',
          'cyan-glow': '#00B8D4',
          gold: '#F5C518',
          'gold-bright': '#FFD600',
          black: '#0A0A0F',
          navy: '#0D1117',
          'navy-light': '#161B22',
          trace: '#1A3A4A',
          'trace-dim': '#0F2A35',
          border: '#1E3A4A',
        }
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Rajdhani', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'trace-flow': 'trace-flow 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 4s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(0, 229, 255, 0.3), 0 0 40px rgba(0, 229, 255, 0.1)',
            borderColor: 'rgba(0, 229, 255, 0.5)'
          },
          '50%': {
            boxShadow: '0 0 30px rgba(0, 229, 255, 0.5), 0 0 60px rgba(0, 229, 255, 0.2)',
            borderColor: 'rgba(0, 229, 255, 0.8)'
          },
        },
        'trace-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
