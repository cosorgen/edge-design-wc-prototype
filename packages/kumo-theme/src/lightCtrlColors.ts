import {
  alphaWhite,
  NeutralColors,
  ShadowColors,
  VibrantColors,
} from './globalColors.js';

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

import type { ChromePalette } from './paletteGen.js';

export const lightComposerColors: CtrlComposerColors = {
  controlComposerContainerBackgroundDefault:
    '{ctrlComposerContainerBackgroundDefault}',
  controlComposerContainerShadowAmbientColor:
    '{ctrlComposerContainerShadowAmbientColor}',
  controlComposerContainerShadowKeyColor:
    '{ctrlComposerContainerShadowKeyColor}',
  controlComposerContainerStrokeDefault: '{ctrlComposerContainerStrokeDefault}',
  controlComposerInputBackgroundDisabled:
    '{ctrlComposerInputBackgroundDisabled}',
  controlComposerInputBackgroundHover: '{ctrlComposerInputBackgroundHover}',
  controlComposerInputBackgroundPressed: '{ctrlComposerInputBackgroundPressed}',
  controlComposerInputBackgroundRest: '{ctrlComposerInputBackgroundRest}',
  controlComposerInputBackgroundSelectedRest:
    '{ctrlComposerInputBackgroundSelectedRest}',
  controlComposerInputShadowColor: '{ctrlComposerInputShadowColor}',
  controlComposerInputStrokeDisabled: '{ctrlComposerInputStrokeDisabled}',
  controlComposerInputStrokeHover: '{ctrlComposerInputStrokeHover}',
  controlComposerInputStrokePressed: '{ctrlComposerInputStrokePressed}',
  controlComposerInputStrokeRest: '{ctrlComposerInputStrokeRest}',
  controlComposerInputStrokeSelectedRest:
    '{ctrlComposerInputStrokeSelectedRest}',
  ctrlComposerContainerBackgroundAcrylicColorBlend: '{backgroundFlyoutSolid}',
  ctrlComposerContainerBackgroundAcrylicLumBlend: '{backgroundFlyoutSolid}',
  ctrlComposerContainerBackgroundDefault: alphaWhite[60],
  ctrlComposerContainerBackgroundFlyout: alphaWhite[80],
  ctrlComposerContainerShadowAmbientColor: '{nullColor}',
  ctrlComposerContainerShadowKeyColor: '{nullColor}',
  ctrlComposerContainerStrokeDefault: '{nullColor}',
  ctrlComposerInputBackgroundDisabled: '{nullColor}',
  ctrlComposerInputBackgroundHover: '{nullColor}',
  ctrlComposerInputBackgroundPressed: '{nullColor}',
  ctrlComposerInputBackgroundRest: '{nullColor}',
  ctrlComposerInputBackgroundSelectedRest: '{nullColor}',
  ctrlComposerInputBottomStrokeDisabled: '{nullColor}',
  ctrlComposerInputBottomStrokeHover: '{nullColor}',
  ctrlComposerInputBottomStrokePressed: '{nullColor}',
  ctrlComposerInputBottomStrokeRest: '{nullColor}',
  ctrlComposerInputBottomStrokeSelectedRest: '{nullColor}',
  ctrlComposerInputShadowColor: '{nullColor}',
  ctrlComposerInputStrokeDisabled: '{nullColor}',
  ctrlComposerInputStrokeHover: '{nullColor}',
  ctrlComposerInputStrokePressed: '{nullColor}',
  ctrlComposerInputStrokeRest: '{nullColor}',
  ctrlComposerInputStrokeSelectedRest: '{nullColor}',
};

export function lightAvatarColors(neutral: NeutralColors): CtrlAvatarColors {
  return {
    ctrlAvatarBackground: neutral[150],
    ctrlAvatarForeground: neutral[800],
    ctrlAvatarActiveringStroke: neutral[1000],
    ctrlAvatarPresencebadgeBackgroundBehindbadge:
      '{backgroundLayerPrimarySolid}',
  };
}

export function lightChoiceColors(neutral: NeutralColors): CtrlChoiceColors {
  return {
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
}

export function lightDialogColors(
  neutral: NeutralColors,
  shadow: ShadowColors,
): CtrlDialogColors {
  return {
    ctrlDialogBackground: neutral[0],
    ctrlDialogBaseShadowAmbientColor: shadow.shadowAmbientHighLight,
    ctrlDialogBaseShadowKeyColor: shadow.shadowKeyHighLight,
    ctrlDialogLayerBackground: '{backgroundLayerPrimarySolid}',
    ctrlDialogPrimaryBackgroundColor: '{backgroundLayerPrimarySolid}',
    ctrlDialogStroke: '{nullColor}',
  };
}

export function lightDragColors(neutral: NeutralColors): CtrlDragColors {
  return {
    ctrlDragBackgroundSolid: neutral[0],
    ctrlDragBackgroundColorBlend: neutral[0],
    ctrlDragBackgroundLumBlend: neutral[0],
  };
}

export function lightIdentityFlyoutColors(
  neutral: NeutralColors,
): CtrlIdentityFlyoutColors {
  return {
    ctrlIdentityFlyoutManagedBannerBackground: neutral[800],
    ctrlIdentityFlyoutManagedBannerForeground: neutral[0],
  };
}

export const lightInputColors: CtrlInputColors = {
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

export function lightFabColors(
  neutral: NeutralColors,
  shadow: ShadowColors,
): CtrlFabColors {
  return {
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
}

export function lightFocusColors(neutral: NeutralColors): CtrlFocusColors {
  return {
    ctrlFocusInnerStroke: neutral[0],
    ctrlFocusOuterStroke: '{backgroundCtrlBrandRest}',
  };
}

export function lightLinkColors(vibrant: VibrantColors): CtrlLinkColors {
  return {
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
}

export function lightListColors(neutral: NeutralColors): CtrlListColors {
  return {
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
}

export function lightLiteFilterColors(
  neutral: NeutralColors,
): CtrlLitefilterColors {
  return {
    ctrlLitefilterBackgroundSelected: '{backgroundCtrlNeutralRest}',
    ctrlLitefilterStrokeSelected: neutral[450],
    ctrlLitefilterForegroundSelected: '{foregroundCtrlNeutralPrimaryRest}',
  };
}

export function lightOmniboxColors(
  neutral: NeutralColors,
  palette?: ChromePalette,
): CtrlOmniboxColors {
  return {
    ctrlOmniboxBackgroundHover: palette
      ? palette.neutral.secondary[90]
      : neutral[4],
    ctrlOmniboxBackgroundRest: palette
      ? palette.neutral.secondary[94]
      : neutral[0],
    ctrlOmniboxStrokeFocused: '{backgroundCtrlBrandRest}',
    ctrlOmniboxStrokeRest: palette
      ? '{nullColor}'
      : '{strokeCtrlOnoutlineRest}',
    ctrlOmniboxStrokeHover: palette
      ? '{nullColor}'
      : '{strokeCtrlOnoutlineHover}',
  };
}

export function lightProgressColors(
  neutral: NeutralColors,
): CtrlProgressColors {
  return {
    ctrlProgressBackgroundFilled: '{backgroundCtrlBrandRest}',
    ctrlProgressBackgroundEmpty: neutral[250],
  };
}

export const lightRatingColors: CtrlRatingColors = {
  ctrlRatingIconForegroundEmpty: '{ctrlProgressBackgroundEmpty}',
  ctrlRatingIconForegroundFilled: '{foregroundCtrlBrandRest}',
};

export function lightSegmentedColors(
  neutral: NeutralColors,
): CtrlSegmentedColors {
  return {
    ctrlSegmentedSegmentedStrokeRest: neutral[0],
    ctrlSegmentedSegmentedStrokeHover: neutral[0],
    ctrlSegmentedSegmentedStrokePressed: neutral[0],
    ctrlSegmentedSegmentedStrokeDisabled: neutral[0],
    ctrlSegmentedSegmentedBackgroundRest: '{nullColor}',
    ctrlSegmentedSegmentedBackgroundPressed: '{nullColor}',
    ctrlSegmentedSegmentedBackgroundHover: '{nullColor}',
    ctrlSegmentedSegmentedBackgroundDisabled: '{nullColor}',
  };
}

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
  ctrlSliderThumbInnerStrokeRest: '{foregroundCtrlOnbrandRest}',
  ctrlSliderThumbInnerStrokeHover: '{foregroundCtrlOnbrandHover}',
  ctrlSliderThumbInnerStrokePressed: '{foregroundCtrlOnbrandPressed}',
  ctrlSliderThumbInnerStrokeDisabled: '{foregroundCtrlOnbrandRest}',
  ctrlSliderThumbOuterStrokeRest: '{strokeDividerSubtle}',
  ctrlSliderThumbOuterStrokeHover: '{strokeDividerSubtle}',
  ctrlSliderThumbOuterStrokePressed: '{strokeDividerSubtle}',
  ctrlSliderThumbOuterStrokeDisabled: '{strokeDividerSubtle}',
};

export function lightTabColors(
  neutral: NeutralColors,
  palette?: ChromePalette,
): CtrlTabColors {
  return {
    ctrlTabBackgroundHorizontalActive: palette
      ? palette.neutral.secondary[98]
      : neutral[0],
    ctrlTabBackgroundHorizontalHover: palette
      ? palette.tonal.primary[78]
      : '{backgroundCtrlSubtleHover}',
    ctrlTabBackgroundVerticalActive: palette
      ? palette.tonal.primary[92]
      : neutral[150],
    ctrlTabBackgroundVerticalHover: '{backgroundCtrlSubtleHover}',
  };
}

export function lightTooltipColors(
  neutral: NeutralColors,
  shadow: ShadowColors,
  palette?: ChromePalette,
): CtrlTooltipColors {
  return {
    ctrlTooltipBackground: palette ? palette.tonal.primary[20] : neutral[800],
    ctrlTooltipForeground: neutral[0],
    ctrlTooltipShadowKeyColor: shadow.shadowKeyLowLight,
    ctrlTooltipShadowAmbientColor: shadow.shadowAmbientLowLight,
  };
}
