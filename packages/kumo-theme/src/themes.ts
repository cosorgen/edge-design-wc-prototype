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
  ctrlTabLayout,
  CtrlTabLayout,
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
  CtrlTabLayout &
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
  ...ctrlTabLayout,
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

export function lightTheme(
  themeColor?: string,
  themePalette: 'tonal' | 'neutral' | 'expressive' | 'vibrant' = 'tonal',
): Theme {
  let palettes: ChromePalette | undefined;
  let neutral = defaultNeutral;
  let shadow = defaultShadow;
  let vibrant = defaultVibrant;

  if (themeColor) {
    palettes = GenerateAllPalettes(themeColor);
    const lightOffset = -4;
    neutral = {
      0: palettes[themePalette].neutral[100],
      4: palettes[themePalette].neutral[97 + lightOffset],
      8: palettes[themePalette].neutral[91 + lightOffset],
      100: palettes[themePalette].neutral[98 + lightOffset],
      104: palettes[themePalette].neutral[93 + lightOffset],
      108: palettes[themePalette].neutral[88 + lightOffset],
      150: palettes[themePalette].neutral[96 + lightOffset],
      154: palettes[themePalette].neutral[93 + lightOffset],
      158: palettes[themePalette].neutral[88 + lightOffset],
      200: palettes[themePalette].neutral[94 + lightOffset],
      250: palettes[themePalette].neutral[88 + lightOffset],
      300: palettes[themePalette].neutral[82 + lightOffset],
      304: palettes[themePalette].neutral[79 + lightOffset],
      308: palettes[themePalette].neutral[73 + lightOffset],
      350: palettes[themePalette].neutral[69 + lightOffset],
      400: palettes[themePalette].neutral[60 + lightOffset],
      404: palettes[themePalette].neutral[63 + lightOffset],
      408: palettes[themePalette].neutral[69 + lightOffset],
      450: palettes[themePalette].neutral[48 + lightOffset],
      454: palettes[themePalette].neutral[45 + lightOffset],
      458: palettes[themePalette].neutral[39 + lightOffset],
      500: palettes[themePalette].neutral[40 + lightOffset],
      550: palettes[themePalette].neutral[29 + lightOffset],
      554: palettes[themePalette].neutral[32 + lightOffset],
      558: palettes[themePalette].neutral[38 + lightOffset],
      600: palettes[themePalette].neutral[24 + lightOffset],
      650: palettes[themePalette].neutral[20 + lightOffset],
      700: palettes[themePalette].neutral[18 + lightOffset],
      704: palettes[themePalette].neutral[21 + lightOffset],
      708: palettes[themePalette].neutral[27 + lightOffset],
      750: palettes[themePalette].neutral[16 + lightOffset],
      754: palettes[themePalette].neutral[19 + lightOffset],
      758: palettes[themePalette].neutral[25 + lightOffset],
      800: palettes[themePalette].neutral[12 + lightOffset],
      804: palettes[themePalette].neutral[15 + lightOffset],
      808: palettes[themePalette].neutral[21 + lightOffset],
      1000: palettes[themePalette].neutral[0],
    };
    vibrant = {
      100: palettes[themePalette].primary[96],
      104: palettes[themePalette].primary[93],
      108: palettes[themePalette].primary[87],
      200: palettes[themePalette].primary[92],
      300: palettes[themePalette].primary[84],
      304: palettes[themePalette].primary[64],
      308: palettes[themePalette].primary[70],
      400: palettes[themePalette].primary[63],
      500: palettes[themePalette].primary[53],
      504: palettes[themePalette].primary[43],
      508: palettes[themePalette].primary[37],
      600: palettes[themePalette].primary[47],
      604: palettes[themePalette].primary[21],
      608: palettes[themePalette].primary[27],
    };
    shadow = {
      ...defaultShadow,
      shadowKeyLowLight: `${palettes[themePalette].primary[12]}1F`, // 12% opacity
      shadowKeyHighLight: `${palettes[themePalette].primary[12]}29`, // 16% opacity
      shadowAmbientLowLight: `${palettes[themePalette].primary[12]}0F`, // 6% opacity
      shadowAmbientHighLight: `${palettes[themePalette].primary[12]}14`, // 8% opacity
    };
  }

  return resolveNestedVariables({
    ...legacyLightTokens,
    ...lightAiColors,
    ...lightAvatarColors(neutral),
    ...lightBackgroundColors(
      neutral,
      vibrant,
      palettes ? palettes[themePalette] : undefined,
    ),
    ...lightChoiceColors(neutral),
    ...lightComposerColors,
    ...lightDialogColors(neutral, shadow),
    ...lightDragColors(neutral),
    ...lightFabColors(neutral, shadow),
    ...lightFocusColors(neutral),
    ...lightForegroundColors(
      neutral,
      vibrant,
      palettes ? palettes[themePalette] : undefined,
    ),
    ...lightIdentityFlyoutColors(neutral),
    ...lightInputColors,
    ...lightLinkColors(vibrant),
    ...lightListColors(neutral),
    ...lightLiteFilterColors(neutral),
    ...lightMaterialColors(neutral),
    ...lightNullColors,
    ...lightOmniboxColors(
      neutral,
      palettes ? palettes[themePalette] : undefined,
    ),
    ...lightProgressColors(neutral),
    ...lightRatingColors,
    ...lightSegmentedColors(neutral),
    ...lightShadowColors(shadow),
    ...lightSliderColors,
    ...lightStatusColors(neutral, vibrant),
    ...lightStrokeColors(neutral),
    ...lightTabColors(neutral, palettes ? palettes[themePalette] : undefined),
    ...lightTooltipColors(
      neutral,
      shadow,
      palettes ? palettes[themePalette] : undefined,
    ),
    ...utilityLayoutTemplate,
  } as Theme);
}

export function darkTheme(
  themeColor?: string,
  themePalette: 'tonal' | 'neutral' | 'expressive' | 'vibrant' = 'tonal',
): Theme {
  let palettes: ChromePalette | undefined;
  let neutral = defaultNeutral;
  const shadow = defaultShadow;
  let vibrant = defaultVibrant;

  if (themeColor) {
    palettes = GenerateAllPalettes(themeColor);
    const highlightOffset = -4;
    const offset = 12;
    neutral = {
      0: palettes[themePalette].neutralVariant[100 + highlightOffset],
      4: palettes[themePalette].neutralVariant[97 + highlightOffset],
      8: palettes[themePalette].neutralVariant[91 + highlightOffset],
      100: palettes[themePalette].neutralVariant[98 + highlightOffset],
      104: palettes[themePalette].neutralVariant[93 + highlightOffset],
      108: palettes[themePalette].neutralVariant[88 + highlightOffset],
      150: palettes[themePalette].neutralVariant[96 + highlightOffset],
      154: palettes[themePalette].neutralVariant[93 + highlightOffset],
      158: palettes[themePalette].neutralVariant[88 + highlightOffset],
      200: palettes[themePalette].neutralVariant[94 + highlightOffset],
      250: palettes[themePalette].neutralVariant[88 + highlightOffset],
      300: palettes[themePalette].neutralVariant[82 + highlightOffset],
      304: palettes[themePalette].neutralVariant[79 + highlightOffset],
      308: palettes[themePalette].neutralVariant[73 + highlightOffset],
      350: palettes[themePalette].neutralVariant[69 + highlightOffset],
      400: palettes[themePalette].neutralVariant[60 + offset],
      404: palettes[themePalette].neutralVariant[63 + offset],
      408: palettes[themePalette].neutralVariant[69 + offset],
      450: palettes[themePalette].neutralVariant[48 + offset],
      454: palettes[themePalette].neutralVariant[45 + offset],
      458: palettes[themePalette].neutralVariant[39 + offset],
      500: palettes[themePalette].neutralVariant[40 + offset],
      550: palettes[themePalette].neutralVariant[29 + offset],
      554: palettes[themePalette].neutralVariant[32 + offset],
      558: palettes[themePalette].neutralVariant[38 + offset],
      600: palettes[themePalette].neutralVariant[24 + offset],
      650: palettes[themePalette].neutralVariant[20 + offset],
      700: palettes[themePalette].neutralVariant[18 + offset],
      704: palettes[themePalette].neutralVariant[21 + offset],
      708: palettes[themePalette].neutralVariant[27 + offset],
      750: palettes[themePalette].neutralVariant[16 + offset],
      754: palettes[themePalette].neutralVariant[19 + offset],
      758: palettes[themePalette].neutralVariant[25 + offset],
      800: palettes[themePalette].neutralVariant[12 + offset],
      804: palettes[themePalette].neutralVariant[15 + offset],
      808: palettes[themePalette].neutralVariant[21 + offset],
      1000: palettes[themePalette].neutralVariant[0],
    };
    vibrant = {
      100: palettes[themePalette].primary[96],
      104: palettes[themePalette].primary[93],
      108: palettes[themePalette].primary[87],
      200: palettes[themePalette].primary[92],
      300: palettes[themePalette].primary[84],
      304: palettes[themePalette].primary[64],
      308: palettes[themePalette].primary[70],
      400: palettes[themePalette].primary[63],
      500: palettes[themePalette].primary[53],
      504: palettes[themePalette].primary[43],
      508: palettes[themePalette].primary[37],
      600: palettes[themePalette].primary[47],
      604: palettes[themePalette].primary[21],
      608: palettes[themePalette].primary[27],
    };
  }

  return resolveNestedVariables({
    ...darkAiColors,
    ...darkAvatarColors(neutral),
    ...darkBackgroundColors(
      neutral,
      vibrant,
      palettes ? palettes[themePalette] : undefined,
    ),
    ...darkChoiceColors(neutral),
    ...darkComposerColors,
    ...darkDialogColors(neutral, shadow),
    ...darkDragColors(neutral),
    ...darkFabColors(neutral, shadow),
    ...darkFocusColors(neutral),
    ...darkForegroundColors(
      neutral,
      vibrant,
      palettes ? palettes[themePalette] : undefined,
    ),
    ...darkIdentityFlyoutColors(neutral),
    ...darkInputColors,
    ...darkLinkColors(vibrant),
    ...darkListColors(neutral),
    ...darkLiteFilterColors(neutral),
    ...darkMaterialColors(neutral),
    ...darkNullColors,
    ...darkOmniboxColors(
      neutral,
      palettes ? palettes[themePalette] : undefined,
    ),
    ...darkProgressColors(neutral),
    ...darkRatingColors,
    ...darkSegmentedColors(neutral),
    ...darkShadowColors(shadow),
    ...darkSliderColors,
    ...darkStatusColors(neutral, vibrant),
    ...darkStrokeColors(neutral),
    ...darkTabColors(neutral, palettes ? palettes[themePalette] : undefined),
    ...darkTooltipColors(neutral, shadow),
    ...legacyDarkTokens,
    ...utilityLayoutTemplate,
  } as Theme);
}
