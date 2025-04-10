import { size } from './globalValues.js';

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
  sizeCtrlDefault: size[320],
  sizeCtrlIcon: size[200],
  sizeCtrlIconSecondary: size[120],
  sizeIconControlSmall: '{sizeCtrlSmIcon}',
  sizeIconControlDefault: '{sizeCtrlIcon}',
  sizeControlDefault: '{sizeCtrlDefault}',
  sizeControlPaddingTextBottom: '{paddingCtrlTextbottom}',
  sizeControlSmall: '{sizeCtrlSmDefault}',
};

export const sizeCtrlSm: SizeCtrlSm = {
  sizeCtrlSmDefault: size[240],
  sizeCtrlSmIcon: size[200],
};

export const sizeCtrlLg: SizeCtrlLg = {
  sizeCtrlLgDefault: size[400],
  sizeCtrlLgIcon: size[240],
};
