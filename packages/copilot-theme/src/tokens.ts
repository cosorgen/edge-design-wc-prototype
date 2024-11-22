import { copilotLightTheme, Theme } from './themes.js';
import { copilotBorderRadius } from './borderRadius.js';
import { copilotLightThemeColors } from './colors.js';
import { copilotCurveTokens, copilotDurationTokens } from './motion.js';
import { copilotSpacingTokens } from './spacingTokens.js';
import { copilotTypographyTokens } from './typography.js';

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

export const copilotTokens = [
  ...Object.keys(copilotBorderRadius),
  ...Object.keys(copilotLightThemeColors),
  ...Object.keys(copilotDurationTokens),
  ...Object.keys(copilotCurveTokens),
  ...Object.keys(copilotSpacingTokens),
  ...Object.keys(copilotTypographyTokens),
];

export function camelCaseToKebabCase(str: string) {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

export function themeToTokensObject(theme: Theme) {
  const tokens: Record<string, string> = {};
  const keys = Object.keys(theme);
  for (const key of keys) {
    if (copilotTokens.includes(key)) {
      tokens[key] = `var(--smtc-${camelCaseToKebabCase(key)})`;
    } else {
      tokens[key] = `var(--${String(key)})`;
    }
  }
  return tokens;
}

// Huge tokens object
export const tokens = themeToTokensObject(copilotLightTheme);
