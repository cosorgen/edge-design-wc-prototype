import { type FontFamilyTokens } from '@fluentui/tokens';

export { typographyStyles } from '@fluentui/tokens';

export const fontFamilyOverrides: Partial<FontFamilyTokens> = {
  fontFamilyBase:
    '"Segoe UI Variable Display", "Segoe UI", "Segoe UI Web (West European)", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif',
};

export type KumoTypographyTokens = {
  textControlButtonWeight: string;
  textRampBody2FontSize: string;
  textRampBody2LineHeight: string;
  textRampBody3FontSize: string;
  textRampBody3FontWeight: string;
  textRampBody3LineHeight: string;
  textRampCaption1FontSize: string;
  textRampCaption1FontWeight: string;
  textRampCaption1LineHeight: string;
  textStyleDefaultRegularFontFamily: string;
};

export const kumoTypographyTokens: KumoTypographyTokens = {
  textControlButtonWeight: '400',
  textRampBody2FontSize: '16px',
  textRampBody2LineHeight: '24px',
  textRampBody3FontSize: '18px',
  textRampBody3FontWeight: '400',
  textRampBody3LineHeight: '28px',
  textRampCaption1FontSize: '12px',
  textRampCaption1FontWeight: '400',
  textRampCaption1LineHeight: '16px',
  textStyleDefaultRegularFontFamily:
    '"Segoe UI Variable Display", "Segoe UI", "Segoe UI Web (West European)", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif',
};
