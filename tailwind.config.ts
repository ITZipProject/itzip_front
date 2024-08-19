import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        main: 'rgb(6, 182, 212)',
        primary: '#3733ED',
        gray: '#EBEBEB',
        'color-field-solid': '#F5F5F5',
        'color-field-line': '#FFFFFF',
        'color-field-disabled': '#ECECEC',
      },
      textColor: {
        main: 'rgb(6, 182, 212)',
        primary: '#3733ED',
        bc: '#A4A3A4',
        btnTextColor: '#616061',
        // 선구 작업 시작
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
        // 선구 작업 끝
      },
      colors: {
        bc: '#A4A3A4',
      },
      fontSize: {
        logoSize: '28px',
        headerSize: '16px',
      },
      // 선구 작업 시작
      borderColor: {
        'color-border-brand': '#8F8F8F',
        'color-border-primary': '#D9D9D9',
        'color-border-selectied': '##8F8F8F',
        'color-field-solid': '#D9D9D9',
        'color-field-line': '#D9D9D9',
        'color-field-disabled': '#D9D9D9',
      },
      // 선구 작업 끝
    },
    screens: {
      ms: '500px',
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
