import { shadow as s } from './globalValues.js';

export type ShadowParts = {
  shadowFlyoutKeyX: string;
  shadowFlyoutKeyY: string;
  shadowFlyoutKeyBlur: string;
  shadowFlyoutAmbientX: string;
  shadowFlyoutAmbientY: string;
  shadowFlyoutAmbientBlur: string;
  shadowToolbarKeyX: string;
  shadowToolbarKeyY: string;
  shadowToolbarKeyBlur: string;
  shadowToolbarAmbientX: string;
  shadowToolbarAmbientY: string;
  shadowToolbarAmbientBlur: string;
  shadowCardRestKeyX: string;
  shadowCardRestKeyY: string;
  shadowCardRestKeyBlur: string;
  shadowCardRestAmbientX: string;
  shadowCardRestAmbientY: string;
  shadowCardRestAmbientBlur: string;
  shadowCardHoverKeyX: string;
  shadowCardHoverKeyY: string;
  shadowCardHoverKeyBlur: string;
  shadowCardPressedKeyX: string;
  shadowCardPressedKeyY: string;
  shadowCardPressedKeyBlur: string;
  shadowCardDisabledKeyX: string;
  shadowCardDisabledKeyY: string;
  shadowCardDisabledKeyBlur: string;
  shadowCtrlOnDragKeyX: string;
  shadowCtrlOnDragKeyY: string;
  shadowCtrlOnDragKeyBlur: string;
  shadowCtrlOnDragAmbientX: string;
  shadowCtrlOnDragAmbientY: string;
  shadowCtrlOnDragAmbientBlur: string;
  shadowLayerKeyX: string;
  shadowLayerKeyY: string;
  shadowLayerKeyBlur: string;
  shadowLayerAmbientX: string;
  shadowLayerAmbientY: string;
  shadowLayerAmbientBlur: string;
  shadowWindowActiveKeyX: string;
  shadowWindowActiveKeyY: string;
  shadowWindowActiveKeyBlur: string;
  shadowWindowActiveAmbientX: string;
  shadowWindowActiveAmbientY: string;
  shadowWindowActiveAmbientBlur: string;
  shadowWindowInactiveKeyX: string;
  shadowWindowInactiveKeyY: string;
  shadowWindowInactiveKeyBlur: string;
  shadowWindowInactiveAmbientX: string;
  shadowWindowInactiveAmbientY: string;
  shadowWindowInactiveAmbientBlur: string;
};

export type Shadow = {
  shadowFlyout: string;
  shadowToolbar: string;
  shadowCardRest: string;
  shadowCardHover: string;
  shadowCardPressed: string;
  shadowCardDisabled: string;
  shadowCtrlOnDrag: string;
  shadowLayer: string;
  shadowWindowActive: string;
  shadowWindowInactive: string;
};

export const shadowParts: ShadowParts = {
  shadowFlyoutKeyX: s.shadowKeyX,
  shadowFlyoutKeyY: s.shadowKeyY16,
  shadowFlyoutKeyBlur: s.shadowKeyBlur16,
  shadowFlyoutAmbientX: s.shadowAmbientX,
  shadowFlyoutAmbientY: s.shadowAmbientY,
  shadowFlyoutAmbientBlur: s.shadowAmbientBlurLow,
  shadowToolbarKeyX: s.shadowKeyX,
  shadowToolbarKeyY: s.shadowKeyY8,
  shadowToolbarKeyBlur: s.shadowKeyBlur8,
  shadowToolbarAmbientX: s.shadowAmbientX,
  shadowToolbarAmbientY: s.shadowAmbientY,
  shadowToolbarAmbientBlur: s.shadowAmbientBlurLow,
  shadowCardRestKeyX: '0px',
  shadowCardRestKeyY: '1px',
  shadowCardRestKeyBlur: '2px',
  shadowCardRestAmbientX: '0px',
  shadowCardRestAmbientY: '0px',
  shadowCardRestAmbientBlur: '2px',
  shadowCardHoverKeyX: '0px',
  shadowCardHoverKeyY: '3px',
  shadowCardHoverKeyBlur: '10px',
  shadowCardPressedKeyX: '0px',
  shadowCardPressedKeyY: '1px',
  shadowCardPressedKeyBlur: '8px',
  shadowCardDisabledKeyX: '0px',
  shadowCardDisabledKeyY: '1px',
  shadowCardDisabledKeyBlur: '2px',
  shadowCtrlOnDragKeyX: '{shadowFlyoutKeyX}',
  shadowCtrlOnDragKeyY: '{shadowFlyoutKeyY}',
  shadowCtrlOnDragKeyBlur: '{shadowFlyoutKeyBlur}',
  shadowCtrlOnDragAmbientX: '{shadowFlyoutAmbientX}',
  shadowCtrlOnDragAmbientY: '{shadowFlyoutAmbientY}',
  shadowCtrlOnDragAmbientBlur: '{shadowFlyoutAmbientBlur}',
  shadowLayerKeyX: '0px',
  shadowLayerKeyY: '1px',
  shadowLayerKeyBlur: '2px',
  shadowLayerAmbientX: '0px',
  shadowLayerAmbientY: '0px',
  shadowLayerAmbientBlur: '2px',
  shadowWindowActiveKeyX: '0px',
  shadowWindowActiveKeyY: '3px',
  shadowWindowActiveKeyBlur: '12px',
  shadowWindowActiveAmbientX: '0px',
  shadowWindowActiveAmbientY: '20px',
  shadowWindowActiveAmbientBlur: '28px',
  shadowWindowInactiveKeyX: '0px',
  shadowWindowInactiveKeyY: '3px',
  shadowWindowInactiveKeyBlur: '12px',
  shadowWindowInactiveAmbientX: '0px',
  shadowWindowInactiveAmbientY: '3px',
  shadowWindowInactiveAmbientBlur: '12px',
};

export const shadow: Shadow = {
  shadowFlyout:
    '{shadowFlyoutKeyX} {shadowFlyoutKeyY} {shadowFlyoutKeyBlur} 0px {shadowFlyoutKeyColor}, {shadowFlyoutAmbientX} {shadowFlyoutAmbientY} {shadowFlyoutAmbientBlur} 0px {shadowFlyoutAmbientColor}',
  shadowToolbar:
    '{shadowToolbarKeyX} {shadowToolbarKeyY} {shadowToolbarKeyBlur} 0px {shadowToolbarKeyColor}, {shadowToolbarAmbientX} {shadowToolbarAmbientY} {shadowToolbarAmbientBlur} 0px {shadowToolbarAmbientColor}',
  shadowCardRest:
    '{shadowCardRestKeyX} {shadowCardRestKeyY} {shadowCardRestKeyBlur} 0px {shadowCardRestKeyColor}, {shadowCardRestAmbientX} {shadowCardRestAmbientY} {shadowCardRestAmbientBlur} 0px {shadowCardRestAmbientColor}',
  shadowCardHover:
    '{shadowCardHoverKeyX} {shadowCardHoverKeyY} {shadowCardHoverKeyBlur} 0px {shadowCardHoverKeyColor}, {shadowCardHoverAmbientX} {shadowCardHoverAmbientY} {shadowCardHoverAmbientBlur} 0px {shadowCardHoverAmbientColor}',
  shadowCardPressed:
    '{shadowCardPressedKeyX} {shadowCardPressedKeyY} {shadowCardPressedKeyBlur} 0px {shadowCardPressedKeyColor}, {shadowCardPressedAmbientX} {shadowCardPressedAmbientY} {shadowCardPressedAmbientBlur} 0px {shadowCardPressedAmbientColor}',
  shadowCardDisabled:
    '{shadowCardDisabledKeyX} {shadowCardDisabledKeyY} {shadowCardDisabledKeyBlur} 0px {shadowCardDisabledKeyColor}, {shadowCardDisabledAmbientX} {shadowCardDisabledAmbientY} {shadowCardDisabledAmbientBlur} 0px {shadowCardDisabledAmbientColor}',
  shadowCtrlOnDrag:
    '{shadowCtrlOnDragKeyX} {shadowCtrlOnDragKeyY} {shadowCtrlOnDragKeyBlur} 0px {shadowCtrlOnDragKeyColor}, {shadowCtrlOnDragAmbientX} {shadowCtrlOnDragAmbientY} {shadowCtrlOnDragAmbientBlur} 0px {shadowCtrlOnDragAmbientColor}',
  shadowLayer:
    '{shadowLayerKeyX} {shadowLayerKeyY} {shadowLayerKeyBlur} 0px {shadowLayerKeyColor}, {shadowLayerAmbientX} {shadowLayerAmbientY} {shadowLayerAmbientBlur} 0px {shadowLayerAmbientColor}',
  shadowWindowActive:
    '{shadowWindowActiveKeyX} {shadowWindowActiveKeyY} {shadowWindowActiveKeyBlur} 0px {shadowWindowActiveKeyColor}, {shadowWindowActiveAmbientX} {shadowWindowActiveAmbientY} {shadowWindowActiveAmbientBlur} 0px {shadowWindowActiveAmbientColor}',
  shadowWindowInactive:
    '{shadowWindowInactiveKeyX} {shadowWindowInactiveKeyY} {shadowWindowInactiveKeyBlur} 0px {shadowWindowInactiveKeyColor}, {shadowWindowInactiveAmbientX} {shadowWindowInactiveAmbientY} {shadowWindowInactiveAmbientBlur} 0px {shadowWindowInactiveAmbientColor}',
};
