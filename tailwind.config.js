/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
    require('flowbite/plugin')
  ],
  theme: {
    extend: {
      spacing: {
        'nav': '90px',
      },
      colors: {
        primary: {
          "100": "#16A34A",
          "200": "#15A35F",
          "300": "#11823B",
          "400": "#11824C",
          "500": "#09981E",
          "600": "#11825D",
          "700": "#0A4E23",
          "800": "#0A4E2D",
          "900": "#0A4E41"
        },
        secondary: {
          "100": "#FF4301",
          "200": "#FF6901",
          "300": "#CC3500"
        },
        button: {
          "default": "#0943E0",
          "default-hover": "#053B86"
        },
        danger: {
          "default": "#FF0000",
          "hover": "#CC0000"
        }
      }
    },
    zIndex: {
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '50': '50'
    },
    borderWidth: {
      '1px': '1px',
      '2px': '2px',
      '3px': '3px',
    },
    minWidth: {
      '12': '3rem',
    },
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    },
    fontFamily: {
      'body': [
        'Inter', 
        'ui-sans-serif', 
        'system-ui', 
        '-apple-system', 
        'system-ui', 
        'Segoe UI', 
        'Roboto', 
        'Helvetica Neue', 
        'Arial', 
        'Noto Sans', 
        'sans-serif', 
        'Apple Color Emoji', 
        'Segoe UI Emoji', 
        'Segoe UI Symbol', 
        'Noto Color Emoji'
      ],
      'sans': [
        'Inter', 
        'ui-sans-serif', 
        'system-ui', 
        '-apple-system', 
        'system-ui', 
        'Segoe UI', 
        'Roboto', 
        'Helvetica Neue', 
        'Arial', 
        'Noto Sans', 
        'sans-serif', 
        'Apple Color Emoji', 
        'Segoe UI Emoji', 
        'Segoe UI Symbol', 
        'Noto Color Emoji'
      ],
      plugins: [],
    }
  }
}