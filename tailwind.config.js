import tailwindcssAnimate from 'tailwindcss-animate'
import tailwindcssTypography from '@tailwindcss/typography'
import tailwindAspectRatio from '@tailwindcss/aspect-ratio'

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: '20px',
        md: '18px',
        sm: '16px)',
      },
      colors: {
        background: '#16243b',
        foreground: '#fafafa',
        card: {
          DEFAULT: '#0a0a0a',
          foreground: '#fafafa',
        },
        popover: {
          DEFAULT: '#0a0a0a',
          foreground: '#fafafa',
        },
        primary: {
          DEFAULT: '#0091ff',
          foreground: '#fafafa',
        },
        secondary: {
          DEFAULT: '#262626',
          foreground: '#fafafa',
        },
        muted: {
          DEFAULT: '#262626',
          foreground: '#a2a2a2',
        },
        accent: {
          DEFAULT: '#262626',
          foreground: '#fafafa',
        },
        destructive: {
          DEFAULT: '#801919',
          foreground: '#fafafa',
        },
        border: '#f5f5f5',
        input: '#262626',
        ring: '#d5d5d5',
        chart: {
          1: '#3366ff',
          2: '#2db37c',
          3: '#d98e3f',
          4: '#9966cc',
          5: '#e63950',
        },
        placeholder: '#959da5',
      },
    },
  },
  plugins: [tailwindAspectRatio, tailwindcssAnimate, tailwindcssTypography],
}
