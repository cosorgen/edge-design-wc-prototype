import { type FontFamilyTokens } from '@fluentui/tokens';

export { typographyStyles } from '@fluentui/tokens';

export const windowsFontFamilyOverrides: Partial<FontFamilyTokens> = {
  fontFamilyBase:
    '"Segoe UI Variable Display", "Segoe UI", "Segoe UI Web (West European)", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif',
};

export const macFontFamilyOverrides: Partial<FontFamilyTokens> = {
  fontFamilyBase:
    'SF Pro Text, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif',
};
