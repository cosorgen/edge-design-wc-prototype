import { shadow as s } from './globalValues.js';

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
  shadowCardHover: string;
  shadowCardPressed: string;
  shadowCardRest: string;
  shadowCtrlOnDrag: string;
  shadowFlyout: string;
  shadowFlyoutCss: string;
  shadowLayer: string;
  shadowToolbar: string;
  shadowWindowActive: string;
  shadowWindowInactive: string;
};

export const shadowParts: ShadowParts = {
  shadowCardDisabledKeyBlur: '2px',
  shadowCardDisabledKeyX: '0px',
  shadowCardDisabledKeyY: '1px',
  shadowCardHoverKeyBlur: '10px',
  shadowCardHoverKeyX: '0px',
  shadowCardHoverKeyY: '3px',
  shadowCardPressedKeyBlur: '8px',
  shadowCardPressedKeyX: '0px',
  shadowCardPressedKeyY: '1px',
  shadowCardRestAmbientBlur: '2px',
  shadowCardRestAmbientX: '0px',
  shadowCardRestAmbientY: '0px',
  shadowCardRestKeyBlur: '2px',
  shadowCardRestKeyX: '0px',
  shadowCardRestKeyY: '1px',
  shadowCtrlOnDragAmbientBlur: '{shadowFlyoutAmbientBlur}',
  shadowCtrlOnDragAmbientX: '{shadowFlyoutAmbientX}',
  shadowCtrlOnDragAmbientY: '{shadowFlyoutAmbientY}',
  shadowCtrlOnDragKeyBlur: '{shadowFlyoutKeyBlur}',
  shadowCtrlOnDragKeyX: '{shadowFlyoutKeyX}',
  shadowCtrlOnDragKeyY: '{shadowFlyoutKeyY}',
  shadowFlyoutAmbientBlur: s.shadowAmbientBlurLow,
  shadowFlyoutAmbientX: s.shadowAmbientX,
  shadowFlyoutAmbientY: s.shadowAmbientY,
  shadowFlyoutKeyBlur: s.shadowKeyBlur16,
  shadowFlyoutKeyX: s.shadowKeyX,
  shadowFlyoutKeyY: s.shadowKeyY16,
  shadowLayerAmbientBlur: '2px',
  shadowLayerAmbientX: '0px',
  shadowLayerAmbientY: '0px',
  shadowLayerKeyBlur: '2px',
  shadowLayerKeyX: '0px',
  shadowLayerKeyY: '1px',
  shadowToolbarAmbientBlur: s.shadowAmbientBlurLow,
  shadowToolbarAmbientX: s.shadowAmbientX,
  shadowToolbarAmbientY: s.shadowAmbientY,
  shadowToolbarKeyBlur: s.shadowKeyBlur8,
  shadowToolbarKeyX: s.shadowKeyX,
  shadowToolbarKeyY: s.shadowKeyY8,
  shadowWindowActiveAmbientBlur: '28px',
  shadowWindowActiveAmbientX: '0px',
  shadowWindowActiveAmbientY: '20px',
  shadowWindowActiveKeyBlur: '12px',
  shadowWindowActiveKeyX: '0px',
  shadowWindowActiveKeyY: '3px',
  shadowWindowInactiveAmbientBlur: '12px',
  shadowWindowInactiveAmbientX: '0px',
  shadowWindowInactiveAmbientY: '3px',
  shadowWindowInactiveKeyBlur: '12px',
  shadowWindowInactiveKeyX: '0px',
  shadowWindowInactiveKeyY: '3px',
};

export const shadow: Shadow = {
  shadowCardDisabled:
    '{shadowCardDisabledKeyX} {shadowCardDisabledKeyY} {shadowCardDisabledKeyBlur} 0px {shadowCardDisabledKeyColor}, {shadowCardRestAmbientX} {shadowCardRestAmbientY} {shadowCardRestAmbientBlur} 0px {shadowCardRestAmbientColor}',
  shadowCardHover:
    '{shadowCardHoverKeyX} {shadowCardHoverKeyY} {shadowCardHoverKeyBlur} 0px {shadowCardHoverKeyColor}, {shadowCardRestAmbientX} {shadowCardRestAmbientY} {shadowCardRestAmbientBlur} 0px {shadowCardRestAmbientColor}',
  shadowCardPressed:
    '{shadowCardPressedKeyX} {shadowCardPressedKeyY} {shadowCardPressedKeyBlur} 0px {shadowCardPressedKeyColor}, {shadowCardRestAmbientX} {shadowCardRestAmbientY} {shadowCardRestAmbientBlur} 0px {shadowCardRestAmbientColor}',
  shadowCardRest:
    '{shadowCardRestKeyX} {shadowCardRestKeyY} {shadowCardRestKeyBlur} 0px {shadowCardRestKeyColor}, {shadowCardRestAmbientX} {shadowCardRestAmbientY} {shadowCardRestAmbientBlur} 0px {shadowCardRestAmbientColor}',
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
