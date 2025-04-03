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
import {
  GenerateNeutralPalette,
  GenerateVibrantPalette,
} from './paletteGen.js';

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
  const themed = themeColor !== undefined;
  let neutral = defaultNeutral;
  const shadow = defaultShadow;
  let vibrant = defaultVibrant;

  if (themed) {
    neutral = GenerateNeutralPalette(themeColor);
    vibrant = GenerateVibrantPalette(themeColor);
  }

  return resolveNestedVariables({
    ...legacyLightTokens,
    ...lightAiColors,
    ...lightAvatarColors(neutral),
    ...lightBackgroundColors(themed, neutral, vibrant),
    ...lightChoiceColors(neutral),
    ...lightComposerColors,
    ...lightDialogColors(neutral, shadow),
    ...lightDragColors(neutral),
    ...lightFabColors(neutral, shadow),
    ...lightFocusColors(neutral),
    ...lightForegroundColors(themed, neutral, vibrant),
    ...lightIdentityFlyoutColors(neutral),
    ...lightInputColors,
    ...lightLinkColors(vibrant),
    ...lightListColors(neutral),
    ...lightLiteFilterColors(neutral),
    ...lightMaterialColors(neutral),
    ...lightNullColors,
    ...lightOmniboxColors(neutral),
    ...lightProgressColors(neutral),
    ...lightRatingColors,
    ...lightSegmentedColors(neutral),
    ...lightShadowColors(shadow),
    ...lightSliderColors,
    ...lightStatusColors(neutral, vibrant),
    ...lightStrokeColors(neutral),
    ...lightTabColors(themed, neutral, vibrant),
    ...lightTooltipColors(neutral, shadow),
    ...utilityLayoutTemplate,
  } as Theme);
}

export async function darkTheme(themeColor?: string) {
  return resolveNestedVariables({
    ...darkAiColors,
    ...darkAvatarColors,
    ...darkBackgroundColors,
    ...darkChoiceColors,
    ...darkComposerColors,
    ...darkDialogColors,
    ...darkDragColors,
    ...darkFabColors,
    ...darkFocusColors,
    ...darkForegroundColors,
    ...darkIdentityFlyoutColors,
    ...darkInputColors,
    ...darkLinkColors,
    ...darkListColors,
    ...darkLiteFilterColors,
    ...darkMaterialColors,
    ...darkNullColors,
    ...darkOmniboxColors,
    ...darkProgressColors,
    ...darkRatingColors,
    ...darkSegmentedColors,
    ...darkShadowColors,
    ...darkSliderColors,
    ...darkStatusColors,
    ...darkStrokeColors,
    ...darkTabColors,
    ...darkTooltipColors,
    ...legacyDarkTokens,
    ...utilityLayoutTemplate,
  } as Theme);
}
