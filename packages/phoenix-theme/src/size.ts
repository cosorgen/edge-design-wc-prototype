import { spacingHorizontalM, spacingHorizontalXL, spacingHorizontalXXL, spacingHorizontalXXXL } from "@phoenixui/themes/tokens.js";

export type SizeCtrl = {
  sizeCtrlDefault: string;
  sizeCtrlIcon: string;
  sizeCtrlIconSecondary: string;
  sizeIconControlSmall: string;
  sizeIconControlDefault: string;
  sizeControlDefault: string;
  sizeControlPaddingTextBottom: string;
  sizeControlSmall: string;
};

export type SizeCtrlSm = {
  sizeCtrlSmDefault: string;
  sizeCtrlSmIcon: string;
};

export type SizeCtrlLg = {
  sizeCtrlLgDefault: string;
  sizeCtrlLgIcon: string;
};

export const sizeCtrl: SizeCtrl = {
  sizeCtrlDefault: spacingHorizontalXXXL,
  sizeCtrlIcon: spacingHorizontalXL,
  sizeCtrlIconSecondary: spacingHorizontalM,
  sizeIconControlSmall: '{sizeCtrlSmIcon}',
  sizeIconControlDefault: '{sizeCtrlIcon}',
  sizeControlDefault: '{sizeCtrlDefault}',
  sizeControlPaddingTextBottom: '{paddingCtrlTextbottom}',
  sizeControlSmall: '{sizeCtrlSmDefault}',
};

export const sizeCtrlSm: SizeCtrlSm = {
  sizeCtrlSmDefault: spacingHorizontalXXL,
  sizeCtrlSmIcon: spacingHorizontalXL,
};

export const sizeCtrlLg: SizeCtrlLg = {
  sizeCtrlLgDefault: '40px', // unmappable
  sizeCtrlLgIcon: spacingHorizontalXXL,
};
