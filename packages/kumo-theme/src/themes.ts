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
  const shadow = defaultShadow;
  let vibrant = defaultVibrant;

  if (themeColor) {
    palettes = GenerateAllPalettes(themeColor);
    const lightOffset = -4;
    neutral = {
      0: palettes.vibrant.neutralVariant[100],
      4: palettes.vibrant.neutralVariant[97 + lightOffset],
      8: palettes.vibrant.neutralVariant[91 + lightOffset],
      100: palettes.vibrant.neutralVariant[98 + lightOffset],
      104: palettes.vibrant.neutralVariant[93 + lightOffset],
      108: palettes.vibrant.neutralVariant[88 + lightOffset],
      150: palettes.vibrant.neutralVariant[96 + lightOffset],
      154: palettes.vibrant.neutralVariant[93 + lightOffset],
      158: palettes.vibrant.neutralVariant[88 + lightOffset],
      200: palettes.vibrant.neutralVariant[94 + lightOffset],
      250: palettes.vibrant.neutralVariant[88 + lightOffset],
      300: palettes.vibrant.neutralVariant[82 + lightOffset],
      304: palettes.vibrant.neutralVariant[79 + lightOffset],
      308: palettes.vibrant.neutralVariant[73 + lightOffset],
      350: palettes.vibrant.neutralVariant[69 + lightOffset],
      400: palettes.vibrant.neutralVariant[60 + lightOffset],
      404: palettes.vibrant.neutralVariant[63 + lightOffset],
      408: palettes.vibrant.neutralVariant[69 + lightOffset],
      450: palettes.vibrant.neutralVariant[48 + lightOffset],
      454: palettes.vibrant.neutralVariant[45 + lightOffset],
      458: palettes.vibrant.neutralVariant[39 + lightOffset],
      500: palettes.vibrant.neutralVariant[40 + lightOffset],
      550: palettes.vibrant.neutralVariant[29 + lightOffset],
      554: palettes.vibrant.neutralVariant[32 + lightOffset],
      558: palettes.vibrant.neutralVariant[38 + lightOffset],
      600: palettes.vibrant.neutralVariant[24 + lightOffset],
      650: palettes.vibrant.neutralVariant[20 + lightOffset],
      700: palettes.vibrant.neutralVariant[18 + lightOffset],
      704: palettes.vibrant.neutralVariant[21 + lightOffset],
      708: palettes.vibrant.neutralVariant[27 + lightOffset],
      750: palettes.vibrant.neutralVariant[16 + lightOffset],
      754: palettes.vibrant.neutralVariant[19 + lightOffset],
      758: palettes.vibrant.neutralVariant[25 + lightOffset],
      800: palettes.vibrant.neutralVariant[12 + lightOffset],
      804: palettes.vibrant.neutralVariant[15 + lightOffset],
      808: palettes.vibrant.neutralVariant[21 + lightOffset],
      1000: palettes.vibrant.neutralVariant[0],
    };
    vibrant = {
      100: palettes.vibrant.primary[96],
      104: palettes.vibrant.primary[93],
      108: palettes.vibrant.primary[87],
      200: palettes.vibrant.primary[92],
      300: palettes.vibrant.primary[84],
      304: palettes.vibrant.primary[64],
      308: palettes.vibrant.primary[70],
      400: palettes.vibrant.primary[63],
      500: palettes.vibrant.primary[53],
      504: palettes.vibrant.primary[43],
      508: palettes.vibrant.primary[37],
      600: palettes.vibrant.primary[47],
      604: palettes.vibrant.primary[21],
      608: palettes.vibrant.primary[27],
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
    ...lightTooltipColors(neutral, shadow),
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
    const lightOffset = -8;
    neutral = {
      0: palettes.vibrant.neutralVariant[100 + lightOffset],
      4: palettes.vibrant.neutralVariant[97 + lightOffset],
      8: palettes.vibrant.neutralVariant[91 + lightOffset],
      100: palettes.vibrant.neutralVariant[98 + lightOffset],
      104: palettes.vibrant.neutralVariant[93 + lightOffset],
      108: palettes.vibrant.neutralVariant[88 + lightOffset],
      150: palettes.vibrant.neutralVariant[96 + lightOffset],
      154: palettes.vibrant.neutralVariant[93 + lightOffset],
      158: palettes.vibrant.neutralVariant[88 + lightOffset],
      200: palettes.vibrant.neutralVariant[94 + lightOffset],
      250: palettes.vibrant.neutralVariant[88 + lightOffset],
      300: palettes.vibrant.neutralVariant[82],
      304: palettes.vibrant.neutralVariant[79],
      308: palettes.vibrant.neutralVariant[73],
      350: palettes.vibrant.neutralVariant[69],
      400: palettes.vibrant.neutralVariant[60],
      404: palettes.vibrant.neutralVariant[63],
      408: palettes.vibrant.neutralVariant[69],
      450: palettes.vibrant.neutralVariant[48],
      454: palettes.vibrant.neutralVariant[45],
      458: palettes.vibrant.neutralVariant[39],
      500: palettes.vibrant.neutralVariant[40],
      550: palettes.vibrant.neutralVariant[29],
      554: palettes.vibrant.neutralVariant[32],
      558: palettes.vibrant.neutralVariant[38],
      600: palettes.vibrant.neutralVariant[24],
      650: palettes.vibrant.neutralVariant[20],
      700: palettes.vibrant.neutralVariant[18],
      704: palettes.vibrant.neutralVariant[21],
      708: palettes.vibrant.neutralVariant[27],
      750: palettes.vibrant.neutralVariant[16],
      754: palettes.vibrant.neutralVariant[19],
      758: palettes.vibrant.neutralVariant[25],
      800: palettes.vibrant.neutralVariant[12],
      804: palettes.vibrant.neutralVariant[15],
      808: palettes.vibrant.neutralVariant[21],
      1000: palettes.vibrant.neutralVariant[0],
    };
    vibrant = {
      100: palettes.vibrant.primary[96],
      104: palettes.vibrant.primary[93],
      108: palettes.vibrant.primary[87],
      200: palettes.vibrant.primary[92],
      300: palettes.vibrant.primary[84],
      304: palettes.vibrant.primary[64],
      308: palettes.vibrant.primary[70],
      400: palettes.vibrant.primary[63],
      500: palettes.vibrant.primary[53],
      504: palettes.vibrant.primary[43],
      508: palettes.vibrant.primary[37],
      600: palettes.vibrant.primary[47],
      604: palettes.vibrant.primary[21],
      608: palettes.vibrant.primary[27],
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
    ...darkForegroundColors(neutral),
    ...darkIdentityFlyoutColors(neutral),
    ...darkInputColors,
    ...darkLinkColors(vibrant),
    ...darkListColors(neutral),
    ...darkLiteFilterColors(neutral),
    ...darkMaterialColors,
    ...darkNullColors,
    ...darkOmniboxColors(neutral, palettes),
    ...darkProgressColors(neutral),
    ...darkRatingColors,
    ...darkSegmentedColors(neutral),
    ...darkShadowColors,
    ...darkSliderColors,
    ...darkStatusColors,
    ...darkStrokeColors,
    ...darkTabColors(neutral, palettes),
    ...darkTooltipColors(neutral, shadow),
    ...legacyDarkTokens,
    ...utilityLayoutTemplate,
  } as Theme);
}
