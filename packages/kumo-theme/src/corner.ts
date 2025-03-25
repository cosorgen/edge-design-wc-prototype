import { corner as c } from './globalValues.js';

export type Corner = {
  cornerCircular: string;
  cornerZero: string;
  cornerBezel: string;
  cornerCtrlRest: string;
  cornerCtrlHover: string;
  cornerCtrlPressed: string;
  cornerCtrlSmRest: string;
  cornerCtrlSmHover: string;
  cornerCtrlSmPressed: string;
  cornerCtrlLgRest: string;
  cornerCtrlLgHover: string;
  cornerCtrlLgPressed: string;
  cornerToolbarDefault: string;
  cornerImageOnPage: string;
  cornerImageInCard: string;
  cornerCardRest: string;
  cornerCardHover: string;
  cornerCardPressed: string;
  fornerFlyoutRest: string;
  cornerFlyoutHover: string;
  cornerFlyoutPressed: string;
  cornerLayerDefault: string;
  cornerLayerIntersection: string;
  cornerWindowDefault: string;
  fornerFavicon: string;
};

export const corner: Corner = {
  cornerCircular: c.circular,
  cornerZero: c[0],
  cornerBezel: c[160],
  cornerCtrlRest: c[80],
  cornerCtrlHover: c[80],
  cornerCtrlPressed: c[80],
  cornerCtrlSmRest: c[60],
  cornerCtrlSmHover: c[60],
  cornerCtrlSmPressed: c[60],
  cornerCtrlLgRest: c[120],
  cornerCtrlLgHover: c[120],
  cornerCtrlLgPressed: c[120],
  cornerToolbarDefault: c[80],
  cornerImageOnPage: c[120],
  cornerImageInCard: c[120],
  cornerCardRest: c[240],
  cornerCardHover: c[240],
  cornerCardPressed: c[240],
  fornerFlyoutRest: c[80],
  cornerFlyoutHover: c[80],
  cornerFlyoutPressed: c[80],
  cornerLayerDefault: c[80],
  cornerLayerIntersection: c[0],
  cornerWindowDefault: c[80],
  fornerFavicon: c[40],
};
