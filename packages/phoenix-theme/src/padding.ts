import {
  spacingHorizontalL,
  spacingHorizontalM,
  spacingHorizontalMNudge,
  spacingHorizontalNone,
  spacingHorizontalS,
  spacingHorizontalSNudge,
  spacingHorizontalXL,
  spacingHorizontalXS,
  spacingHorizontalXXL,
  spacingHorizontalXXS,
  spacingHorizontalXXXL,
} from '@phoenixui/themes/tokens.js';

export type PaddingCtrl = {
  paddingControlDefaultHorizontalIconOnly: string;
  paddingControlDefaultToNestedControl: string;
  paddingControlHorizontalDefault: string;
  paddingControlTextTop: string;
  paddingCtrlHorizontalDefault: string;
  paddingCtrlHorizontalIcononly: string;
  paddingCtrlTextbottom: string;
  paddingCtrlTextside: string;
  paddingCtrlTexttop: string;
  paddingCtrlTonestedcontrol: string;
  paddingTextHorizontal: string;
  paddingToNestedControl: string;
};

export type PaddingCtrlSm = {
  paddingCtrlSmHorizontalDefault: string;
  paddingCtrlSmHorizontalIcononly: string;
  paddingCtrlSmTextBottom: string;
  paddingCtrlSmTextTop: string;
  paddingCtrlSmToNestedControl: string;
};

export type PaddingCtrlLg = {
  paddingCtrlLgHorizontalDefault: string;
  paddingCtrlLgHorizontalIcononly: string;
  paddingCtrlLgTextbottom: string;
  paddingCtrlLgTexttop: string;
  paddingCtrlLgToNestedControl: string;
};

export type PaddingFlyout = {
  paddingFlyoutDefault: string;
};

export type PaddingCard = {
  paddingCard: string;
  paddingCardNestedimage: string;
};

export type PaddingContent = {
  paddingContentAlignDefault: string;
  paddingContentAlignOutdentIcononsubtle: string;
  paddingContentAlignOutdentTextonsubtle: string;
  paddingContentLarge: string;
  paddingContentMedium: string;
  paddingContentNone: string;
  paddingContentSmall: string;
  paddingContentXlarge: string;
  paddingContentXsmall: string;
  paddingContentXsmallnudge: string;
  paddingContentXxlarge: string;
  paddingContentXxsmall: string;
  paddingContentXxxlarge: string;
  paddingContentXxxsmall: string;
};

export type PaddingToolbar = {
  paddingToolbar: string;
  paddingToolbarInside: string;
  paddingToolbarOutside: string;
};

export type PaddingWindow = {
  paddingWindowDefault: string;
};

export const paddingCtrl: PaddingCtrl = {
  paddingControlDefaultHorizontalIconOnly: '{paddingCtrlHorizontalIcononly}',
  paddingControlDefaultToNestedControl: '{paddingCtrlTonestedcontrol}',
  paddingControlHorizontalDefault: '{paddingCtrlHorizontalDefault}',
  paddingControlTextTop: '{paddingCtrlTexttop}',
  paddingCtrlHorizontalDefault: spacingHorizontalS,
  paddingCtrlHorizontalIcononly: spacingHorizontalSNudge,
  paddingCtrlTextbottom: '{paddingCtrlTexttop}',
  paddingCtrlTextside: spacingHorizontalXXS,
  paddingCtrlTexttop: spacingHorizontalSNudge,
  paddingCtrlTonestedcontrol: spacingHorizontalXS,
  paddingTextHorizontal: '{paddingCtrlHorizontalDefault}',
  paddingToNestedControl: '{paddingCtrlTonestedcontrol}',
};

export const paddingCtrlSm: PaddingCtrlSm = {
  paddingCtrlSmHorizontalDefault: spacingHorizontalS,
  paddingCtrlSmHorizontalIcononly: spacingHorizontalXXS,
  paddingCtrlSmTextBottom: '{paddingCtrlSmTextTop}',
  paddingCtrlSmTextTop: spacingHorizontalXS,
  paddingCtrlSmToNestedControl: spacingHorizontalNone,
};

export const paddingCtrlLg: PaddingCtrlLg = {
  paddingCtrlLgHorizontalDefault: spacingHorizontalS,
  paddingCtrlLgHorizontalIcononly: spacingHorizontalS,
  paddingCtrlLgTextbottom: '{paddingCtrlLgTexttop}',
  paddingCtrlLgTexttop: spacingHorizontalS,
  paddingCtrlLgToNestedControl: spacingHorizontalXS,
};

export const paddingFlyout: PaddingFlyout = {
  paddingFlyoutDefault: '{paddingContentXxsmall}',
};

export const paddingCard: PaddingCard = {
  paddingCard: spacingHorizontalXL,
  paddingCardNestedimage: '{paddingCard}',
};

export const paddingContent: PaddingContent = {
  paddingContentAlignDefault: spacingHorizontalXL,
  paddingContentAlignOutdentIcononsubtle: spacingHorizontalM,
  paddingContentAlignOutdentTextonsubtle: spacingHorizontalMNudge,
  paddingContentLarge: spacingHorizontalXL,
  paddingContentMedium: spacingHorizontalL,
  paddingContentNone: spacingHorizontalNone,
  paddingContentSmall: spacingHorizontalM,
  paddingContentXlarge: spacingHorizontalXXL,
  paddingContentXsmall: spacingHorizontalS,
  paddingContentXsmallnudge: spacingHorizontalSNudge,
  paddingContentXxlarge: spacingHorizontalXXXL,
  paddingContentXxsmall: spacingHorizontalXS,
  paddingContentXxxlarge: '40px', // unmappable
  paddingContentXxxsmall: spacingHorizontalXXS,
};

export const paddingToolbar: PaddingToolbar = {
  paddingToolbar: '{paddingToolbarInside}',
  paddingToolbarInside: spacingHorizontalS,
  paddingToolbarOutside: spacingHorizontalXS,
};

export const paddingWindow: PaddingWindow = {
  paddingWindowDefault: spacingHorizontalXS,
};
