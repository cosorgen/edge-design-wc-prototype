import { strokeWidth as s } from './globalValues.js';

export type Strokewidth = {
  strokeWidthControlOutlineHover: string;
  strokeWidthControlOutlinePressed: string;
  strokeWidthControlOutlineRest: string;
  strokeWidthControlOutlineSelectedRest: string;
  strokewidthCtrlOutlineSelectedRest: string;
  strokewidthCtrlOutlineHover: string;
  strokewidthCtrlOutlinePressed: string;
  strokewidthCtrlOutlineRest: string;
  strokewidthCtrlOutlineSelected: string;
  strokewidthDefault: string;
  strokeWidthDefault: string;
  strokewidthDividerDefault: string;
  strokewidthDividerStrong: string;
  strokeWidthWindowDefault: string;
};

export const strokeWidth: Strokewidth = {
  strokeWidthControlOutlineHover: '{strokewidthCtrlOutlineHover}',
  strokeWidthControlOutlinePressed: '{strokewidthCtrlOutlinePressed}',
  strokeWidthControlOutlineRest: '{strokewidthCtrlOutlineRest}',
  strokeWidthControlOutlineSelectedRest: '{strokewidthCtrlOutlineSelected}',
  strokewidthCtrlOutlineSelectedRest: '{strokeWidthControlOutlineSelectedRest}',
  strokewidthCtrlOutlineHover: s[20],
  strokewidthCtrlOutlinePressed: s[20],
  strokewidthCtrlOutlineRest: s[10],
  strokewidthCtrlOutlineSelected: s[20],
  strokeWidthDefault: '{strokewidthDefault}',
  strokewidthDefault: s[10],
  strokewidthDividerDefault: s[10],
  strokewidthDividerStrong: s[10],
  strokeWidthWindowDefault: '{nullNumber}',
};
