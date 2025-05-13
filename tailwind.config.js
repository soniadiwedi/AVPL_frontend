/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
        primary: '#401767',
        purpuleLight:'#401767CC',
        greenCustom:"#1DDB1A",
        bodyBg:"#4017670A",
        secondary: '#FFB619', 
        grayText:"#14141480"
      },
    },
  },
  plugins: [],
}