/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Oxygen', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#2c3e50', // Dark blue
        secondary: '#3498db', // Blue
        tertiary: '#e74c3c', // Red
        success: '#2ecc71', // Green
        warning: '#e67e22', // Dark orange
        accent: {
          1: '#1abc9c', // Turquoise
          2: '#f39c12', // Orange
        },
        'bg-neutral': '#ecf0f1', // Light grey
        'text-color': '#34495e', // Dark grey
        'border-color': '#95a5a6', // Greyish
        danger: '#e74c3c', // Red
      },
    },
  },
  plugins: [],
};
