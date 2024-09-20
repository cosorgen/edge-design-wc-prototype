import {
  Theme,
  phoenixDarkThemeWin11,
  phoenixLightThemeWin11,
  phoenixDarkThemeSolidWin11,
  phoenixLightThemeSolidWin11,
} from '@phoenixui/themes';

export type NewTokens = {
  colorLayerBackgroundPillMenu: string;
  spacingFrame: string;
};

export type EdgeTheme = Theme & NewTokens;

const commonThemeOverrides = {
  borderRadiusLayerApp: '12px',
  spacingFrame: '4px',
};

export const edgeLightTheme: EdgeTheme = {
  ...phoenixLightThemeWin11,
  ...commonThemeOverrides,
  colorLayerBackgroundPillMenu: '#ffffff80',
  colorLayerBackgroundApp: '#dde2e8',
};

export const edgeLightThemeSolid: EdgeTheme = {
  ...phoenixLightThemeSolidWin11,
  ...commonThemeOverrides,
  colorLayerBackgroundPillMenu: '#ffffff80',
  colorLayerBackgroundApp: '#dde2e8',
};

export const edgeDarkTheme: EdgeTheme = {
  ...phoenixDarkThemeWin11,
  ...commonThemeOverrides,
  colorLayerBackgroundPillMenu: '#ffffff80',
  colorLayerBackgroundApp: '#000',
};

export const edgeDarkThemeSolid: EdgeTheme = {
  ...phoenixDarkThemeSolidWin11,
  ...commonThemeOverrides,
  colorLayerBackgroundPillMenu: '#ffffff80',
  colorLayerBackgroundApp: '#000',
};

export const colorLayerBackgroundPillMenu =
  'var(--colorLayerBackgroundPillMenu)';
export const spacingFrame = 'var(--spacingFrame)';
