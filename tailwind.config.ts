import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

import { borderWidths, borderRadii } from './src/styles/borders';
import { shadows } from './src/styles/shadows';
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
      boxShadow: shadows,
      borderWidth: borderWidths,
      borderRadius: borderRadii,
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
        'color-button-primary': '#3733ED',
        'color-button-primary-hover': '#5854F0',
        'color-button-primary-pressed': '#8C8AF4',
        'color-button-primary-focus': '#0500E8',
        'color-button-secondary': '#E6E6FD',
        'color-button-secondary-hover': '#D1D0FB',
        'color-button-secondary-pressed': '#B2B0F8',
        'color-button-secondary-focus': '#E6E6FD',
        'color-button-tertiary': '#333333',
        'color-button-tertiary-hover': '#000000',
        'color-button-tertiary-pressed': '#000000',
        'color-button-tertiary-focus': '#000000',
        'color-button-disabled': '#D9D9D9',
        'color-support-success': '#186F35',
        'color-support-error': '#E46969',
        'color-support-info': '#3733ED',
        'color-button-fourth': '#FFFFFF',

        gray: '#EBEBEB',
        'color-field-solid': '#F5F5F5',
        'color-field-line': '#FFFFFF',
        'color-field-disabled': '#ECECEC',
      },
      borderColor: {
        'color-button-fourth-hover': '#8F8F8F',
        'color-button-fourth-pressed': '#767676',
        'color-button-fourth-focus': '#3733ED',
        'color-disabled': '#D9D9D9',
      },
      textColor: {
        main: 'rgb(6, 182, 212)',
        primary: '#3733ED',
        bc: '#A4A3A4',
        btnTextColor: '#616061',
        logo: '#0500E8',
        'color-text-primary': '#171717',
        'color-text-secondary': '#767676',
        'color-text-tertiary': '#AEAEAE',
        'color-text-quaternary': '#D9D9D9',
        'color-text-primary-inverse': '#FFFFFF',
        'color-text-secondary-inverse': '#D9D9D9',
        'color-text-tertiary-inverse': '#767676',
        'color-text-disabled': '#D9D9D9',
        'color-text-disabled-on': '#AEAEAE',
        'color-text-disabled-inverse': '#555555',
        'color-text-warning': '#E46969',
      },
      colors: {
        bc: '#A4A3A4',
        'Grey-50': '#FAFAFA',
        'Grey-100': '#F5F5F5',
        'Grey-200': '#ECECEC',
        'Grey-300': '#D9D9D9',
        'Grey-400': '#AEAEAE',
        'Grey-500': '#8F8F8F',
        'Grey-600': '#767676',
        'Grey-700': '#555555',
        'Grey-800': '#333333',
        'Grey-900': '#171717',
        'Grey-1000': '#000000',
        'Blue-50': '#E6E6FD',
        'Blue-85': '#D1D0FB',
        'Blue-100': '#B2B0F8',
        'Blue-200': '#8C8AF4',
        'Blue-300': '#5854F0',
        'Blue-400': '#3733ED',
        'Blue-500': '#0500E8',
        'Blue-600': '#0500D3',
        'Blue-700': '#0400A5',
        'Blue-800': '#030080',
        'Blue-900': '#020061',
      },
      opacity: {
        'Grey-alpha-5': '0.05',
        'Grey-alpha-10': '0.1',
        'Grey-alpha-20': '0.2',
        'Grey-alpha-30': '0.3',
        'Grey-alpha-40': '0.4',
        'Grey-alpha-50': '0.5',
        'Grey-alpha-60': '0.6',
        'Grey-alpha-70': '0.7',
        'Grey-alpha-80': '0.8',
        'Grey-alpha-90': '0.9',
        'White-alpha-5': '0.05',
        'White-alpha-10': '0.1',
        'White-alpha-20': '0.2',
        'White-alpha-30': '0.3',
        'White-alpha-40': '0.4',
        'White-alpha-50': '0.5',
        'White-alpha-60': '0.6',
        'White-alpha-70': '0.7',
        'White-alpha-80': '0.8',
        'White-alpha-90': '0.9',
      },
      spacing: {
        'spacing-none': '0px',
        'spacing-01': '2px',
        'spacing-02': '4px',
        'spacing-03': '8px',
        'spacing-04': '12px',
        'spacing-05': '16px',
        'spacing-06': '20px',
        'spacing-07': '24px',
        'spacing-08': '28px',
        'spacing-09': '32px',
        'spacing-10': '36px',
        'spacing-11': '40px',
        'spacing-12': '48px',
        'spacing-13': '56px',
        'spacing-14': '64px',
        'spacing-15': '80px',
        'spacing-16': '96px',
        'spacing-17': '120px',
        'spacing-18': '160px',
        'spacing-19': '200px',
        'spacing-20': '240px',
        'spacing-21': '280px',
      },
    },
    screens: {
      base: '0px',
      sm: '480px', //BP
      md: '768px', //BP
      lg: '992px', //BP
      xl: '1280px',
      '2xl': '1440px',
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ...Object.entries(borderWidths).reduce(
          (acc, [key, value]) => {
            (acc as Record<string, { borderWidth: string }>)[`.${key}`] = { borderWidth: value };
            return acc;
          },
          {} as Record<string, { borderWidth: string }>,
        ),
        ...Object.entries(borderRadii).reduce(
          (acc, [key, value]) => {
            (acc as Record<string, { borderRadius: string }>)[`.${key}`] = { borderRadius: value };
            return acc;
          },
          {} as Record<string, { borderRadius: string }>,
        ),
      });
    }),
    plugin(typographyStyles),
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar-hide'),
  ],
};

export default config;
