import { alphaBlack, neutral, shadow, vibrant } from './globalColors.js';

import type {
  CtrlAvatarColors,
  CtrlChoiceColors,
  CtrlComposerColors,
  CtrlDialogColors,
  CtrlDragColors,
  CtrlFabColors,
  CtrlFocusColors,
  CtrlIdentityFlyoutColors,
  CtrlInputColors,
  CtrlLitefilterColors,
  CtrlLinkColors,
  CtrlListColors,
  CtrlOmniboxColors,
  CtrlProgressColors,
  CtrlRatingColors,
  CtrlSegmentedColors,
  CtrlSliderColors,
  CtrlTabColors,
  CtrlTooltipColors,
} from './ctrlColors.js';

export const darkComposerColors: CtrlComposerColors = {
  ctrlComposerContainerBackgroundDefault: alphaBlack[60],
  ctrlComposerContainerBackgroundAcrylicColorBlend: '{backgroundFlyoutSolid}',
  ctrlComposerContainerBackgroundAcrylicLumBlend: '{backgroundFlyoutSolid}',
  ctrlComposerContainerBackgroundFlyout: alphaBlack[80],
  ctrlComposerContainerShadowAmbientColor: alphaBlack[40],
  ctrlComposerContainerShadowKeyColor: '{nullColor}',
  ctrlComposerContainerStrokeDefault: '{nullColor}',
  ctrlComposerInputShadowColor: alphaBlack[20],
  ctrlComposerInputStrokeRest: '{nullColor}',
  ctrlComposerInputStrokeDisabled: '{nullColor}',
  ctrlComposerInputStrokePressed: '{nullColor}',
  ctrlComposerInputStrokeSelectedRest: '{nullColor}',
  ctrlComposerInputStrokeHover: '{nullColor}',
  ctrlComposerInputBackgroundSelectedRest: '{nullColor}',
  ctrlComposerInputBackgroundPressed: '{nullColor}',
  ctrlComposerInputBackgroundHover: '{nullColor}',
  ctrlComposerInputBackgroundRest: '{nullColor}',
  ctrlComposerInputBackgroundDisabled: '{nullColor}',
  ctrlComposerInputBottomStrokePressed: '{nullColor}',
  ctrlComposerInputBottomStrokeDisabled: '{nullColor}',
  ctrlComposerInputBottomStrokeRest: '{nullColor}',
  ctrlComposerInputBottomStrokeSelectedRest: '{nullColor}',
  ctrlComposerInputBottomStrokeHover: '{nullColor}',
};

export const darkAvatarColors: CtrlAvatarColors = {
  ctrlAvatarBackground: neutral[700],
  ctrlAvatarForeground: neutral[0],
  ctrlAvatarActiveringStroke: neutral[0],
  ctrlAvatarPresencebadgeBackgroundBehindbadge: '{backgroundLayerPrimarySolid}',
};

export const darkChoiceColors: CtrlChoiceColors = {
  ctrlChoiceBaseStrokeRest: neutral[400],
  ctrlChoiceBaseStrokeHover: neutral[404],
  ctrlChoiceBaseStrokePressed: neutral[408],
  ctrlChoiceBaseStrokeDisabled: '{backgroundCtrlShapesafeNeutralDisabled}',
  ctrlChoiceBaseBackgroundRest: '{nullColor}',
  ctrlChoiceBaseBackgroundHover: '{nullColor}',
  ctrlChoiceBaseBackgroundPressed: '{nullColor}',
  ctrlChoiceBaseBackgroundDisabled: '{nullColor}',
  ctrlChoiceSwitchThumbShadowAmbientColor: '{nullColor}',
  ctrlChoiceSwitchThumbShadowKeyColor: '{nullColor}',
};

export const darkDialogColors: CtrlDialogColors = {
  ctrlDialogBackground: neutral[800],
  ctrlDialogStroke: '{nullColor}',
  ctrlDialogLayerBackground: '{backgroundLayerPrimarySolid}',
  ctrlDialogBaseShadowKeyColor: shadow.shadowKeyHighDark,
  ctrlDialogBaseShadowAmbientColor: shadow.shadowAmbientHighDark,
  ctrlDialogPrimaryBackgroundColor: '{backgroundLayerPrimarySolid}',
};

export const darkDragColors: CtrlDragColors = {
  ctrlDragBackgroundSolid: neutral[800],
  ctrlDragBackgroundColorBlend: neutral[800],
  ctrlDragBackgroundLumBlend: neutral[800],
};

export const darkIdentityFlyoutColors: CtrlIdentityFlyoutColors = {
  ctrlIdentityFlyoutManagedBannerBackground: neutral[800],
  ctrlIdentityFlyoutManagedBannerForeground: neutral[0],
};

export const darkInputColors: CtrlInputColors = {
  ctrlInputTextselectionForeground: '{foregroundCtrlOnbrandRest}',
  ctrlInputTextselectionBackground: '{backgroundCtrlBrandRest}',
  ctrlInputBackgroundRest: '{backgroundCtrlNeutralRest}',
  ctrlInputBackgroundHover: '{backgroundCtrlNeutralHover}',
  ctrlInputBackgroundPressed: '{backgroundCtrlNeutralPressed}',
  ctrlInputBackgroundDisabled: '{backgroundCtrlNeutralDisabled}',
  ctrlInputBackgroundSelected: '{backgroundCtrlNeutralRest}',
  ctrlInputBackgroundError: '{backgroundCtrlNeutralRest}',
  ctrlInputStrokeRest: '{strokeCtrlOnneutralRest}',
  ctrlInputStrokeHover: '{strokeCtrlOnneutralHover}',
  ctrlInputStrokePressed: '{strokeCtrlOnneutralPressed}',
  ctrlInputStrokeDisabled: '{strokeCtrlOnneutralDisabled}',
  ctrlInputStrokeSelected: '{strokeCtrlOnneutralRest}',
  ctrlInputStrokeError: '{statusDangerStroke}',
  ctrlInputBottomlineStrokeRest: '{nullColor}',
  ctrlInputBottomlineStrokeHover: '{backgroundCtrlShapesafeNeutralHover}',
  ctrlInputBottomlineStrokePressed: '{backgroundCtrlShapesafeNeutralPressed}',
  ctrlInputBottomlineStrokeDisabled: '{nullColor}',
  ctrlInputBottomlineStrokeSelected: '{backgroundCtrlActivebrandRest}',
  ctrlInputBottomlineStrokeError: '{nullColor}',
};

export const darkFabColors: CtrlFabColors = {
  ctrlFabShadowRestKeyColor: shadow.shadowKeyLowDark,
  ctrlFabShadowRestAmbientColor: shadow.shadowAmbientLowDark,
  ctrlFabShadowHoverKeyColor: '{ctrlFabShadowRestKeyColor}',
  ctrlFabShadowPressedKeyColor: '{ctrlFabShadowRestKeyColor}',
  ctrlFabShadowDisabledKeyColor: '{ctrlFabShadowRestKeyColor}',
  ctrlFabBackgroundRest: neutral[800],
  ctrlFabBackgroundHover: neutral[804],
  ctrlFabBackgroundPressed: neutral[808],
  ctrlFabBackgroundDisabled: neutral[650],
};

export const darkFocusColors: CtrlFocusColors = {
  ctrlFocusInnerStroke: neutral[800],
  ctrlFocusOuterStroke: '{backgroundCtrlBrandRest}',
};

export const darkLinkColors: CtrlLinkColors = {
  ctrlLinkBackgroundRest: vibrant[900],
  ctrlLinkBackgroundHover: vibrant[800],
  ctrlLinkBackgroundPressed: vibrant[700],
  ctrlLinkForegroundNeutralRest: '{foregroundCtrlNeutralPrimaryRest}',
  ctrlLinkForegroundNeutralHover: '{foregroundCtrlNeutralPrimaryRest}',
  ctrlLinkForegroundNeutralPressed: '{foregroundCtrlNeutralPrimaryRest}',
  ctrlLinkForegroundBrandRest: vibrant[400],
  ctrlLinkForegroundBrandHover: vibrant[400],
  ctrlLinkForegroundBrandPressed: vibrant[400],
};

export const darkListColors: CtrlListColors = {
  ctrlListChoiceBackgroundRest: '{nullColor}',
  ctrlListChoiceBackgroundDisabled: '{nullColor}',
  ctrlListChoiceBackgroundSelectedRest: '{nullColor}',
  ctrlListChoiceBackgroundSelectedDisabled: '{nullColor}',
  ctrlListChoiceStrokeRest: '{nullColor}',
  ctrlListChoiceStrokeDisabled: '{nullColor}',
  ctrlListChoiceStrokeSelectedDisabled: '{nullColor}',
  ctrlListChoiceStrokeSelectedRest: '{nullColor}',
  ctrlListChoiceForegroundHover: '{foregroundCtrlHintDefault}',
  ctrlListChoiceForegroundSelectedRest: '{foregroundCtrlNeutralPrimaryRest}',
  ctrlListChoiceForegroundSelectedDisabled:
    '{foregroundCtrlNeutralPrimaryDisabled}',
  ctrlListSplitDividerStroke: '{strokeDividerSubtle}',
  ctrlListBackgroundSelectedRest: neutral[700],
  ctrlListBackgroundSelectedHover: neutral[704],
  ctrlListBackgroundSelectedPressed: neutral[708],
  ctrlListBackgroundSelectedDisabled: '{backgroundCtrlNeutralDisabled}',
};

export const darkLiteFilterColors: CtrlLitefilterColors = {
  ctrlLitefilterBackgroundSelected: '{backgroundCtrlNeutralRest}',
  ctrlLitefilterStrokeSelected: neutral[400],
  ctrlLitefilterForegroundSelected: '{foregroundCtrlNeutralPrimaryRest}',
};

export const darkOmniboxColors: CtrlOmniboxColors = {
  ctrlOmniboxBackgroundRest: neutral[800],
  ctrlOmniboxBackgroundHover: neutral[804],
};

export const darkProgressColors: CtrlProgressColors = {
  ctrlProgressBackgroundFilled: '{backgroundCtrlBrandRest}',
  ctrlProgressBackgroundEmpty: neutral[600],
};

export const darkRatingColors: CtrlRatingColors = {
  ctrlRatingIconForegroundEmpty: '{ctrlProgressBackgroundEmpty}',
  ctrlRatingIconForegroundFilled: '{foregroundCtrlBrandRest}',
};

export const darkSegmentedColors: CtrlSegmentedColors = {
  ctrlSegmentedSegmentedStrokeRest: neutral[0],
  ctrlSegmentedSegmentedStrokeHover: neutral[0],
  ctrlSegmentedSegmentedStrokePressed: neutral[0],
  ctrlSegmentedSegmentedStrokeDisabled: neutral[0],
  ctrlSegmentedSegmentedBackgroundRest: '{nullColor}',
  ctrlSegmentedSegmentedBackgroundPressed: '{nullColor}',
  ctrlSegmentedSegmentedBackgroundHover: '{nullColor}',
  ctrlSegmentedSegmentedBackgroundDisabled: '{nullColor}',
};

export const darkSliderColors: CtrlSliderColors = {
  ctrlSliderBarForegroundEmptyRest: '{backgroundCtrlShapesafeNeutralRest}',
  ctrlSliderBarForegroundEmptyHover: '{backgroundCtrlShapesafeNeutralHover}',
  ctrlSliderBarForegroundEmptyPressed:
    '{backgroundCtrlShapesafeNeutralPressed}',
  ctrlSliderBarForegroundEmptyDisabled: '{backgroundCtrlNeutralDisabled}',
  ctrlSliderBarForegroundFilledRest: '{backgroundCtrlBrandRest}',
  ctrlSliderBarForegroundFilledHover: '{backgroundCtrlBrandRest}',
  ctrlSliderBarForegroundFilledPressed: '{backgroundCtrlBrandRest}',
  ctrlSliderBarForegroundFilledDisabled:
    '{foregroundCtrlNeutralPrimaryDisabled}',
  ctrlSliderThumbBackgroundRest: '{backgroundCtrlBrandRest}',
  ctrlSliderThumbBackgroundHover: '{backgroundCtrlBrandHover}',
  ctrlSliderThumbBackgroundPressed: '{backgroundCtrlBrandPressed}',
  ctrlSliderThumbBackgroundDisabled: '{ctrlSliderBarForegroundFilledDisabled}',
  ctrlSliderThumbInnerStrokeRest: '{foregroundCtrlOnbrandRest}',
  ctrlSliderThumbInnerStrokeHover: '{foregroundCtrlOnbrandHover}',
  ctrlSliderThumbInnerStrokePressed: '{foregroundCtrlOnbrandPressed}',
  ctrlSliderThumbInnerStrokeDisabled: '{foregroundCtrlOnbrandRest}',
  ctrlSliderThumbOuterStrokeRest: '{strokeDividerSubtle}',
  ctrlSliderThumbOuterStrokeHover: '{strokeDividerSubtle}',
  ctrlSliderThumbOuterStrokePressed: '{strokeDividerSubtle}',
  ctrlSliderThumbOuterStrokeDisabled: '{strokeDividerSubtle}',
};

export const darkTabColors: CtrlTabColors = {
  ctrlTabBackgroundHorizontalActive: neutral[650],
  ctrlTabBackgroundVerticalActive: neutral[500],
};

export const darkTooltipColors: CtrlTooltipColors = {
  ctrlTooltipBackground: neutral[0],
  ctrlTooltipForeground: neutral[800],
  ctrlTooltipShadowKeyColor: shadow.shadowKeyLowDark,
  ctrlTooltipShadowAmbientColor: shadow.shadowAmbientLowDark,
};
