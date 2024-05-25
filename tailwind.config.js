/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      black: '#03060B',
      white: '#F8FAFD',
      geraldine: '#FF8F94',
      blue: '##8FB4FF',
      ligthblue: '#EBF1FF',
    },
    fontFamily: {
      custom: ['EB Garamond', 'sans-serif'],
    },
  },
  plugins: [],
};
