import { PluginAPI } from 'tailwindcss/types/config';

export const typographyStyles = ({ addComponents, theme }: PluginAPI) => {
  const newComponents: { [key: string]: any } = {
    '.font-pre-display-01': {
      fontWeight: theme('fontWeight.extrabold'),
      fontSize: theme('fontSize.48'),
      lineHeight: theme('lineHeight.150'),
      '@screen sm': {
        fontWeight: theme('fontWeight.extrabold'),
        fontSize: theme('fontSize.48'),
        lineHeight: theme('lineHeight.150'),
      },
      '@screen md': {
        fontWeight: theme('fontWeight.extrabold'),
        fontSize: theme('fontSize.72'),
        lineHeight: theme('lineHeight.150'),
      },
      '@screen lg': {
        fontWeight: theme('fontWeight.extrabold'),
        fontSize: theme('fontSize.80'),
        lineHeight: theme('lineHeight.150'),
      },
    },
    '.font-pre-display-02': {
      fontWeight: theme('fontWeight.bold'),
      fontSize: theme('fontSize.40'),
      lineHeight: theme('lineHeight.150'),
      '@screen sm': {
        fontWeight: theme('fontWeight.bold'),
        fontSize: theme('fontSize.40'),
        lineHeight: theme('lineHeight.150'),
      },
      '@screen md': {
        fontWeight: theme('fontWeight.bold'),
        fontSize: theme('fontSize.56'),
        lineHeight: theme('lineHeight.150'),
      },
      '@screen lg': {
        fontWeight: theme('fontWeight.bold'),
        fontSize: theme('fontSize.64'),
        lineHeight: theme('lineHeight.150'),
      },
    },
    '.font-pre-display-03': {
      fontWeight: theme('fontWeight.bold'),
      fontSize: theme('fontSize.32'),
      lineHeight: theme('lineHeight.150'),
      '@screen sm': {
        fontWeight: theme('fontWeight.bold'),
        fontSize: theme('fontSize.32'),
        lineHeight: theme('lineHeight.150'),
      },
      '@screen md': {
        fontWeight: theme('fontWeight.bold'),
        fontSize: theme('fontSize.40'),
        lineHeight: theme('lineHeight.150'),
      },
      '@screen lg': {
        fontWeight: theme('fontWeight.bold'),
        fontSize: theme('fontSize.48'),
        lineHeight: theme('lineHeight.150'),
      },
    },
    '.font-pre-heading-01': {
      fontWeight: theme('fontWeight.bold'),
      fontSize: theme('fontSize.24'),
      lineHeight: theme('lineHeight.150'),
      '@screen sm': {
        fontWeight: theme('fontWeight.bold'),
        fontSize: theme('fontSize.24'),
        lineHeight: theme('lineHeight.150'),
      },
      '@screen md': {
        fontWeight: theme('fontWeight.bold'),
        fontSize: theme('fontSize.28'),
        lineHeight: theme('lineHeight.150'),
      },
      '@screen lg': {
        fontWeight: theme('fontWeight.bold'),
        fontSize: theme('fontSize.32'),
        lineHeight: theme('lineHeight.150'),
      },
    },
    '.font-pre-heading-02': {
      fontWeight: theme('fontWeight.bold'),
      fontSize: theme('fontSize.20'),
      lineHeight: theme('lineHeight.150'),
      '@screen sm': {
        fontWeight: theme('fontWeight.bold'),
        fontSize: theme('fontSize.20'),
        lineHeight: theme('lineHeight.150'),
      },
      '@screen md': {
        fontWeight: theme('fontWeight.bold'),
        fontSize: theme('fontSize.24'),
        lineHeight: theme('lineHeight.150'),
      },
      '@screen lg': {
        fontWeight: theme('fontWeight.bold'),
        fontSize: theme('fontSize.24'),
        lineHeight: theme('lineHeight.150'),
      },
    },
    '.font-pre-heading-03': {
      fontWeight: theme('fontWeight.semibold'),
      fontSize: theme('fontSize.18'),
      lineHeight: theme('lineHeight.170'),
      '@screen sm': {
        fontWeight: theme('fontWeight.semibold'),
        fontSize: theme('fontSize.18'),
        lineHeight: theme('lineHeight.170'),
      },
      '@screen md': {
        fontWeight: theme('fontWeight.semibold'),
        fontSize: theme('fontSize.20'),
        lineHeight: theme('lineHeight.150'),
      },
      '@screen lg': {
        fontWeight: theme('fontWeight.semibold'),
        fontSize: theme('fontSize.20'),
        lineHeight: theme('lineHeight.150'),
      },
    },
    '.font-pre-body-01': {
      fontWeight: theme('fontWeight.semibold'),
      fontSize: theme('fontSize.16'),
      lineHeight: theme('lineHeight.170'),
      '@screen sm': {
        fontWeight: theme('fontWeight.semibold'),
        fontSize: theme('fontSize.16'),
        lineHeight: theme('lineHeight.170'),
      },
      '@screen md': {
        fontWeight: theme('fontWeight.semibold'),
        fontSize: theme('fontSize.16'),
        lineHeight: theme('lineHeight.170'),
      },
      '@screen lg': {
        fontWeight: theme('fontWeight.semibold'),
        fontSize: theme('fontSize.16'),
        lineHeight: theme('lineHeight.170'),
      },
    },
    '.font-pre-body-02': {
      fontWeight: theme('fontWeight.regular'),
      fontSize: theme('fontSize.16'),
      lineHeight: theme('lineHeight.170'),
      '@screen sm': {
        fontWeight: theme('fontWeight.regular'),
        fontSize: theme('fontSize.16'),
        lineHeight: theme('lineHeight.170'),
      },
      '@screen md': {
        fontWeight: theme('fontWeight.regular'),
        fontSize: theme('fontSize.16'),
        lineHeight: theme('lineHeight.170'),
      },
      '@screen lg': {
        fontWeight: theme('fontWeight.regular'),
        fontSize: theme('fontSize.16'),
        lineHeight: theme('lineHeight.170'),
      },
    },
    '.font-pre-body-03': {
      fontWeight: theme('fontWeight.semibold'),
      fontSize: theme('fontSize.14'),
      lineHeight: theme('lineHeight.170'),
      '@screen sm': {
        fontWeight: theme('fontWeight.semibold'),
        fontSize: theme('fontSize.14'),
        lineHeight: theme('lineHeight.170'),
      },
      '@screen md': {
        fontWeight: theme('fontWeight.semibold'),
        fontSize: theme('fontSize.14'),
        lineHeight: theme('lineHeight.170'),
      },
      '@screen lg': {
        fontWeight: theme('fontWeight.semibold'),
        fontSize: theme('fontSize.14'),
        lineHeight: theme('lineHeight.170'),
      },
    },
    '.font-pre-body-04': {
      fontWeight: theme('fontWeight.regular'),
      fontSize: theme('fontSize.14'),
      lineHeight: theme('lineHeight.170'),
      '@screen sm': {
        fontWeight: theme('fontWeight.regular'),
        fontSize: theme('fontSize.14'),
        lineHeight: theme('lineHeight.170'),
      },
      '@screen md': {
        fontWeight: theme('fontWeight.regular'),
        fontSize: theme('fontSize.14'),
        lineHeight: theme('lineHeight.170'),
      },
      '@screen lg': {
        fontWeight: theme('fontWeight.regular'),
        fontSize: theme('fontSize.14'),
        lineHeight: theme('lineHeight.170'),
      },
    },
    '.font-pre-caption-01': {
      fontWeight: theme('fontWeight.semibold'),
      fontSize: theme('fontSize.12'),
      lineHeight: theme('lineHeight.170'),
      '@screen sm': {
        fontWeight: theme('fontWeight.semibold'),
        fontSize: theme('fontSize.12'),
        lineHeight: theme('lineHeight.170'),
      },
      '@screen md': {
        fontWeight: theme('fontWeight.semibold'),
        fontSize: theme('fontSize.12'),
        lineHeight: theme('lineHeight.170'),
      },
      '@screen lg': {
        fontWeight: theme('fontWeight.semibold'),
        fontSize: theme('fontSize.12'),
        lineHeight: theme('lineHeight.170'),
      },
    },
    '.font-pre-caption-02': {
      fontWeight: theme('fontWeight.regular'),
      fontSize: theme('fontSize.12'),
      lineHeight: theme('lineHeight.170'),
      '@screen sm': {
        fontWeight: theme('fontWeight.regular'),
        fontSize: theme('fontSize.12'),
        lineHeight: theme('lineHeight.170'),
      },
      '@screen md': {
        fontWeight: theme('fontWeight.regular'),
        fontSize: theme('fontSize.12'),
        lineHeight: theme('lineHeight.170'),
      },
      '@screen lg': {
        fontWeight: theme('fontWeight.regular'),
        fontSize: theme('fontSize.12'),
        lineHeight: theme('lineHeight.170'),
      },
    },
    '.font-pre-caption-03': {
      fontWeight: theme('fontWeight.semibold'),
      fontSize: theme('fontSize.10'),
      lineHeight: theme('lineHeight.170'),
      '@screen sm': {
        fontWeight: theme('fontWeight.semibold'),
        fontSize: theme('fontSize.10'),
        lineHeight: theme('lineHeight.170'),
      },
      '@screen md': {
        fontWeight: theme('fontWeight.semibold'),
        fontSize: theme('fontSize.10'),
        lineHeight: theme('lineHeight.170'),
      },
      '@screen lg': {
        fontWeight: theme('fontWeight.semibold'),
        fontSize: theme('fontSize.10'),
        lineHeight: theme('lineHeight.170'),
      },
    },
    '.font-pre-caption-04': {
      fontWeight: theme('fontWeight.regular'),
      fontSize: theme('fontSize.10'),
      lineHeight: theme('lineHeight.170'),
      '@screen sm': {
        fontWeight: theme('fontWeight.regular'),
        fontSize: theme('fontSize.10'),
        lineHeight: theme('lineHeight.170'),
      },
      '@screen md': {
        fontWeight: theme('fontWeight.regular'),
        fontSize: theme('fontSize.10'),
        lineHeight: theme('lineHeight.170'),
      },
      '@screen lg': {
        fontWeight: theme('fontWeight.regular'),
        fontSize: theme('fontSize.10'),
        lineHeight: theme('lineHeight.170'),
      },
    },
  };
  addComponents(newComponents);
};

export const fontSize = {
  '10': '10px',
  '12': '12px',
  '14': '14px',
  '16': '16px',
  '18': '18px',
  '20': '20px',
  '24': '24px',
  '28': '28px',
  '32': '32px',
  '36': '36px',
  '40': '40px',
  '44': '44px',
  '48': '48px',
  '56': '56px',
  '64': '64px',
  '72': '72px',
  '80': '80px',
  '90': '90px',
  '100': '100px',
};

export const lineHeight = {
  '100': '1.0',
  '110': '1.1',
  '120': '1.2',
  '130': '1.3',
  '140': '1.4',
  '150': '1.5',
  '170': '1.7',
  '180': '1.8',
  '190': '1.9',
  '200': '2.0',
};

export const letterSpacing = {
  tighter: '-0.01em', // -1%
};

export const fontWeight = {
  thin: '100',
  extralight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
};
