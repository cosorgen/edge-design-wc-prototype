import { corner as c } from './globalValues.js';

export type Corner = {
  cornerBezel: string;
  cornerCardHover: string;
  cornerCardPressed: string;
  cornerCardRest: string;
  cornerCircular: string;
  cornerControlHover: string;
  cornerControlPressed: string;
  cornerControlRest: string;
  cornerCtrlHover: string;
  cornerCtrlLgHover: string;
  cornerCtrlLgPressed: string;
  cornerCtrlLgRest: string;
  cornerCtrlPressed: string;
  cornerCtrlRest: string;
  cornerCtrlSmHover: string;
  cornerCtrlSmPressed: string;
  cornerCtrlSmRest: string;
  cornerFavicon: string;
  cornerFlyoutHover: string;
  cornerFlyoutPressed: string;
  cornerFlyoutRest: string;
  cornerImageInCard: string;
  cornerImageOnpage: string;
  cornerLayerDefault: string;
  cornerLayerIntersection: string;
  cornerToolbarDefault: string;
  cornerWindowDefault: string;
  cornerZero: string;
};

export const corner: Corner = {
  cornerBezel: c[160],
  cornerCardHover: c[240],
  cornerCardPressed: c[240],
  cornerCardRest: c[240],
  cornerCircular: c.circular,
  cornerControlHover: '{cornerCtrlHover}',
  cornerControlPressed: '{cornerCtrlPressed}',
  cornerControlRest: '{cornerCtrlRest}',
  cornerCtrlHover: c[80],
  cornerCtrlLgHover: c[120],
  cornerCtrlLgPressed: c[120],
  cornerCtrlLgRest: c[120],
  cornerCtrlPressed: c[80],
  cornerCtrlRest: c[80],
  cornerCtrlSmHover: c[60],
  cornerCtrlSmPressed: c[60],
  cornerCtrlSmRest: c[60],
  cornerFavicon: c[40],
  cornerFlyoutHover: c[80],
  cornerFlyoutPressed: c[80],
  cornerFlyoutRest: c[80],
  cornerImageInCard: c[120],
  cornerImageOnpage: c[120],
  cornerLayerDefault: c[80],
  cornerLayerIntersection: c[0],
  cornerToolbarDefault: c[80],
  cornerWindowDefault: c[80],
  cornerZero: c[0],
};
