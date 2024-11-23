import { type FontFamilyTokens } from '@fluentui/tokens';

export { typographyStyles } from '@fluentui/tokens';

export const fontFamilyOverrides: Partial<FontFamilyTokens> = {
  fontFamilyBase:
    '"Ginto", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
};

export type CopilotTypographyTokens = {
  textControlButtonWeight: string;
  textRampBody2FontSize: string;
  textRampBody2LineHeight: string;
  textRampBody3FontSize: string;
  textRampBody3FontWeight: string;
  textRampBody3LineHeight: string;
  textRampCaption1FontSize: string;
  textRampCaption1FontWeight: string;
  textRampCaption1LineHeight: string;
  textComposerInputFontSize: string;
  textComposerInputFontWeight: string;
  textComposerInputLineHeight: string;
  textComposerInputFontVariationSettings: string;
};

export const copilotTypographyTokens: CopilotTypographyTokens = {
  textControlButtonWeight: '400',
  textRampBody2FontSize: '16px',
  textRampBody2LineHeight: '24px',
  textRampBody3FontSize: '18px',
  textRampBody3FontWeight: '400',
  textRampBody3LineHeight: '28px',
  textRampCaption1FontSize: '12px',
  textRampCaption1FontWeight: '400',
  textRampCaption1LineHeight: '16px',
  textComposerInputFontSize: '17px',
  textComposerInputFontWeight: '410',
  textComposerInputLineHeight: '26px',
  textComposerInputFontVariationSettings: '"opsz" 40, "wght" 410',
};
