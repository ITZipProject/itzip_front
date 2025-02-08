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
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        ...borderRadii,
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderWidth: borderWidths,
      boxShadow: shadows,
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
    },
    screens: {
      base: '0px',
      sm: '480px',
      md: '768px',
      lg: '992px',
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
    require('tailwindcss-animate'),
  ],
} satisfies Config;

export default config;
