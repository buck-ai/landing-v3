/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["*.{html,css,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: '#04637C',
          900: '#004058',
          800: '#00536C',
          700: '#0E6780',
          600: '#2E7B94',
          500: '#478FAA',
          400: '#5EA4BF',
          300: '#74BAD6',
          200: '#8AD0EC',
          100: '#A1E7FF',
          50: '#B8FEFF'
        },
        secondary: {
          DEFAULT: '#E59500',
          900: '#642900',
          800: '#793C00',
          700: '#8F4F00',
          600: '#A76200',
          500: '#BF7600',
          400: '#D88A00',
          300: '#F19F17',
          200: '#FFB533',
          100: '#FFCB4B',
          50: '#FFE161'
        },
        greyscale: {
          900: '#101828',
          800: '#1D2939',
          700: '#344054',
          600: '#475467',
          500: '#667085',
          400: '#98A2B3',
          300: '#D0D5DD',
          200: '#EAECF0',
          100: '#F2F4F7',
          50: '#F8FAFC'
        },
        success: {
          900: '#16A34A',
          600: '#22C55E',
          300: '#4ADE80',
          50: '#ECFDF3'
        },
        warning: {
          900: '#EAB308',
          600: '#FACC15',
          300: '#FDE047',
          50: '#FFFCF0'
        },
        error: {
          900: '#DD3333',
          600: '#FF4747',
          300: '#FF7171',
          50: '#FEF3F2'
        },
        amber: {
          DEFAULT: '#F3C32F',
          50: '#FFFBEB'
        },
        info: '#436CFF',
        orange: {
          DEFAULT: '#EE6751',
          50: '#FFF7F5'
        },
        purple: {
          DEFAULT: '#936DFF',
          50: '#F7F5FF'
        },
        pink: {
          DEFAULT: '#FB9D98',
          50: '#FDF2F8'
        },
        sky: '#43B3AC'
      },
      boxShadow: {
        'landing-feature': '0px 4px 4px 0px #00000040'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ],
}
