import {
  spacingHorizontalL,
  spacingHorizontalM,
  spacingHorizontalNone,
  spacingHorizontalS,
  spacingHorizontalSNudge,
  spacingHorizontalXS,
  spacingHorizontalXXL,
  spacingHorizontalXXS,
  spacingHorizontalXL,
} from '@phoenixui/themes/tokens.js';

export type GapInside = {
  gapInsideCtrlDefault: string;
  gapInsideCtrlTosecondaryicon: string;
  gapInsideCtrlTolabel: string;
  gapInsideCtrlSmDefault: string;
  gapInsideCtrlSmToSecondaryIcon: string;
  gapInsideCtrlSmToLabel: string;
  gapInsideCtrlLgDefault: string;
  gapInsideCtrlLgToSecondaryIcon: string;
  gapInsideCtrlLgToLabel: string;
};

export type GapBetween = {
  gapBetweenCard: string;
  gapBetweenContentLarge: string;
  gapBetweenContentMedium: string;
  gapBetweenContentNone: string;
  gapBetweenContentSmall: string;
  gapBetweenContentXlarge: string;
  gapBetweenContentXS: string;
  gapBetweenContentXsmall: string;
  gapBetweenContentXsmallnudge: string;
  gapBetweenContentXxlarge: string;
  gapBetweenContentXxsmall: string;
  gapBetweenContentXxxlarge: string;
  gapBetweenContentXxxsmall: string;
  gapBetweenControl: string;
  gapBetweenCtrlDefault: string;
  gapBetweenCtrlLgDefault: string;
  gapBetweenCtrlLgNested: string;
  gapBetweenCtrlNested: string;
  gapBetweenCtrlSmDefault: string;
  gapBetweenCtrlSmNested: string;
  gapBetweenListitem: string;
  gapBetweenTextLarge: string;
  gapBetweenTextSmall: string;
  gapControlDefault: string;
  gapTextLarge: string;
  gapList: string;
};

export const gapInside: GapInside = {
  gapInsideCtrlDefault: spacingHorizontalXS,
  gapInsideCtrlTosecondaryicon: spacingHorizontalXS,
  gapInsideCtrlTolabel: spacingHorizontalS,
  gapInsideCtrlSmDefault: spacingHorizontalXS,
  gapInsideCtrlSmToSecondaryIcon: spacingHorizontalNone,
  gapInsideCtrlSmToLabel: spacingHorizontalXS,
  gapInsideCtrlLgDefault: spacingHorizontalXS,
  gapInsideCtrlLgToSecondaryIcon: spacingHorizontalXXS,
  gapInsideCtrlLgToLabel: spacingHorizontalM,
};

export const gapBetween: GapBetween = {
  gapBetweenCard: spacingHorizontalXXL,
  gapBetweenContentLarge: spacingHorizontalXL,
  gapBetweenContentMedium: spacingHorizontalL,
  gapBetweenContentNone: spacingHorizontalNone,
  gapBetweenContentSmall: spacingHorizontalM,
  gapBetweenContentXlarge: spacingHorizontalXXL,
  gapBetweenContentXS: '{gapBetweenContentXsmall}',
  gapBetweenContentXsmall: spacingHorizontalS,
  gapBetweenContentXsmallnudge: spacingHorizontalSNudge,
  gapBetweenContentXxlarge: '36px', // unmappable
  gapBetweenContentXxsmall: spacingHorizontalXS,
  gapBetweenContentXxxlarge: '40px', // unmappable
  gapBetweenContentXxxsmall: spacingHorizontalXXS,
  gapBetweenControl: '{gapBetweenCtrlDefault}',
  gapBetweenCtrlDefault: spacingHorizontalS,
  gapBetweenCtrlLgDefault: spacingHorizontalM,
  gapBetweenCtrlLgNested: spacingHorizontalXS,
  gapBetweenCtrlNested: spacingHorizontalXXS,
  gapBetweenCtrlSmDefault: spacingHorizontalXXS,
  gapBetweenCtrlSmNested: spacingHorizontalNone,
  gapBetweenListitem: spacingHorizontalNone,
  gapBetweenTextLarge: spacingHorizontalSNudge,
  gapBetweenTextSmall: spacingHorizontalXS,
  gapControlDefault: '{gapBetweenCtrlDefault}',
  gapTextLarge: '{gapBetweenTextLarge}',
  gapList: '{gapBetweenListitem}',
};
