import {
  createLightTheme,
  createDarkTheme,
  createHighContrastTheme as FUIFCreateHighContrastTheme,
  type Theme as FUITheme,
} from '@fluentui/tokens';
import { edgeBrandVariants } from './brandVariants.js';
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
  kumoLightThemeColors,
  kumoDarkThemeColors,
  type PhoenixColorTokens,
  type KumoColorTokens,
} from './colors.js';
import {
  lightThemeShadows,
  darkThemeShadows,
  type PhoenixShadowTokens,
} from './shadows.js';
import {
  kumoBorderRadius,
  phoenixBorderRadius,
  type PhoenixBorderRadiusTokens,
  type KumoBorderRadiusTokens,
} from './borderRadius.js';
import {
  fontFamilyOverrides,
  type KumoTypographyTokens,
  kumoTypographyTokens,
} from './typography.js';
import {
  curveTokens,
  durationTokens,
  curveTokenOverrides,
  kumoCurveTokens,
  kumoDurationTokens,
  type PhoenixCurveTokens,
  type PhoenixDurationTokens,
  type KumoCurveTokens,
  type KumoDurationTokens,
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
  type KumoSpacingTokens,
  kumoSpacingTokens,
} from './spacingTokens.js';

export declare type Theme = FUITheme &
  PhoenixMaterialTokens &
  PhoenixColorTokens &
  KumoColorTokens &
  PhoenixShadowTokens &
  PhoenixBorderRadiusTokens &
  KumoBorderRadiusTokens &
  PhoenixCurveTokens &
  KumoCurveTokens &
  PhoenixDurationTokens &
  KumoDurationTokens &
  PhoenixUtilityTokens &
  PhoenixSpacingTokens &
  KumoSpacingTokens &
  KumoTypographyTokens;

// Windows 11 with support for transparent materials
export const kumoLightTheme: Theme = {
  ...createLightTheme(edgeBrandVariants),
  ...lightThemeColorOverrides,
  ...fontFamilyOverrides,
  ...phoenixBorderRadius,
  ...kumoBorderRadius,
  ...curveTokenOverrides,
  ...lightThemeMaterials,
  ...lightThemeColors,
  ...kumoLightThemeColors,
  ...lightThemeShadows,
  ...curveTokens,
  ...kumoCurveTokens,
  ...durationTokens,
  ...kumoDurationTokens,
  ...lightThemeUtilities,
  ...phoenixSpacingTokens,
  ...kumoSpacingTokens,
  ...kumoTypographyTokens,
};

export const kumoDarkTheme: Theme = {
  ...createDarkTheme(edgeBrandVariants),
  ...darkThemeColorOverrides,
  ...fontFamilyOverrides,
  ...phoenixBorderRadius,
  ...kumoBorderRadius,
  ...curveTokenOverrides,
  ...darkThemeMaterials,
  ...darkThemeColors,
  ...kumoDarkThemeColors,
  ...darkThemeShadows,
  ...curveTokens,
  ...kumoCurveTokens,
  ...durationTokens,
  ...kumoDurationTokens,
  ...darkThemeUtilities,
  ...phoenixSpacingTokens,
  ...kumoSpacingTokens,
  ...kumoTypographyTokens,
};

// **without** support for transparent materials
export const kumoLightThemeSolid: Theme = {
  ...createLightTheme(edgeBrandVariants),
  ...lightThemeColorOverrides,
  ...fontFamilyOverrides,
  ...phoenixBorderRadius,
  ...kumoBorderRadius,
  ...curveTokenOverrides,
  ...lightThemeSolidMaterials,
  ...lightThemeColors,
  ...kumoLightThemeColors,
  ...lightThemeSolidColors,
  ...lightThemeShadows,
  ...curveTokens,
  ...kumoCurveTokens,
  ...durationTokens,
  ...kumoDurationTokens,
  ...lightThemeUtilities,
  ...phoenixSpacingTokens,
  ...kumoSpacingTokens,
  ...kumoTypographyTokens,
};

export const kumoDarkThemeSolid: Theme = {
  ...createDarkTheme(edgeBrandVariants),
  ...darkThemeColorOverrides,
  ...fontFamilyOverrides,
  ...phoenixBorderRadius,
  ...kumoBorderRadius,
  ...curveTokenOverrides,
  ...darkThemeSolidMaterials,
  ...darkThemeColors,
  ...kumoDarkThemeColors,
  ...darkThemeSolidColors,
  ...darkThemeShadows,
  ...curveTokens,
  ...kumoCurveTokens,
  ...durationTokens,
  ...kumoDurationTokens,
  ...darkThemeUtilities,
  ...phoenixSpacingTokens,
  ...kumoSpacingTokens,
  ...kumoTypographyTokens,
};

// Export the defaults to match the Fluent UI defaults
export const webLightTheme: Theme = kumoLightTheme;
export const webDarkTheme: Theme = kumoDarkTheme;

export function createHighContrastTheme(): Theme {
  return {
    ...FUIFCreateHighContrastTheme(),
    ...darkThemeSolidMaterials,
    ...darkThemeColors,
    ...kumoDarkThemeColors,
    ...darkThemeSolidColors,
    ...darkThemeShadows,
    ...phoenixBorderRadius,
    ...kumoBorderRadius,
    ...curveTokens,
    ...kumoCurveTokens,
    ...durationTokens,
    ...kumoDurationTokens,
    ...hcThemeUtilities,
    ...phoenixSpacingTokens,
    ...kumoSpacingTokens,
    ...kumoTypographyTokens,
  };
}
