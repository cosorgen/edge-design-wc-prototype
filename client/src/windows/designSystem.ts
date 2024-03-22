import { setTheme as PUISetTheme } from '@phoenixui/web-components';
import { Theme, webDarkTheme, webLightTheme } from '@phoenixui/themes';
import { OSTheme } from '../services/windowsService.js';

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
};

export type WindowsTheme = Theme & WindowsTokens;

const commonThemeOverrides: Partial<WindowsTheme> = {
  borderRadiusSmall: '4px',
  borderRadiusMedium: '8px',
  borderRadiusLarge: '16px',
  micaBackdropFilter: 'blur(120px) saturate(150%)',
  micaBackgroundBlendMode: 'luminosity',
};

const windowsLightTheme: WindowsTheme = {
  ...webLightTheme,
  ...commonThemeOverrides,
  colorShellFillTaksbarItemPrimary: '#FFFFFFB2',
  colorShellFillTaksbarItemSecondary: '#FFFFFF80',
  colorShellFillTaksbarItemTeritary: '#FFFFFF4D',
  colorShellStrokeTaskbarItemSecondary: '#0000000f',
  colorShellStrokeTaskbarItemQuinary: '#00000005',
  colorShellFillTaskbarItemIndicator: '#00000070',
  colorFillAccent: '#005FB8',
  micaBackgroundColor: 'rgba(243,243,243,0.7)',
};

const windowsDarkTheme: WindowsTheme = {
  ...webDarkTheme,
  ...commonThemeOverrides,
  colorShellFillTaksbarItemPrimary: '#FFFFFF15',
  colorShellFillTaksbarItemSecondary: '#FFFFFF0F',
  colorShellFillTaksbarItemTeritary: '#FFFFFF0B',
  colorShellStrokeTaskbarItemSecondary: '#FFFFFF1A',
  colorShellStrokeTaskbarItemQuinary: '#FFFFFF0F',
  colorShellFillTaskbarItemIndicator: '#FFFFFF63',
  colorFillAccent: '#005FB8',
  micaBackgroundColor: 'rgba(32,32,32,0.7)',
};

export function setTheme(theme: OSTheme) {
  PUISetTheme(theme === 'dark' ? windowsDarkTheme : windowsLightTheme);
}

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
export const micaBackdropFilter = 'var(--micaBackdropFilter)';
export const micaBackgroundBlendMode = 'var(--micaBackgroundBlendMode)';
export const micaBackgroundColor = 'var(--micaBackgroundColor)';
