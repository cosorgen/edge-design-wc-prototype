import {
  lightBackgroundColors,
  lightForegroundColors,
  lightMaterialColors,
  lightNullColors,
  lightShadowColors,
  lightStatusColors,
  lightStrokeColors,
  lightAiColors,
} from './lightThemeColors.js';
import {
  lightAvatarColors,
  lightChoiceColors,
  lightComposerColors,
  lightDialogColors,
  lightDragColors,
  lightFabColors,
  lightFocusColors,
  lightIdentityFlyoutColors,
  lightInputColors,
  lightLinkColors,
  lightListColors,
  lightLiteFilterColors,
  lightOmniboxColors,
  lightProgressColors,
  lightRatingColors,
  lightSegmentedColors,
  lightSliderColors,
  lightTabColors,
  lightTooltipColors,
} from './lightCtrlColors.js';
import {
  darkBackgroundColors,
  darkForegroundColors,
  darkMaterialColors,
  darkNullColors,
  darkShadowColors,
  darkStatusColors,
  darkStrokeColors,
  darkAiColors,
} from './darkThemeColors.js';
import {
  darkAvatarColors,
  darkChoiceColors,
  darkComposerColors,
  darkDialogColors,
  darkDragColors,
  darkIdentityFlyoutColors,
  darkInputColors,
  darkFabColors,
  darkFocusColors,
  darkLinkColors,
  darkListColors,
  darkLiteFilterColors,
  darkOmniboxColors,
  darkProgressColors,
  darkRatingColors,
  darkSegmentedColors,
  darkSliderColors,
  darkTabColors,
  darkTooltipColors,
} from './darkCtrlColors.js';
import { Corner, corner } from './corner.js';
import {
  ctrlAvatarLayout,
  ctrlChoiceLayout,
  ctrlBadgeLayout,
  ctrlBooleanLayout,
  ctrlComposerLayout,
  ctrlDialogLayout,
  ctrlDividerLayout,
  ctrlFabLayout,
  ctrlFocusLayout,
  ctrlInputLayout,
  ctrlLinkLayout,
  ctrlListLayout,
  ctrlLiteFilterLayout,
  ctrlProgressLayout,
  ctrlRatingLayout,
  ctrlSegmentedLayout,
  ctrlSliderLayout,
  ctrlSpinnerLayout,
  ctrlSplitLayout,
  ctrlTooltipLayout,
  CtrlBadgeLayout,
  CtrlBooleanLayout,
  CtrlChoiceLayout,
  CtrlComposerLayout,
  CtrlDialogLayout,
  CtrlDividerLayout,
  CtrlFabLayout,
  CtrlFocusLayout,
  CtrlInputLayout,
  CtrlListLayout,
  CtrlAvatarLayout,
  CtrlLinkLayout,
  CtrlLitefilterLayout,
  CtrlProgressLayout,
  CtrlRatingLayout,
  CtrlSegmentedLayout,
  CtrlSliderLayout,
  CtrlSpinnerLayout,
  CtrlSplitLayout,
  CtrlTooltipLayout,
} from './ctrlLayout.js';
import { IconTheme, iconTheme } from './iconTheme.js';
import { Material, material } from './material.js';
import {
  paddingCard,
  paddingCtrl,
  paddingCtrlSm,
  paddingCtrlLg,
  paddingContent,
  paddingFlyout,
  paddingToolbar,
  paddingWindow,
  PaddingCtrl,
  PaddingCtrlLg,
  PaddingCtrlSm,
  PaddingFlyout,
  PaddingCard,
  PaddingWindow,
  PaddingToolbar,
  PaddingContent,
} from './padding.js';
import { GapBetween, gapBetween, GapInside, gapInside } from './gap.js';
import { Shadow, shadow, ShadowParts, shadowParts } from './shadow.js';
import {
  SizeCtrl,
  sizeCtrl,
  SizeCtrlLg,
  sizeCtrlLg,
  SizeCtrlSm,
  sizeCtrlSm,
} from './size.js';
import { Strokewidth, strokeWidth } from './strokeWidth.js';
import {
  TextCtrl,
  textCtrl,
  TextGlobal,
  textGlobal,
  TextRamp,
  textRamp,
  TextRampLg,
  textRampLg,
  TextRampSm,
  textRampSm,
  TextStyle,
  textStyle,
} from './text.js';
import { NullValues, nullValues } from './nullValues.js';
import {
  legacyCommonTokens,
  legacyDarkTokens,
  legacyLightTokens,
} from './legacyTokens.js';
import { resolveNestedVariables } from './resolveNestedVariables.js';
import {
  ThemeAiColors,
  ThemeBackgroundColors,
  ThemeForegroundColors,
  ThemeMaterialColors,
  ThemeNullColors,
  ThemeShadowColors,
  ThemeStatusColors,
  ThemeStrokeColors,
} from './themeColors.js';
import {
  CtrlAvatarColors,
  CtrlChoiceColors,
  CtrlComposerColors,
  CtrlDialogColors,
  CtrlDragColors,
  CtrlFabColors,
  CtrlFocusColors,
  CtrlIdentityFlyoutColors,
  CtrlInputColors,
  CtrlLinkColors,
  CtrlListColors,
  CtrlLitefilterColors,
  CtrlOmniboxColors,
  CtrlProgressColors,
  CtrlRatingColors,
  CtrlSegmentedColors,
  CtrlSliderColors,
  CtrlTabColors,
  CtrlTooltipColors,
} from './ctrlColors.js';
import {
  neutral as defaultNeutral,
  shadow as defaultShadow,
  vibrant as defaultVibrant,
} from './globalColors.js';
import { GenerateAllPalettes, type ChromePalette } from './paletteGen.js';

export type ThemeLayout = Corner &
  CtrlAvatarLayout &
  CtrlBadgeLayout &
  CtrlBooleanLayout &
  CtrlChoiceLayout &
  CtrlComposerLayout &
  CtrlDialogLayout &
  CtrlDividerLayout &
  CtrlFabLayout &
  CtrlFocusLayout &
  CtrlInputLayout &
  CtrlLinkLayout &
  CtrlListLayout &
  CtrlLitefilterLayout &
  CtrlProgressLayout &
  CtrlRatingLayout &
  CtrlSegmentedLayout &
  CtrlSliderLayout &
  CtrlSpinnerLayout &
  CtrlSplitLayout &
  CtrlTooltipLayout &
  GapBetween &
  GapInside &
  IconTheme &
  Material &
  NullValues &
  PaddingCard &
  PaddingContent &
  PaddingCtrl &
  PaddingCtrlLg &
  PaddingCtrlSm &
  PaddingFlyout &
  PaddingToolbar &
  PaddingWindow &
  Shadow &
  ShadowParts &
  SizeCtrl &
  SizeCtrlLg &
  SizeCtrlSm &
  Strokewidth &
  TextCtrl &
  TextGlobal &
  TextRamp &
  TextRampLg &
  TextRampSm &
  TextStyle;

export type Theme = ThemeLayout &
  CtrlAvatarColors &
  CtrlChoiceColors &
  CtrlComposerColors &
  CtrlDialogColors &
  CtrlDragColors &
  CtrlFabColors &
  CtrlFocusColors &
  CtrlIdentityFlyoutColors &
  CtrlInputColors &
  CtrlLinkColors &
  CtrlListColors &
  CtrlLitefilterColors &
  CtrlOmniboxColors &
  CtrlProgressColors &
  CtrlRatingColors &
  CtrlSegmentedColors &
  CtrlSliderColors &
  CtrlTabColors &
  CtrlTooltipColors &
  ThemeAiColors &
  ThemeBackgroundColors &
  ThemeForegroundColors &
  ThemeMaterialColors &
  ThemeNullColors &
  ThemeShadowColors &
  ThemeStatusColors &
  ThemeStrokeColors;

const utilityLayoutTemplate = {
  ...corner,
  ...ctrlAvatarLayout,
  ...ctrlBadgeLayout,
  ...ctrlBooleanLayout,
  ...ctrlChoiceLayout,
  ...ctrlComposerLayout,
  ...ctrlDialogLayout,
  ...ctrlDividerLayout,
  ...ctrlFabLayout,
  ...ctrlFocusLayout,
  ...ctrlInputLayout,
  ...ctrlLinkLayout,
  ...ctrlListLayout,
  ...ctrlLiteFilterLayout,
  ...ctrlProgressLayout,
  ...ctrlRatingLayout,
  ...ctrlSegmentedLayout,
  ...ctrlSliderLayout,
  ...ctrlSpinnerLayout,
  ...ctrlSplitLayout,
  ...ctrlTooltipLayout,
  ...gapBetween,
  ...gapInside,
  ...iconTheme,
  ...legacyCommonTokens,
  ...material,
  ...nullValues,
  ...paddingCard,
  ...paddingContent,
  ...paddingCtrl,
  ...paddingCtrlLg,
  ...paddingCtrlSm,
  ...paddingFlyout,
  ...paddingToolbar,
  ...paddingWindow,
  ...shadow,
  ...shadowParts,
  ...sizeCtrl,
  ...sizeCtrlLg,
  ...sizeCtrlSm,
  ...strokeWidth,
  ...textCtrl,
  ...textGlobal,
  ...textRamp,
  ...textRampLg,
  ...textRampSm,
  ...textStyle,
} as ThemeLayout;

export function lightTheme(themeColor?: string): Theme {
  let palettes: ChromePalette | undefined;
  let neutral = defaultNeutral;
  let shadow = defaultShadow;
  let vibrant = defaultVibrant;

  if (themeColor) {
    palettes = GenerateAllPalettes(themeColor);
    const lightOffset = -4;
    neutral = {
      0: palettes.tonal.neutral[100],
      4: palettes.tonal.neutral[97 + lightOffset],
      8: palettes.tonal.neutral[91 + lightOffset],
      100: palettes.tonal.neutral[98 + lightOffset],
      104: palettes.tonal.neutral[93 + lightOffset],
      108: palettes.tonal.neutral[88 + lightOffset],
      150: palettes.tonal.neutral[96 + lightOffset],
      154: palettes.tonal.neutral[93 + lightOffset],
      158: palettes.tonal.neutral[88 + lightOffset],
      200: palettes.tonal.neutral[94 + lightOffset],
      250: palettes.tonal.neutral[88 + lightOffset],
      300: palettes.tonal.neutral[82 + lightOffset],
      304: palettes.tonal.neutral[79 + lightOffset],
      308: palettes.tonal.neutral[73 + lightOffset],
      350: palettes.tonal.neutral[69 + lightOffset],
      400: palettes.tonal.neutral[60 + lightOffset],
      404: palettes.tonal.neutral[63 + lightOffset],
      408: palettes.tonal.neutral[69 + lightOffset],
      450: palettes.tonal.neutral[48 + lightOffset],
      454: palettes.tonal.neutral[45 + lightOffset],
      458: palettes.tonal.neutral[39 + lightOffset],
      500: palettes.tonal.neutral[40 + lightOffset],
      550: palettes.tonal.neutral[29 + lightOffset],
      554: palettes.tonal.neutral[32 + lightOffset],
      558: palettes.tonal.neutral[38 + lightOffset],
      600: palettes.tonal.neutral[24 + lightOffset],
      650: palettes.tonal.neutral[20 + lightOffset],
      700: palettes.tonal.neutral[18 + lightOffset],
      704: palettes.tonal.neutral[21 + lightOffset],
      708: palettes.tonal.neutral[27 + lightOffset],
      750: palettes.tonal.neutral[16 + lightOffset],
      754: palettes.tonal.neutral[19 + lightOffset],
      758: palettes.tonal.neutral[25 + lightOffset],
      800: palettes.tonal.neutral[12 + lightOffset],
      804: palettes.tonal.neutral[15 + lightOffset],
      808: palettes.tonal.neutral[21 + lightOffset],
      1000: palettes.tonal.neutral[0],
    };
    vibrant = {
      100: palettes.tonal.primary[96],
      104: palettes.tonal.primary[93],
      108: palettes.tonal.primary[87],
      200: palettes.tonal.primary[92],
      300: palettes.tonal.primary[84],
      304: palettes.tonal.primary[64],
      308: palettes.tonal.primary[70],
      400: palettes.tonal.primary[63],
      500: palettes.tonal.primary[53],
      504: palettes.tonal.primary[43],
      508: palettes.tonal.primary[37],
      600: palettes.tonal.primary[47],
      604: palettes.tonal.primary[21],
      608: palettes.tonal.primary[27],
    };
    shadow = {
      ...defaultShadow,
      shadowKeyLowLight: `${palettes.vibrant.primary[12]}1F`, // 12% opacity
      shadowKeyHighLight: `${palettes.vibrant.primary[12]}29`, // 16% opacity
      shadowAmbientLowLight: `${palettes.vibrant.primary[12]}0F`, // 6% opacity
      shadowAmbientHighLight: `${palettes.vibrant.primary[12]}14`, // 8% opacity
    };
  }

  return resolveNestedVariables({
    ...legacyLightTokens,
    ...lightAiColors,
    ...lightAvatarColors(neutral),
    ...lightBackgroundColors(neutral, vibrant, palettes),
    ...lightChoiceColors(neutral),
    ...lightComposerColors,
    ...lightDialogColors(neutral, shadow),
    ...lightDragColors(neutral),
    ...lightFabColors(neutral, shadow),
    ...lightFocusColors(neutral),
    ...lightForegroundColors(neutral, vibrant, palettes),
    ...lightIdentityFlyoutColors(neutral),
    ...lightInputColors,
    ...lightLinkColors(vibrant),
    ...lightListColors(neutral),
    ...lightLiteFilterColors(neutral),
    ...lightMaterialColors(neutral),
    ...lightNullColors,
    ...lightOmniboxColors(neutral, palettes),
    ...lightProgressColors(neutral),
    ...lightRatingColors,
    ...lightSegmentedColors(neutral),
    ...lightShadowColors(shadow),
    ...lightSliderColors,
    ...lightStatusColors(neutral, vibrant),
    ...lightStrokeColors(neutral),
    ...lightTabColors(neutral, palettes),
    ...lightTooltipColors(neutral, shadow, palettes),
    ...utilityLayoutTemplate,
  } as Theme);
}

export function darkTheme(themeColor?: string): Theme {
  let palettes: ChromePalette | undefined;
  let neutral = defaultNeutral;
  const shadow = defaultShadow;
  let vibrant = defaultVibrant;

  if (themeColor) {
    palettes = GenerateAllPalettes(themeColor);
    const highlightOffset = -4;
    const offset = 12;
    neutral = {
      0: palettes.expressive.neutralVariant[100 + highlightOffset],
      4: palettes.expressive.neutralVariant[97 + highlightOffset],
      8: palettes.expressive.neutralVariant[91 + highlightOffset],
      100: palettes.expressive.neutralVariant[98 + highlightOffset],
      104: palettes.expressive.neutralVariant[93 + highlightOffset],
      108: palettes.expressive.neutralVariant[88 + highlightOffset],
      150: palettes.expressive.neutralVariant[96 + highlightOffset],
      154: palettes.expressive.neutralVariant[93 + highlightOffset],
      158: palettes.expressive.neutralVariant[88 + highlightOffset],
      200: palettes.expressive.neutralVariant[94 + highlightOffset],
      250: palettes.expressive.neutralVariant[88 + highlightOffset],
      300: palettes.expressive.neutralVariant[82 + highlightOffset],
      304: palettes.expressive.neutralVariant[79 + highlightOffset],
      308: palettes.expressive.neutralVariant[73 + highlightOffset],
      350: palettes.expressive.neutralVariant[69 + highlightOffset],
      400: palettes.expressive.neutralVariant[60 + offset],
      404: palettes.expressive.neutralVariant[63 + offset],
      408: palettes.expressive.neutralVariant[69 + offset],
      450: palettes.expressive.neutralVariant[48 + offset],
      454: palettes.expressive.neutralVariant[45 + offset],
      458: palettes.expressive.neutralVariant[39 + offset],
      500: palettes.expressive.neutralVariant[40 + offset],
      550: palettes.expressive.neutralVariant[29 + offset],
      554: palettes.expressive.neutralVariant[32 + offset],
      558: palettes.expressive.neutralVariant[38 + offset],
      600: palettes.expressive.neutralVariant[24 + offset],
      650: palettes.expressive.neutralVariant[20 + offset],
      700: palettes.expressive.neutralVariant[18 + offset],
      704: palettes.expressive.neutralVariant[21 + offset],
      708: palettes.expressive.neutralVariant[27 + offset],
      750: palettes.expressive.neutralVariant[16 + offset],
      754: palettes.expressive.neutralVariant[19 + offset],
      758: palettes.expressive.neutralVariant[25 + offset],
      800: palettes.expressive.neutralVariant[12 + offset],
      804: palettes.expressive.neutralVariant[15 + offset],
      808: palettes.expressive.neutralVariant[21 + offset],
      1000: palettes.expressive.neutralVariant[0],
    };
    vibrant = {
      100: palettes.tonal.primary[96],
      104: palettes.tonal.primary[93],
      108: palettes.tonal.primary[87],
      200: palettes.tonal.primary[92],
      300: palettes.tonal.primary[84],
      304: palettes.tonal.primary[64],
      308: palettes.tonal.primary[70],
      400: palettes.tonal.primary[63],
      500: palettes.tonal.primary[53],
      504: palettes.tonal.primary[43],
      508: palettes.tonal.primary[37],
      600: palettes.tonal.primary[47],
      604: palettes.tonal.primary[21],
      608: palettes.tonal.primary[27],
    };
  }

  return resolveNestedVariables({
    ...darkAiColors,
    ...darkAvatarColors(neutral),
    ...darkBackgroundColors(neutral, vibrant, palettes),
    ...darkChoiceColors(neutral),
    ...darkComposerColors,
    ...darkDialogColors(neutral, shadow),
    ...darkDragColors(neutral),
    ...darkFabColors(neutral, shadow),
    ...darkFocusColors(neutral),
    ...darkForegroundColors(neutral, vibrant, palettes),
    ...darkIdentityFlyoutColors(neutral),
    ...darkInputColors,
    ...darkLinkColors(vibrant),
    ...darkListColors(neutral),
    ...darkLiteFilterColors(neutral),
    ...darkMaterialColors(neutral),
    ...darkNullColors,
    ...darkOmniboxColors(neutral, palettes),
    ...darkProgressColors(neutral),
    ...darkRatingColors,
    ...darkSegmentedColors(neutral),
    ...darkShadowColors(shadow),
    ...darkSliderColors,
    ...darkStatusColors(neutral, vibrant),
    ...darkStrokeColors(neutral),
    ...darkTabColors(neutral, palettes),
    ...darkTooltipColors(neutral, shadow),
    ...legacyDarkTokens,
    ...utilityLayoutTemplate,
  } as Theme);
}
