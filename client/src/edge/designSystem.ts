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
  colorLayerOmniboxBackground: string;
  colorLayerOmniboxBackgroundHover: string;
};

export type EdgeTheme = Theme & NewTokens;

const spacingFrameFromURL =
  new URLSearchParams(window.location.search).get('frameSpacing') || '4px';

const commonThemeOverrides = {
  borderRadiusLayerApp: '12px',
  spacingFrame: spacingFrameFromURL,
};

export const edgeLightTheme: EdgeTheme = {
  ...phoenixLightThemeWin11,
  ...commonThemeOverrides,
  colorLayerBackgroundPillMenu: '#ffffff80',
  colorLayerBackgroundApp: '#dde2e8',
  colorLayerOmniboxBackground: '#F1F3F6',
  colorLayerOmniboxBackgroundHover: '#EBEEF1',
};

export const edgeLightThemeSolid: EdgeTheme = {
  ...phoenixLightThemeSolidWin11,
  ...commonThemeOverrides,
  colorLayerBackgroundPillMenu: '#ffffff80',
  colorLayerBackgroundApp: '#dde2e8',
  colorLayerOmniboxBackground: '#F1F3F6',
  colorLayerOmniboxBackgroundHover: '#EBEEF1',
};

export const edgeDarkTheme: EdgeTheme = {
  ...phoenixDarkThemeWin11,
  ...commonThemeOverrides,
  colorLayerBackgroundPillMenu: '#2C2C2C',
  colorLayerBackgroundApp: '#000',
  colorLayerOmniboxBackground: '#0E0E0E',
  colorLayerOmniboxBackgroundHover: '#000000',
};

export const edgeDarkThemeSolid: EdgeTheme = {
  ...phoenixDarkThemeSolidWin11,
  ...commonThemeOverrides,
  colorLayerBackgroundPillMenu: '#2C2C2C',
  colorLayerBackgroundApp: '#000',
  colorLayerOmniboxBackground: '#0E0E0E',
  colorLayerOmniboxBackgroundHover: '#000000',
};

export const colorLayerBackgroundPillMenu =
  'var(--colorLayerBackgroundPillMenu)';
export const spacingFrame = 'var(--spacingFrame)';
export const colorLayerOmniboxBackground = 'var(--colorLayerOmniboxBackground)';
export const colorLayerOmniboxBackgroundHover =
  'var(--colorLayerOmniboxBackgroundHover)';
