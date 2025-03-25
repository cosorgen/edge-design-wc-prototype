import { strokeWidth as s } from './globalValues.js';

export type StrokeWidth = {
  strokeWidthDefault: string;
  strokeWidthDividerDefault: string;
  strokeWidthDividerStrong: string;
  strokeWidthCtrlOutlineRest: string;
  strokeWidthCtrlOutlineHover: string;
  strokeWidthCtrlOutlinePressed: string;
  strokeWidthCtrlOutlineSelected: string;
  strokeWidthWindowDefault: string;
};

export const strokeWidth: StrokeWidth = {
  strokeWidthDefault: s[10],
  strokeWidthDividerDefault: s[10],
  strokeWidthDividerStrong: s[10],
  strokeWidthCtrlOutlineRest: s[10],
  strokeWidthCtrlOutlineHover: s[20],
  strokeWidthCtrlOutlinePressed: s[20],
  strokeWidthCtrlOutlineSelected: s[20],
  strokeWidthWindowDefault: '{nullNumber}',
};
