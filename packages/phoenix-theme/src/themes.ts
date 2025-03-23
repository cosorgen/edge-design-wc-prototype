import {
  createLightTheme,
  createDarkTheme,
  createHighContrastTheme as FUIFCreateHighContrastTheme,
  // webLightTheme as FUIWebLightTheme,
  // webDarkTheme as FUIWebDarkTheme,
  type Theme as FUITheme,
} from '@fluentui/tokens';
import { brandVariants } from './brandVariants.js';
import {
  lightThemeMaterials,
  lightThemeSolidMaterials,
  darkThemeMaterials,
  darkThemeSolidMaterials,
  type PhoenixMaterialTokens,
} from './materials.js';
import {
  lightThemeColors,
  lightThemeSolidColors,
  lightThemeColorOverrides,
  darkThemeColors,
  darkThemeSolidColors,
  darkThemeColorOverrides,
  type PhoenixColorTokens,
} from './colors.js';
import {
  lightThemeShadows,
  darkThemeShadows,
  type PhoenixShadowTokens,
} from './shadows.js';
import {
  win11BorderRadius,
  win11BorderRadiusOverrides,
  win10BorderRadius,
  win10BorderRadiusOverrides,
  winNXTBorderRadius,
  winNXTBorderRadiusOverrides,
  macBorderRadius,
  macBorderRadiusOverrides,
  type PhoenixBorderRadiusTokens,
} from './borderRadius.js';
import {
  windowsFontFamilyOverrides,
  macFontFamilyOverrides,
} from './typography.js';
import {
  curveTokens,
  durationTokens,
  curveTokenOverrides,
  type PhoenixCurveTokens,
  type PhoenixDurationTokens,
} from './motion.js';
import {
  lightThemeUtilities,
  darkThemeUtilities,
  hcThemeUtilities,
  type PhoenixUtilityTokens,
} from './utilities.js';
import {
  type PhoenixSpacingTokens,
  phoenixSpacingTokens,
} from './spacingTokens.js';

export declare type Theme = FUITheme &
  PhoenixMaterialTokens &
  PhoenixColorTokens &
  PhoenixShadowTokens &
  PhoenixBorderRadiusTokens &
  PhoenixCurveTokens &
  PhoenixDurationTokens &
  PhoenixUtilityTokens &
  PhoenixSpacingTokens;

// Windows 11 with support for transparent materials
export const phoenixLightThemeWin11: Theme = {
  ...createLightTheme(brandVariants),
  ...lightThemeColorOverrides,
  ...windowsFontFamilyOverrides,
  ...win11BorderRadiusOverrides,
  ...curveTokenOverrides,
  ...lightThemeMaterials,
  ...lightThemeColors,
  ...lightThemeShadows,
  ...win11BorderRadius,
  ...curveTokens,
  ...durationTokens,
  ...lightThemeUtilities,
  ...phoenixSpacingTokens,
};

export const phoenixDarkThemeWin11: Theme = {
  ...createDarkTheme(brandVariants),
  ...darkThemeColorOverrides,
  ...windowsFontFamilyOverrides,
  ...win11BorderRadiusOverrides,
  ...curveTokenOverrides,
  ...darkThemeMaterials,
  ...darkThemeColors,
  ...darkThemeShadows,
  ...win11BorderRadius,
  ...curveTokens,
  ...durationTokens,
  ...darkThemeUtilities,
  ...phoenixSpacingTokens,
};

// Windows 11 **without** support for transparent materials
export const phoenixLightThemeSolidWin11: Theme = {
  ...createLightTheme(brandVariants),
  ...lightThemeColorOverrides,
  ...windowsFontFamilyOverrides,
  ...win11BorderRadiusOverrides,
  ...curveTokenOverrides,
  ...lightThemeSolidMaterials,
  ...lightThemeColors,
  ...lightThemeSolidColors,
  ...lightThemeShadows,
  ...win11BorderRadius,
  ...curveTokens,
  ...durationTokens,
  ...lightThemeUtilities,
  ...phoenixSpacingTokens,
};

export const phoenixDarkThemeSolidWin11: Theme = {
  ...createDarkTheme(brandVariants),
  ...darkThemeColorOverrides,
  ...windowsFontFamilyOverrides,
  ...win11BorderRadiusOverrides,
  ...curveTokenOverrides,
  ...darkThemeSolidMaterials,
  ...darkThemeColors,
  ...darkThemeSolidColors,
  ...darkThemeShadows,
  ...win11BorderRadius,
  ...curveTokens,
  ...durationTokens,
  ...darkThemeUtilities,
  ...phoenixSpacingTokens,
};

// Windows NXT with support for transparent materials
export const phoenixLightThemeWinNXT: Theme = {
  ...createLightTheme(brandVariants),
  ...lightThemeColorOverrides,
  ...windowsFontFamilyOverrides,
  ...winNXTBorderRadiusOverrides,
  ...curveTokenOverrides,
  ...lightThemeMaterials,
  ...lightThemeColors,
  ...lightThemeShadows,
  ...winNXTBorderRadius,
  ...curveTokens,
  ...durationTokens,
  ...lightThemeUtilities,
  ...phoenixSpacingTokens,
};

export const phoenixDarkThemeWinNXT: Theme = {
  ...createDarkTheme(brandVariants),
  ...darkThemeColorOverrides,
  ...windowsFontFamilyOverrides,
  ...winNXTBorderRadiusOverrides,
  ...curveTokenOverrides,
  ...darkThemeMaterials,
  ...darkThemeColors,
  ...darkThemeShadows,
  ...winNXTBorderRadius,
  ...curveTokens,
  ...durationTokens,
  ...darkThemeUtilities,
  ...phoenixSpacingTokens,
};

// Windows NXT **without** support for transparent materials
export const phoenixLightThemeSolidWinNXT: Theme = {
  ...createLightTheme(brandVariants),
  ...lightThemeColorOverrides,
  ...windowsFontFamilyOverrides,
  ...winNXTBorderRadiusOverrides,
  ...curveTokenOverrides,
  ...lightThemeSolidMaterials,
  ...lightThemeColors,
  ...lightThemeSolidColors,
  ...lightThemeShadows,
  ...winNXTBorderRadius,
  ...curveTokens,
  ...durationTokens,
  ...lightThemeUtilities,
  ...phoenixSpacingTokens,
};

export const phoenixDarkThemeSolidWinNXT: Theme = {
  ...createDarkTheme(brandVariants),
  ...darkThemeColorOverrides,
  ...windowsFontFamilyOverrides,
  ...winNXTBorderRadiusOverrides,
  ...curveTokenOverrides,
  ...darkThemeSolidMaterials,
  ...darkThemeColors,
  ...darkThemeSolidColors,
  ...darkThemeShadows,
  ...winNXTBorderRadius,
  ...curveTokens,
  ...durationTokens,
  ...darkThemeUtilities,
  ...phoenixSpacingTokens,
};

// Windows 10 **without** support for transparent materials
export const phoenixLightThemeSolidWin10: Theme = {
  ...createLightTheme(brandVariants),
  ...lightThemeColorOverrides,
  ...windowsFontFamilyOverrides,
  ...win10BorderRadiusOverrides,
  ...curveTokenOverrides,
  ...lightThemeSolidMaterials,
  ...lightThemeColors,
  ...lightThemeSolidColors,
  ...lightThemeShadows,
  ...win10BorderRadius,
  ...curveTokens,
  ...durationTokens,
  ...lightThemeUtilities,
  ...phoenixSpacingTokens,
};

export const phoenixDarkThemeSolidWin10: Theme = {
  ...createDarkTheme(brandVariants),
  ...darkThemeColorOverrides,
  ...windowsFontFamilyOverrides,
  ...win10BorderRadiusOverrides,
  ...curveTokenOverrides,
  ...darkThemeSolidMaterials,
  ...darkThemeColors,
  ...darkThemeSolidColors,
  ...darkThemeShadows,
  ...win10BorderRadius,
  ...curveTokens,
  ...durationTokens,
  ...darkThemeUtilities,
  ...phoenixSpacingTokens,
};

// Mac with support for transparent materials
export const phoenixLightThemeMac: Theme = {
  ...createLightTheme(brandVariants),
  ...lightThemeColorOverrides,
  ...macFontFamilyOverrides,
  ...macBorderRadiusOverrides,
  ...curveTokenOverrides,
  ...lightThemeMaterials,
  ...lightThemeColors,
  ...lightThemeShadows,
  ...macBorderRadius,
  ...curveTokens,
  ...durationTokens,
  ...lightThemeUtilities,
  ...phoenixSpacingTokens,
};

export const phoenixDarkThemeMac: Theme = {
  ...createDarkTheme(brandVariants),
  ...darkThemeColorOverrides,
  ...macFontFamilyOverrides,
  ...macBorderRadiusOverrides,
  ...curveTokenOverrides,
  ...darkThemeMaterials,
  ...darkThemeColors,
  ...darkThemeShadows,
  ...macBorderRadius,
  ...curveTokens,
  ...durationTokens,
  ...darkThemeUtilities,
  ...phoenixSpacingTokens,
};

// Mac **without** support for transparent materials
export const phoenixLightThemeSolidMac: Theme = {
  ...createLightTheme(brandVariants),
  ...lightThemeColorOverrides,
  ...macFontFamilyOverrides,
  ...macBorderRadiusOverrides,
  ...curveTokenOverrides,
  ...lightThemeSolidMaterials,
  ...lightThemeColors,
  ...lightThemeSolidColors,
  ...lightThemeShadows,
  ...macBorderRadius,
  ...curveTokens,
  ...durationTokens,
  ...lightThemeUtilities,
  ...phoenixSpacingTokens,
};

export const phoenixDarkThemeSolidMac: Theme = {
  ...createDarkTheme(brandVariants),
  ...darkThemeColorOverrides,
  ...macFontFamilyOverrides,
  ...macBorderRadiusOverrides,
  ...curveTokenOverrides,
  ...darkThemeSolidMaterials,
  ...darkThemeColors,
  ...darkThemeSolidColors,
  ...darkThemeShadows,
  ...macBorderRadius,
  ...curveTokens,
  ...durationTokens,
  ...darkThemeUtilities,
  ...phoenixSpacingTokens,
};

// Export the defaults to match the Fluent UI defaults
export const webLightTheme: Theme = phoenixLightThemeWin11;
export const webDarkTheme: Theme = phoenixDarkThemeWin11;

export function createHighContrastTheme(): Theme {
  return {
    ...FUIFCreateHighContrastTheme(),
    ...darkThemeSolidMaterials,
    ...darkThemeColors,
    ...darkThemeSolidColors,
    ...darkThemeShadows,
    ...win10BorderRadius,
    ...curveTokens,
    ...durationTokens,
    ...hcThemeUtilities,
    ...phoenixSpacingTokens,
  };
}
