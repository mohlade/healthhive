export const HH = {
  bg:         '#F3F4EE',
  surface:    '#FFFFFF',
  surfaceAlt: '#ECEEE4',
  ink:        '#0D1414',
  inkSoft:    '#2B3535',
  inkMuted:   '#6F7A78',
  line:       'rgba(13,20,20,0.08)',
  lineStrong: 'rgba(13,20,20,0.12)',

  accent:      '#D7FF3A',
  accentCoral: '#FF7A59',
  accentSky:   '#8BE0FF',
  accentPink:  '#FFB8DB',
  danger:      '#FF4D4D',
  warning:     '#FF8A3D',
  success:     '#1FB573',
  bolt:        '#34D186',

  rSm: 12, rMd: 18, rLg: 24, rXl: 28, rPill: 100,

  s1: 4, s2: 8, s3: 12, s4: 16, s5: 20, s6: 24, s8: 32,
} as const;

export const HHFonts = {
  display: 'InstrumentSerif_400Regular',
  displayItalic: 'InstrumentSerif_400Regular_Italic',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemibold: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
  mono: 'JetBrainsMono_400Regular',
} as const;

export const HHType = {
  smallCaps: {
    fontFamily: HHFonts.bodySemibold,
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
  },
} as const;
