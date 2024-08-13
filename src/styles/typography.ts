import { PluginAPI } from 'tailwindcss/types/config';

const createFontStyle = (
  fontSize: string,
  lineHeight: string,
  fontWeight: string,
  letterSpacing: string,
) => ({
  fontSize: `theme('fontSize.${fontSize}')`,
  lineHeight: `theme('lineHeight.${lineHeight}')`,
  fontWeight: `theme('fontWeight.${fontWeight}')`,
  letterSpacing: `theme('letterSpacing.${letterSpacing}')`,
});

const fontStyles = {
  //extrabold
  'pre/80/extrabold': createFontStyle('80', '150', 'extrabold', 'tighter'),
  'pre/72/extrabold': createFontStyle('72', '150', 'extrabold', 'tighter'),
  'pre/64/extrabold': createFontStyle('64', '150', 'extrabold', 'tighter'),
  'pre/56/extrabold': createFontStyle('56', '150', 'extrabold', 'tighter'),
  'pre/48/extrabold': createFontStyle('48', '150', 'extrabold', 'tighter'),
  'pre/40/extrabold': createFontStyle('40', '150', 'extrabold', 'tighter'),
  'pre/36/extrabold': createFontStyle('36', '150', 'extrabold', 'tighter'),
  'pre/32/extrabold': createFontStyle('32', '150', 'extrabold', 'tighter'),
  'pre/28/extrabold': createFontStyle('28', '150', 'extrabold', 'tighter'),

  //bold
  'pre/80/bold': createFontStyle('80', '150', 'bold', 'tighter'),
  'pre/72/bold': createFontStyle('72', '150', 'bold', 'tighter'),
  'pre/64/bold': createFontStyle('64', '150', 'bold', 'tighter'),
  'pre/56/bold': createFontStyle('56', '150', 'bold', 'tighter'),
  'pre/48/bold': createFontStyle('48', '150', 'bold', 'tighter'),
  'pre/40/bold': createFontStyle('40', '150', 'bold', 'tighter'),
  'pre/36/bold': createFontStyle('36', '150', 'bold', 'tighter'),
  'pre/32/bold': createFontStyle('32', '150', 'bold', 'tighter'),
  'pre/28/bold': createFontStyle('28', '150', 'bold', 'tighter'),
  'pre/24/bold': createFontStyle('24', '150', 'bold', 'tighter'),
  'pre/20/bold': createFontStyle('20', '150', 'bold', 'tighter'),

  // semibold
  'pre/80/semibold': createFontStyle('80', '140', 'semibold', 'tighter'),
  'pre/72/semibold': createFontStyle('72', '140', 'semibold', 'tighter'),
  'pre/64/semibold': createFontStyle('64', '140', 'semibold', 'tighter'),
  'pre/56/semibold': createFontStyle('56', '150', 'semibold', 'tighter'),
  'pre/48/semibold': createFontStyle('48', '150', 'semibold', 'tighter'),
  'pre/40/semibold': createFontStyle('40', '150', 'semibold', 'tighter'),
  'pre/36/semibold': createFontStyle('36', '150', 'semibold', 'tighter'),
  'pre/32/semibold': createFontStyle('32', '150', 'semibold', 'tighter'),
  'pre/28/semibold': createFontStyle('28', '150', 'semibold', 'tighter'),
  'pre/24/semibold': createFontStyle('24', '150', 'semibold', 'tighter'),
  'pre/20/semibold': createFontStyle('20', '150', 'semibold', 'tighter'),
  'pre/18/semibold': createFontStyle('18', '170', 'semibold', 'tighter'),
  'pre/16/semibold': createFontStyle('16', '170', 'semibold', 'tighter'),
  'pre/14/semibold': createFontStyle('14', '170', 'semibold', 'tighter'),
  'pre/12/semibold': createFontStyle('12', '170', 'semibold', 'tighter'),
  'pre/10/semibold': createFontStyle('10', '170', 'semibold', 'tighter'),

  // medium
  'pre/28/medium': createFontStyle('28', '150', 'medium', 'tighter'),
  'pre/24/medium': createFontStyle('24', '150', 'medium', 'tighter'),
  'pre/20/medium': createFontStyle('20', '150', 'medium', 'tighter'),
  'pre/18/medium': createFontStyle('18', '170', 'medium', 'tighter'),
  'pre/16/medium': createFontStyle('16', '170', 'medium', 'tighter'),
  'pre/14/medium': createFontStyle('14', '170', 'medium', 'tighter'),
  'pre/12/medium': createFontStyle('12', '170', 'medium', 'tighter'),
  'pre/10/medium': createFontStyle('10', '170', 'medium', 'tighter'),

  // regular
  'pre/24/regular': createFontStyle('24', '150', 'regular', 'tighter'),
  'pre/20/regular': createFontStyle('20', '150', 'regular', 'tighter'),
  'pre/18/regular': createFontStyle('18', '170', 'regular', 'tighter'),
  'pre/16/regular': createFontStyle('16', '170', 'regular', 'tighter'),
  'pre/14/regular': createFontStyle('14', '170', 'regular', 'tighter'),
  'pre/12/regular': createFontStyle('12', '170', 'regular', 'tighter'),
  'pre/10/regular': createFontStyle('10', '170', 'regular', 'tighter'),
};

export const typographyStyles = ({ addComponents }: PluginAPI) => {
  const newComponents: { [key: string]: any } = {
    '.font-pre-display-01': {
      ...fontStyles['pre/48/extrabold'],
      '@screen sm': fontStyles['pre/48/extrabold'],
      '@screen md': fontStyles['pre/72/extrabold'],
      '@screen lg': fontStyles['pre/80/extrabold'],
    },
    '.font-pre-display-02': {
      ...fontStyles['pre/40/bold'],
      '@screen sm': fontStyles['pre/40/bold'],
      '@screen md': fontStyles['pre/56/bold'],
      '@screen lg': fontStyles['pre/64/bold'],
    },
    '.font-pre-display-03': {
      ...fontStyles['pre/32/bold'],
      '@screen sm': fontStyles['pre/32/bold'],
      '@screen md': fontStyles['pre/40/bold'],
      '@screen lg': fontStyles['pre/48/bold'],
    },
    '.font-pre-heading-01': {
      ...fontStyles['pre/24/bold'],
      '@screen sm': fontStyles['pre/24/bold'],
      '@screen md': fontStyles['pre/28/bold'],
      '@screen lg': fontStyles['pre/32/bold'],
    },
    '.font-pre-heading-02': {
      ...fontStyles['pre/20/bold'],
      '@screen sm': fontStyles['pre/20/bold'],
      '@screen md': fontStyles['pre/24/bold'],
      '@screen lg': fontStyles['pre/24/bold'],
    },
    '.font-pre-heading-03': {
      ...fontStyles['pre/18/semibold'],
      '@screen sm': fontStyles['pre/18/semibold'],
      '@screen md': fontStyles['pre/20/semibold'],
      '@screen lg': fontStyles['pre/20/semibold'],
    },
    '.font-pre-body-01': {
      ...fontStyles['pre/16/semibold'],
      '@screen sm': fontStyles['pre/16/semibold'],
      '@screen md': fontStyles['pre/16/semibold'],
      '@screen lg': fontStyles['pre/16/semibold'],
    },
    '.font-pre-body-02': {
      ...fontStyles['pre/16/regular'],
      '@screen sm': fontStyles['pre/16/regular'],
      '@screen md': fontStyles['pre/16/regular'],
      '@screen lg': fontStyles['pre/16/regular'],
    },
    '.font-pre-body-03': {
      ...fontStyles['pre/14/semibold'],
      '@screen sm': fontStyles['pre/14/semibold'],
      '@screen md': fontStyles['pre/14/semibold'],
      '@screen lg': fontStyles['pre/14/semibold'],
    },
    '.font-pre-body-04': {
      ...fontStyles['pre/14/regular'],
      '@screen sm': fontStyles['pre/14/regular'],
      '@screen md': fontStyles['pre/14/regular'],
      '@screen lg': fontStyles['pre/14/regular'],
    },
    '.font-pre-caption-01': {
      ...fontStyles['pre/12/semibold'],
      '@screen sm': fontStyles['pre/12/semibold'],
      '@screen md': fontStyles['pre/12/semibold'],
      '@screen lg': fontStyles['pre/12/semibold'],
    },
    '.font-pre-caption-02': {
      ...fontStyles['pre/12/regular'],
      '@screen sm': fontStyles['pre/12/regular'],
      '@screen md': fontStyles['pre/12/regular'],
      '@screen lg': fontStyles['pre/12/regular'],
    },
    '.font-pre-caption-03': {
      ...fontStyles['pre/10/semibold'],
      '@screen sm': fontStyles['pre/10/semibold'],
      '@screen md': fontStyles['pre/10/semibold'],
      '@screen lg': fontStyles['pre/10/semibold'],
    },
    '.font-pre-caption-04': {
      ...fontStyles['pre/10/regular'],
      '@screen sm': fontStyles['pre/10/regular'],
      '@screen md': fontStyles['pre/10/regular'],
      '@screen lg': fontStyles['pre/10/regular'],
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
