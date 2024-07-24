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
    },
    plugins: [require('@tailwindcss/forms')],
};
export default config;
