import type {
  NeutralColors,
  LightShadowColors,
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
import {
  colorBrandBackground2,
  colorBrandBackground2Hover,
  colorBrandBackground2Pressed,
  colorBrandForegroundLink,
  colorBrandForegroundLinkHover,
  colorBrandForegroundLinkPressed,
  colorLayerBackgroundDialog,
  colorLayerBackgroundTooltip,
  colorLayerBackgroundTooltipStaticInverted,
  colorNeutralBackground1,
  colorNeutralBackground1Hover,
  colorNeutralBackground1Pressed,
  colorNeutralBackground3,
  colorNeutralBackgroundDisabled,
  colorNeutralBackgroundTabActive,
  colorNeutralForeground1,
  colorNeutralForeground1Selected,
  colorNeutralForeground1Static,
  colorNeutralShadowAmbient,
  colorNeutralShadowKey,
  colorNeutralStroke1,
  colorNeutralStroke1Hover,
  colorNeutralStroke1Pressed,
  colorNeutralStroke1Selected,
  colorNeutralStrokeOnBrand,
  colorStrokeFocus1,
  colorStrokeFocus2,
  colorSubtleBackgroundHover,
  colorSubtleBackgroundPressed,
  colorSubtleBackgroundSelected,
  tabActiveBackgroundNormal,
} from '@phoenixui/themes/tokens.js';

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
  ctrlComposerContainerBackgroundDefault: colorNeutralBackground1,
  ctrlComposerContainerBackgroundFlyout: colorNeutralBackground1,
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

export function lightAvatarColors(neutral?: NeutralColors): CtrlAvatarColors {
  return {
    ctrlAvatarBackground: neutral ? neutral[150] : colorNeutralBackground3,
    ctrlAvatarForeground: neutral ? neutral[800] : colorNeutralForeground1,
    ctrlAvatarActiveringStroke: neutral ? neutral[1000] : colorNeutralStroke1,
    ctrlAvatarPresencebadgeBackgroundBehindbadge:
      '{backgroundLayerPrimarySolid}',
  };
}

export function lightChoiceColors(neutral?: NeutralColors): CtrlChoiceColors {
  return {
    ctrlChoiceBaseStrokeRest: neutral ? neutral[450] : colorNeutralStroke1,
    ctrlChoiceBaseStrokeHover: neutral
      ? neutral[454]
      : colorNeutralStroke1Hover,
    ctrlChoiceBaseStrokePressed: neutral
      ? neutral[458]
      : colorNeutralStroke1Pressed,
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
  neutral?: NeutralColors,
  shadow?: LightShadowColors,
): CtrlDialogColors {
  return {
    ctrlDialogBackground: neutral ? neutral[0] : colorLayerBackgroundDialog,
    ctrlDialogBaseShadowAmbientColor: shadow
      ? shadow.shadowAmbientHighLight
      : colorNeutralShadowAmbient,
    ctrlDialogBaseShadowKeyColor: shadow
      ? shadow.shadowKeyHighLight
      : colorNeutralShadowKey,
    ctrlDialogLayerBackground: '{backgroundLayerPrimarySolid}',
    ctrlDialogPrimaryBackgroundColor: '{backgroundLayerPrimarySolid}',
    ctrlDialogStroke: '{nullColor}',
  };
}

export function lightDragColors(neutral?: NeutralColors): CtrlDragColors {
  return {
    ctrlDragBackgroundSolid: neutral ? neutral[0] : colorLayerBackgroundDialog,
    ctrlDragBackgroundColorBlend: neutral
      ? neutral[0]
      : colorLayerBackgroundDialog,
    ctrlDragBackgroundLumBlend: neutral
      ? neutral[0]
      : colorLayerBackgroundDialog,
  };
}

export function lightIdentityFlyoutColors(
  neutral?: NeutralColors,
): CtrlIdentityFlyoutColors {
  return {
    ctrlIdentityFlyoutManagedBannerBackground: neutral
      ? neutral[800]
      : colorLayerBackgroundTooltipStaticInverted,
    ctrlIdentityFlyoutManagedBannerForeground: neutral
      ? neutral[0]
      : colorNeutralForeground1Static,
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
  ctrlInputBottomlineStrokeRest: '{ctrlInputStrokeRest}',
  ctrlInputBottomlineStrokeHover: '{ctrlInputStrokeHover}',
  ctrlInputBottomlineStrokePressed: '{ctrlInputStrokePressed}',
  ctrlInputBottomlineStrokeDisabled: '{ctrlInputStrokeDisabled}',
  ctrlInputBottomlineStrokeSelected: '{backgroundCtrlActivebrandRest}',
  ctrlInputBottomlineStrokeError: '{ctrlInputStrokeError}',
};

export function lightFabColors(
  neutral?: NeutralColors,
  shadow?: LightShadowColors,
): CtrlFabColors {
  return {
    ctrlFabShadowRestKeyColor: shadow
      ? shadow.shadowKeyLowLight
      : colorNeutralShadowKey,
    ctrlFabShadowRestAmbientColor: shadow
      ? shadow.shadowAmbientLowLight
      : colorNeutralShadowAmbient,
    ctrlFabShadowHoverKeyColor: '{ctrlFabShadowRestKeyColor}',
    ctrlFabShadowPressedKeyColor: '{ctrlFabShadowRestKeyColor}',
    ctrlFabShadowDisabledKeyColor: '{ctrlFabShadowRestKeyColor}',
    ctrlFabBackgroundRest: neutral ? neutral[0] : colorNeutralBackground1,
    ctrlFabBackgroundHover: neutral ? neutral[4] : colorNeutralBackground1Hover,
    ctrlFabBackgroundPressed: neutral
      ? neutral[8]
      : colorNeutralBackground1Pressed,
    ctrlFabBackgroundDisabled: neutral
      ? neutral[200]
      : colorNeutralBackgroundDisabled,
  };
}

export function lightFocusColors(neutral?: NeutralColors): CtrlFocusColors {
  return {
    ctrlFocusInnerStroke: neutral ? neutral[0] : colorStrokeFocus1,
    ctrlFocusOuterStroke: neutral
      ? '{backgroundCtrlBrandRest}'
      : colorStrokeFocus2,
  };
}

export function lightLinkColors(vibrant?: VibrantColors): CtrlLinkColors {
  return {
    ctrlLinkBackgroundRest: vibrant ? vibrant[100] : colorBrandBackground2,
    ctrlLinkBackgroundHover: vibrant
      ? vibrant[200]
      : colorBrandBackground2Hover,
    ctrlLinkBackgroundPressed: vibrant
      ? vibrant[300]
      : colorBrandBackground2Pressed,
    ctrlLinkForegroundNeutralRest: '{foregroundCtrlNeutralPrimaryRest}',
    ctrlLinkForegroundNeutralHover: '{foregroundCtrlNeutralPrimaryRest}',
    ctrlLinkForegroundNeutralPressed: '{foregroundCtrlNeutralPrimaryRest}',
    ctrlLinkForegroundBrandRest: vibrant
      ? vibrant[600]
      : colorBrandForegroundLink,
    ctrlLinkForegroundBrandHover: vibrant
      ? vibrant[600]
      : colorBrandForegroundLinkHover,
    ctrlLinkForegroundBrandPressed: vibrant
      ? vibrant[600]
      : colorBrandForegroundLinkPressed,
  };
}

export function lightListColors(neutral?: NeutralColors): CtrlListColors {
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
    ctrlListBackgroundSelectedRest: neutral
      ? neutral[150]
      : colorSubtleBackgroundSelected,
    ctrlListBackgroundSelectedHover: neutral
      ? neutral[154]
      : colorSubtleBackgroundHover,
    ctrlListBackgroundSelectedPressed: neutral
      ? neutral[158]
      : colorSubtleBackgroundPressed,
    ctrlListBackgroundSelectedDisabled: '{backgroundCtrlNeutralDisabled}',
  };
}

export function lightLiteFilterColors(
  neutral?: NeutralColors,
): CtrlLitefilterColors {
  return {
    ctrlLitefilterBackgroundSelected: neutral
      ? '{backgroundCtrlNeutralRest}'
      : colorSubtleBackgroundSelected,
    ctrlLitefilterStrokeSelected: neutral
      ? neutral[450]
      : colorNeutralStroke1Selected,
    ctrlLitefilterForegroundSelected: neutral
      ? '{foregroundCtrlNeutralPrimaryRest}'
      : colorNeutralForeground1Selected,
  };
}

export function lightOmniboxColors(palette?: ChromePalette): CtrlOmniboxColors {
  return {
    ctrlOmniboxBackgroundHover: palette
      ? palette.neutral.secondary[90]
      : colorNeutralBackground1Hover,
    ctrlOmniboxBackgroundRest: palette
      ? palette.neutral.secondary[94]
      : colorNeutralBackground1,
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
  neutral?: NeutralColors,
): CtrlProgressColors {
  return {
    ctrlProgressBackgroundFilled: '{backgroundCtrlBrandRest}',
    ctrlProgressBackgroundEmpty: neutral
      ? neutral[250]
      : colorNeutralBackground3,
  };
}

export const lightRatingColors: CtrlRatingColors = {
  ctrlRatingIconForegroundEmpty: '{ctrlProgressBackgroundEmpty}',
  ctrlRatingIconForegroundFilled: '{foregroundCtrlBrandRest}',
};

export function lightSegmentedColors(
  neutral?: NeutralColors,
): CtrlSegmentedColors {
  return {
    ctrlSegmentedSegmentedStrokeRest: neutral
      ? neutral[0]
      : colorNeutralStrokeOnBrand,
    ctrlSegmentedSegmentedStrokeHover: neutral
      ? neutral[0]
      : colorNeutralStrokeOnBrand,
    ctrlSegmentedSegmentedStrokePressed: neutral
      ? neutral[0]
      : colorNeutralStrokeOnBrand,
    ctrlSegmentedSegmentedStrokeDisabled: neutral
      ? neutral[0]
      : colorNeutralStrokeOnBrand,
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
  ctrlSliderThumbOuterStrokeRest: '{foregroundCtrlOnbrandRest}',
  ctrlSliderThumbOuterStrokeHover: '{foregroundCtrlOnbrandRest}',
  ctrlSliderThumbOuterStrokePressed: '{foregroundCtrlOnbrandRest}',
  ctrlSliderThumbOuterStrokeDisabled: '{foregroundCtrlOnbrandRest}',
};

export function lightTabColors(palette?: ChromePalette): CtrlTabColors {
  return {
    ctrlTabBackgroundHorizontalActive: palette
      ? palette.neutral.secondary[98]
      : tabActiveBackgroundNormal,
    ctrlTabBackgroundHorizontalHover: palette
      ? palette.tonal.primary[78]
      : '{backgroundCtrlSubtleHover}',
    ctrlTabBackgroundVerticalActive: palette
      ? palette.tonal.primary[92]
      : colorNeutralBackgroundTabActive,
    ctrlTabBackgroundVerticalHover: '{backgroundCtrlSubtleHover}',
  };
}

export function lightTooltipColors(
  neutral?: NeutralColors,
  shadow?: LightShadowColors,
  palette?: ChromePalette,
): CtrlTooltipColors {
  return {
    ctrlTooltipBackground: palette
      ? palette.tonal.primary[20]
      : colorLayerBackgroundTooltip,
    ctrlTooltipForeground: neutral
      ? neutral[0]
      : colorNeutralForeground1,
    ctrlTooltipShadowKeyColor: shadow
      ? shadow.shadowKeyLowLight
      : colorNeutralShadowKey,
    ctrlTooltipShadowAmbientColor: shadow
      ? shadow.shadowAmbientLowLight
      : colorNeutralShadowAmbient,
  };
}
