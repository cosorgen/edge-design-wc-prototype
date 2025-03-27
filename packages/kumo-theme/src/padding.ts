import { size } from './globalValues.js';

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
  paddingContentXLarge: string;
  paddingContentXSmall: string;
  paddingContentXSmallNudge: string;
  paddingContentXxLarge: string;
  paddingContentXxsmall: string;
  paddingContentXxxLarge: string;
  paddingContentXxxSmall: string;
};

export type PaddingToolbar = {
  paddingToolbar: string;
  paddingToolbarInside: string;
  paddingToolbarOutside: string;
};

export const paddingCtrl: PaddingCtrl = {
  paddingControlDefaultHorizontalIconOnly: '{paddingCtrlHorizontalIcononly}',
  paddingControlDefaultToNestedControl: '{paddingCtrlTonestedcontrol}',
  paddingControlHorizontalDefault: '{paddingCtrlHorizontalDefault}',
  paddingControlTextTop: '{paddingCtrlTexttop}',
  paddingCtrlHorizontalDefault: size[80],
  paddingCtrlHorizontalIcononly: size[60],
  paddingCtrlTextbottom: '{paddingCtrlTexttop}',
  paddingCtrlTextside: size[20],
  paddingCtrlTexttop: size[60],
  paddingCtrlTonestedcontrol: size[40],
  paddingTextHorizontal: '{paddingCtrlHorizontalDefault}',
  paddingToNestedControl: '{paddingCtrlTonestedcontrol}',
};

export const paddingCtrlSm: PaddingCtrlSm = {
  paddingCtrlSmHorizontalDefault: size[80],
  paddingCtrlSmHorizontalIcononly: size[20],
  paddingCtrlSmTextBottom: '{paddingCtrlSmTextTop}',
  paddingCtrlSmTextTop: size[40],
  paddingCtrlSmToNestedControl: size[0],
};

export const paddingCtrlLg: PaddingCtrlLg = {
  paddingCtrlLgHorizontalDefault: size[80],
  paddingCtrlLgHorizontalIcononly: size[80],
  paddingCtrlLgTextbottom: '{paddingCtrlLgTexttop}',
  paddingCtrlLgTexttop: size[80],
  paddingCtrlLgToNestedControl: size[40],
};

export const paddingFlyout: PaddingFlyout = {
  paddingFlyoutDefault: '{paddingContentXxsmall}',
};

export const paddingCard: PaddingCard = {
  paddingCard: size[200],
  paddingCardNestedimage: '{paddingCard}',
};

export const paddingContent: PaddingContent = {
  paddingContentAlignDefault: size[200],
  paddingContentAlignOutdentIcononsubtle: size[120],
  paddingContentAlignOutdentTextonsubtle: size[100],
  paddingContentLarge: size[200],
  paddingContentMedium: size[160],
  paddingContentNone: size[0],
  paddingContentSmall: size[120],
  paddingContentXLarge: size[240],
  paddingContentXSmall: size[80],
  paddingContentXSmallNudge: size[60],
  paddingContentXxLarge: size[320],
  paddingContentXxsmall: size[40],
  paddingContentXxxLarge: size[400],
  paddingContentXxxSmall: size[20],
};

export const paddingToolbar: PaddingToolbar = {
  paddingToolbar: '{paddingToolbarInside}',
  paddingToolbarInside: size[80],
  paddingToolbarOutside: size[40],
};
