import {
  createLightTheme,
  createDarkTheme,
  createHighContrastTheme as FUIFCreateHighContrastTheme,
  type Theme as FUITheme,
} from '@fluentui/tokens';
import { brandWeb } from './brandVariants.js';
import {
  lightThemeMaterialTokens,
  lightThemeSolidMaterialTokens,
  darkThemeMaterialTokens,
  darkThemeSolidMaterialTokens,
  type WindowsMaterialTokens,
} from './materials.js';
import {
  lightThemeColorTokens,
  lightThemeSolidColorTokens,
  lightThemeColorTokenOverrides,
  darkThemeColorTokens,
  darkThemeSolidColorTokens,
  darkThemeColorTokenOverrides,
  type WindowsColorTokens,
} from './colors.js';
import {
  lightThemeShadowTokens,
  darkThemeShadowTokens,
  type WindowsShadowTokens,
} from './shadows.js';
import {
  borderRadiusTokens,
  borderRadiusTokenOverrides,
  type WindowsBorderRadiusTokens,
} from './borderRadius.js';
import { fontFamilyTokenOverrides } from './typography.js';
import {
  lightThemeUtilityTokens,
  darkThemeUtilityTokens,
  hcThemeUtilityTokens,
  type WindowsUtilityTokens,
} from './utilities.js';

export declare type Theme = FUITheme &
  WindowsMaterialTokens &
  WindowsColorTokens &
  WindowsShadowTokens &
  WindowsBorderRadiusTokens &
  WindowsUtilityTokens;

export const windowsLightTheme: Theme = {
  ...createLightTheme(brandWeb),
  ...lightThemeColorTokenOverrides,
  ...fontFamilyTokenOverrides,
  ...borderRadiusTokenOverrides,
  ...lightThemeMaterialTokens,
  ...lightThemeColorTokens,
  ...lightThemeShadowTokens,
  ...borderRadiusTokens,
  ...lightThemeUtilityTokens,
};

export const windowsDarkTheme: Theme = {
  ...createDarkTheme(brandWeb),
  ...darkThemeColorTokenOverrides,
  ...fontFamilyTokenOverrides,
  ...borderRadiusTokenOverrides,
  ...darkThemeMaterialTokens,
  ...darkThemeColorTokens,
  ...darkThemeShadowTokens,
  ...borderRadiusTokens,
  ...darkThemeUtilityTokens,
};

export const windowsLightThemeSolid: Theme = {
  ...createLightTheme(brandWeb),
  ...lightThemeColorTokenOverrides,
  ...fontFamilyTokenOverrides,
  ...borderRadiusTokenOverrides,
  ...lightThemeSolidMaterialTokens,
  ...lightThemeColorTokens,
  ...lightThemeSolidColorTokens,
  ...lightThemeShadowTokens,
  ...borderRadiusTokens,
  ...lightThemeUtilityTokens,
};

export const windowsDarkThemeSolid: Theme = {
  ...createDarkTheme(brandWeb),
  ...darkThemeColorTokenOverrides,
  ...fontFamilyTokenOverrides,
  ...borderRadiusTokenOverrides,
  ...darkThemeSolidMaterialTokens,
  ...darkThemeColorTokens,
  ...darkThemeSolidColorTokens,
  ...darkThemeShadowTokens,
  ...borderRadiusTokens,
  ...darkThemeUtilityTokens,
};

// Export the defaults to match the Fluent UI defaults
export const webLightTheme: Theme = windowsLightTheme;
export const webDarkTheme: Theme = windowsDarkTheme;

export function createHighContrastTheme(): Theme {
  return {
    ...FUIFCreateHighContrastTheme(),
    ...darkThemeSolidMaterialTokens,
    ...darkThemeColorTokens,
    ...darkThemeSolidColorTokens,
    ...darkThemeShadowTokens,
    ...borderRadiusTokens,
    ...hcThemeUtilityTokens,
  };
}
