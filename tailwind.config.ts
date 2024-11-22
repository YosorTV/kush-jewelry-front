/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}'
  ],
  theme: {
    container: {
      padding: '0',
      center: true
    },
    screens: {
      xs: '475px', // extra small screen
      sm: '640px', // small screen
      md: '768px', // medium screen
      lg: '1024px', // large screen
      xl: '1280px', // extra large screen
      '2xl': '1536px' // 2X extra large screen
    },
    minWidth: {
      btn: 240
    },
    extend: {
      height: {
        '3xl': '130vh',
        '2xl': '120vh',
        xl: '110vh',
        '2lg': '90vh',
        lg: '80vh',
        '2md': '70vh',
        md: '50vh',
        sm: '25vh',
        '112': '380px',
        '120': '468px'
      },
      screens: {
        xs: '475px', // extra small screen
        sm: '640px', // small screen
        md: '768px', // medium screen
        lg: '1024px', // large screen
        xl: '1280px', // extra large screen
        '2xl': '1536px' // 2X extra large screen
      },
      fontSize: {
        xs: '0.75rem', // 12px
        sm: '0.875rem', // 14px
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem', // 48px
        '6xl': '4rem', // 64px
        '7xl': '5rem', // 80px
        '8xl': '6rem', // 96px
        '9xl': '9rem' // 112px
      },
      scrollbar: {
        width: '12px',
        trackColor: 'white',
        thumbColor: 'black',
        thumbHoverColor: '#333',
        cornerColor: 'white'
      },
      objectPosition: {
        'center-to-top': '0 25%'
      },
      boxShadow: {
        'to-top': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 -4px 50px -2px rgb(0 0 0 / 0.1)'
      },
      gridTemplateColumns: {
        hero: 'auto 1fr',
        fluid: 'repeat(auto-fit, minmax(19rem, 1fr))'
      }
    }
  },
  darkMode: 'class',
  plugins: [require('daisyui'), require('tailwind-scrollbar')],
  daisyui: {
    themes: [
      {
        light: {
          success: '#41A139',
          error: '#AA0A0A',
          secondary: '#F5A81A',
          neutral: '#033178',
          'info-content': '#DEDDCC',
          'base-100': '#E9E8D5',
          'base-200': '#242424',
          'base-300': '#FFFFFF'
        }
      },
      {
        sunset: {
          success: '#41A139',
          secondary: '#F5A81A',
          error: '#AA0A0A',
          neutral: '#033178',
          'info-content': 'rgb(48,48,48)',
          'base-100': '#242424',
          'base-200': '#FFFFFF',
          'base-300': '#FFFFFF'
        }
      }
    ],
    themeRoot: ':root',
    styled: true,
    base: true,
    utils: true,
    prefix: ''
  }
};
