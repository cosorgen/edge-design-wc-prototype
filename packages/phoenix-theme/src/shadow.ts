import {
  shadow28BaseBlur,
  shadow28DiffuseBlur,
  shadow28DiffuseY,
  shadow2BaseBlur,
  shadow2BaseY,
  shadow2DiffuseBlur,
  shadow2DiffuseY,
  shadow8BaseBlur,
  shadow8BaseY,
  shadow8DiffuseY,
  shadowBaseLayerBaseBlur,
  shadowBaseLayerDiffuseBlur,
  shadowBaseLayerDiffuseY,
  shadowBaseX,
  shadowDiffuseX,
  shadow28BaseY,
  shadow8DiffuseBlur,
  shadowBaseLayerBaseY,
  shadow4DiffuseY,
} from '@phoenixui/themes/tokens.js';

export type ShadowParts = {
  shadowCardDisabledKeyBlur: string;
  shadowCardDisabledKeyX: string;
  shadowCardDisabledKeyY: string;
  shadowCardHoverKeyBlur: string;
  shadowCardHoverKeyX: string;
  shadowCardHoverKeyY: string;
  shadowCardPressedKeyBlur: string;
  shadowCardPressedKeyX: string;
  shadowCardPressedKeyY: string;
  shadowCardRestAmbientBlur: string;
  shadowCardRestAmbientX: string;
  shadowCardRestAmbientY: string;
  shadowCardRestKeyBlur: string;
  shadowCardRestKeyX: string;
  shadowCardRestKeyY: string;
  shadowCtrlOnDragAmbientBlur: string;
  shadowCtrlOnDragAmbientX: string;
  shadowCtrlOnDragAmbientY: string;
  shadowCtrlOnDragKeyBlur: string;
  shadowCtrlOnDragKeyX: string;
  shadowCtrlOnDragKeyY: string;
  shadowFlyoutAmbientBlur: string;
  shadowFlyoutAmbientX: string;
  shadowFlyoutAmbientY: string;
  shadowFlyoutKeyBlur: string;
  shadowFlyoutKeyX: string;
  shadowFlyoutKeyY: string;
  shadowLayerAmbientBlur: string;
  shadowLayerAmbientX: string;
  shadowLayerAmbientY: string;
  shadowLayerKeyBlur: string;
  shadowLayerKeyX: string;
  shadowLayerKeyY: string;
  shadowToolbarAmbientBlur: string;
  shadowToolbarAmbientX: string;
  shadowToolbarAmbientY: string;
  shadowToolbarKeyBlur: string;
  shadowToolbarKeyX: string;
  shadowToolbarKeyY: string;
  shadowWindowActiveAmbientBlur: string;
  shadowWindowActiveAmbientX: string;
  shadowWindowActiveAmbientY: string;
  shadowWindowActiveKeyBlur: string;
  shadowWindowActiveKeyX: string;
  shadowWindowActiveKeyY: string;
  shadowWindowInactiveAmbientBlur: string;
  shadowWindowInactiveAmbientX: string;
  shadowWindowInactiveAmbientY: string;
  shadowWindowInactiveKeyBlur: string;
  shadowWindowInactiveKeyX: string;
  shadowWindowInactiveKeyY: string;
};

export type Shadow = {
  shadowCardDisabled: string;
  shadowCardDisabledCss: string;
  shadowCardHover: string;
  shadowCardHoverCss: string;
  shadowCardPressed: string;
  shadowCardPressedCss: string;
  shadowCardRest: string;
  shadowCardRestCss: string;
  shadowCtrlOnDrag: string;
  shadowFlyout: string;
  shadowFlyoutCss: string;
  shadowLayer: string;
  shadowToolbar: string;
  shadowWindowActive: string;
  shadowWindowInactive: string;
};

export const shadowParts: ShadowParts = {
  shadowCardDisabledKeyBlur: '{shadowCardRestKeyBlur}',
  shadowCardDisabledKeyX: '{shadowCardRestKeyX}',
  shadowCardDisabledKeyY: '{shadowCardRestKeyY}',
  shadowCardHoverKeyBlur: '{shadowCardRestKeyBlur}',
  shadowCardHoverKeyX: '{shadowCardRestKeyX}',
  shadowCardHoverKeyY: '{shadowCardRestKeyY}',
  shadowCardPressedKeyBlur: '{shadowCardRestKeyBlur}',
  shadowCardPressedKeyX: '{shadowCardRestKeyX}',
  shadowCardPressedKeyY: '{shadowCardRestKeyY}',
  shadowCardRestAmbientBlur: shadow2DiffuseBlur,
  shadowCardRestAmbientX: shadowDiffuseX,
  shadowCardRestAmbientY: shadow2DiffuseY,
  shadowCardRestKeyBlur: shadow2BaseBlur,
  shadowCardRestKeyX: shadowBaseX,
  shadowCardRestKeyY: shadow2BaseY,
  shadowCtrlOnDragAmbientBlur: '{shadowFlyoutAmbientBlur}',
  shadowCtrlOnDragAmbientX: '{shadowFlyoutAmbientX}',
  shadowCtrlOnDragAmbientY: '{shadowFlyoutAmbientY}',
  shadowCtrlOnDragKeyBlur: '{shadowFlyoutKeyBlur}',
  shadowCtrlOnDragKeyX: '{shadowFlyoutKeyX}',
  shadowCtrlOnDragKeyY: '{shadowFlyoutKeyY}',
  shadowFlyoutAmbientBlur: shadow28DiffuseBlur,
  shadowFlyoutAmbientX: shadowDiffuseX,
  shadowFlyoutAmbientY: shadow28DiffuseY,
  shadowFlyoutKeyBlur: shadow28BaseBlur,
  shadowFlyoutKeyX: shadowBaseX,
  shadowFlyoutKeyY: shadow28BaseY,
  shadowLayerAmbientBlur: shadow2BaseBlur,
  shadowLayerAmbientX: shadowDiffuseX,
  shadowLayerAmbientY: shadow2DiffuseY,
  shadowLayerKeyBlur: shadow2DiffuseBlur,
  shadowLayerKeyX: shadowBaseX,
  shadowLayerKeyY: shadow2BaseY,
  shadowToolbarAmbientBlur: shadow8DiffuseBlur,
  shadowToolbarAmbientX: shadowDiffuseX,
  shadowToolbarAmbientY: shadow8DiffuseY,
  shadowToolbarKeyBlur: shadow8BaseBlur,
  shadowToolbarKeyX: shadowBaseX,
  shadowToolbarKeyY: shadow8BaseY,
  shadowWindowActiveAmbientBlur: shadowBaseLayerDiffuseBlur,
  shadowWindowActiveAmbientX: shadowDiffuseX,
  shadowWindowActiveAmbientY: shadowBaseLayerDiffuseY,
  shadowWindowActiveKeyBlur: shadowBaseLayerBaseBlur,
  shadowWindowActiveKeyX: shadowBaseX,
  shadowWindowActiveKeyY: shadowBaseLayerBaseY,
  shadowWindowInactiveAmbientBlur: shadow8DiffuseBlur, // experimental
  shadowWindowInactiveAmbientX: shadowDiffuseX, // experimental
  shadowWindowInactiveAmbientY: shadow4DiffuseY, // experimental
  shadowWindowInactiveKeyBlur: shadow28DiffuseBlur, // experimental
  shadowWindowInactiveKeyX: shadowBaseX, // experimental
  shadowWindowInactiveKeyY: shadow28DiffuseY, // experimental
};

export const shadow: Shadow = {
  shadowCardDisabled:
    '{shadowCardDisabledKeyX} {shadowCardDisabledKeyY} {shadowCardDisabledKeyBlur} 0px {shadowCardDisabledKeyColor}, {shadowCardRestAmbientX} {shadowCardRestAmbientY} {shadowCardRestAmbientBlur} 0px {shadowCardRestAmbientColor}',
  shadowCardDisabledCss: '{shadowCardDisabled}',
  shadowCardHover:
    '{shadowCardHoverKeyX} {shadowCardHoverKeyY} {shadowCardHoverKeyBlur} 0px {shadowCardHoverKeyColor}, {shadowCardRestAmbientX} {shadowCardRestAmbientY} {shadowCardRestAmbientBlur} 0px {shadowCardRestAmbientColor}',
  shadowCardHoverCss: '{shadowCardHover}',
  shadowCardPressed:
    '{shadowCardPressedKeyX} {shadowCardPressedKeyY} {shadowCardPressedKeyBlur} 0px {shadowCardPressedKeyColor}, {shadowCardRestAmbientX} {shadowCardRestAmbientY} {shadowCardRestAmbientBlur} 0px {shadowCardRestAmbientColor}',
  shadowCardPressedCss: '{shadowCardPressed}',
  shadowCardRest:
    '{shadowCardRestKeyX} {shadowCardRestKeyY} {shadowCardRestKeyBlur} 0px {shadowCardRestKeyColor}, {shadowCardRestAmbientX} {shadowCardRestAmbientY} {shadowCardRestAmbientBlur} 0px {shadowCardRestAmbientColor}',
  shadowCardRestCss: '{shadowCardRest}',
  shadowCtrlOnDrag:
    '{shadowCtrlOnDragKeyX} {shadowCtrlOnDragKeyY} {shadowCtrlOnDragKeyBlur} 0px {shadowCtrlOnDragKeyColor}, {shadowCtrlOnDragAmbientX} {shadowCtrlOnDragAmbientY} {shadowCtrlOnDragAmbientBlur} 0px {shadowCtrlOnDragAmbientColor}',
  shadowFlyout:
    '{shadowFlyoutKeyX} {shadowFlyoutKeyY} {shadowFlyoutKeyBlur} 0px {shadowFlyoutKeyColor}, {shadowFlyoutAmbientX} {shadowFlyoutAmbientY} {shadowFlyoutAmbientBlur} 0px {shadowFlyoutAmbientColor}',
  shadowFlyoutCss: '{shadowFlyout}',
  shadowLayer:
    '{shadowLayerKeyX} {shadowLayerKeyY} {shadowLayerKeyBlur} 0px {shadowLayerKeyColor}, {shadowLayerAmbientX} {shadowLayerAmbientY} {shadowLayerAmbientBlur} 0px {shadowLayerAmbientColor}',
  shadowToolbar:
    '{shadowToolbarKeyX} {shadowToolbarKeyY} {shadowToolbarKeyBlur} 0px {shadowToolbarKeyColor}, {shadowToolbarAmbientX} {shadowToolbarAmbientY} {shadowToolbarAmbientBlur} 0px {shadowToolbarAmbientColor}',
  shadowWindowActive:
    '{shadowWindowActiveKeyX} {shadowWindowActiveKeyY} {shadowWindowActiveKeyBlur} 0px {shadowWindowActiveKeyColor}, {shadowWindowActiveAmbientX} {shadowWindowActiveAmbientY} {shadowWindowActiveAmbientBlur} 0px {shadowWindowActiveAmbientColor}',
  shadowWindowInactive:
    '{shadowWindowInactiveKeyX} {shadowWindowInactiveKeyY} {shadowWindowInactiveKeyBlur} 0px {shadowWindowInactiveKeyColor}, {shadowWindowInactiveAmbientX} {shadowWindowInactiveAmbientY} {shadowWindowInactiveAmbientBlur} 0px {shadowWindowInactiveAmbientColor}',
};
