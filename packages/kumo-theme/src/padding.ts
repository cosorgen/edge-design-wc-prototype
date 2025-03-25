import { size } from './globalValues.js';

export type PaddingCtrl = {
  paddingCtrlHorizontalDefault: string;
  paddingCtrlHorizontalIconOnly: string;
  paddingCtrlTextTop: string;
  paddingCtrlTextBottom: string;
  paddingCtrlTextSide: string;
  paddingCtrlToNestedControl: string;
};

export type PaddingCtrlSm = {
  paddingCtrlSmHorizontalDefault: string;
  paddingCtrlSmHorizontalIconOnly: string;
  paddingCtrlSmTextTop: string;
  paddingCtrlSmTextBottom: string;
  paddingCtrlSmToNestedControl: string;
};

export type PaddingCtrlLg = {
  paddingCtrlLgHorizontalDefault: string;
  paddingCtrlLgHorizontalIconOnly: string;
  paddingCtrlLgTextTop: string;
  paddingCtrlLgTextBottom: string;
  paddingCtrlLgToNestedControl: string;
};

export type PaddingFlyout = {
  paddingFlyoutDefault: string;
};

export type PaddingCard = {
  paddingCard: string;
  paddingCardNestedImage: string;
};

export type PaddingContent = {
  paddingContentNone: string;
  paddingContentXxxSmall: string;
  paddingContentXxSmall: string;
  paddingContentXSmallNudge: string;
  paddingContentXSmall: string;
  paddingContentSmall: string;
  paddingContentMedium: string;
  paddingContentLarge: string;
  paddingContentXLarge: string;
  paddingContentXxLarge: string;
  paddingContentXxxLarge: string;
  paddingContentAlignDefault: string;
  paddingContentAlignOutdentIconOnSubtle: string;
  paddingContentAlignOutdentTextOnSubtle: string;
};

export type PaddingToolbar = {
  paddingToolbarInside: string;
  paddingToolbarOutside: string;
};

export const paddingCtrl: PaddingCtrl = {
  paddingCtrlHorizontalDefault: size[80],
  paddingCtrlHorizontalIconOnly: size[60],
  paddingCtrlTextTop: size[60],
  paddingCtrlTextBottom: '{paddingCtrlTextTop}',
  paddingCtrlTextSide: size[20],
  paddingCtrlToNestedControl: size[40],
};

export const paddingCtrlSm: PaddingCtrlSm = {
  paddingCtrlSmHorizontalDefault: size[80],
  paddingCtrlSmHorizontalIconOnly: size[20],
  paddingCtrlSmTextTop: size[40],
  paddingCtrlSmTextBottom: '{paddingCtrlSmTextTop}',
  paddingCtrlSmToNestedControl: size[0],
};

export const paddingCtrlLg: PaddingCtrlLg = {
  paddingCtrlLgHorizontalDefault: size[80],
  paddingCtrlLgHorizontalIconOnly: size[80],
  paddingCtrlLgTextTop: size[80],
  paddingCtrlLgTextBottom: '{paddingCtrlLgTextTop}',
  paddingCtrlLgToNestedControl: size[40],
};

export const paddingFlyout: PaddingFlyout = {
  paddingFlyoutDefault: '{paddingContentXxSmall}',
};

export const paddingCard: PaddingCard = {
  paddingCard: size[200],
  paddingCardNestedImage: '{paddingCard}',
};

export const paddingContent: PaddingContent = {
  paddingContentNone: size[0],
  paddingContentXxxSmall: size[20],
  paddingContentXxSmall: size[40],
  paddingContentXSmallNudge: size[60],
  paddingContentXSmall: size[80],
  paddingContentSmall: size[120],
  paddingContentMedium: size[160],
  paddingContentLarge: size[200],
  paddingContentXLarge: size[240],
  paddingContentXxLarge: size[320],
  paddingContentXxxLarge: size[400],
  paddingContentAlignDefault: size[200],
  paddingContentAlignOutdentIconOnSubtle: size[120],
  paddingContentAlignOutdentTextOnSubtle: size[100],
};

export const paddingToolbar: PaddingToolbar = {
  paddingToolbarInside: size[80],
  paddingToolbarOutside: size[40],
};
