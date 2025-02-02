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
        background: 'hsl(215, 29%, 13%)',
        foreground: 'hsl(0 0% 98%)',
        card: {
          DEFAULT: 'hsl(0 0% 3.9%)',
          foreground: 'hsl(0 0% 98%)',
        },
        popover: {
          DEFAULT: 'hsl(0 0% 3.9%)',
          foreground: 'hsl(0 0% 98%)',
        },
        primary: {
          DEFAULT: 'hsl(203, 90%, 53%)',
          foreground: 'hsl(0 0% 98%)',
        },
        secondary: {
          DEFAULT: 'hsl(0 0% 14.9%)',
          foreground: 'hsl(0 0% 98%)',
        },
        muted: {
          DEFAULT: 'hsl(0 0% 14.9%)',
          foreground: 'hsl(0 0% 63.9%)',
        },
        accent: {
          DEFAULT: 'hsl(0 0% 14.9%)',
          foreground: 'hsl(0 0% 98%)',
        },
        destructive: {
          DEFAULT: 'hsl(0 62.8% 30.6%)',
          foreground: 'hsl( 0 0% 98%)',
        },
        border: 'hsl(208, 14%, 26%)',
        input: 'hsl(0 0% 14.9%)',
        ring: 'hsl(0 0% 83.1%)',
        chart: {
          1: 'hsl(220 70% 50%)',
          2: 'hsl(160 60% 45%)',
          3: 'hsl(30 80% 55%)',
          4: 'hsl(280 65% 60%)',
          5: 'hsl(340 75% 55%)',
        },
        placeholder: 'hsl(204, 14%, 59%)',
      },
    },
  },
  plugins: [tailwindAspectRatio, tailwindcssAnimate, tailwindcssTypography],
}
