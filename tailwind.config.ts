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
            },
            textColor: {
                main: 'rgb(6, 182, 212)',
                logo: 'rgb(5, 0, 232)',
                headerText: 'rgb(53, 51, 53)',
            },
            fontSize: {
                logoSize: '28px',
                headerSize: '16px',
            },
        },
        screens: {
            ms: '500px',
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
export default config;
