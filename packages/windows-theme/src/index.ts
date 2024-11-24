// Types
export type { PhoenixBorderRadiusTokens } from './borderRadius.js';
export type { PhoenixColorTokens } from './colors.js';
export type { PhoenixMaterialTokens } from './materials.js';
export type { PhoenixShadowTokens } from './shadows.js';
export type {
  FontSizeTokens,
  LineHeightTokens,
  BorderRadiusTokens,
  StrokeWidthTokens,
  HorizontalSpacingTokens,
  VerticalSpacingTokens,
  DurationTokens,
  CurveTokens,
  ShadowTokens,
  ShadowBrandTokens,
  FontFamilyTokens,
  FontWeightTokens,
  ColorPaletteTokens,
  // ColorStatusTokens, not exported from Fluent for some reason
  ColorTokens,
} from './tokens.js';
export {
  type PhoenixCurveTokens,
  type PhoenixDurationTokens,
} from './motion.js';
export type { PhoenixUtilityTokens } from './utilities.js';
export type { Theme } from './themes.js';

// Values
export {
  win10BorderRadius,
  win10BorderRadiusOverrides,
  win11BorderRadius,
  win11BorderRadiusOverrides,
  winNXTBorderRadius,
  winNXTBorderRadiusOverrides,
  macBorderRadius,
  macBorderRadiusOverrides,
} from './borderRadius.js';

export {
  darkThemeColorOverrides,
  lightThemeColorOverrides,
  darkThemeColors,
  lightThemeColors,
  lightThemeSolidColors,
  darkThemeSolidColors,
} from './colors.js';

export {
  lightThemeMaterials,
  lightThemeSolidMaterials,
  darkThemeMaterials,
  darkThemeSolidMaterials,
} from './materials.js';

export { darkThemeShadows, lightThemeShadows } from './shadows.js';

export { tokens } from './tokens.js';

export { durationTokens, curveTokens, curveTokenOverrides } from './motion.js';

export {
  lightThemeUtilities,
  darkThemeUtilities,
  hcThemeUtilities,
} from './utilities.js';

export {
  typographyStyles,
  macFontFamilyOverrides,
  windowsFontFamilyOverrides,
} from './typography.js';

export { brandVariants } from './brandVariants.js';

export {
  phoenixDarkThemeMac,
  phoenixDarkThemeSolidMac,
  phoenixDarkThemeSolidWin10,
  phoenixDarkThemeSolidWin11,
  phoenixDarkThemeSolidWinNXT,
  phoenixDarkThemeWin11,
  phoenixDarkThemeWinNXT,
  phoenixLightThemeMac,
  phoenixLightThemeSolidMac,
  phoenixLightThemeSolidWin10,
  phoenixLightThemeSolidWin11,
  phoenixLightThemeSolidWinNXT,
  phoenixLightThemeWin11,
  phoenixLightThemeWinNXT,
  webDarkTheme,
  webLightTheme,
  createHighContrastTheme,
} from './themes.js';
