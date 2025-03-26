import { alphaWhite, neutral, shadow, vibrant } from './globalColors.js';

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
  CtrlLiteFilterColors,
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

export const lightComposerColors: CtrlComposerColors = {
  ctrlComposerContainerBackgroundDefault: alphaWhite[60],
  ctrlComposerContainerBackgroundAcrylicColorBlend: '{backgroundFlyoutSolid}',
  ctrlComposerContainerBackgroundAcrylicLumBlend: '{backgroundFlyoutSolid}',
  ctrlComposerContainerBackgroundFlyout: alphaWhite[80],
  ctrlComposerContainerShadowAmbientColor: '{nullColor}',
  ctrlComposerContainerShadowKeyColor: '{nullColor}',
  ctrlComposerContainerStrokeDefault: '{nullColor}',
  ctrlComposerInputShadowColor: '{nullColor}',
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

export const lightAvatarColors: CtrlAvatarColors = {
  ctrlAvatarBackground: neutral[150],
  ctrlAvatarForeground: neutral[800],
  ctrlAvatarActiveringStroke: neutral[1000],
  ctrlAvatarPresencebadgeBackgroundBehindbadge: '{backgroundLayerPrimarySolid}',
};

export const lightChoiceColors: CtrlChoiceColors = {
  ctrlChoiceBaseStrokeRest: neutral[450],
  ctrlChoiceBaseStrokeHover: neutral[454],
  ctrlChoiceBaseStrokePressed: neutral[458],
  ctrlChoiceBaseStrokeDisabled: '{backgroundCtrlShapesafeNeutralDisabled}',
  ctrlChoiceBaseBackgroundRest: '{nullColor}',
  ctrlChoiceBaseBackgroundHover: '{nullColor}',
  ctrlChoiceBaseBackgroundPressed: '{nullColor}',
  ctrlChoiceBaseBackgroundDisabled: '{nullColor}',
  ctrlChoiceSwitchThumbShadowAmbientColor: '{nullColor}',
  ctrlChoiceSwitchThumbShadowKeyColor: '{nullColor}',
};

export const lightDialogColors: CtrlDialogColors = {
  ctrlDialogBackground: neutral[0],
  ctrlDialogStroke: '{nullColor}',
  ctrlDialogLayerBackground: '{backgroundLayerPrimarySolid}',
  ctrlDialogBaseShadowKeyColor: shadow.shadowKeyHighLight,
  ctrlDialogBaseShadowAmbientColor: shadow.shadowAmbientHighLight,
};

export const lightDragColors: CtrlDragColors = {
  ctrlDragBackgroundSolid: neutral[0],
  ctrlDragBackgroundColorBlend: neutral[0],
  ctrlDragBackgroundLumBlend: neutral[0],
};

export const lightIdentityFlyoutColors: CtrlIdentityFlyoutColors = {
  ctrlIdentityFlyoutManagedBannerBackground: neutral[800],
  ctrlIdentityFlyoutManagedBannerForeground: neutral[0],
};

export const lightInputColors: CtrlInputColors = {
  ctrlInputTextselectionForeground: '{foregroundCtrlOnBrandRest}',
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
  ctrlInputBottomLineStrokeRest: '{nullColor}',
  ctrlInputBottomLineStrokeHover: '{backgroundCtrlShapesafeNeutralHover}',
  ctrlInputBottomLineStrokePressed: '{backgroundCtrlShapesafeNeutralPressed}',
  ctrlInputBottomLineStrokeDisabled: '{nullColor}',
  ctrlInputBottomLineStrokeSelected: '{backgroundCtrlActivebrandRest}',
  ctrlInputBottomLineStrokeError: '{nullColor}',
};

export const lightFabColors: CtrlFabColors = {
  ctrlFabShadowRestKeyColor: shadow.shadowKeyLowLight,
  ctrlFabShadowRestAmbientColor: shadow.shadowAmbientLowLight,
  ctrlFabShadowHoverKeyColor: '{ctrlFabShadowRestKeyColor}',
  ctrlFabShadowPressedKeyColor: '{ctrlFabShadowRestKeyColor}',
  ctrlFabShadowDisabledKeyColor: '{ctrlFabShadowRestKeyColor}',
  ctrlFabBackgroundRest: neutral[0],
  ctrlFabBackgroundHover: neutral[4],
  ctrlFabBackgroundPressed: neutral[8],
  ctrlFabBackgroundDisabled: neutral[200],
};

export const lightFocusColors: CtrlFocusColors = {
  ctrlFocusInnerStroke: neutral[0],
  ctrlFocusOuterStroke: '{backgroundCtrlBrandRest}',
};

export const lightLinkColors: CtrlLinkColors = {
  ctrlLinkBackgroundRest: vibrant[100],
  ctrlLinkBackgroundHover: vibrant[200],
  ctrlLinkBackgroundPressed: vibrant[300],
  ctrlLinkForegroundNeutralRest: '{foregroundCtrlNeutralPrimaryRest}',
  ctrlLinkForegroundNeutralHover: '{foregroundCtrlNeutralPrimaryRest}',
  ctrlLinkForegroundNeutralPressed: '{foregroundCtrlNeutralPrimaryRest}',
  ctrlLinkForegroundBrandRest: vibrant[600],
  ctrlLinkForegroundBrandHover: vibrant[600],
  ctrlLinkForegroundBrandPressed: vibrant[600],
};

export const lightListColors: CtrlListColors = {
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
  ctrlListBackgroundSelectedRest: neutral[150],
  ctrlListBackgroundSelectedHover: neutral[154],
  ctrlListBackgroundSelectedPressed: neutral[158],
  ctrlListBackgroundSelectedDisabled: '{backgroundCtrlNeutralDisabled}',
};

export const lightLiteFilterColors: CtrlLiteFilterColors = {
  ctrlLiteFilterBackgroundSelected: '{backgroundCtrlNeutralRest}',
  ctrlLiteFilterStrokeSelected: neutral[450],
  ctrlLiteFilterForegroundSelected: '{foregroundCtrlNeutralPrimaryRest}',
};

export const lightOmniboxColors: CtrlOmniboxColors = {
  ctrlOmniboxBackgroundRest: neutral[150],
  ctrlOmniboxBackgroundHover: neutral[154],
};

export const lightProgressColors: CtrlProgressColors = {
  ctrlProgressBackgroundFilled: '{backgroundCtrlBrandRest}',
  ctrlProgressBackgroundEmpty: neutral[250],
};

export const lightRatingColors: CtrlRatingColors = {
  ctrlRatingIconForegroundEmpty: '{ctrlProgressBackgroundEmpty}',
  ctrlRatingIconForegroundFilled: '{foregroundCtrlBrandRest}',
};

export const lightSegmentedColors: CtrlSegmentedColors = {
  ctrlSegmentedSegmentedStrokeRest: neutral[0],
  ctrlSegmentedSegmentedStrokeHover: neutral[0],
  ctrlSegmentedSegmentedStrokePressed: neutral[0],
  ctrlSegmentedSegmentedStrokeDisabled: neutral[0],
  ctrlSegmentedSegmentedBackgroundRest: '{nullColor}',
  ctrlSegmentedSegmentedBackgroundPressed: '{nullColor}',
  ctrlSegmentedSegmentedBackgroundHover: '{nullColor}',
  ctrlSegmentedSegmentedBackgroundDisabled: '{nullColor}',
};

export const lightSliderColors: CtrlSliderColors = {
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
  ctrlSliderThumbInnerStrokeRest: '{foregroundCtrlOnBrandRest}',
  ctrlSliderThumbInnerStrokeHover: '{foregroundCtrlOnBrandHover}',
  ctrlSliderThumbInnerStrokePressed: '{foregroundCtrlOnBrandPressed}',
  ctrlSliderThumbInnerStrokeDisabled: '{foregroundCtrlOnBrandRest}',
  ctrlSliderThumbOuterStrokeRest: '{strokeDividerSubtle}',
  ctrlSliderThumbOuterStrokeHover: '{strokeDividerSubtle}',
  ctrlSliderThumbOuterStrokePressed: '{strokeDividerSubtle}',
  ctrlSliderThumbOuterStrokeDisabled: '{strokeDividerSubtle}',
};

export const lightTabColors: CtrlTabColors = {
  ctrlTabBackgroundHorizontalActive: neutral[0],
  ctrlTabBackgroundVerticalActive: neutral[150],
};

export const lightTooltipColors: CtrlTooltipColors = {
  ctrlTooltipBackground: neutral[800],
  ctrlTooltipForeground: neutral[0],
  ctrlTooltipShadowKeyColor: shadow.shadowKeyLowLight,
  ctrlTooltipShadowAmbientColor: shadow.shadowAmbientLowLight,
};
