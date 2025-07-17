/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'remax-blue': '#003DA5',
        'remax-red': '#DC1C2E',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 