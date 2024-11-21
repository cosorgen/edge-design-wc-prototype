import {
  webLightTheme,
  webDarkTheme,
  createHighContrastTheme as FUIFCreateHighContrastTheme,
  type Theme as FUITheme,
} from '@fluentui/tokens';
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
  darkThemeColors,
  darkThemeSolidColors,
  type PhoenixColorTokens,
} from './colors.js';
import {
  lightThemeShadows,
  darkThemeShadows,
  type PhoenixShadowTokens,
} from './shadows.js';
import {
  phoenixBorderRadius,
  type PhoenixBorderRadiusTokens,
} from './borderRadius.js';
import {
  curveTokens,
  durationTokens,
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
export const fluent2LightTheme: Theme = {
  ...webLightTheme,
  ...lightThemeMaterials,
  ...lightThemeColors,
  ...lightThemeShadows,
  ...phoenixBorderRadius,
  ...curveTokens,
  ...durationTokens,
  ...lightThemeUtilities,
  ...phoenixSpacingTokens,
};

export const fluent2DarkTheme: Theme = {
  ...webDarkTheme,
  ...darkThemeMaterials,
  ...darkThemeColors,
  ...darkThemeShadows,
  ...phoenixBorderRadius,
  ...curveTokens,
  ...durationTokens,
  ...darkThemeUtilities,
  ...phoenixSpacingTokens,
};

// **without** support for transparent materials
export const fluent2LightThemeSolid: Theme = {
  ...webLightTheme,
  ...lightThemeSolidMaterials,
  ...lightThemeColors,
  ...lightThemeSolidColors,
  ...lightThemeShadows,
  ...phoenixBorderRadius,
  ...curveTokens,
  ...durationTokens,
  ...lightThemeUtilities,
  ...phoenixSpacingTokens,
};

export const fluent2DarkThemeSolid: Theme = {
  ...webDarkTheme,
  ...darkThemeSolidMaterials,
  ...darkThemeColors,
  ...darkThemeSolidColors,
  ...darkThemeShadows,
  ...phoenixBorderRadius,
  ...curveTokens,
  ...durationTokens,
  ...darkThemeUtilities,
  ...phoenixSpacingTokens,
};

export function createHighContrastTheme(): Theme {
  return {
    ...FUIFCreateHighContrastTheme(),
    ...darkThemeSolidMaterials,
    ...darkThemeColors,
    ...darkThemeSolidColors,
    ...darkThemeShadows,
    ...phoenixBorderRadius,
    ...curveTokens,
    ...durationTokens,
    ...hcThemeUtilities,
    ...phoenixSpacingTokens,
  };
}
