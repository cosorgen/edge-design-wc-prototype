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
  colorNeutralForeground1: '#33302E',
  colorNeutralCardBackground: '#fee5ce',
  colorBrandBackground: '#FFD2A7',
  colorBrandBackgroundHover: '#E3B388',
  colorBrandBackgroundPressed: '#FEE0C3',
};
export const copilotDarkTheme = {
  ...phoenixDarkThemeWin11,
  ...commonOverrides,
  backgroundGradient:
    '180deg, rgba(16, 21, 36, 0.8) 0%, rgba(16, 21, 36, 0.8) 80%, rgba(16, 21, 36, 0.8) 100%',
  colorNeutralForeground1: '#F2DDCC',
  colorNeutralCardBackground: '#333333',
  colorBrandBackground: '#455172',
  colorBrandBackgroundHover: '#505B7B',
  colorBrandBackgroundPressed: '#313A52',
};

export const backgroundGradient = 'var(--backgroundGradient)';
