import {
  Theme,
  phoenixDarkThemeWin11,
  phoenixLightThemeWin11,
  phoenixDarkThemeSolidWin11,
  phoenixLightThemeSolidWin11,
} from '@phoenixui/themes';

export type NewTokens = {
  spacingFrame: string;
};

export type EdgeTheme = Theme & NewTokens;

const commonThemeOverrides = {
  spacingFrame: '4px',
};

export const edgeLightTheme: EdgeTheme = {
  ...phoenixLightThemeWin11,
  ...commonThemeOverrides,
};

export const edgeLightThemeSolid: EdgeTheme = {
  ...phoenixLightThemeSolidWin11,
  ...commonThemeOverrides,
};

export const edgeDarkTheme: EdgeTheme = {
  ...phoenixDarkThemeWin11,
  ...commonThemeOverrides,
};

export const edgeDarkThemeSolid: EdgeTheme = {
  ...phoenixDarkThemeSolidWin11,
  ...commonThemeOverrides,
};

export const spacingFrame = 'var(--spacingFrame)';
