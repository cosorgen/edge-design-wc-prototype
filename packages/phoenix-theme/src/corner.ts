import {
  borderRadiusCircular,
  borderRadiusLarge,
  borderRadiusLayerApp,
  borderRadiusLayerBase,
  borderRadiusLayerCard,
  borderRadiusLayerFlyout,
  borderRadiusMedium,
  borderRadiusNone,
  borderRadiusSmall,
} from '@phoenixui/themes/tokens.js';

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
  cornerBezel: borderRadiusLarge,
  cornerCardHover: '{cornerCardRest}',
  cornerCardPressed: '{cornerCardRest}',
  cornerCardRest: borderRadiusLayerCard,
  cornerCircular: borderRadiusCircular,
  cornerControlHover: '{cornerCtrlHover}',
  cornerControlPressed: '{cornerCtrlPressed}',
  cornerControlRest: '{cornerCtrlRest}',
  cornerCtrlHover: '{cornerCtrlRest}',
  cornerCtrlLgHover: '{cornerCtrlLgRest}',
  cornerCtrlLgPressed: '{cornerCtrlLgRest}',
  cornerCtrlLgRest: borderRadiusLarge,
  cornerCtrlPressed: '{cornerCtrlRest}',
  cornerCtrlRest: borderRadiusMedium,
  cornerCtrlSmHover: '{cornerCtrlSmRest}',
  cornerCtrlSmPressed: '{cornerCtrlSmRest}',
  cornerCtrlSmRest: borderRadiusSmall,
  cornerFavicon: borderRadiusMedium,
  cornerFlyoutHover: '{cornerFlyoutRest}',
  cornerFlyoutPressed: '{cornerFlyoutRest}',
  cornerFlyoutRest: borderRadiusLayerFlyout,
  cornerImageInCard: borderRadiusMedium,
  cornerImageOnpage: borderRadiusLarge,
  cornerLayerDefault: borderRadiusLayerBase,
  cornerLayerIntersection: '{cornerZero}',
  cornerToolbarDefault: borderRadiusLayerBase,
  cornerWindowDefault: borderRadiusLayerApp,
  cornerZero: borderRadiusNone,
};
