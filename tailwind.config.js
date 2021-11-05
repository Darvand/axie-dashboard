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
      }
    },
    colors: {
      gray: colors.coolGray,
      primary: '#252B40',
      secondary: '#1E2437',
      third: '#3F4966',
      'primary-text': '#E7E8EB',
      'secondary-text': '#626A81',
      active: '#5D7ADD'
    },
  },
  variants: {
    extend: {
      fontWeight: ['hover'],
    },
  },
  plugins: [],
}
