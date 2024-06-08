import { setTheme as PUISetTheme } from '@phoenixui/web-components';
import {
  Theme,
  phoenixDarkThemeWin11,
  phoenixLightThemeWin11,
} from '@phoenixui/themes';
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
  micaBackdropFilter: 'blur(120px) saturate(150%)',
  micaBackgroundBlendMode: 'luminosity',
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
  micaBackgroundColor: 'rgba(243,243,243,0.7)',
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
  micaBackgroundColor: 'rgba(32,32,32,0.7)',
  desktopBackground: 'url(img/windows/desktopDark.jpg)',
  colorShellFillCaptionControlPrimaryHover: '#C42B1C',
  colorShellFillCaptionControlPrimaryPressed: '#C42B1CE5',
  colorShellForegroundCaptionControlPrimaryHover: '#FFFFFF',
  colorShellForegroundCaptionControlPrimaryPressed: '#FFFFFFB2',
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
export const desktopBackground = 'var(--desktopBackground)';
export const colorShellFillCaptionControlPrimaryHover =
  'var(--colorShellFillCaptionControlPrimaryHover)';
export const colorShellFillCaptionControlPrimaryPressed =
  'var(--colorShellFillCaptionControlPrimaryPressed)';
export const colorShellForegroundCaptionControlPrimaryHover =
  'var(--colorShellForegroundCaptionControlPrimaryHover)';
export const colorShellForegroundCaptionControlPrimaryPressed =
  'var(--colorShellForegroundCaptionControlPrimaryPressed)';
