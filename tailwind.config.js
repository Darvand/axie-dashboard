const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        content: `calc(100vh - theme('height.20'))`
      },
      width: {
        content: `calc(100% - theme('width.52'))`
      },
      transitionProperty: {
        'max-height': 'max-height'
      },
      gridTemplateColumns: {
        '2/3': '2fr 1fr'
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif']
      }
    },
    colors: {
      gray: colors.coolGray,
      primary: '#363E59',
      secondary: '#51658C',
      third: '#7E9ABF',
      'primary-text': '#B8C6D9',
      'secondary-text': '#626A81',
      active: '#9BF2EA',
      error: colors.red,
      blue: '#1C4587',
      white: colors.white
    },
  },
  variants: {
    extend: {
      fontWeight: ['hover'],
    },
  },
  plugins: [],
}
