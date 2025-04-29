import { strokeWidthThick, strokeWidthThin } from '@phoenixui/themes/tokens.js';

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
  strokewidthCtrlOutlineHover: strokeWidthThick,
  strokewidthCtrlOutlinePressed: strokeWidthThick,
  strokewidthCtrlOutlineRest: strokeWidthThin,
  strokewidthCtrlOutlineSelected: strokeWidthThick,
  strokeWidthDefault: '{strokewidthDefault}',
  strokewidthDefault: strokeWidthThin,
  strokewidthDividerDefault: strokeWidthThin,
  strokewidthDividerStrong: strokeWidthThin,
  strokeWidthWindowDefault: '{nullNumber}',
};
