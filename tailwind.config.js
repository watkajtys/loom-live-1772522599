/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#121417',
        primary: '#FFB100',
        secondary: '#00E5FF',
        neutral: '#2A2E35',
      },
      fontFamily: {
        heading: ['"JetBrains Mono"', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
