import {
  phoenixLightThemeWin11,
  phoenixDarkThemeWin11,
} from '@phoenixui/themes';

const commonOverrides = {
  fontFamilyBase: 'ABC Ginto Variable, sans-serif',
};

export const copilotLightTheme = {
  ...phoenixLightThemeWin11,
  ...commonOverrides,
  backgroundGradient:
    '180deg, #FCF9F6 0%, #FCF9F6 60%, #FBEBE0 99%, #FDE5CD 100%',
  colorNeutralForeground1: 'rgba(51, 48, 46, 1)',
  colorNeutralCardBackground: 'rgba(254, 229, 206, 1)',
  colorBrandBackground: '#FFD2A7',
  colorBrandBackgroundHover: '#E3B388',
  colorBrandBackgroundPressed: '#FEE0C3',
  colorLoadingSpinner: 'rgba(239, 183, 161, 1)',
};
export const copilotDarkTheme = {
  ...phoenixDarkThemeWin11,
  ...commonOverrides,
  backgroundGradient:
    '180deg, rgba(16, 21, 36, 0.8) 0%, rgba(16, 21, 36, 0.8) 80%, rgba(16, 21, 36, 0.8) 100%',
  colorNeutralForeground1: 'rgba(227, 203, 188, 1)',
  colorNeutralCardBackground: 'rgba(29, 36, 57, 1)',
  colorBrandBackground: '#455172',
  colorBrandBackgroundHover: '#505B7B',
  colorBrandBackgroundPressed: '#313A52',
  colorLoadingSpinner: 'rgba(75, 92, 146, 1)',
};

export const backgroundGradient = 'var(--backgroundGradient)';
export const colorLoadingSpinner = 'var(--colorLoadingSpinner)';
