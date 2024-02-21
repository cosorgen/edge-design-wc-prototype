import { DesignToken } from '@microsoft/fast-foundation';
import { FASTElement } from '@microsoft/fast-element';
import { setThemeFor as FUISetThemeFor } from '@fluentui/web-components';
import {
  BorderRadiusTokens,
  Theme,
  webDarkTheme,
  webLightTheme,
} from '@phoenixui/themes';
import { OSTheme } from '../services/windowsService.js';

const commonThemeOverrides: Partial<BorderRadiusTokens> = {
  borderRadiusSmall: '4px',
  borderRadiusMedium: '8px',
  borderRadiusLarge: '16px',
};

const windowsLightTheme: Theme = {
  ...webLightTheme,
  ...commonThemeOverrides,
};

const windowsDarkTheme: Theme = {
  ...webDarkTheme,
  ...commonThemeOverrides,
};

export const micaBackgroundColor = DesignToken.create<string>(
  'micaBackgroundColor',
);
export const micaBackdropFilter =
  DesignToken.create<string>('micaBackdropFilter');
export const micaBackgroundBlendMode = DesignToken.create<string>(
  'micaBackgroundBlendMode',
);
export const colorShellFillTaksbarItemPrimary = DesignToken.create<string>(
  'colorShellFillTaksbarItemPrimary',
);
export const colorShellFillTaksbarItemSecondary = DesignToken.create<string>(
  'colorShellFillTaksbarItemSecondary',
);
export const colorShellFillTaksbarItemTeritary = DesignToken.create<string>(
  'colorShellFillTaksbarItemTeritary',
);
export const colorShellStrokeTaskbarItemQuinary = DesignToken.create<string>(
  'colorShellStrokeTaskbarItemPrimary',
);
export const colorShellStrokeTaskbarItemSecondary = DesignToken.create<string>(
  'colorShellStrokeTaskbarItemSecondary',
);
export const colorShellFillTaskbarItemIndicator = DesignToken.create<string>(
  'colorShellFillTaskbarItemIndicator',
);
export const colorFillAccent = DesignToken.create<string>('colorFillAccent');

export function setThemeFor(element: FASTElement, theme: OSTheme) {
  FUISetThemeFor(
    element,
    theme === 'dark' ? windowsDarkTheme : windowsLightTheme,
  );

  if (theme === 'dark') {
    micaBackgroundColor.setValueFor(element, 'rgba(32, 32, 32, 0.7)');
    micaBackdropFilter.setValueFor(element, 'blur(120px) saturate(150%)');
    micaBackgroundBlendMode.setValueFor(element, 'luminosity');
    colorShellFillTaksbarItemPrimary.setValueFor(element, '#FFFFFF15');
    colorShellFillTaksbarItemSecondary.setValueFor(element, '#FFFFFF0F');
    colorShellFillTaksbarItemTeritary.setValueFor(element, '#FFFFFF0B');
    colorShellStrokeTaskbarItemSecondary.setValueFor(element, '#FFFFFF1A');
    colorShellStrokeTaskbarItemQuinary.setValueFor(element, '#FFFFFF0F');
    colorShellFillTaskbarItemIndicator.setValueFor(element, '#FFFFFF63');
    colorFillAccent.setValueFor(element, '#005FB8');
  } else {
    micaBackgroundColor.setValueFor(element, 'rgba(243, 243, 243, 0.7)');
    micaBackdropFilter.setValueFor(element, 'blur(120px) saturate(150%)');
    micaBackgroundBlendMode.setValueFor(element, 'luminosity');
    colorShellFillTaksbarItemPrimary.setValueFor(element, '#FFFFFFB2');
    colorShellFillTaksbarItemSecondary.setValueFor(element, '#FFFFFF80');
    colorShellFillTaksbarItemTeritary.setValueFor(element, '#FFFFFF4D');
    colorShellStrokeTaskbarItemSecondary.setValueFor(element, '#0000000f');
    colorShellStrokeTaskbarItemQuinary.setValueFor(element, '#00000005');
    colorShellFillTaskbarItemIndicator.setValueFor(element, '#00000070');
    colorFillAccent.setValueFor(element, '#005FB8');
  }
}
