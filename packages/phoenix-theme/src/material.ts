import {
  acrylicBackgroundBlur,
  tabActiveBackgroundBlur,
} from '@phoenixui/themes/tokens.js';

export type Material = {
  materialAcrylicBlur: string;
  materialBlurAcrylic: string;
  materialMicaBlur: string;
  materialOnImageBlur: string;
};

export const material: Material = {
  materialAcrylicBlur: acrylicBackgroundBlur,
  materialBlurAcrylic: '{materialAcrylicBlur}',
  materialMicaBlur: tabActiveBackgroundBlur,
  materialOnImageBlur: '{nullNumber}',
};
