import { Theme } from '@fluentui/tokens';
import { kumoLightTheme } from './themes.js';
import { kumoBorderRadius } from './borderRadius.js';
import { kumoLightThemeColors } from './colors.js';
import { kumoCurveTokens, kumoDurationTokens } from './motion.js';
import { kumoSpacingTokens } from './spacingTokens.js';
import { kumoTypographyTokens } from './typography.js';

// Types
export {
  type FontSizeTokens,
  type LineHeightTokens,
  type BorderRadiusTokens,
  type StrokeWidthTokens,
  type HorizontalSpacingTokens,
  type VerticalSpacingTokens,
  type DurationTokens,
  type CurveTokens,
  type ShadowTokens,
  type ShadowBrandTokens,
  type FontFamilyTokens,
  type FontWeightTokens,
  type ColorPaletteTokens,
  // type ColorStatusTokens, not exported for some reason
  type ColorTokens,
} from '@fluentui/tokens';

export const kumoTokens = [
  ...Object.keys(kumoBorderRadius),
  ...Object.keys(kumoLightThemeColors),
  ...Object.keys(kumoDurationTokens),
  ...Object.keys(kumoCurveTokens),
  ...Object.keys(kumoSpacingTokens),
  ...Object.keys(kumoTypographyTokens),
];

// Huge tokens object
export const tokens = themeToTokensObject(kumoLightTheme);
