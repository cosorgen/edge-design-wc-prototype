import { NeutralColors, VibrantColors, ShadowColors } from './globalColors.js';
import type {
  ThemeAiColors,
  ThemeBackgroundColors,
  ThemeForegroundColors,
  ThemeMaterialColors,
  ThemeNullColors,
  ThemeShadowColors,
  ThemeStatusColors,
  ThemeStrokeColors,
} from './themeColors.js';
import type { ChromePalette } from './paletteGen.js';
import {
  acrylicBackgroundColor,
  acrylicBackgroundLuminosity,
  acrylicBackgroundNormal,
  colorBackgroundOverlay,
  colorBrandBackground,
  colorBrandBackground2,
  colorBrandBackground2Hover,
  colorBrandBackground2Pressed,
  colorBrandBackgroundHover,
  colorBrandBackgroundPressed,
  colorBrandForeground1,
  colorBrandStroke,
  colorLayerBackgroundDialog,
  colorNeutralBackground1,
  colorNeutralBackground1Hover,
  colorNeutralBackground1Pressed,
  colorNeutralBackground2,
  colorNeutralBackgroundDisabled,
  colorNeutralCardBackground,
  colorNeutralCardBackgroundDisabled,
  colorNeutralCardBackgroundHover,
  colorNeutralCardBackgroundPressed,
  colorNeutralCardBackgroundSelected,
  colorNeutralForeground1,
  colorNeutralForegroundDisabled,
  colorNeutralForegroundHint,
  colorNeutralForegroundOnBrand,
  colorNeutralShadowAmbient,
  colorNeutralShadowKey,
  colorNeutralStroke1,
  colorNeutralStroke1Hover,
  colorNeutralStroke1Pressed,
  colorNeutralStroke2,
  colorNeutralStroke3,
  colorNeutralStrokeDisabled,
  colorSubtleBackground,
  colorSubtleBackgroundHover,
  colorSubtleBackgroundPressed,
  colorTransparentBackground,
  tabActiveBackgroundColor,
  tabActiveBackgroundLuminosity,
  tabActiveBackgroundNormal,
  tabBarBackgroundColor,
  tabBarBackgroundLuminosity,
  tabBarBackgroundNormal,
  tabBarInactiveBackgroundNormal,
  colorLayerBackgroundTooltipStaticInverted,
  colorStatusDangerBackground3,
  colorStatusDangerForeground3,
  colorStatusDangerBorder1,
  colorStatusDangerBorderActive,
  colorStatusDangerBackground1,
  colorStatusDangerForeground1,
  colorStatusSuccessBackground3,
  colorStatusSuccessForeground3,
  colorStatusSuccessBorderActive,
  colorStatusSuccessBackground1,
  colorStatusSuccessForeground1,
  colorStatusSuccessBorder1,
  colorStatusWarningBackground3,
  colorStatusWarningForeground3,
  colorStatusWarningBorderActive,
  colorStatusWarningBackground1,
  colorStatusWarningForeground1,
  colorStatusWarningBorder1,
  colorNeutralBackground3,
  colorPalettePurpleForeground2,
  colorPalettePumpkinForeground2,
} from '@phoenixui/themes/tokens.js';

export const lightNullColors: ThemeNullColors = {
  nullColor: colorTransparentBackground,
  nullColorBackground: '{nullColor}',
  nullColorBackgroundHover: '{nullColor}',
  nullColorBackgroundPressed: '{nullColor}',
  nullColorStroke: '{nullColor}',
};

export function lightBackgroundColors(
  neutral?: NeutralColors,
  vibrant?: VibrantColors,
  palette?: ChromePalette,
): ThemeBackgroundColors {
  return {
    backgroundCardOnflyoutDefaultDisabled: neutral
      ? neutral[0]
      : colorNeutralCardBackgroundDisabled,
    backgroundCardOnflyoutDefaultHover: neutral
      ? neutral[0]
      : colorNeutralCardBackgroundHover,
    backgroundCardOnflyoutDefaultPressed: neutral
      ? neutral[0]
      : colorNeutralCardBackgroundPressed,
    backgroundCardOnflyoutDefaultRest: neutral
      ? neutral[0]
      : colorNeutralCardBackground,
    backgroundCardOnprimaryAltDisabled: neutral
      ? neutral[200]
      : colorNeutralCardBackgroundDisabled,
    backgroundCardOnprimaryAltHover: vibrant
      ? vibrant[200]
      : colorBrandBackground2Hover,
    backgroundCardOnprimaryAltPressed: vibrant
      ? vibrant[300]
      : colorBrandBackground2Pressed,
    backgroundCardOnprimaryAltRest: vibrant
      ? vibrant[100]
      : colorBrandBackground2,
    backgroundCardOnprimaryDefaultDisabled: neutral
      ? neutral[200]
      : colorNeutralCardBackgroundDisabled,
    backgroundCardOnprimaryDefaultHover: neutral
      ? neutral[4]
      : colorNeutralCardBackgroundHover,
    backgroundCardOnprimaryDefaultPressed: neutral
      ? neutral[8]
      : colorNeutralCardBackgroundPressed,
    backgroundCardOnprimaryDefaultRest: neutral
      ? neutral[0]
      : colorNeutralCardBackground,
    backgroundCardOnprimaryDefaultSelected: neutral
      ? neutral[150]
      : colorNeutralCardBackgroundSelected,
    backgroundCardOnsecondaryAltDisabled:
      '{backgroundCardOnprimaryAltDisabled}',
    backgroundCardOnsecondaryAltHover: '{backgroundCardOnprimaryAltHover}',
    backgroundCardOnsecondaryAltPressed: '{backgroundCardOnprimaryAltPressed}',
    backgroundCardOnsecondaryAltRest: '{backgroundCardOnprimaryAltRest}',
    backgroundCardOnsecondaryDefaultDisabled:
      '{backgroundCardOnprimaryDefaultDisabled}',
    backgroundCardOnsecondaryDefaultHover:
      '{backgroundCardOnprimaryDefaultHover}',
    backgroundCardOnsecondaryDefaultPressed:
      '{backgroundCardOnprimaryDefaultPressed}',
    backgroundCardOnsecondaryDefaultRest:
      '{backgroundCardOnprimaryDefaultRest}',
    backgroundControlBrandRest: '{backgroundCtrlBrandRest}',
    backgroundControlInputRest: '{ctrlInputBackgroundRest}',
    backgroundControlNeutralHover: '{backgroundCtrlNeutralHover}',
    backgroundControlNeutralRest: '{backgroundCtrlNeutralRest}',
    backgroundControlProgressBarEmptyRest: '{ctrlProgressBackgroundEmpty}',
    backgroundControlSubtleDisabled: '{backgroundCtrlSubtleDisabled}',
    backgroundControlSubtleHover: '{backgroundCtrlSubtleHover}',
    backgroundControlSubtlePressed: '{backgroundCtrlSubtlePressed}',
    backgroundControlSubtleRest: '{backgroundCtrlSubtleRest}',
    backgroundCtrlActivebrandDisabled: '{backgroundCtrlBrandDisabled}',
    backgroundCtrlActivebrandHover: '{backgroundCtrlBrandHover}',
    backgroundCtrlActivebrandPressed: '{backgroundCtrlBrandPressed}',
    backgroundCtrlActivebrandRest: '{backgroundCtrlBrandRest}',
    backgroundCtrlBrandDisabled: vibrant
      ? vibrant[200]
      : colorNeutralBackgroundDisabled,
    backgroundCtrlBrandHover: vibrant
      ? vibrant[504]
      : colorBrandBackgroundHover,
    backgroundCtrlBrandPressed: vibrant
      ? vibrant[508]
      : colorBrandBackgroundPressed,
    backgroundCtrlBrandRest: vibrant ? vibrant[500] : colorBrandBackground,
    backgroundCtrlNeutralDisabled: neutral
      ? neutral[200]
      : colorNeutralBackgroundDisabled,
    backgroundCtrlNeutralHover: neutral
      ? neutral[154]
      : colorNeutralBackground1Hover,
    backgroundCtrlNeutralPressed: neutral
      ? neutral[158]
      : colorNeutralBackground1Pressed,
    backgroundCtrlNeutralRest: neutral ? neutral[150] : colorNeutralBackground1,
    backgroundCtrlOnimageHover: '{backgroundCtrlOnimageRest}',
    backgroundCtrlOnimagePressed: '{backgroundCtrlOnimageRest}',
    backgroundCtrlOnimageRest: colorLayerBackgroundTooltipStaticInverted,
    backgroundCtrlOutlineDisabled: '{nullColor}',
    backgroundCtrlOutlineHover: '{nullColor}',
    backgroundCtrlOutlinePressed: '{nullColor}',
    backgroundCtrlOutlineRest: '{nullColor}',
    backgroundCtrlShapesafeActivebrandDisabled: '{foregroundCtrlBrandDisabled}',
    backgroundCtrlShapesafeActivebrandRest: '{foregroundCtrlBrandRest}',
    backgroundCtrlShapesafeNeutralDisabled:
      '{foregroundCtrlNeutralPrimaryDisabled}',
    backgroundCtrlShapesafeNeutralHover: '{backgroundCtrlShapesafeNeutralRest}',
    backgroundCtrlShapesafeNeutralPressed:
      '{backgroundCtrlShapesafeNeutralRest}',
    backgroundCtrlShapesafeNeutralRest: neutral
      ? neutral[400]
      : colorNeutralBackground1,
    backgroundCtrlSubtleDisabled: palette
      ? '{nullColor}'
      : colorTransparentBackground,
    backgroundCtrlSubtleHover: neutral
      ? neutral[4]
      : colorSubtleBackgroundHover,
    backgroundCtrlSubtleHoverSplit: '{nullColor}',
    backgroundCtrlSubtlePressed: neutral
      ? neutral[8]
      : colorSubtleBackgroundPressed,
    backgroundCtrlSubtleRest: colorSubtleBackground,
    backgroundFlyoutColorblend: '{backgroundFlyoutSolid}',
    backgroundFlyoutLumblend: '{backgroundFlyoutSolid}',
    backgroundFlyoutSolid: neutral ? neutral[0] : colorLayerBackgroundDialog,
    backgroundLayerPrimarySolid: neutral ? neutral[0] : colorNeutralBackground1,
    backgroundLayerPrimaryStop1: '{backgroundLayerPrimarySolid}',
    backgroundLayerPrimaryStop2: '{backgroundLayerPrimarySolid}',
    backgroundLayerPrimaryStop3: '{backgroundLayerPrimarySolid}',
    backgroundLayerSecondary: neutral ? neutral[100] : colorNeutralBackground2,
    backgroundLayerTertiary: '{backgroundLayerSecondary}',
    backgroundSmoke: colorBackgroundOverlay,
    backgroundToolbar: '{backgroundCardOnprimaryDefaultRest}',
    backgroundWebPagePrimary: palette
      ? '{backgroundLayerPrimarySolid}'
      : colorLayerBackgroundDialog,
    backgroundWebPageSecondary: palette
      ? '{backgroundLayerSecondary}'
      : '{backgroundWebPagePrimary}',
    backgroundWindowPrimaryColorBlend: '{backgroundWindowPrimarySolid}',
    backgroundWindowPrimaryLumBlend: '{backgroundWindowPrimarySolid}',
    backgroundWindowPrimarySolid: palette
      ? '{backgroundLayerPrimarySolid}'
      : colorLayerBackgroundDialog,
    backgroundWindowSecondaryColorBlend: '{backgroundWindowSecondarySolid}',
    backgroundWindowSecondaryLumBlend: '{backgroundWindowSecondarySolid}',
    backgroundWindowSecondarySolid: palette
      ? '{backgroundLayerSecondary}'
      : colorLayerBackgroundDialog,
    backgroundWindowTabBandColorBlend: '{backgroundWindowTabBandSolid}',
    backgroundWindowTabBandInactive: palette
      ? palette.neutral.primary[92]
      : tabBarInactiveBackgroundNormal,
    backgroundWindowTabBandLumBlend: '{backgroundWindowTabBandSolid}',
    backgroundWindowTabBandSolid: palette
      ? palette.neutral.tertiary[90]
      : tabBarBackgroundNormal,
  };
}

export function lightStrokeColors(neutral?: NeutralColors): ThemeStrokeColors {
  return {
    strokeCardOnprimaryDisabled: '{nullColor}',
    strokeCardOnprimaryHover: '{nullColor}',
    strokeCardOnprimaryPressed: '{nullColor}',
    strokeCardOnprimaryRest: '{nullColor}',
    strokeCardOnSecondaryDisabled: '{nullColor}',
    strokeCardOnSecondaryHover: '{nullColor}',
    strokeCardOnSecondaryPressed: '{nullColor}',
    strokeCardOnSecondaryRest: '{nullColor}',
    strokeCardSelected: '{nullColor}',
    strokeCtrlDividerOnActivebrand: '{strokeCtrlDividerOnBrand}',
    strokeCtrlDividerOnActivebrandDisabled:
      '{strokeCtrlDividerOnBrandDisabled}',
    strokeCtrlDividerOnBrand: '{nullColor}',
    strokeCtrlDividerOnBrandDisabled: '{nullColor}',
    strokeCtrlDividerOnneutral: '{nullColor}',
    strokeCtrlDividerOnneutralDisabled: '{nullColor}',
    strokeCtrlDividerOnoutline: '{nullColor}',
    strokeCtrlDividerOnoutlineDisabled: '{nullColor}',
    strokeCtrlDividerOnSubtle: '{nullColor}',
    strokeCtrlDividerOnSubtleDisabled: '{nullColor}',
    strokeCtrlOnactivebrandDisabled: '{strokeCtrlOnBrandDisabled}',
    strokeCtrlOnactivebrandDisabledStop2: '{strokeCtrlOnBrandDisabled}',
    strokeCtrlOnactivebrandHover: '{strokeCtrlOnBrandHover}',
    strokeCtrlOnactivebrandHoverStop2: '{strokeCtrlOnBrandHover}',
    strokeCtrlOnactivebrandPressed: '{strokeCtrlOnBrandPressed}',
    strokeCtrlOnactivebrandPressedStop2: '{strokeCtrlOnBrandPressed}',
    strokeCtrlOnactivebrandRest: '{strokeCtrlOnBrandRest}',
    strokeCtrlOnactivebrandRestStop2: '{strokeCtrlOnBrandRest}',
    strokeCtrlOnBrandDisabled: '{nullColor}',
    strokeCtrlOnBrandDisabledStop2: '{strokeCtrlOnBrandDisabled}',
    strokeCtrlOnBrandHover: '{nullColor}',
    strokeCtrlOnBrandHoverStop2: '{strokeCtrlOnBrandHover}',
    strokeCtrlOnBrandPressed: '{nullColor}',
    strokeCtrlOnBrandPressedStop2: '{strokeCtrlOnBrandPressed}',
    strokeCtrlOnBrandRest: '{nullColor}',
    strokeCtrlOnBrandRestStop2: '{strokeCtrlOnBrandRest}',
    strokeCtrlOnneutralDisabled: neutral
      ? '{nullColor}'
      : colorNeutralStrokeDisabled,
    strokeCtrlOnneutralDisabledStop2: '{strokeCtrlOnneutralDisabled}',
    strokeCtrlOnneutralHover: neutral
      ? '{nullColor}'
      : colorNeutralStroke1Hover,
    strokeCtrlOnneutralHoverStop2: '{strokeCtrlOnneutralHover}',
    strokeCtrlOnneutralPressed: neutral
      ? '{nullColor}'
      : colorNeutralStroke1Pressed,
    strokeCtrlOnneutralPressedStop2: '{strokeCtrlOnneutralPressed}',
    strokeCtrlOnneutralRest: neutral ? '{nullColor}' : colorNeutralStroke1,
    strokeCtrlOnneutralRestStop2: '{strokeCtrlOnneutralRest}',
    strokeCtrlOnoutlineDisabled: neutral
      ? neutral[200]
      : colorNeutralStrokeDisabled,
    strokeCtrlOnoutlineDisabledStop2: '{strokeCtrlOnoutlineDisabled}',
    strokeCtrlOnoutlineHover: neutral ? neutral[304] : colorNeutralStroke1Hover,
    strokeCtrlOnoutlineHoverStop2: '{strokeCtrlOnoutlineHover}',
    strokeCtrlOnoutlinePressed: neutral
      ? neutral[308]
      : colorNeutralStroke1Pressed,
    strokeCtrlOnoutlinePressedStop2: '{strokeCtrlOnoutlinePressed}',
    strokeCtrlOnoutlineRest: neutral ? neutral[300] : colorNeutralStroke1,
    strokeCtrlOnoutlineRestStop2: '{strokeCtrlOnoutlineRest}',
    strokeCtrlOnsubtleDisabled: '{nullColor}',
    strokeCtrlOnsubtleHover: '{nullColor}',
    strokeCtrlOnsubtleHoverSplit: '{nullColor}',
    strokeCtrlOnsubtlePressed: '{nullColor}',
    strokeCtrlOnsubtleRest: '{nullColor}',
    strokeDividerBrand: '{backgroundCtrlBrandRest}',
    strokeDividerDefault: neutral ? neutral[300] : colorNeutralStroke2,
    strokeDividerStrong: neutral
      ? '{strokeDividerDefault}'
      : colorNeutralStroke1,
    strokeDividerSubtle: neutral ? neutral[200] : colorNeutralStroke3,
    strokeFlyout: '{nullColor}',
    strokeImage: '{nullColor}',
    strokeLayer: '{nullColor}',
    strokeToolbar: '{nullColor}',
    strokeWindowActive: '{nullColor}',
    strokeWindowInactive: '{strokeWindowActive}',
  };
}

export function lightForegroundColors(
  neutral?: NeutralColors,
  vibrant?: VibrantColors,
): ThemeForegroundColors {
  return {
    foregroundContentBrandPrimary: '{foregroundCtrlBrandRest}',
    foregroundContentNeutralPrimary: '{foregroundCtrlNeutralPrimaryRest}',
    foregroundContentNeutralSecondary: '{foregroundCtrlNeutralSecondaryRest}',
    foregroundControlBrandRest: '{foregroundCtrlBrandRest}',
    foregroundControlIconOnSubtleDisabled:
      '{foregroundCtrlIconOnsubtleDisabled}',
    foregroundControlIconOnSubtleHover: '{foregroundCtrlIconOnsubtleHover}',
    foregroundControlIconOnSubtlePressed: '{foregroundCtrlIconOnsubtlePressed}',
    foregroundControlIconOnSubtleRest: '{foregroundCtrlIconOnsubtleRest}',
    foregroundControlLinkBrandRest: '{ctrlLinkForegroundBrandRest}',
    foregroundControlNeutralPrimaryRest: '{foregroundCtrlNeutralPrimaryRest}',
    foregroundControlNeutralSecondaryDisabled:
      '{foregroundCtrlNeutralSecondaryDisabled}',
    foregroundControlNeutralSecondaryHover:
      '{foregroundCtrlNeutralSecondaryHover}',
    foregroundControlNeutralSecondaryPressed:
      '{foregroundCtrlNeutralSecondaryPressed}',
    foregroundControlNeutralSecondaryRest:
      '{foregroundCtrlNeutralSecondaryRest}',
    foregroundControlOnActiveBrandRest: '{foregroundCtrlOnactivebrandRest}',
    foregroundControlOnBrandRest: '{foregroundCtrlOnbrandRest}',
    foregroundControlShapesafeNeutralHover:
      '{foregroundCtrlNeutralPrimaryHover}',
    foregroundControlShapeSafeNeutralHover:
      '{foregroundControlShapesafeNeutralHover}',
    foregroundControlShapesafeNeutralPressed:
      '{foregroundCtrlNeutralPrimaryPressed}',
    foregroundControlShapeSafeNeutralPressed:
      '{foregroundControlShapesafeNeutralPressed}',
    foregroundControlShapesafeNeutralRest: '{foregroundCtrlNeutralPrimaryRest}',
    foregroundCtrlActivebrandDisabled: '{foregroundCtrlBrandDisabled}',
    foregroundCtrlActivebrandHover: '{foregroundCtrlBrandHover}',
    foregroundCtrlActivebrandPressed: '{foregroundCtrlBrandPressed}',
    foregroundCtrlActivebrandRest: '{foregroundCtrlBrandRest}',
    foregroundCtrlBrandDisabled: vibrant
      ? vibrant[200]
      : colorNeutralForegroundDisabled,
    foregroundCtrlBrandHover: '{foregroundCtrlBrandRest}',
    foregroundCtrlBrandPressed: '{foregroundCtrlBrandRest}',
    foregroundCtrlBrandRest: vibrant ? vibrant[600] : colorBrandForeground1,
    foregroundCtrlHintDefault: neutral
      ? neutral[300]
      : colorNeutralForegroundHint,
    foregroundCtrlIconOnneutralDisabled:
      '{foregroundCtrlNeutralPrimaryDisabled}',
    foregroundCtrlIconOnneutralHover: '{foregroundCtrlNeutralPrimaryRest}',
    foregroundCtrlIconOnneutralPressed: '{foregroundCtrlNeutralPrimaryRest}',
    foregroundCtrlIconOnneutralRest: '{foregroundCtrlNeutralPrimaryRest}',
    foregroundCtrlIconOnoutlineDisabled:
      '{foregroundCtrlNeutralPrimaryDisabled}',
    foregroundCtrlIconOnoutlineHover: '{foregroundCtrlNeutralPrimaryRest}',
    foregroundCtrlIconOnoutlinePressed: '{foregroundCtrlNeutralPrimaryRest}',
    foregroundCtrlIconOnoutlineRest: '{foregroundCtrlNeutralPrimaryRest}',
    foregroundCtrlIconOnsubtleDisabled:
      '{foregroundCtrlNeutralPrimaryDisabled}',
    foregroundCtrlIconOnsubtleHover: '{foregroundCtrlNeutralPrimaryRest}',
    foregroundCtrlIconOnsubtlePressed: '{foregroundCtrlNeutralPrimaryRest}',
    foregroundCtrlIconOnsubtleRest: '{foregroundCtrlNeutralPrimaryRest}',
    foregroundCtrlNeutralPrimaryDisabled: neutral
      ? neutral[350]
      : colorNeutralForegroundDisabled,
    foregroundCtrlNeutralPrimaryHover: '{foregroundCtrlNeutralPrimaryRest}',
    foregroundCtrlNeutralPrimaryPressed: '{foregroundCtrlNeutralPrimaryRest}',
    foregroundCtrlNeutralPrimaryRest: neutral
      ? neutral[800]
      : colorNeutralForeground1,
    foregroundCtrlNeutralSecondaryDisabled: neutral
      ? neutral[350]
      : colorNeutralForegroundDisabled,
    foregroundCtrlNeutralSecondaryHover: '{foregroundCtrlNeutralSecondaryRest}',
    foregroundCtrlNeutralSecondaryPressed:
      '{foregroundCtrlNeutralSecondaryRest}',
    foregroundCtrlNeutralSecondaryRest: neutral
      ? neutral[450]
      : colorNeutralForegroundHint,
    foregroundCtrlOnactivebrandDisabled: '{foregroundCtrlOnbrandDisabled}',
    foregroundCtrlOnactivebrandHover: '{foregroundCtrlOnbrandRest}',
    foregroundCtrlOnactivebrandPressed: '{foregroundCtrlOnbrandRest}',
    foregroundCtrlOnactivebrandRest: '{foregroundCtrlOnbrandRest}',
    foregroundCtrlOnbrandDisabled: neutral
      ? neutral[350]
      : colorNeutralForegroundDisabled,
    foregroundCtrlOnbrandHover: '{foregroundCtrlOnbrandRest}',
    foregroundCtrlOnbrandPressed: '{foregroundCtrlOnbrandRest}',
    foregroundCtrlOnbrandRest: neutral
      ? neutral[0]
      : colorNeutralForegroundOnBrand,
    foregroundCtrlOnimageRest: neutral
      ? neutral[0]
      : colorNeutralForegroundOnBrand,
    foregroundCtrlOnoutlineDisabled: '{foregroundCtrlNeutralPrimaryDisabled}',
    foregroundCtrlOnoutlineHover: '{foregroundCtrlNeutralPrimaryRest}',
    foregroundCtrlOnoutlinePressed: '{foregroundCtrlNeutralPrimaryRest}',
    foregroundCtrlOnoutlineRest: '{foregroundCtrlNeutralPrimaryRest}',
    foregroundCtrlOnsubtleDisabled: '{foregroundCtrlNeutralPrimaryDisabled}',
    foregroundCtrlOnsubtleHover: '{foregroundCtrlNeutralPrimaryRest}',
    foregroundCtrlOnsubtlePressed: '{foregroundCtrlNeutralPrimaryRest}',
    foregroundCtrlOnsubtleRest: '{foregroundCtrlNeutralPrimaryRest}',
    foregroundCtrlOntransparentDisabled:
      '{foregroundCtrlNeutralPrimaryDisabled}',
    foregroundCtrlOntransparentHover: '{foregroundCtrlNeutralPrimaryRest}',
    foregroundCtrlOntransparentPressed: '{foregroundCtrlNeutralPrimaryRest}',
    foregroundCtrlOntransparentRest: '{foregroundCtrlNeutralPrimaryRest}',
    foregroundNeutralDisabled: '{foregroundCtrlNeutralPrimaryDisabled}',
    foregroundNeutralSecondary: '{foregroundCtrlNeutralSecondaryRest}',
  };
}

export function lightShadowColors(shadow?: ShadowColors): ThemeShadowColors {
  return {
    shadowToolbarKeyColor: shadow
      ? shadow.shadowKeyLowLight
      : colorNeutralShadowKey,
    shadowToolbarAmbientColor: shadow
      ? shadow.shadowAmbientLowLight
      : colorNeutralShadowAmbient,
    shadowWindowActiveKeyColor: shadow
      ? shadow.shadowKeyHighLight
      : colorNeutralShadowKey,
    shadowWindowActiveAmbientColor: shadow
      ? shadow.shadowAmbientHighLight
      : colorNeutralShadowAmbient,
    shadowWindowInactiveKeyColor: shadow
      ? shadow.shadowKeyHighLight
      : colorNeutralShadowKey,
    shadowWindowInactiveAmbientColor: shadow
      ? shadow.shadowAmbientHighLight
      : colorNeutralShadowAmbient,
    shadowCardRestKeyColor: '{nullColor}',
    shadowCardRestAmbientColor: '{nullColor}',
    shadowCardHoverKeyColor: '{nullColor}',
    shadowCardPressedKeyColor: '{nullColor}',
    shadowCardDisabledKeyColor: '{nullColor}',
    shadowFlyoutKeyColor: shadow
      ? shadow.shadowKeyLowLight
      : colorNeutralShadowKey,
    shadowFlyoutAmbientColor: shadow
      ? shadow.shadowAmbientLowLight
      : colorNeutralShadowAmbient,
    shadowCtrlOnDragKeyColor: '{shadowFlyoutKeyColor}',
    shadowCtrlOnDragAmbientColor: '{shadowFlyoutAmbientColor}',
    shadowLayerKeyColor: shadow
      ? shadow.shadowKeyHighLight
      : colorNeutralShadowKey,
    shadowLayerAmbientColor: shadow
      ? shadow.shadowAmbientHighLight
      : colorNeutralShadowAmbient,
  };
}

export function lightMaterialColors(
  neutral?: NeutralColors,
): ThemeMaterialColors {
  return {
    materialAcrylicDefaultColorblend: '{nullColor}',
    materialAcrylicDefaultLumblend: '{nullColor}',
    materialAcrylicDefaultSolid: neutral ? neutral[0] : acrylicBackgroundNormal,
    materialAcrylicShellDefaultColorblend: neutral
      ? '{materialAcrylicDefaultSolid}'
      : acrylicBackgroundColor,
    materialAcrylicShellDefaultLumblend: neutral
      ? '{materialAcrylicDefaultSolid}'
      : acrylicBackgroundLuminosity,
    materialAcrylicShellDefaultSolid: '{materialAcrylicDefaultSolid}',
    materialMicaDarkerColorblend: neutral
      ? '{materialMicaDarkerSolid}'
      : tabBarBackgroundColor,
    materialMicaDarkerLumblend: neutral
      ? '{materialMicaDarkerSolid}'
      : tabBarBackgroundLuminosity,
    materialMicaDarkerSolid: neutral ? neutral[0] : tabBarBackgroundNormal,
    materialMicaDefaultColorblend: neutral
      ? '{materialMicaDefaultSolid}'
      : tabActiveBackgroundColor,
    materialMicaDefaultLumblend: neutral
      ? '{materialMicaDefaultSolid}'
      : tabActiveBackgroundLuminosity,
    materialMicaDefaultSolid: neutral ? neutral[0] : tabActiveBackgroundNormal,
    materialMicaThinColorblend: '{nullColor}',
    materialMicaThinLumblend: '{nullColor}',
    materialMicaThinSolid: '{nullColor}',
  };
}

export function lightStatusColors(
  neutral?: NeutralColors,
  vibrant?: VibrantColors,
): ThemeStatusColors {
  return {
    statusBrandBackground: vibrant ? vibrant[600] : colorBrandBackground,
    statusBrandForeground: neutral ? neutral[0] : colorNeutralForegroundOnBrand,
    statusBrandStroke: vibrant ? vibrant[500] : colorBrandStroke,
    statusBrandTintBackground: vibrant ? vibrant[100] : colorBrandBackground2,
    statusBrandTintForeground: vibrant ? vibrant[600] : colorBrandForeground1,
    statusBrandTintStroke: '{nullColor}',
    statusDangerBackground: colorStatusDangerBackground3,
    statusDangerForeground: colorStatusDangerForeground3,
    statusDangerStroke: colorStatusDangerBorderActive,
    statusDangerTintBackground: colorStatusDangerBackground1,
    statusDangerTintForeground: colorStatusDangerForeground1,
    statusDangerTintStroke: colorStatusDangerBorder1,
    statusSuccessBackground: colorStatusSuccessBackground3,
    statusSuccessForeground: colorStatusSuccessForeground3,
    statusSuccessStroke: colorStatusSuccessBorderActive,
    statusSuccessTintBackground: colorStatusSuccessBackground1,
    statusSuccessTintForeground: colorStatusSuccessForeground1,
    statusSuccessTintStroke: colorStatusSuccessBorder1,
    statusWarningBackground: colorStatusWarningBackground3,
    statusWarningForeground: colorStatusWarningForeground3,
    statusWarningStroke: colorStatusWarningBorderActive,
    statusWarningTintBackground: colorStatusWarningBackground1,
    statusWarningTintForeground: colorStatusWarningForeground1,
    statusWarningTintStroke: colorStatusWarningBorder1,
    statusInformativeBackground: colorBrandBackground2,
    statusInformativeForeground: colorBrandForeground1,
    statusInformativeStroke: '{nullColor}',
    statusInformativeTintBackground: colorNeutralBackground3,
    statusInformativeTintForeground: colorNeutralForeground1,
    statusInformativeTintStroke: '{nullColor}',
    statusImportantBackground: '{nullColor}',
    statusImportantForeground: '{nullColor}',
    statusImportantStroke: '{nullColor}',
    statusImportantTintBackground: '{nullColor}',
    statusImportantTintForeground: '{nullColor}',
    statusImportantTintStroke: '{nullColor}',
    statusAwayForeground: colorPalettePumpkinForeground2, // Kumo vibrant.orange.600
    statusOofForeground: colorPalettePurpleForeground2, // Kumo vibrant.purple.600
  };
}

export const lightAiColors: ThemeAiColors = {
  aiShimmerStop1: '{nullColor}',
  aiShimmerStop2: '{nullColor}',
  aiShimmerStop3: '{nullColor}',
  aiShimmerStop4: '{nullColor}',
  aiBrandStop1: '{nullColor}',
  aiBrandStop2: '{nullColor}',
  aiBrandStop3: '{nullColor}',
  aiBrandStop4: '{nullColor}',
};
