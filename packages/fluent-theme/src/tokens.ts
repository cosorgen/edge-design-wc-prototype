import { themeToTokensObject } from '@mai-ui/design-tokens/utilities.js';
import { fluent2LightTheme } from './themes.js';

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

// Huge tokens object
export const tokens = themeToTokensObject(fluent2LightTheme);
