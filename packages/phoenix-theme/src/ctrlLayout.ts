import {
  borderRadiusCircular,
  borderRadiusLarge,
  borderRadiusMedium,
  borderRadiusSmall,
  borderRadiusXLarge,
  fontSizeBase100,
  shadow16BaseBlur,
  shadow16BaseY,
  shadow16DiffuseBlur,
  shadow16DiffuseY,
  shadow28DiffuseBlur,
  shadow28DiffuseY,
  shadow2DiffuseBlur,
  shadow2DiffuseY,
  shadow8BaseBlur,
  shadow8BaseY,
  shadow8DiffuseBlur,
  shadow8DiffuseY,
  shadowBaseX,
  shadowDiffuseX,
  spacingHorizontalL,
  spacingHorizontalM,
  spacingHorizontalMNudge,
  spacingHorizontalNone,
  spacingHorizontalS,
  spacingHorizontalSNudge,
  spacingHorizontalXL,
  spacingHorizontalXS,
  spacingHorizontalXXL,
  spacingHorizontalXXS,
  strokeWidthThick,
  strokeWidthThickest,
  strokeWidthThin,
  lineHeightBase100,
  spacingHorizontalXXXL,
} from '@phoenixui/themes/tokens.js';

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
  ctrlBooleanSelectionhint: string;
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
  controlComposerContainerCorner: string;
  controlComposerContainerShadowAmbient: string;
  controlComposerContainerShadowKey: string;
  controlComposerInputCornerHover: string;
  controlComposerInputCornerPressed: string;
  controlComposerInputCornerRest: string;
  controlComposerInputShadow: string;
  ctrlComposerContainerCorner: string;
  ctrlComposerContainerShadow: string;
  ctrlComposerContainerShadowAmbient: string;
  ctrlComposerContainerShadowAmbientBlur: string;
  ctrlComposerContainerShadowAmbientX: string;
  ctrlComposerContainerShadowAmbientY: string;
  ctrlComposerContainerShadowCss: string;
  ctrlComposerContainerShadowKey: string;
  ctrlComposerContainerShadowKeyBlur: string;
  ctrlComposerContainerShadowKeyX: string;
  ctrlComposerContainerShadowKeyY: string;
  ctrlComposerInputBottomStrokewidthHover: string;
  ctrlComposerInputBottomStrokewidthPressed: string;
  ctrlComposerInputBottomStrokewidthRest: string;
  ctrlComposerInputBottomStrokewidthSelectedRest: string;
  ctrlComposerInputCornerHover: string;
  ctrlComposerInputCornerPressed: string;
  ctrlComposerInputCornerRest: string;
  ctrlComposerInputShadow: string;
  ctrlComposerInputShadowBlur: string;
  ctrlComposerInputShadowX: string;
  ctrlComposerInputShadowY: string;
  ctrlComposerInputStrokewidthHover: string;
  ctrlComposerInputStrokewidthPressed: string;
  ctrlComposerInputStrokewidthRest: string;
  ctrlComposerInputStrokewidthSelectedRest: string;
};

export type CtrlDialogLayout = {
  ctrlDialogBaseCorner: string;
  ctrlDialogBaseShadow: string;
  ctrlDialogBaseShadowAmbientBlur: string;
  ctrlDialogBaseShadowAmbientX: string;
  ctrlDialogBaseShadowAmbientY: string;
  ctrlDialogBaseShadowCss: string;
  ctrlDialogBaseShadowKeyBlur: string;
  ctrlDialogBaseShadowKeyX: string;
  ctrlDialogBaseShadowKeyY: string;
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
  ctrlInputBottomlineStrokewidthRest: string;
  ctrlInputBottomlineStrokewidthHover: string;
  ctrlInputBottomlineStrokewidthPressed: string;
  ctrlInputBottomlineStrokewidthSelected: string;
};

export type CtrlLinkLayout = {
  ctrlLinkInlineShowUnderlineAtRest: string;
  ctrlLinkInlineUnderlineDashed: string;
  ctrlLinkInlineUnderlineSolid: string;
  ctrlLinkInlineStrokewidthRest: string;
  ctrlLinkInlineStrokewidthHover: string;
  ctrlLinkOnpageShowUnderlineAtRest: string;
  ctrlLinkOnpageUnderlineDashed: string;
  ctrlLinkOnpageUnderlineSolid: string;
  ctrlLinkOnpageStrokewidthRest: string;
  ctrlLinkOnpageStrokewidthHover: string;
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

export type CtrlLitefilterLayout = {
  ctrlLitefilterStrokewidthSelected: string;
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

export type CtrlTabLayout = {
  ctrlTabCorner: string;
  ctrlTabShadowVerticalActive: string;
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
  ctrlAvatarShowCutout: 'true', // unmappable
  ctrlAvatarActiveRingSize: '36px', // unmappable
  ctrlAvatarActiveRingStrokewidth: strokeWidthThick,
  ctrlAvatarCornerGroup: spacingHorizontalXXS,
  ctrlAvatarCornerItem: borderRadiusCircular,
  ctrlAvatarPresencebadgeStrokewidth: strokeWidthThin,
  ctrlAvatarPresencebadgeSize: spacingHorizontalSNudge,
  ctrlAvatarPresencebadgePadding: spacingHorizontalXXS,
  ctrlAvatarIconSize: spacingHorizontalM,
  ctrlAvatarTextFontsize: fontSizeBase100,
  ctrlAvatarTextLineheight: lineHeightBase100,
  ctrlAvatarTextPaddingTopOffset: spacingHorizontalM,
};

export const ctrlBadgeLayout: CtrlBadgeLayout = {
  ctrlBadgeCorner: borderRadiusMedium,
  ctrlBadgePadding: spacingHorizontalXS,
  ctrlBadgeSize: spacingHorizontalXXL,
  ctrlBadgeGap: spacingHorizontalXXS,
  ctrlBadgeIconSize: spacingHorizontalL,
  ctrlBadgeIconTheme: 'Regular', // unmappable
  ctrlBadgeBeaconSize: spacingHorizontalXS,
  ctrlBadgeTextPaddingBottom: spacingHorizontalNone,
  ctrlBadgeTextPaddingTop: spacingHorizontalNone,
  ctrlBadgeSmCorner: borderRadiusMedium,
  ctrlBadgeSmSize: spacingHorizontalXL,
  ctrlBadgeSmPadding: spacingHorizontalXS,
  ctrlBadgeSmIconSize: spacingHorizontalM,
  ctrlBadgeSmIconCorner: borderRadiusSmall,
  ctrlBadgeSmTextPaddingBottom: spacingHorizontalNone,
  ctrlBadgeSmTextPaddingTop: spacingHorizontalNone,
  ctrlBadgeLgPadding: spacingHorizontalXS,
  ctrlBadgeLgSize: spacingHorizontalXXL,
  ctrlBadgeLgCorner: borderRadiusMedium,
  ctrlBadgeLgIconSize: spacingHorizontalXL,
  ctrlBadgeLgIconCorner: borderRadiusMedium,
  ctrlBadgeLgTextPaddingTop: spacingHorizontalNone,
  ctrlBadgeLgTextPaddingBottom: spacingHorizontalNone,
};

export const ctrlBooleanLayout: CtrlBooleanLayout = {
  ctrlBooleanSelectionhint: 'true', // unmappable
};

export const ctrlChoiceLayout: CtrlChoiceLayout = {
  ctrlChoiceIconTheme: 'Filled', // unmappable
  ctrlChoicePaddingHorizontal: spacingHorizontalNone,
  ctrlChoicePaddingVertical: spacingHorizontalXS,
  ctrlChoiceBaseSize: spacingHorizontalXL,
  ctrlChoiceCheckboxCorner: borderRadiusMedium,
  ctrlChoiceCheckboxIconSize: spacingHorizontalMNudge,
  ctrlChoiceCheckboxIndeterminateCorner: borderRadiusCircular,
  ctrlChoiceCheckboxIndeterminateWidth: spacingHorizontalS,
  ctrlChoiceCheckboxIndeterminateHeight: '1.5px', // unmappable
  ctrlChoiceSwitchHeight: spacingHorizontalXL,
  ctrlChoiceSwitchWidth: '36px', // unmappable
  ctrlChoiceSwitchCorner: borderRadiusCircular,
  ctrlChoiceSwitchPaddingRest: spacingHorizontalXS,
  ctrlChoiceSwitchPaddingHover: spacingHorizontalXS,
  ctrlChoiceSwitchPaddingPressed: spacingHorizontalXS,
  ctrlChoiceSwitchThumbShadowAmbientX: '{nullNumber}',
  ctrlChoiceSwitchThumbShadowAmbientY: '{nullNumber}',
  ctrlChoiceSwitchThumbShadowAmbientBlur: '{nullNumber}',
  ctrlChoiceSwitchThumbShadowKeyX: '{nullNumber}',
  ctrlChoiceSwitchThumbShadowKeyY: '{nullNumber}',
  ctrlChoiceSwitchThumbShadowKeyBlur: '{nullNumber}',
  ctrlChoiceSwitchThumbWidthPressed: spacingHorizontalXL,
  ctrlChoiceSwitchThumbWidthHover: '14px', // unmappable
  ctrlChoiceSwitchThumbWidthRest: spacingHorizontalM,
  ctrlChoiceSmCheckboxCorner: borderRadiusLarge,
  ctrlChoiceSmCheckboxIconSize: borderRadiusXLarge,
  ctrlChoiceSmBaseSize: spacingHorizontalL,
  ctrlChoiceSmRadioDotSize: spacingHorizontalS,
  ctrlChoiceSmSwitchWidth: '36px', // unmappable
  ctrlChoiceSmSwitchHeight: spacingHorizontalXL,
  ctrlChoiceSmSwitchThumbWidthHover: spacingHorizontalM,
  ctrlChoiceSmSwitchThumbWidthPressed: spacingHorizontalL,
  ctrlChoiceSmSwitchThumbWidthRest: spacingHorizontalMNudge,
  ctrlChoiceLgBaseSize: '28px', // unmappable
  ctrlChoiceLgSwitchWidth: '52px', // unmappable
  ctrlChoiceLgSwitchHeight: '28px', // unmappable
  ctrlChoiceLgSwitchThumbWidthPressed: spacingHorizontalXXL,
  ctrlChoiceLgSwitchThumbWidthRest: '18px', // unmappable
  ctrlChoiceLgSwitchThumbWidthHover: spacingHorizontalXL,
  ctrlChoiceLgRadioDotSizeHover: spacingHorizontalL,
  ctrlChoiceLgRadioDotSizeRest: '14px', // unmappable
  ctrlChoiceLgRadioDotSizePressed: spacingHorizontalM,
  ctrlChoiceLgCheckboxCorner: borderRadiusSmall,
  ctrlChoiceLgCheckboxIconSize: spacingHorizontalL,
  ctrlChoiceRadioCorner: borderRadiusCircular,
  ctrlChoiceRadioDotSizeHover: spacingHorizontalMNudge,
  ctrlChoiceRadioDotSizePressed: spacingHorizontalMNudge,
  ctrlChoiceRadioDotSizeRest: spacingHorizontalMNudge,
};

export const ctrlComposerLayout: CtrlComposerLayout = {
  controlComposerContainerCorner: '{ctrlComposerContainerCorner}',
  controlComposerContainerShadowAmbient: '{ctrlComposerContainerShadowAmbient}',
  controlComposerContainerShadowKey: '{ctrlComposerContainerShadowKey}',
  controlComposerInputCornerHover: '{ctrlComposerInputCornerHover}',
  controlComposerInputCornerPressed: '{ctrlComposerInputCornerPressed}',
  controlComposerInputCornerRest: '{ctrlComposerInputCornerRest}',
  controlComposerInputShadow: '{ctrlComposerInputShadow}',
  ctrlComposerContainerCorner: spacingHorizontalXXL,
  ctrlComposerContainerShadow:
    '{ctrlComposerContainerShadowKeyX} {ctrlComposerContainerShadowKeyY} 0px {ctrlComposerContainerShadowKeyBlur} {ctrlComposerContainerShadowKeyColor}, {ctrlComposerContainerShadowAmbientX} {ctrlComposerContainerShadowAmbientY} 0px {ctrlComposerContainerShadowAmbientBlur} {ctrlComposerContainerShadowAmbientColor}',
  ctrlComposerContainerShadowAmbient:
    '{ctrlComposerContainerShadowAmbientX} {ctrlComposerContainerShadowAmbientY} 0px {ctrlComposerContainerShadowAmbientBlur} {ctrlComposerContainerShadowAmbientColor}',
  ctrlComposerContainerShadowAmbientBlur: '{shadowFlyoutAmbientBlur}',
  ctrlComposerContainerShadowAmbientX: '{shadowFlyoutAmbientX}',
  ctrlComposerContainerShadowAmbientY: '{shadowFlyoutAmbientY}',
  ctrlComposerContainerShadowCss: '{ctrlComposerContainerShadow}',
  ctrlComposerContainerShadowKey:
    '{ctrlComposerContainerShadowKeyX} {ctrlComposerContainerShadowKeyY} 0px {ctrlComposerContainerShadowKeyBlur} {ctrlComposerContainerShadowKeyColor}',
  ctrlComposerContainerShadowKeyBlur: '{shadowFlyoutKeyBlur}',
  ctrlComposerContainerShadowKeyX: '{shadowFlyoutKeyX}',
  ctrlComposerContainerShadowKeyY: '{shadowFlyoutKeyY}',
  ctrlComposerInputBottomStrokewidthHover: spacingHorizontalNone,
  ctrlComposerInputBottomStrokewidthPressed: spacingHorizontalNone,
  ctrlComposerInputBottomStrokewidthRest: spacingHorizontalNone,
  ctrlComposerInputBottomStrokewidthSelectedRest: spacingHorizontalNone,
  ctrlComposerInputCornerHover: '26px', // unmappable
  ctrlComposerInputCornerPressed: '28px', // unmappable
  ctrlComposerInputCornerRest: spacingHorizontalXXL,
  ctrlComposerInputShadow:
    '{ctrlComposerInputShadowX} {ctrlComposerInputShadowY} 0px {ctrlComposerInputShadowBlur} {ctrlComposerInputShadowColor}',
  ctrlComposerInputShadowBlur: shadow2DiffuseBlur,
  ctrlComposerInputShadowX: shadowDiffuseX,
  ctrlComposerInputShadowY: shadow2DiffuseY,
  ctrlComposerInputStrokewidthHover: spacingHorizontalNone,
  ctrlComposerInputStrokewidthPressed: spacingHorizontalNone,
  ctrlComposerInputStrokewidthRest: spacingHorizontalNone,
  ctrlComposerInputStrokewidthSelectedRest: spacingHorizontalNone,
};

export const ctrlDialogLayout: CtrlDialogLayout = {
  ctrlDialogBaseCorner: borderRadiusLarge,
  ctrlDialogBaseShadow:
    '{ctrlDialogBaseShadowKeyX} {ctrlDialogBaseShadowKeyY} {ctrlDialogBaseShadowKeyBlur} 0px {ctrlDialogBaseShadowKeyColor}, {ctrlDialogBaseShadowAmbientX} {ctrlDialogBaseShadowAmbientY} {ctrlDialogBaseShadowAmbientBlur} 0px {ctrlDialogBaseShadowAmbientColor}',
  ctrlDialogBaseShadowAmbientBlur: shadow8DiffuseBlur,
  ctrlDialogBaseShadowAmbientX: shadowDiffuseX,
  ctrlDialogBaseShadowAmbientY: shadow8DiffuseY,
  ctrlDialogBaseShadowCss: '{ctrlDialogBaseShadow}',
  ctrlDialogBaseShadowKeyBlur: shadow28DiffuseBlur,
  ctrlDialogBaseShadowKeyX: shadowDiffuseX,
  ctrlDialogBaseShadowKeyY: shadow28DiffuseY,
  ctrlDialogLayerPaddingBottom: spacingHorizontalNone,
};

export const ctrlDividerLayout: CtrlDividerLayout = {
  ctrlDividerInsetWidth: spacingHorizontalNone,
  ctrlDividerFixedLineLength: spacingHorizontalS,
};

export const ctrlFabLayout: CtrlFabLayout = {
  ctrlFabCornerRest: borderRadiusXLarge,
  ctrlFabCornerHover: borderRadiusXLarge,
  ctrlFabCornerPressed: borderRadiusXLarge,
  ctrlFabShadowRestKeyX: shadowDiffuseX,
  ctrlFabShadowRestKeyY: shadow8DiffuseY,
  ctrlFabShadowRestKeyBlur: shadow8DiffuseBlur,
  ctrlFabShadowRestAmbientX: shadowBaseX,
  ctrlFabShadowRestAmbientY: shadow8BaseY,
  ctrlFabShadowRestAmbientBlur: shadow8BaseBlur,
  ctrlFabShadowHoverKeyX: shadowDiffuseX,
  ctrlFabShadowHoverKeyY: shadow16DiffuseY,
  ctrlFabShadowHoverKeyBlur: shadow16DiffuseBlur,
  ctrlFabShadowPressedKeyX: shadowBaseX,
  ctrlFabShadowPressedKeyY: shadow16BaseY,
  ctrlFabShadowPressedKeyBlur: shadow16BaseBlur,
  ctrlFabShadowDisabledKeyX: shadowDiffuseX,
  ctrlFabShadowDisabledKeyY: shadow2DiffuseY,
  ctrlFabShadowDisabledKeyBlur: shadow2DiffuseBlur,
};

export const ctrlInputLayout: CtrlInputLayout = {
  ctrlInputStrokewidthRest: '{strokeWidthDefault}',
  ctrlInputStrokewidthHover: '{strokeWidthDefault}',
  ctrlInputStrokewidthPressed: '{strokeWidthDefault}',
  ctrlInputStrokewidthSelected: strokeWidthThin,
  ctrlInputBottomlineStrokewidthRest: '{strokeWidthDefault}',
  ctrlInputBottomlineStrokewidthHover: '{strokeWidthDefault}',
  ctrlInputBottomlineStrokewidthPressed:
    '{ctrlInputBottomlineStrokewidthSelected}',
  ctrlInputBottomlineStrokewidthSelected: strokeWidthThick,
};

export const ctrlLinkLayout: CtrlLinkLayout = {
  ctrlLinkInlineShowUnderlineAtRest: 'false', // unmappable
  ctrlLinkInlineUnderlineDashed: 'false', // unmappable
  ctrlLinkInlineUnderlineSolid: 'false', // unmappable
  ctrlLinkInlineStrokewidthRest: strokeWidthThin,
  ctrlLinkInlineStrokewidthHover: strokeWidthThin,
  ctrlLinkOnpageShowUnderlineAtRest: 'false', // unmappable
  ctrlLinkOnpageUnderlineDashed: 'false', // unmappable
  ctrlLinkOnpageUnderlineSolid: 'true', // unmappable
  ctrlLinkOnpageStrokewidthRest: strokeWidthThin,
  ctrlLinkOnpageStrokewidthHover: strokeWidthThin,
};

export const ctrlListLayout: CtrlListLayout = {
  ctrlListPillFullWidth: 'false', // unmappable
  ctrlListPillLengthHint: spacingHorizontalXL,
  ctrlListPillLengthHover: spacingHorizontalXL,
  ctrlListPillLengthPressed: spacingHorizontalXL,
  ctrlListPillLengthRest: spacingHorizontalXL,
  ctrlListPillWidth: '3px',
  ctrlListPillStretchPaddingDefault: spacingHorizontalM,
  ctrlListPillStretchPaddingHint: spacingHorizontalXL,
  ctrlListSplitDividerShowDivider: 'true',
  ctrlListSplitDividerPaddingInset: spacingHorizontalXS,
  ctrlListCornerHover: '{ctrlListCornerRest}',
  ctrlListCornerPressed: '{ctrlListCornerRest}',
  ctrlListCornerRest: borderRadiusMedium,
  ctrlListIndentLevel1: '{paddingCtrlHorizontalDefault}',
  ctrlListIndentLevel2: spacingHorizontalXXXL,
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
  ctrlListChoiceCheckboxIconSize: spacingHorizontalL,
  ctrlListChoiceCheckboxCorner: spacingHorizontalNone,
  ctrlListChoiceDotSize: spacingHorizontalXS,
};

export const ctrlLiteFilterLayout: CtrlLitefilterLayout = {
  ctrlLitefilterStrokewidthSelected: strokeWidthThin,
};

export const ctrlFocusLayout: CtrlFocusLayout = {
  ctrlFocusPosition: 'Both Outside',
  ctrlFocusOuterStrokewidth: strokeWidthThick,
  ctrlFocusInnerStrokewidth: strokeWidthThin,
};

export const ctrlProgressLayout: CtrlProgressLayout = {
  ctrlProgressCorner: borderRadiusCircular,
  ctrlProgressHeightEmpty: '3px',
  ctrlProgressHeightFilled: '3px',
  ctrlProgressLgHeightEmpty: spacingHorizontalXS,
  ctrlProgressLgHeightFilled: spacingHorizontalXS,
  ctrlProgressSmHeightEmpty: '1px',
  ctrlProgressSmHeightFilled: '1px',
};

export const ctrlRatingLayout: CtrlRatingLayout = {
  ctrlRatingIconGap: spacingHorizontalXXS,
  ctrlRatingIconTheme: 'Filled',
  ctrlRatingIconSize: spacingHorizontalM,
};

export const ctrlSegmentedLayout: CtrlSegmentedLayout = {
  ctrlSegmentedGap: spacingHorizontalNone,
  ctrlSegmentedCornerHover: '{cornerCtrlHover}',
  ctrlSegmentedCornerPressed: '{cornerCtrlPressed}',
  ctrlSegmentedCornerRest: '{cornerCtrlRest}',
  ctrlSegmentedItemCornerHover: '{cornerCtrlSmHover}',
  ctrlSegmentedItemCornerPressed: '{cornerCtrlSmPressed}',
  ctrlSegmentedItemCornerRest: '{cornerCtrlSmRest}',
  ctrlSegmentedPaddingHover: '5px',
  ctrlSegmentedPaddingPressed: '7px',
  ctrlSegmentedPaddingRest: spacingHorizontalXS,
  ctrlSegmentedLgItemCornerHover: spacingHorizontalNone,
  ctrlSegmentedLgItemCornerPressed: spacingHorizontalNone,
  ctrlSegmentedLgItemCornerRest: spacingHorizontalNone,
  ctrlSegmentedLgPaddingHover: spacingHorizontalNone,
  ctrlSegmentedLgPaddingPressed: spacingHorizontalNone,
  ctrlSegmentedLgPaddingRest: spacingHorizontalNone,
  ctrlSegmentedLgCornerHover: spacingHorizontalNone,
  ctrlSegmentedLgCornerPressed: spacingHorizontalNone,
  ctrlSegmentedLgCornerRest: spacingHorizontalNone,
  ctrlSegmentedSmItemCornerHover: spacingHorizontalNone,
  ctrlSegmentedSmItemCornerPressed: spacingHorizontalNone,
  ctrlSegmentedSmItemCornerRest: spacingHorizontalNone,
  ctrlSegmentedSmPaddingHover: spacingHorizontalNone,
  ctrlSegmentedSmPaddingPressed: spacingHorizontalNone,
  ctrlSegmentedSmPaddingRest: spacingHorizontalNone,
  ctrlSegmentedSmCornerHover: spacingHorizontalNone,
  ctrlSegmentedSmCornerPressed: spacingHorizontalNone,
  ctrlSegmentedSmCornerRest: spacingHorizontalNone,
};

export const ctrlSliderLayout: CtrlSliderLayout = {
  ctrlSliderBarCorner: borderRadiusCircular,
  ctrlSliderBarHeight: '{ctrlProgressHeightFilled}',
  ctrlSliderThumbCorner: borderRadiusCircular,
  ctrlSliderThumbInnerStrokewidthHover: '{ctrlSliderThumbInnerStrokewidthRest}',
  ctrlSliderThumbInnerStrokewidthPressed:
    '{ctrlSliderThumbInnerStrokewidthRest}',
  ctrlSliderThumbInnerStrokewidthRest: strokeWidthThickest,
  ctrlSliderThumbSizeRest: '{sizeCtrlIcon}',
  ctrlSliderThumbSizeHover: '22px', // unmappable
  ctrlSliderThumbSizePressed: '18px', // unmappable
  ctrlSliderThumbOuterStrokewidth: strokeWidthThin,
  ctrlSliderLgThumbSizeRest: '{ctrlSliderThumbSizeRest}',
  ctrlSliderLgThumbSizeHover: spacingHorizontalNone,
  ctrlSliderLgThumbSizePressed: spacingHorizontalNone,
  ctrlSliderLgBarHeight: spacingHorizontalNone,
  ctrlSliderSmThumbSizeRest: '{ctrlSliderThumbSizeRest}',
  ctrlSliderSmThumbSizeHover: spacingHorizontalNone,
  ctrlSliderSmThumbSizePressed: spacingHorizontalNone,
  ctrlSliderSmBarHeight: spacingHorizontalNone,
};

export const ctrlSplitLayout: CtrlSplitLayout = {
  ctrlSplitDividerStrokewidth: strokeWidthThin,
  ctrlSplitDividerStrokewidthOnSubtle: spacingHorizontalNone,
  ctrlSplitDividerStrokewidthOnoutline: strokeWidthThin,
};

export const ctrlSpinnerLayout: CtrlSpinnerLayout = {
  ctrlSpinnerStrokewidth: strokeWidthThick,
  ctrlSpinnerShowemptytrack: 'false', // unmappable
};

export const ctrlTabLayout: CtrlTabLayout = {
  ctrlTabCorner: borderRadiusLarge,
  ctrlTabShadowVerticalActive: '{shadowLayer}',
};

export const ctrlTooltipLayout: CtrlTooltipLayout = {
  ctrlTooltipCorner: '{cornerCtrlRest}',
  ctrlTooltipShadowKeyX: shadowDiffuseX,
  ctrlTooltipShadowKeyY: shadow8DiffuseY,
  ctrlTooltipShadowKeyBlur: shadow8DiffuseBlur,
  ctrlTooltipShadowAmbientX: shadowBaseX,
  ctrlTooltipShadowAmbientY: shadow8BaseY,
  ctrlTooltipShadowAmbientBlur: shadow8BaseBlur,
  ctrlTooltipShadow:
    '{ctrlTooltipShadowKeyX} {ctrlTooltipShadowKeyY} {ctrlTooltipShadowKeyBlur} 0px {ctrlTooltipShadowKeyColor}, {ctrlTooltipShadowAmbientX} {ctrlTooltipShadowAmbientY} {ctrlTooltipShadowAmbientBlur} 0px {ctrlTooltipShadowAmbientColor}',
  ctrlTooltipShadowCss: '{ctrlTooltipShadow}',
};
