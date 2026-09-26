/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#07090e',
          card: '#0d111a',
          cyan: '#00f0ff',
          neon: '#00ff88',
          magenta: '#ff007f',
          amber: '#ffaa00',
          blue: '#0066ff',
        },
      },
      fontFamily: {
        mono: ['Fira Code', 'SF Mono', 'monospace'],
        display: ['Syne', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
