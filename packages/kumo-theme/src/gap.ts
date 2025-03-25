import { size } from './globalValues.js';

export type GapInside = {
  gapInsideCtrlDefault: string;
  gapInsideCtrlToSecondaryIcon: string;
  gapInsideCtrlToLabel: string;
  gapInsideCtrlSmDefault: string;
  gapInsideCtrlSmToSecondaryIcon: string;
  gapInsideCtrlSmToLabel: string;
  gapInsideCtrlLgDefault: string;
  gapInsideCtrlLgToSecondaryIcon: string;
  gapInsideCtrlLgToLabel: string;
};

export type GapBetween = {
  gapBetweenContentNone: string;
  gapBetweenContentXxxSmall: string;
  gapBetweenContentXxSmall: string;
  gapBetweenContentXSmallNudge: string;
  gapBetweenContentXSmall: string;
  gapBetweenContentSmall: string;
  gapBetweenContentMedium: string;
  gapBetweenContentLarge: string;
  gapBetweenContentXLarge: string;
  gapBetweenContentXxLarge: string;
  gapBetweenContentXxxLarge: string;
  gapBetweenTextSmall: string;
  gapBetweenTextLarge: string;
  gapBetweenListItem: string;
  gapBetweenCard: string;
  gapBetweenCtrlDefault: string;
  gapBetweenCtrlNested: string;
  gapBetweenCtrlSmDefault: string;
  gapBetweenCtrlSmNested: string;
  gapBetweenCtrlLgDefault: string;
  gapBetweenCtrlLgNested: string;
};

export const gapInside: GapInside = {
  gapInsideCtrlDefault: size[40],
  gapInsideCtrlToSecondaryIcon: size[40],
  gapInsideCtrlToLabel: size[80],
  gapInsideCtrlSmDefault: size[40],
  gapInsideCtrlSmToSecondaryIcon: size[0],
  gapInsideCtrlSmToLabel: size[40],
  gapInsideCtrlLgDefault: size[40],
  gapInsideCtrlLgToSecondaryIcon: size[20],
  gapInsideCtrlLgToLabel: size[120],
};

export const gapBetween: GapBetween = {
  gapBetweenContentNone: size[0],
  gapBetweenContentXxxSmall: size[20],
  gapBetweenContentXxSmall: size[40],
  gapBetweenContentXSmallNudge: size[60],
  gapBetweenContentXSmall: size[80],
  gapBetweenContentSmall: size[120],
  gapBetweenContentMedium: size[160],
  gapBetweenContentLarge: size[200],
  gapBetweenContentXLarge: size[240],
  gapBetweenContentXxLarge: size[360],
  gapBetweenContentXxxLarge: size[400],
  gapBetweenTextSmall: size[40],
  gapBetweenTextLarge: size[60],
  gapBetweenListItem: size[0],
  gapBetweenCard: size[240],
  gapBetweenCtrlDefault: size[80],
  gapBetweenCtrlNested: size[20],
  gapBetweenCtrlSmDefault: size[20],
  gapBetweenCtrlSmNested: size[0],
  gapBetweenCtrlLgDefault: size[120],
  gapBetweenCtrlLgNested: size[40],
};
