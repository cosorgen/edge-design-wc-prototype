import { type FontFamilyTokens } from '@fluentui/tokens';

export const fontFamilyOverrides: Partial<FontFamilyTokens> = {
  fontFamilyBase:
    '"Segoe UI Variable Display", "Segoe UI", "Segoe UI Web (West European)", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif',
};

export type KumoTypographyTokens = {
  smtcTextControlButtonWeight: string;
  smtcTextRampBody2FontSize: string;
  smtcTextRampBody2LineHeight: string;
  smtcTextRampBody3FontSize: string;
  smtcTextRampBody3FontWeight: string;
  smtcTextRampBody3LineHeight: string;
  smtcTextRampCaption1FontSize: string;
  smtcTextRampCaption1FontWeight: string;
  smtcTextRampCaption1LineHeight: string;
  smtcTextStyleDefaultRegularFontFamily: string;
};

export const kumoTypographyTokens: KumoTypographyTokens = {
  smtcTextControlButtonWeight: '400',
  smtcTextRampBody2FontSize: '16px',
  smtcTextRampBody2LineHeight: '24px',
  smtcTextRampBody3FontSize: '18px',
  smtcTextRampBody3FontWeight: '400',
  smtcTextRampBody3LineHeight: '28px',
  smtcTextRampCaption1FontSize: '12px',
  smtcTextRampCaption1FontWeight: '400',
  smtcTextRampCaption1LineHeight: '16px',
  smtcTextStyleDefaultRegularFontFamily:
    '"Segoe UI Variable Display", "Segoe UI", "Segoe UI Web (West European)", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif',
};
