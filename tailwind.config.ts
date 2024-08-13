import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

import {
  typographyStyles,
  fontSize,
  lineHeight,
  letterSpacing,
  fontWeight,
} from './src/styles/typography';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-pretendard)',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
      fontSize,
      lineHeight,
      letterSpacing,
      fontWeight,
      backgroundColor: {
        main: 'rgb(6, 182, 212)',
        primary: '#3733ED',
        gray: '#EBEBEB',
      },
      textColor: {
        main: 'rgb(6, 182, 212)',
        primary: '#3733ED',
        bc: '#A4A3A4',
        btnTextColor: '#616061',
      },
      colors: {
        bc: '#A4A3A4',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
  },
  plugins: [plugin(typographyStyles), require('@tailwindcss/forms')],
};
export default config;
