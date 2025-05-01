import {
  alphaBlack,
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
import { PaletteTones } from './paletteGen.js';

export const darkComposerColors: CtrlComposerColors = {
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
  ctrlComposerContainerBackgroundDefault: alphaBlack[60],
  ctrlComposerContainerBackgroundFlyout: alphaBlack[80],
  ctrlComposerContainerShadowAmbientColor: alphaBlack[40],
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
  ctrlComposerInputShadowColor: alphaBlack[20],
  ctrlComposerInputStrokeDisabled: '{nullColor}',
  ctrlComposerInputStrokeHover: '{nullColor}',
  ctrlComposerInputStrokePressed: '{nullColor}',
  ctrlComposerInputStrokeRest: '{nullColor}',
  ctrlComposerInputStrokeSelectedRest: '{nullColor}',
};

export function darkAvatarColors(neutral: NeutralColors): CtrlAvatarColors {
  return {
    ctrlAvatarBackground: neutral[700],
    ctrlAvatarForeground: neutral[0],
    ctrlAvatarActiveringStroke: neutral[0],
    ctrlAvatarPresencebadgeBackgroundBehindbadge:
      '{backgroundLayerPrimarySolid}',
  };
}

export function darkChoiceColors(neutral: NeutralColors): CtrlChoiceColors {
  return {
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
}

export function darkDialogColors(
  neutral: NeutralColors,
  shadow: ShadowColors,
): CtrlDialogColors {
  return {
    ctrlDialogBackground: neutral[800],
    ctrlDialogStroke: '{nullColor}',
    ctrlDialogLayerBackground: '{backgroundLayerPrimarySolid}',
    ctrlDialogBaseShadowKeyColor: shadow.shadowKeyHighDark,
    ctrlDialogBaseShadowAmbientColor: shadow.shadowAmbientHighDark,
    ctrlDialogPrimaryBackgroundColor: '{backgroundLayerPrimarySolid}',
  };
}

export function darkDragColors(neutral: NeutralColors): CtrlDragColors {
  return {
    ctrlDragBackgroundSolid: neutral[800],
    ctrlDragBackgroundColorBlend: neutral[800],
    ctrlDragBackgroundLumBlend: neutral[800],
  };
}

export function darkIdentityFlyoutColors(
  neutral: NeutralColors,
): CtrlIdentityFlyoutColors {
  return {
    ctrlIdentityFlyoutManagedBannerBackground: neutral[800],
    ctrlIdentityFlyoutManagedBannerForeground: neutral[0],
  };
}

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

export function darkFabColors(
  neutral: NeutralColors,
  shadow: ShadowColors,
): CtrlFabColors {
  return {
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
}

export function darkFocusColors(neutral: NeutralColors): CtrlFocusColors {
  return {
    ctrlFocusInnerStroke: neutral[800],
    ctrlFocusOuterStroke: '{backgroundCtrlBrandRest}',
  };
}

export function darkLinkColors(vibrant: VibrantColors): CtrlLinkColors {
  return {
    ctrlLinkBackgroundRest: vibrant[600],
    ctrlLinkBackgroundHover: vibrant[604],
    ctrlLinkBackgroundPressed: vibrant[608],
    ctrlLinkForegroundNeutralRest: '{foregroundCtrlNeutralPrimaryRest}',
    ctrlLinkForegroundNeutralHover: '{foregroundCtrlNeutralPrimaryRest}',
    ctrlLinkForegroundNeutralPressed: '{foregroundCtrlNeutralPrimaryRest}',
    ctrlLinkForegroundBrandRest: vibrant[300],
    ctrlLinkForegroundBrandHover: vibrant[304],
    ctrlLinkForegroundBrandPressed: vibrant[308],
  };
}

export function darkListColors(neutral: NeutralColors): CtrlListColors {
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
    ctrlListBackgroundSelectedRest: neutral[700],
    ctrlListBackgroundSelectedHover: neutral[704],
    ctrlListBackgroundSelectedPressed: neutral[708],
    ctrlListBackgroundSelectedDisabled: '{backgroundCtrlNeutralDisabled}',
  };
}

export function darkLiteFilterColors(
  neutral: NeutralColors,
): CtrlLitefilterColors {
  return {
    ctrlLitefilterBackgroundSelected: '{backgroundCtrlNeutralRest}',
    ctrlLitefilterStrokeSelected: neutral[400],
    ctrlLitefilterForegroundSelected: '{foregroundCtrlNeutralPrimaryRest}',
  };
}

export function darkOmniboxColors(
  neutral: NeutralColors,
  palette?: PaletteTones,
): CtrlOmniboxColors {
  return {
    ctrlOmniboxBackgroundHover: palette
      ? palette.neutralVariant[26]
      : neutral[704],
    ctrlOmniboxBackgroundRest: palette
      ? palette.neutralVariant[14]
      : neutral[650],
    ctrlOmniboxStrokeFocused: '{backgroundCtrlBrandRest}',
    ctrlOmniboxStrokeRest: palette
      ? '{nullColor}'
      : '{strokeCtrlOnoutlineRest}',
    ctrlOmniboxStrokeHover: palette
      ? '{nullColor}'
      : '{strokeCtrlOnoutlineHover}',
  };
}

export function darkProgressColors(neutral: NeutralColors): CtrlProgressColors {
  return {
    ctrlProgressBackgroundFilled: '{backgroundCtrlBrandRest}',
    ctrlProgressBackgroundEmpty: neutral[600],
  };
}

export const darkRatingColors: CtrlRatingColors = {
  ctrlRatingIconForegroundEmpty: '{ctrlProgressBackgroundEmpty}',
  ctrlRatingIconForegroundFilled: '{foregroundCtrlBrandRest}',
};

export function darkSegmentedColors(
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

export function darkTabColors(
  neutral: NeutralColors,
  palette?: PaletteTones,
): CtrlTabColors {
  return {
    ctrlTabBackgroundHorizontalActive: palette
      ? palette.secondary[22]
      : neutral[650],
    ctrlTabBackgroundHorizontalHover: palette
      ? palette.primary[32]
      : '{backgroundCtrlSubtleHover}',
    ctrlTabBackgroundVerticalActive: palette
      ? palette.primary[32]
      : neutral[500],
    ctrlTabBackgroundVerticalHover: '{backgroundCtrlSubtleHover}',
  };
}

export function darkTooltipColors(
  neutral: NeutralColors,
  shadow: ShadowColors,
): CtrlTooltipColors {
  return {
    ctrlTooltipBackground: neutral[0],
    ctrlTooltipForeground: neutral[800],
    ctrlTooltipShadowKeyColor: shadow.shadowKeyLowDark,
    ctrlTooltipShadowAmbientColor: shadow.shadowAmbientLowDark,
  };
}
