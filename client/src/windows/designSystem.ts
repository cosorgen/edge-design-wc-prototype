import {
  Theme,
  phoenixDarkThemeSolidWin11,
  phoenixDarkThemeWin11,
  phoenixLightThemeSolidWin11,
  phoenixLightThemeWin11,
} from '@mai-ui/phoenix-theme';

export type WindowsTokens = {
  colorShellFillTaksbarItemPrimary: string;
  colorShellFillTaksbarItemSecondary: string;
  colorShellFillTaksbarItemTeritary: string;
  colorShellStrokeTaskbarItemQuinary: string;
  colorShellStrokeTaskbarItemSecondary: string;
  colorShellFillTaskbarItemIndicator: string;
  colorFillAccent: string;
  micaBackdropFilter?: string;
  micaBackgroundBlendMode?: string;
  micaBackgroundColor?: string;
  desktopBackground?: string;
  colorShellFillCaptionControlPrimaryHover: string;
  colorShellFillCaptionControlPrimaryPressed: string;
  colorShellForegroundCaptionControlPrimaryHover: string;
  colorShellForegroundCaptionControlPrimaryPressed: string;
};

export type WindowsTheme = Theme & WindowsTokens;

const commonThemeOverrides: Partial<WindowsTheme> = {
  borderRadiusSmall: '4px',
  borderRadiusMedium: '8px',
  borderRadiusLarge: '16px',
};

const windowsLightTheme: WindowsTheme = {
  ...phoenixLightThemeWin11,
  ...commonThemeOverrides,
  colorShellFillTaksbarItemPrimary: '#FFFFFFB2',
  colorShellFillTaksbarItemSecondary: '#FFFFFF80',
  colorShellFillTaksbarItemTeritary: '#FFFFFF4D',
  colorShellStrokeTaskbarItemSecondary: '#0000000f',
  colorShellStrokeTaskbarItemQuinary: '#00000005',
  colorShellFillTaskbarItemIndicator: '#00000070',
  colorFillAccent: '#005FB8',
  desktopBackground: 'url(img/windows/desktopLight.jpg)',
  colorShellFillCaptionControlPrimaryHover: '#C42B1C',
  colorShellFillCaptionControlPrimaryPressed: '#C42B1CE5',
  colorShellForegroundCaptionControlPrimaryHover: '#FFFFFF',
  colorShellForegroundCaptionControlPrimaryPressed: '#FFFFFFB2',
};

const windowsLightThemeSolid: WindowsTheme = {
  ...phoenixLightThemeSolidWin11,
  ...commonThemeOverrides,
  colorShellFillTaksbarItemPrimary: '#FFFFFFB2',
  colorShellFillTaksbarItemSecondary: '#FFFFFF80',
  colorShellFillTaksbarItemTeritary: '#FFFFFF4D',
  colorShellStrokeTaskbarItemSecondary: '#0000000f',
  colorShellStrokeTaskbarItemQuinary: '#00000005',
  colorShellFillTaskbarItemIndicator: '#00000070',
  colorFillAccent: '#005FB8',
  desktopBackground: 'url(img/windows/desktopLight.jpg)',
  colorShellFillCaptionControlPrimaryHover: '#C42B1C',
  colorShellFillCaptionControlPrimaryPressed: '#C42B1CE5',
  colorShellForegroundCaptionControlPrimaryHover: '#FFFFFF',
  colorShellForegroundCaptionControlPrimaryPressed: '#FFFFFFB2',
};

const windowsDarkTheme: WindowsTheme = {
  ...phoenixDarkThemeWin11,
  ...commonThemeOverrides,
  colorShellFillTaksbarItemPrimary: '#FFFFFF15',
  colorShellFillTaksbarItemSecondary: '#FFFFFF0F',
  colorShellFillTaksbarItemTeritary: '#FFFFFF0B',
  colorShellStrokeTaskbarItemSecondary: '#FFFFFF1A',
  colorShellStrokeTaskbarItemQuinary: '#FFFFFF0F',
  colorShellFillTaskbarItemIndicator: '#FFFFFF63',
  colorFillAccent: '#005FB8',
  desktopBackground: 'url(img/windows/desktopDark.jpg)',
  colorShellFillCaptionControlPrimaryHover: '#C42B1C',
  colorShellFillCaptionControlPrimaryPressed: '#C42B1CE5',
  colorShellForegroundCaptionControlPrimaryHover: '#FFFFFF',
  colorShellForegroundCaptionControlPrimaryPressed: '#FFFFFFB2',
};

const windowsDarkThemeSolid: WindowsTheme = {
  ...phoenixDarkThemeSolidWin11,
  ...commonThemeOverrides,
  colorShellFillTaksbarItemPrimary: '#FFFFFF15',
  colorShellFillTaksbarItemSecondary: '#FFFFFF0F',
  colorShellFillTaksbarItemTeritary: '#FFFFFF0B',
  colorShellStrokeTaskbarItemSecondary: '#FFFFFF1A',
  colorShellStrokeTaskbarItemQuinary: '#FFFFFF0F',
  colorShellFillTaskbarItemIndicator: '#FFFFFF63',
  colorFillAccent: '#005FB8',
  desktopBackground: 'url(img/windows/desktopDark.jpg)',
  colorShellFillCaptionControlPrimaryHover: '#C42B1C',
  colorShellFillCaptionControlPrimaryPressed: '#C42B1CE5',
  colorShellForegroundCaptionControlPrimaryHover: '#FFFFFF',
  colorShellForegroundCaptionControlPrimaryPressed: '#FFFFFFB2',
};

export const colorShellFillTaksbarItemPrimary =
  'var(--colorShellFillTaksbarItemPrimary)';
export const colorShellFillTaksbarItemSecondary =
  'var(--colorShellFillTaksbarItemSecondary)';
export const colorShellFillTaksbarItemTeritary =
  'var(--colorShellFillTaksbarItemTeritary)';
export const colorShellStrokeTaskbarItemQuinary =
  'var(--colorShellStrokeTaskbarItemQuinary)';
export const colorShellStrokeTaskbarItemSecondary =
  'var(--colorShellStrokeTaskbarItemSecondary)';
export const colorShellFillTaskbarItemIndicator =
  'var(--colorShellFillTaskbarItemIndicator)';
export const colorFillAccent = 'var(--colorFillAccent)';
export const desktopBackground = 'var(--desktopBackground)';
export const colorShellFillCaptionControlPrimaryHover =
  'var(--colorShellFillCaptionControlPrimaryHover)';
export const colorShellFillCaptionControlPrimaryPressed =
  'var(--colorShellFillCaptionControlPrimaryPressed)';
export const colorShellForegroundCaptionControlPrimaryHover =
  'var(--colorShellForegroundCaptionControlPrimaryHover)';
export const colorShellForegroundCaptionControlPrimaryPressed =
  'var(--colorShellForegroundCaptionControlPrimaryPressed)';
