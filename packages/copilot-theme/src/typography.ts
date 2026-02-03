import { type FontFamilyTokens } from '@fluentui/tokens';

export const fontFamilyOverrides: Partial<FontFamilyTokens> = {
  fontFamilyBase:
    '"Ginto", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
};

export type CopilotTypographyTokens = {
  smtcTextControlButtonWeight: string;
  smtcTextRampBody2FontSize: string;
  smtcTextRampBody2LineHeight: string;
  smtcTextRampBody3FontSize: string;
  smtcTextRampBody3FontWeight: string;
  smtcTextRampBody3LineHeight: string;
  smtcTextRampCaption1FontSize: string;
  smtcTextRampCaption1FontWeight: string;
  smtcTextRampCaption1LineHeight: string;
  smtcTextComposerInputFontSize: string;
  smtcTextComposerInputFontWeight: string;
  smtcTextComposerInputLineHeight: string;
  smtcTextComposerInputFontVariationSettings: string;
};

export const copilotTypographyTokens: CopilotTypographyTokens = {
  smtcTextControlButtonWeight: '400',
  smtcTextRampBody2FontSize: '16px',
  smtcTextRampBody2LineHeight: '24px',
  smtcTextRampBody3FontSize: '18px',
  smtcTextRampBody3FontWeight: '400',
  smtcTextRampBody3LineHeight: '28px',
  smtcTextRampCaption1FontSize: '12px',
  smtcTextRampCaption1FontWeight: '400',
  smtcTextRampCaption1LineHeight: '16px',
  smtcTextComposerInputFontSize: '17px',
  smtcTextComposerInputFontWeight: '410',
  smtcTextComposerInputLineHeight: '26px',
  smtcTextComposerInputFontVariationSettings: '"opsz" 40, "wght" 410',
};
