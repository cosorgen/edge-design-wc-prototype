import { size } from './globalValues.js';

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
  gapInsideCtrlDefault: size[40],
  gapInsideCtrlTosecondaryicon: size[40],
  gapInsideCtrlTolabel: size[80],
  gapInsideCtrlSmDefault: size[40],
  gapInsideCtrlSmToSecondaryIcon: size[0],
  gapInsideCtrlSmToLabel: size[40],
  gapInsideCtrlLgDefault: size[40],
  gapInsideCtrlLgToSecondaryIcon: size[20],
  gapInsideCtrlLgToLabel: size[120],
};

export const gapBetween: GapBetween = {
  gapBetweenCard: size[240],
  gapBetweenContentLarge: size[200],
  gapBetweenContentMedium: size[160],
  gapBetweenContentNone: size[0],
  gapBetweenContentSmall: size[120],
  gapBetweenContentXlarge: size[240],
  gapBetweenContentXS: '{gapBetweenContentXsmall}',
  gapBetweenContentXsmall: size[80],
  gapBetweenContentXsmallnudge: size[60],
  gapBetweenContentXxlarge: size[360],
  gapBetweenContentXxsmall: size[40],
  gapBetweenContentXxxlarge: size[400],
  gapBetweenContentXxxsmall: size[20],
  gapBetweenControl: '{gapBetweenCtrlDefault}',
  gapBetweenCtrlDefault: size[80],
  gapBetweenCtrlLgDefault: size[120],
  gapBetweenCtrlLgNested: size[40],
  gapBetweenCtrlNested: size[20],
  gapBetweenCtrlSmDefault: size[20],
  gapBetweenCtrlSmNested: size[0],
  gapBetweenListitem: size[0],
  gapBetweenTextLarge: size[60],
  gapBetweenTextSmall: size[40],
  gapControlDefault: '{gapBetweenCtrlDefault}',
  gapTextLarge: '{gapBetweenTextLarge}',
  gapList: '{gapBetweenListitem}',
};
