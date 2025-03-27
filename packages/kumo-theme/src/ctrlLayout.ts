import { corner, shadow, size, strokeWidth } from './globalValues.js';

export type CtrlAvatarLayout = {
  ctrlAvatarSize: string;
  ctrlAvatarShowCutout: string;
  ctrlAvatarActiveRingSize: string;
  ctrlAvatarActiveRingStrokewidth: string;
  ctrlAvatarCornerGroup: string;
  ctrlAvatarCornerItem: string;
  ctrlAvatarPresencebadgeStrokewidth: string;
  ctrlAvatarPresencebadgeSize: string;
  ctrlAvatarPresencebadgePadding: string;
  ctrlAvatarIconSize: string;
  ctrlAvatarTextFontsize: string;
  ctrlAvatarTextLineheight: string;
  ctrlAvatarTextPaddingTopOffset: string;
};

export type CtrlBadgeLayout = {
  ctrlBadgeCorner: string;
  ctrlBadgePadding: string;
  ctrlBadgeSize: string;
  ctrlBadgeGap: string;
  ctrlBadgeIconSize: string;
  ctrlBadgeIconTheme: string;
  ctrlBadgeBeaconSize: string;
  ctrlBadgeTextPaddingBottom: string;
  ctrlBadgeTextPaddingTop: string;
  ctrlBadgeSmCorner: string;
  ctrlBadgeSmSize: string;
  ctrlBadgeSmPadding: string;
  ctrlBadgeSmIconSize: string;
  ctrlBadgeSmIconCorner: string;
  ctrlBadgeSmTextPaddingBottom: string;
  ctrlBadgeSmTextPaddingTop: string;
  ctrlBadgeLgCorner: string;
  ctrlBadgeLgSize: string;
  ctrlBadgeLgPadding: string;
  ctrlBadgeLgIconSize: string;
  ctrlBadgeLgIconCorner: string;
  ctrlBadgeLgTextPaddingBottom: string;
  ctrlBadgeLgTextPaddingTop: string;
};

export type CtrlBooleanLayout = {
  selectionHint: string;
};

export type CtrlChoiceLayout = {
  ctrlChoiceIconTheme: string;
  ctrlChoicePaddingHorizontal: string;
  ctrlChoicePaddingVertical: string;
  ctrlChoiceBaseSize: string;
  ctrlChoiceCheckboxCorner: string;
  ctrlChoiceCheckboxIconSize: string;
  ctrlChoiceCheckboxIndeterminateCorner: string;
  ctrlChoiceCheckboxIndeterminateWidth: string;
  ctrlChoiceCheckboxIndeterminateHeight: string;
  ctrlChoiceSwitchHeight: string;
  ctrlChoiceSwitchWidth: string;
  ctrlChoiceSwitchCorner: string;
  ctrlChoiceSwitchPaddingRest: string;
  ctrlChoiceSwitchPaddingHover: string;
  ctrlChoiceSwitchPaddingPressed: string;
  ctrlChoiceSwitchThumbShadowAmbientX: string;
  ctrlChoiceSwitchThumbShadowAmbientY: string;
  ctrlChoiceSwitchThumbShadowAmbientBlur: string;
  ctrlChoiceSwitchThumbShadowKeyX: string;
  ctrlChoiceSwitchThumbShadowKeyY: string;
  ctrlChoiceSwitchThumbShadowKeyBlur: string;
  ctrlChoiceSwitchThumbWidthRest: string;
  ctrlChoiceSwitchThumbWidthHover: string;
  ctrlChoiceSwitchThumbWidthPressed: string;
  ctrlChoiceSmCheckboxCorner: string;
  ctrlChoiceSmCheckboxIconSize: string;
  ctrlChoiceSmBaseSize: string;
  ctrlChoiceSmRadioDotSize: string;
  ctrlChoiceSmSwitchWidth: string;
  ctrlChoiceSmSwitchHeight: string;
  ctrlChoiceSmSwitchThumbWidthRest: string;
  ctrlChoiceSmSwitchThumbWidthHover: string;
  ctrlChoiceSmSwitchThumbWidthPressed: string;
  ctrlChoiceLgBaseSize: string;
  ctrlChoiceLgSwitchWidth: string;
  ctrlChoiceLgSwitchHeight: string;
  ctrlChoiceLgSwitchThumbWidthRest: string;
  ctrlChoiceLgSwitchThumbWidthHover: string;
  ctrlChoiceLgSwitchThumbWidthPressed: string;
  ctrlChoiceLgRadioDotSizeRest: string;
  ctrlChoiceLgRadioDotSizeHover: string;
  ctrlChoiceLgRadioDotSizePressed: string;
  ctrlChoiceLgCheckboxCorner: string;
  ctrlChoiceLgCheckboxIconSize: string;
  ctrlChoiceRadioCorner: string;
  ctrlChoiceRadioDotSizeRest: string;
  ctrlChoiceRadioDotSizeHover: string;
  ctrlChoiceRadioDotSizePressed: string;
};

export type CtrlComposerLayout = {
  ctrlComposerContainerCorner: string;
  ctrlComposerContainerShadowKeyX: string;
  ctrlComposerContainerShadowKeyY: string;
  ctrlComposerContainerShadowKeyBlur: string;
  ctrlComposerContainerShadowAmbientX: string;
  ctrlComposerContainerShadowAmbientY: string;
  ctrlComposerContainerShadowAmbientBlur: string;
  ctrlComposerInputBottomStrokewidthRest: string;
  ctrlComposerInputBottomStrokewidthHover: string;
  ctrlComposerInputBottomStrokewidthPressed: string;
  ctrlComposerInputBottomStrokewidthSelectedRest: string;
  ctrlComposerInputStrokewidthRest: string;
  ctrlComposerInputStrokewidthHover: string;
  ctrlComposerInputStrokewidthPressed: string;
  ctrlComposerInputStrokewidthSelectedRest: string;
  ctrlComposerInputCornerRest: string;
  ctrlComposerInputCornerHover: string;
  ctrlComposerInputCornerPressed: string;
  ctrlComposerInputShadowX: string;
  ctrlComposerInputShadowY: string;
  ctrlComposerInputShadowBlur: string;
};

export type CtrlDialogLayout = {
  ctrlDialogBaseCorner: string;
  ctrlDialogBaseShadowKeyX: string;
  ctrlDialogBaseShadowKeyY: string;
  ctrlDialogBaseShadowKeyBlur: string;
  ctrlDialogBaseShadowAmbientX: string;
  ctrlDialogBaseShadowAmbientY: string;
  ctrlDialogBaseShadowAmbientBlur: string;
  ctrlDialogLayerPaddingBottom: string;
};

export type CtrlDividerLayout = {
  ctrlDividerInsetWidth: string;
  ctrlDividerFixedLineLength: string;
};

export type CtrlFabLayout = {
  ctrlFabCornerRest: string;
  ctrlFabCornerHover: string;
  ctrlFabCornerPressed: string;
  ctrlFabShadowRestKeyX: string;
  ctrlFabShadowRestKeyY: string;
  ctrlFabShadowRestKeyBlur: string;
  ctrlFabShadowRestAmbientX: string;
  ctrlFabShadowRestAmbientY: string;
  ctrlFabShadowRestAmbientBlur: string;
  ctrlFabShadowHoverKeyX: string;
  ctrlFabShadowHoverKeyY: string;
  ctrlFabShadowHoverKeyBlur: string;
  ctrlFabShadowPressedKeyX: string;
  ctrlFabShadowPressedKeyY: string;
  ctrlFabShadowPressedKeyBlur: string;
  ctrlFabShadowDisabledKeyX: string;
  ctrlFabShadowDisabledKeyY: string;
  ctrlFabShadowDisabledKeyBlur: string;
};

export type CtrlInputLayout = {
  ctrlInputStrokewidthRest: string;
  ctrlInputStrokewidthHover: string;
  ctrlInputStrokewidthPressed: string;
  ctrlInputStrokewidthSelected: string;
  ctrlInputBottomLineStrokewidthRest: string;
  ctrlInputBottomLineStrokewidthHover: string;
  ctrlInputBottomLineStrokewidthPressed: string;
  ctrlInputBottomLineStrokewidthSelected: string;
};

export type CtrlLinkLayout = {
  ctrlLinkInlineShowUnderlineAtRest: string;
  ctrlLinkInlineUnderlineDashed: string;
  ctrlLinkInlineUnderlineSolid: string;
  ctrlLinkInlineStrokewidthRest: string;
  ctrlLinkInlineStrokewidthHover: string;
  ctrlLinkOnPageShowUnderlineAtRest: string;
  ctrlLinkOnPageUnderlineDashed: string;
  ctrlLinkOnPageUnderlineSolid: string;
  ctrlLinkOnPageStrokewidthRest: string;
  ctrlLinkOnPageStrokewidthHover: string;
};

export type CtrlListLayout = {
  ctrlListPillFullWidth: string;
  ctrlListPillLengthHint: string;
  ctrlListPillLengthHover: string;
  ctrlListPillLengthPressed: string;
  ctrlListPillLengthRest: string;
  ctrlListPillWidth: string;
  ctrlListPillStretchPaddingDefault: string;
  ctrlListPillStretchPaddingHint: string;
  ctrlListSplitDividerShowDivider: string;
  ctrlListSplitDividerPaddingInset: string;
  ctrlListCornerHover: string;
  ctrlListCornerPressed: string;
  ctrlListCornerRest: string;
  ctrlListIndentLevel1: string;
  ctrlListIndentLevel2: string;
  ctrlListIndentLevel3: string;
  ctrlListSmCornerRest: string;
  ctrlListSmCornerHover: string;
  ctrlListSmCornerPressed: string;
  ctrlListSmIndentLevel1: string;
  ctrlListSmIndentLevel2: string;
  ctrlListSmIndentLevel3: string;
  ctrlListLgCornerRest: string;
  ctrlListLgCornerHover: string;
  ctrlListLgCornerPressed: string;
  ctrlListLgIndentLevel1: string;
  ctrlListLgIndentLevel2: string;
  ctrlListLgIndentLevel3: string;
  ctrlListChoiceCheckboxIconSize: string;
  ctrlListChoiceCheckboxCorner: string;
  ctrlListChoiceDotSize: string;
};

export type CtrlLiteFilterLayout = {
  ctrlLiteFilterStrokewidthSelected: string;
};

export type CtrlFocusLayout = {
  ctrlFocusPosition: string;
  ctrlFocusOuterStrokewidth: string;
  ctrlFocusInnerStrokewidth: string;
};

export type CtrlProgressLayout = {
  ctrlProgressCorner: string;
  ctrlProgressHeightEmpty: string;
  ctrlProgressHeightFilled: string;
  ctrlProgressLgHeightEmpty: string;
  ctrlProgressLgHeightFilled: string;
  ctrlProgressSmHeightEmpty: string;
  ctrlProgressSmHeightFilled: string;
};

export type CtrlRatingLayout = {
  ctrlRatingIconGap: string;
  ctrlRatingIconTheme: string;
  ctrlRatingIconSize: string;
};

export type CtrlSegmentedLayout = {
  ctrlSegmentedGap: string;
  ctrlSegmentedCornerHover: string;
  ctrlSegmentedCornerPressed: string;
  ctrlSegmentedCornerRest: string;
  ctrlSegmentedItemCornerHover: string;
  ctrlSegmentedItemCornerPressed: string;
  ctrlSegmentedItemCornerRest: string;
  ctrlSegmentedPaddingHover: string;
  ctrlSegmentedPaddingPressed: string;
  ctrlSegmentedPaddingRest: string;
  ctrlSegmentedLgItemCornerHover: string;
  ctrlSegmentedLgItemCornerPressed: string;
  ctrlSegmentedLgItemCornerRest: string;
  ctrlSegmentedLgPaddingHover: string;
  ctrlSegmentedLgPaddingPressed: string;
  ctrlSegmentedLgPaddingRest: string;
  ctrlSegmentedLgCornerHover: string;
  ctrlSegmentedLgCornerPressed: string;
  ctrlSegmentedLgCornerRest: string;
  ctrlSegmentedSmItemCornerHover: string;
  ctrlSegmentedSmItemCornerPressed: string;
  ctrlSegmentedSmItemCornerRest: string;
  ctrlSegmentedSmPaddingHover: string;
  ctrlSegmentedSmPaddingPressed: string;
  ctrlSegmentedSmPaddingRest: string;
  ctrlSegmentedSmCornerHover: string;
  ctrlSegmentedSmCornerPressed: string;
  ctrlSegmentedSmCornerRest: string;
};

export type CtrlSliderLayout = {
  ctrlSliderBarCorner: string;
  ctrlSliderBarHeight: string;
  ctrlSliderThumbCorner: string;
  ctrlSliderThumbInnerStrokewidthHover: string;
  ctrlSliderThumbInnerStrokewidthPressed: string;
  ctrlSliderThumbInnerStrokewidthRest: string;
  ctrlSliderThumbSizeRest: string;
  ctrlSliderThumbSizeHover: string;
  ctrlSliderThumbSizePressed: string;
  ctrlSliderThumbOuterStrokewidth: string;
  ctrlSliderLgThumbSizeRest: string;
  ctrlSliderLgThumbSizeHover: string;
  ctrlSliderLgThumbSizePressed: string;
  ctrlSliderLgBarHeight: string;
  ctrlSliderSmThumbSizeRest: string;
  ctrlSliderSmThumbSizeHover: string;
  ctrlSliderSmThumbSizePressed: string;
  ctrlSliderSmBarHeight: string;
};

export type CtrlSplitLayout = {
  ctrlSplitDividerStrokewidth: string;
  ctrlSplitDividerStrokewidthOnSubtle: string;
  ctrlSplitDividerStrokewidthOnoutline: string;
};

export type CtrlSpinnerLayout = {
  ctrlSpinnerStrokewidth: string;
  ctrlSpinnerShowemptytrack: string;
};

export type CtrlTooltipLayout = {
  ctrlTooltipCorner: string;
  ctrlTooltipShadowKeyX: string;
  ctrlTooltipShadowKeyY: string;
  ctrlTooltipShadowKeyBlur: string;
  ctrlTooltipShadowAmbientX: string;
  ctrlTooltipShadowAmbientY: string;
  ctrlTooltipShadowAmbientBlur: string;
  ctrlTooltipShadow: string;
  ctrlTooltipShadowCss: string;
};

export const ctrlAvatarLayout: CtrlAvatarLayout = {
  ctrlAvatarSize: '{sizeCtrlDefault}',
  ctrlAvatarShowCutout: 'true',
  ctrlAvatarActiveRingSize: size[360],
  ctrlAvatarActiveRingStrokewidth: strokeWidth[20],
  ctrlAvatarCornerGroup: corner[20],
  ctrlAvatarCornerItem: corner.circular,
  ctrlAvatarPresencebadgeStrokewidth: strokeWidth[10],
  ctrlAvatarPresencebadgeSize: size[60],
  ctrlAvatarPresencebadgePadding: size[20],
  ctrlAvatarIconSize: size[120],
  ctrlAvatarTextFontsize: size[100],
  ctrlAvatarTextLineheight: size[120],
  ctrlAvatarTextPaddingTopOffset: '11px',
};

export const ctrlBadgeLayout: CtrlBadgeLayout = {
  ctrlBadgeCorner: corner[60],
  ctrlBadgePadding: size[40],
  ctrlBadgeSize: size[240],
  ctrlBadgeGap: size[20],
  ctrlBadgeIconSize: size[160],
  ctrlBadgeIconTheme: 'Regular',
  ctrlBadgeBeaconSize: size[40],
  ctrlBadgeTextPaddingBottom: size[0],
  ctrlBadgeTextPaddingTop: size[0],
  ctrlBadgeSmCorner: corner[60],
  ctrlBadgeSmSize: size[200],
  ctrlBadgeSmPadding: size[40],
  ctrlBadgeSmIconSize: size[120],
  ctrlBadgeSmIconCorner: corner[40],
  ctrlBadgeSmTextPaddingBottom: size[0],
  ctrlBadgeSmTextPaddingTop: size[0],
  ctrlBadgeLgPadding: size[40],
  ctrlBadgeLgSize: size[280],
  ctrlBadgeLgCorner: corner[60],
  ctrlBadgeLgIconSize: size[200],
  ctrlBadgeLgIconCorner: corner[60],
  ctrlBadgeLgTextPaddingTop: size[0],
  ctrlBadgeLgTextPaddingBottom: size[0],
};

export const ctrlBooleanLayout: CtrlBooleanLayout = {
  selectionHint: 'true',
};

export const ctrlChoiceLayout: CtrlChoiceLayout = {
  ctrlChoiceIconTheme: 'Filled',
  ctrlChoicePaddingHorizontal: size[0],
  ctrlChoicePaddingVertical: size[40],
  ctrlChoiceBaseSize: size[200],
  ctrlChoiceCheckboxCorner: corner[60],
  ctrlChoiceCheckboxIconSize: size[100],
  ctrlChoiceCheckboxIndeterminateCorner: corner.circular,
  ctrlChoiceCheckboxIndeterminateWidth: size[80],
  ctrlChoiceCheckboxIndeterminateHeight: '1.5px',
  ctrlChoiceSwitchHeight: size[200],
  ctrlChoiceSwitchWidth: '36px',
  ctrlChoiceSwitchCorner: corner.circular,
  ctrlChoiceSwitchPaddingRest: size[40],
  ctrlChoiceSwitchPaddingHover: size[40],
  ctrlChoiceSwitchPaddingPressed: size[40],
  ctrlChoiceSwitchThumbShadowAmbientX: '{nullNumber}',
  ctrlChoiceSwitchThumbShadowAmbientY: '{nullNumber}',
  ctrlChoiceSwitchThumbShadowAmbientBlur: '{nullNumber}',
  ctrlChoiceSwitchThumbShadowKeyX: '{nullNumber}',
  ctrlChoiceSwitchThumbShadowKeyY: '{nullNumber}',
  ctrlChoiceSwitchThumbShadowKeyBlur: '{nullNumber}',
  ctrlChoiceSwitchThumbWidthPressed: size[200],
  ctrlChoiceSwitchThumbWidthHover: '14px',
  ctrlChoiceSwitchThumbWidthRest: '12px',
  ctrlChoiceSmCheckboxCorner: corner[80],
  ctrlChoiceSmCheckboxIconSize: corner[120],
  ctrlChoiceSmBaseSize: size[160],
  ctrlChoiceSmRadioDotSize: size[80],
  ctrlChoiceSmSwitchWidth: size[360],
  ctrlChoiceSmSwitchHeight: size[200],
  ctrlChoiceSmSwitchThumbWidthHover: size[120],
  ctrlChoiceSmSwitchThumbWidthPressed: size[160],
  ctrlChoiceSmSwitchThumbWidthRest: size[100],
  ctrlChoiceLgBaseSize: size[280],
  ctrlChoiceLgSwitchWidth: size[520],
  ctrlChoiceLgSwitchHeight: size[280],
  ctrlChoiceLgSwitchThumbWidthPressed: size[240],
  ctrlChoiceLgSwitchThumbWidthRest: '18px',
  ctrlChoiceLgSwitchThumbWidthHover: size[200],
  ctrlChoiceLgRadioDotSizeHover: size[160],
  ctrlChoiceLgRadioDotSizeRest: '14px',
  ctrlChoiceLgRadioDotSizePressed: size[120],
  ctrlChoiceLgCheckboxCorner: corner[40],
  ctrlChoiceLgCheckboxIconSize: '16px',
  ctrlChoiceRadioCorner: corner.circular,
  ctrlChoiceRadioDotSizeHover: size[100],
  ctrlChoiceRadioDotSizePressed: size[100],
  ctrlChoiceRadioDotSizeRest: size[100],
};

export const ctrlComposerLayout: CtrlComposerLayout = {
  ctrlComposerContainerCorner: corner[240],
  ctrlComposerContainerShadowKeyX: '{shadowFlyoutKeyX}',
  ctrlComposerContainerShadowKeyY: '{shadowFlyoutKeyY}',
  ctrlComposerContainerShadowKeyBlur: '{shadowFlyoutKeyBlur}',
  ctrlComposerContainerShadowAmbientX: '{shadowFlyoutAmbientX}',
  ctrlComposerContainerShadowAmbientY: '{shadowFlyoutAmbientY}',
  ctrlComposerContainerShadowAmbientBlur: '{shadowFlyoutAmbientBlur}',
  ctrlComposerInputBottomStrokewidthRest: strokeWidth[0],
  ctrlComposerInputBottomStrokewidthHover: strokeWidth[0],
  ctrlComposerInputBottomStrokewidthPressed: strokeWidth[0],
  ctrlComposerInputBottomStrokewidthSelectedRest: strokeWidth[0],
  ctrlComposerInputStrokewidthRest: strokeWidth[0],
  ctrlComposerInputStrokewidthHover: strokeWidth[0],
  ctrlComposerInputStrokewidthPressed: strokeWidth[0],
  ctrlComposerInputStrokewidthSelectedRest: strokeWidth[0],
  ctrlComposerInputCornerRest: corner[240],
  ctrlComposerInputCornerHover: '26px',
  ctrlComposerInputCornerPressed: '28px',
  ctrlComposerInputShadowX: size[0],
  ctrlComposerInputShadowY: '1px',
  ctrlComposerInputShadowBlur: '2px',
};

export const ctrlDialogLayout: CtrlDialogLayout = {
  ctrlDialogBaseCorner: corner[80],
  ctrlDialogBaseShadowKeyX: shadow.shadowKeyX,
  ctrlDialogBaseShadowKeyY: shadow.shadowKeyY64,
  ctrlDialogBaseShadowKeyBlur: shadow.shadowKeyBlur64,
  ctrlDialogBaseShadowAmbientX: shadow.shadowAmbientX,
  ctrlDialogBaseShadowAmbientY: shadow.shadowAmbientY,
  ctrlDialogBaseShadowAmbientBlur: shadow.shadowAmbientBlurHigh,
  ctrlDialogLayerPaddingBottom: size[0],
};

export const ctrlDividerLayout: CtrlDividerLayout = {
  ctrlDividerInsetWidth: '0px',
  ctrlDividerFixedLineLength: size[80],
};

export const ctrlFabLayout: CtrlFabLayout = {
  ctrlFabCornerRest: corner[120],
  ctrlFabCornerHover: corner[120],
  ctrlFabCornerPressed: corner[120],
  ctrlFabShadowRestKeyX: shadow.shadowKeyX,
  ctrlFabShadowRestKeyY: shadow.shadowKeyY8,
  ctrlFabShadowRestKeyBlur: shadow.shadowKeyBlur8,
  ctrlFabShadowRestAmbientX: shadow.shadowAmbientX,
  ctrlFabShadowRestAmbientY: shadow.shadowAmbientY,
  ctrlFabShadowRestAmbientBlur: shadow.shadowAmbientBlurLow,
  ctrlFabShadowHoverKeyX: shadow.shadowKeyX,
  ctrlFabShadowHoverKeyY: shadow.shadowKeyY16,
  ctrlFabShadowHoverKeyBlur: shadow.shadowKeyBlur16,
  ctrlFabShadowPressedKeyX: shadow.shadowKeyX,
  ctrlFabShadowPressedKeyY: shadow.shadowKeyY2,
  ctrlFabShadowPressedKeyBlur: shadow.shadowKeyBlur2,
  ctrlFabShadowDisabledKeyX: shadow.shadowKeyX,
  ctrlFabShadowDisabledKeyY: shadow.shadowKeyY2,
  ctrlFabShadowDisabledKeyBlur: shadow.shadowKeyBlur2,
};

export const ctrlInputLayout: CtrlInputLayout = {
  ctrlInputStrokewidthRest: '{strokeWidthDefault}',
  ctrlInputStrokewidthHover: '{strokeWidthDefault}',
  ctrlInputStrokewidthPressed: '{strokeWidthDefault}',
  ctrlInputStrokewidthSelected: strokeWidth[10],
  ctrlInputBottomLineStrokewidthRest: '{strokeWidthDefault}',
  ctrlInputBottomLineStrokewidthHover: '{strokeWidthDefault}',
  ctrlInputBottomLineStrokewidthPressed:
    '{ctrlInputBottomLineStrokewidthSelected}',
  ctrlInputBottomLineStrokewidthSelected: strokeWidth[20],
};

export const ctrlLinkLayout: CtrlLinkLayout = {
  ctrlLinkInlineShowUnderlineAtRest: 'false',
  ctrlLinkInlineUnderlineDashed: 'false',
  ctrlLinkInlineUnderlineSolid: 'false',
  ctrlLinkInlineStrokewidthRest: strokeWidth[10],
  ctrlLinkInlineStrokewidthHover: strokeWidth[10],
  ctrlLinkOnPageShowUnderlineAtRest: 'false',
  ctrlLinkOnPageUnderlineDashed: 'false',
  ctrlLinkOnPageUnderlineSolid: 'true',
  ctrlLinkOnPageStrokewidthRest: strokeWidth[10],
  ctrlLinkOnPageStrokewidthHover: strokeWidth[10],
};

export const ctrlListLayout: CtrlListLayout = {
  ctrlListPillFullWidth: 'false',
  ctrlListPillLengthHint: size[200],
  ctrlListPillLengthHover: size[200],
  ctrlListPillLengthPressed: size[200],
  ctrlListPillLengthRest: size[200],
  ctrlListPillWidth: '3px',
  ctrlListPillStretchPaddingDefault: size[120],
  ctrlListPillStretchPaddingHint: size[200],
  ctrlListSplitDividerShowDivider: 'true',
  ctrlListSplitDividerPaddingInset: size[40],
  ctrlListCornerHover: corner[40],
  ctrlListCornerPressed: corner[40],
  ctrlListCornerRest: corner[40],
  ctrlListIndentLevel1: '{paddingCtrlHorizontalDefault}',
  ctrlListIndentLevel2: '32px',
  ctrlListIndentLevel3: '56px',
  ctrlListSmCornerRest: '{cornerCtrlSmRest}',
  ctrlListSmCornerHover: '{cornerCtrlSmHover}',
  ctrlListSmCornerPressed: '{cornerCtrlSmPressed}',
  ctrlListSmIndentLevel1: '{paddingCtrlSmHorizontalDefault}',
  ctrlListSmIndentLevel2: '34px',
  ctrlListSmIndentLevel3: '58px',
  ctrlListLgCornerRest: '{cornerCtrlLgRest}',
  ctrlListLgCornerHover: '{cornerCtrlLgHover}',
  ctrlListLgCornerPressed: '{cornerCtrlLgPressed}',
  ctrlListLgIndentLevel1: '{paddingCtrlLgHorizontalDefault}',
  ctrlListLgIndentLevel2: '42px',
  ctrlListLgIndentLevel3: '74px',
  ctrlListChoiceCheckboxIconSize: size[160],
  ctrlListChoiceCheckboxCorner: '0px',
  ctrlListChoiceDotSize: size[40],
};

export const ctrlLiteFilterLayout: CtrlLiteFilterLayout = {
  ctrlLiteFilterStrokewidthSelected: strokeWidth[10],
};

export const ctrlFocusLayout: CtrlFocusLayout = {
  ctrlFocusPosition: 'Both Outside',
  ctrlFocusOuterStrokewidth: strokeWidth[20],
  ctrlFocusInnerStrokewidth: strokeWidth[10],
};

export const ctrlProgressLayout: CtrlProgressLayout = {
  ctrlProgressCorner: corner.circular,
  ctrlProgressHeightEmpty: size[30],
  ctrlProgressHeightFilled: size[30],
  ctrlProgressLgHeightEmpty: size[40],
  ctrlProgressLgHeightFilled: size[40],
  ctrlProgressSmHeightEmpty: '1px',
  ctrlProgressSmHeightFilled: '1px',
};

export const ctrlRatingLayout: CtrlRatingLayout = {
  ctrlRatingIconGap: size[20],
  ctrlRatingIconTheme: 'Filled',
  ctrlRatingIconSize: size[120],
};

export const ctrlSegmentedLayout: CtrlSegmentedLayout = {
  ctrlSegmentedGap: size[0],
  ctrlSegmentedCornerHover: '{cornerCtrlHover}',
  ctrlSegmentedCornerPressed: '{cornerCtrlPressed}',
  ctrlSegmentedCornerRest: '{cornerCtrlRest}',
  ctrlSegmentedItemCornerHover: '{cornerCtrlSmHover}',
  ctrlSegmentedItemCornerPressed: '{cornerCtrlSmPressed}',
  ctrlSegmentedItemCornerRest: '{cornerCtrlSmRest}',
  ctrlSegmentedPaddingHover: '5px',
  ctrlSegmentedPaddingPressed: '7px',
  ctrlSegmentedPaddingRest: size[40],
  ctrlSegmentedLgItemCornerHover: '0px',
  ctrlSegmentedLgItemCornerPressed: '0px',
  ctrlSegmentedLgItemCornerRest: '0px',
  ctrlSegmentedLgPaddingHover: '0px',
  ctrlSegmentedLgPaddingPressed: '0px',
  ctrlSegmentedLgPaddingRest: '0px',
  ctrlSegmentedLgCornerHover: '0px',
  ctrlSegmentedLgCornerPressed: '0px',
  ctrlSegmentedLgCornerRest: '0px',
  ctrlSegmentedSmItemCornerHover: '0px',
  ctrlSegmentedSmItemCornerPressed: '0px',
  ctrlSegmentedSmItemCornerRest: '0px',
  ctrlSegmentedSmPaddingHover: '0px',
  ctrlSegmentedSmPaddingPressed: '0px',
  ctrlSegmentedSmPaddingRest: '0px',
  ctrlSegmentedSmCornerHover: '0px',
  ctrlSegmentedSmCornerPressed: '0px',
  ctrlSegmentedSmCornerRest: '0px',
};

export const ctrlSliderLayout: CtrlSliderLayout = {
  ctrlSliderBarCorner: corner.circular,
  ctrlSliderBarHeight: '{ctrlProgressHeightFilled}',
  ctrlSliderThumbCorner: corner.circular,
  ctrlSliderThumbInnerStrokewidthHover: '{ctrlSliderThumbInnerStrokewidthRest}',
  ctrlSliderThumbInnerStrokewidthPressed:
    '{ctrlSliderThumbInnerStrokewidthRest}',
  ctrlSliderThumbInnerStrokewidthRest: strokeWidth[40],
  ctrlSliderThumbSizeRest: '{sizeCtrlIcon}',
  ctrlSliderThumbSizeHover: '22px',
  ctrlSliderThumbSizePressed: '18px',
  ctrlSliderThumbOuterStrokewidth: '1px',
  ctrlSliderLgThumbSizeRest: '{ctrlSliderThumbSizeRest}',
  ctrlSliderLgThumbSizeHover: '0px',
  ctrlSliderLgThumbSizePressed: '0px',
  ctrlSliderLgBarHeight: '0px',
  ctrlSliderSmThumbSizeRest: '{ctrlSliderThumbSizeRest}',
  ctrlSliderSmThumbSizeHover: '0px',
  ctrlSliderSmThumbSizePressed: '0px',
  ctrlSliderSmBarHeight: '0px',
};

export const ctrlSplitLayout: CtrlSplitLayout = {
  ctrlSplitDividerStrokewidth: strokeWidth[10],
  ctrlSplitDividerStrokewidthOnSubtle: strokeWidth[0],
  ctrlSplitDividerStrokewidthOnoutline: strokeWidth[10],
};

export const ctrlSpinnerLayout: CtrlSpinnerLayout = {
  ctrlSpinnerStrokewidth: strokeWidth[20],
  ctrlSpinnerShowemptytrack: 'false',
};

export const ctrlTooltipLayout: CtrlTooltipLayout = {
  ctrlTooltipCorner: '{cornerCtrlRest}',
  ctrlTooltipShadowKeyX: shadow.shadowKeyX,
  ctrlTooltipShadowKeyY: shadow.shadowKeyY8,
  ctrlTooltipShadowKeyBlur: shadow.shadowKeyBlur8,
  ctrlTooltipShadowAmbientX: shadow.shadowAmbientX,
  ctrlTooltipShadowAmbientY: shadow.shadowAmbientY,
  ctrlTooltipShadowAmbientBlur: shadow.shadowAmbientBlurLow,
  ctrlTooltipShadow:
    '{ctrlTooltipShadowKeyX} {ctrlTooltipShadowKeyY} {ctrlTooltipShadowKeyBlur} 0px {ctrlTooltipShadowKeyColor}, {ctrlTooltipShadowAmbientX} {ctrlTooltipShadowAmbientY} {ctrlTooltipShadowAmbientBlur} 0px {ctrlTooltipShadowAmbientColor}',
  ctrlTooltipShadowCss: '{ctrlTooltipShadow}',
};
