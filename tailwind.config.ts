import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        gray: {
          50: 'rgb(250, 250, 250)',
          100: 'rgb(240, 240, 240)',
          200: 'rgb(220, 220, 220)',
          300: 'rgb(200, 200, 200)',
          400: 'rgb(160, 160, 160)',
          500: 'rgb(120, 120, 120)',
          600: 'rgb(80, 80, 80)',
          700: 'rgb(60, 60, 60)',
          800: 'rgb(40, 40, 40)',
          900: 'rgb(20, 20, 20)',
          950: 'rgb(10, 10, 10)',
        },
      },
      boxShadow: {
        primary: '0px 0px 0px 1px rgba(9, 9, 11, 0.07), 0px 4px 4px 0px rgba(9, 9, 11, 0.05)',
        secondary: '0px 0px 0px 1px rgba(9, 9, 11, 0.07), 0px 6px 6px 0px rgba(9, 9, 11, 0.05)',
        dark: '0px 0px 0px 2px rgba(200, 200, 200, 0.07)',
      },
    },
  },
  plugins: [],
};
export default config;
