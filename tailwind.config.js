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
      }
    },
    colors: {
      gray: colors.coolGray,
      primary: '#16233C',
      secondary: '#2C4059',
      third: '#3F4966',
      'primary-text': '#E7E8EB',
      'secondary-text': '#626A81',
      active: '#5D7ADD',
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
