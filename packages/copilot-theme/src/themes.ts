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
  copilotLightThemeColors,
  copilotDarkThemeColors,
  type PhoenixColorTokens,
  type CopilotColorTokens,
} from './colors.js';
import {
  lightThemeShadows,
  darkThemeShadows,
  type PhoenixShadowTokens,
} from './shadows.js';
import {
  copilotBorderRadius,
  phoenixBorderRadius,
  type PhoenixBorderRadiusTokens,
  type CopilotBorderRadiusTokens,
} from './borderRadius.js';
import {
  fontFamilyOverrides,
  type CopilotTypographyTokens,
  copilotTypographyTokens,
} from './typography.js';
import {
  curveTokens,
  durationTokens,
  curveTokenOverrides,
  copilotCurveTokens,
  copilotDurationTokens,
  type PhoenixCurveTokens,
  type PhoenixDurationTokens,
  type CopilotCurveTokens,
  type CopilotDurationTokens,
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
  type CopilotSpacingTokens,
  copilotSpacingTokens,
} from './spacingTokens.js';

export declare type Theme = FUITheme &
  PhoenixMaterialTokens &
  PhoenixColorTokens &
  CopilotColorTokens &
  PhoenixShadowTokens &
  PhoenixBorderRadiusTokens &
  CopilotBorderRadiusTokens &
  PhoenixCurveTokens &
  CopilotCurveTokens &
  PhoenixDurationTokens &
  CopilotDurationTokens &
  PhoenixUtilityTokens &
  PhoenixSpacingTokens &
  CopilotSpacingTokens &
  CopilotTypographyTokens;

// Windows 11 with support for transparent materials
export const copilotLightTheme: Theme = {
  ...createLightTheme(edgeBrandVariants),
  ...lightThemeColorOverrides,
  ...fontFamilyOverrides,
  ...phoenixBorderRadius,
  ...copilotBorderRadius,
  ...curveTokenOverrides,
  ...lightThemeMaterials,
  ...lightThemeColors,
  ...copilotLightThemeColors,
  ...lightThemeShadows,
  ...curveTokens,
  ...copilotCurveTokens,
  ...durationTokens,
  ...copilotDurationTokens,
  ...lightThemeUtilities,
  ...phoenixSpacingTokens,
  ...copilotSpacingTokens,
  ...copilotTypographyTokens,
};

export const copilotDarkTheme: Theme = {
  ...createDarkTheme(edgeBrandVariants),
  ...darkThemeColorOverrides,
  ...fontFamilyOverrides,
  ...phoenixBorderRadius,
  ...copilotBorderRadius,
  ...curveTokenOverrides,
  ...darkThemeMaterials,
  ...darkThemeColors,
  ...copilotDarkThemeColors,
  ...darkThemeShadows,
  ...curveTokens,
  ...copilotCurveTokens,
  ...durationTokens,
  ...copilotDurationTokens,
  ...darkThemeUtilities,
  ...phoenixSpacingTokens,
  ...copilotSpacingTokens,
  ...copilotTypographyTokens,
};

// **without** support for transparent materials
export const copilotLightThemeSolid: Theme = {
  ...createLightTheme(edgeBrandVariants),
  ...lightThemeColorOverrides,
  ...fontFamilyOverrides,
  ...phoenixBorderRadius,
  ...copilotBorderRadius,
  ...curveTokenOverrides,
  ...lightThemeSolidMaterials,
  ...lightThemeColors,
  ...copilotLightThemeColors,
  ...lightThemeSolidColors,
  ...lightThemeShadows,
  ...curveTokens,
  ...copilotCurveTokens,
  ...durationTokens,
  ...copilotDurationTokens,
  ...lightThemeUtilities,
  ...phoenixSpacingTokens,
  ...copilotSpacingTokens,
  ...copilotTypographyTokens,
};

export const copilotDarkThemeSolid: Theme = {
  ...createDarkTheme(edgeBrandVariants),
  ...darkThemeColorOverrides,
  ...fontFamilyOverrides,
  ...phoenixBorderRadius,
  ...copilotBorderRadius,
  ...curveTokenOverrides,
  ...darkThemeSolidMaterials,
  ...darkThemeColors,
  ...copilotDarkThemeColors,
  ...darkThemeSolidColors,
  ...darkThemeShadows,
  ...curveTokens,
  ...copilotCurveTokens,
  ...durationTokens,
  ...copilotDurationTokens,
  ...darkThemeUtilities,
  ...phoenixSpacingTokens,
  ...copilotSpacingTokens,
  ...copilotTypographyTokens,
};

// Export the defaults to match the Fluent UI defaults
export const webLightTheme: Theme = copilotLightTheme;
export const webDarkTheme: Theme = copilotDarkTheme;

export function createHighContrastTheme(): Theme {
  return {
    ...FUIFCreateHighContrastTheme(),
    ...darkThemeSolidMaterials,
    ...darkThemeColors,
    ...copilotDarkThemeColors,
    ...darkThemeSolidColors,
    ...darkThemeShadows,
    ...phoenixBorderRadius,
    ...copilotBorderRadius,
    ...curveTokens,
    ...copilotCurveTokens,
    ...durationTokens,
    ...copilotDurationTokens,
    ...hcThemeUtilities,
    ...phoenixSpacingTokens,
    ...copilotSpacingTokens,
    ...copilotTypographyTokens,
  };
}
