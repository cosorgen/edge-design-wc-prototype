import {
  NeutralColors,
  statusDanger,
  statusSuccess,
  statusWarning,
  VibrantColors,
  alphaBlack,
  alphaWhite,
  ShadowColors,
} from './globalColors.js';
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
  colorBackgroundOverlay,
  colorBrandBackground,
  colorBrandBackgroundHover,
  colorBrandBackgroundPressed,
  colorBrandForeground1,
  colorLayerBackgroundDialog,
  colorNeutralBackground1,
  colorNeutralBackground1Hover,
  colorNeutralBackground1Pressed,
  colorNeutralBackground2,
  colorNeutralBackgroundDisabled,
  colorNeutralForeground1,
  colorNeutralForegroundDisabled,
  colorNeutralForegroundHint,
  colorNeutralForegroundOnBrand,
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
  tabBarBackgroundNormal,
  tabBarInactiveBackgroundNormal,
} from '@phoenixui/themes/tokens.js';

export const lightNullColors: ThemeNullColors = {
  nullColor: alphaWhite[0],
  nullColorBackground: '{nullColor}',
  nullColorBackgroundHover: '{nullColor}',
  nullColorBackgroundPressed: '{nullColor}',
  nullColorStroke: '{nullColor}',
};

export function lightBackgroundColors(
  neutral: NeutralColors,
  vibrant: VibrantColors,
  palette?: ChromePalette,
): ThemeBackgroundColors {
  return {
    backgroundCardOnflyoutDefaultDisabled: neutral[0],
    backgroundCardOnflyoutDefaultHover: neutral[0],
    backgroundCardOnflyoutDefaultPressed: neutral[0],
    backgroundCardOnflyoutDefaultRest: neutral[0],
    backgroundCardOnprimaryAltDisabled: neutral[200],
    backgroundCardOnprimaryAltHover: vibrant[200],
    backgroundCardOnprimaryAltPressed: vibrant[300],
    backgroundCardOnprimaryAltRest: vibrant[100],
    backgroundCardOnprimaryDefaultDisabled: neutral[200],
    backgroundCardOnprimaryDefaultHover: neutral[4],
    backgroundCardOnprimaryDefaultPressed: neutral[8],
    backgroundCardOnprimaryDefaultRest: neutral[0],
    backgroundCardOnprimaryDefaultSelected: neutral[150],
    backgroundCardOnsecondaryAltDisabled: neutral[0],
    backgroundCardOnsecondaryAltHover: neutral[0],
    backgroundCardOnsecondaryAltPressed: neutral[0],
    backgroundCardOnsecondaryAltRest: neutral[0],
    backgroundCardOnsecondaryDefaultDisabled: neutral[0],
    backgroundCardOnsecondaryDefaultHover: neutral[0],
    backgroundCardOnsecondaryDefaultPressed: neutral[0],
    backgroundCardOnsecondaryDefaultRest: neutral[0],
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
    backgroundCtrlBrandDisabled: palette
      ? vibrant[200]
      : colorNeutralBackgroundDisabled,
    backgroundCtrlBrandHover: palette
      ? vibrant[504]
      : colorBrandBackgroundHover,
    backgroundCtrlBrandPressed: palette
      ? vibrant[508]
      : colorBrandBackgroundPressed,
    backgroundCtrlBrandRest: palette ? vibrant[500] : colorBrandBackground,
    backgroundCtrlNeutralDisabled: palette
      ? neutral[200]
      : colorNeutralBackgroundDisabled,
    backgroundCtrlNeutralHover: palette
      ? neutral[154]
      : colorNeutralBackground1Hover,
    backgroundCtrlNeutralPressed: palette
      ? neutral[158]
      : colorNeutralBackground1Pressed,
    backgroundCtrlNeutralRest: palette ? neutral[150] : colorNeutralBackground1,
    backgroundCtrlOnimageHover: alphaBlack[50],
    backgroundCtrlOnimagePressed: alphaBlack[40],
    backgroundCtrlOnimageRest: alphaBlack[60],
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
    backgroundCtrlShapesafeNeutralRest: palette
      ? neutral[400]
      : colorNeutralBackground1,
    backgroundCtrlSubtleDisabled: palette
      ? alphaWhite[0]
      : colorTransparentBackground,
    backgroundCtrlSubtleHover: palette
      ? neutral[4]
      : colorSubtleBackgroundHover,
    backgroundCtrlSubtleHoverSplit: '{nullColor}',
    backgroundCtrlSubtlePressed: palette
      ? neutral[8]
      : colorSubtleBackgroundPressed,
    backgroundCtrlSubtleRest: palette ? alphaWhite[0] : colorSubtleBackground,
    backgroundFlyoutColorblend: '{backgroundFlyoutSolid}',
    backgroundFlyoutLumblend: '{backgroundFlyoutSolid}',
    backgroundFlyoutSolid: palette ? neutral[0] : colorLayerBackgroundDialog,
    backgroundLayerPrimarySolid: palette ? neutral[0] : colorNeutralBackground1,
    backgroundLayerPrimaryStop1: '{backgroundLayerPrimarySolid}',
    backgroundLayerPrimaryStop2: '{backgroundLayerPrimarySolid}',
    backgroundLayerPrimaryStop3: '{backgroundLayerPrimarySolid}',
    backgroundLayerSecondary: palette ? neutral[100] : colorNeutralBackground2,
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

export function lightStrokeColors(
  neutral: NeutralColors,
  palette?: ChromePalette,
): ThemeStrokeColors {
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
    strokeCtrlDividerOnBrand: alphaWhite[0],
    strokeCtrlDividerOnBrandDisabled: '{nullColor}',
    strokeCtrlDividerOnneutral: alphaWhite[0],
    strokeCtrlDividerOnneutralDisabled: '{nullColor}',
    strokeCtrlDividerOnoutline: alphaWhite[0],
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
    strokeCtrlOnneutralDisabled: palette
      ? '{nullColor}'
      : colorNeutralStrokeDisabled,
    strokeCtrlOnneutralDisabledStop2: '{strokeCtrlOnneutralDisabled}',
    strokeCtrlOnneutralHover: palette
      ? '{nullColor}'
      : colorNeutralStroke1Hover,
    strokeCtrlOnneutralHoverStop2: '{strokeCtrlOnneutralHover}',
    strokeCtrlOnneutralPressed: palette
      ? '{nullColor}'
      : colorNeutralStroke1Pressed,
    strokeCtrlOnneutralPressedStop2: '{strokeCtrlOnneutralPressed}',
    strokeCtrlOnneutralRest: palette ? '{nullColor}' : colorNeutralStroke1,
    strokeCtrlOnneutralRestStop2: '{strokeCtrlOnneutralRest}',
    strokeCtrlOnoutlineDisabled: palette
      ? neutral[200]
      : colorNeutralStrokeDisabled,
    strokeCtrlOnoutlineDisabledStop2: '{strokeCtrlOnoutlineDisabled}',
    strokeCtrlOnoutlineHover: palette ? neutral[304] : colorNeutralStroke1Hover,
    strokeCtrlOnoutlineHoverStop2: '{strokeCtrlOnoutlineHover}',
    strokeCtrlOnoutlinePressed: palette
      ? neutral[308]
      : colorNeutralStroke1Pressed,
    strokeCtrlOnoutlinePressedStop2: '{strokeCtrlOnoutlinePressed}',
    strokeCtrlOnoutlineRest: palette ? neutral[300] : colorNeutralStroke1,
    strokeCtrlOnoutlineRestStop2: '{strokeCtrlOnoutlineRest}',
    strokeCtrlOnsubtleDisabled: '{nullColor}',
    strokeCtrlOnsubtleHover: '{nullColor}',
    strokeCtrlOnsubtleHoverSplit: '{nullColor}',
    strokeCtrlOnsubtlePressed: '{nullColor}',
    strokeCtrlOnsubtleRest: '{nullColor}',
    strokeDividerBrand: '{backgroundCtrlBrandRest}',
    strokeDividerDefault: palette ? neutral[300] : colorNeutralStroke2,
    strokeDividerStrong: palette
      ? '{strokeDividerDefault}'
      : colorNeutralStroke1,
    strokeDividerSubtle: palette ? neutral[200] : colorNeutralStroke3,
    strokeFlyout: '{nullColor}',
    strokeImage: '{nullColor}',
    strokeLayer: '{nullColor}',
    strokeToolbar: '{nullColor}',
    strokeWindowActive: alphaWhite[0],
    strokeWindowInactive: '{strokeWindowActive}',
  };
}

export function lightForegroundColors(
  neutral: NeutralColors,
  vibrant: VibrantColors,
  palette?: ChromePalette,
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
    foregroundCtrlBrandDisabled: palette
      ? vibrant[200]
      : colorNeutralForegroundDisabled,
    foregroundCtrlBrandHover: '{foregroundCtrlBrandRest}',
    foregroundCtrlBrandPressed: '{foregroundCtrlBrandRest}',
    foregroundCtrlBrandRest: palette ? vibrant[600] : colorBrandForeground1,
    foregroundCtrlHintDefault: neutral[300],
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
    foregroundCtrlNeutralPrimaryDisabled: neutral[350],
    foregroundCtrlNeutralPrimaryHover: '{foregroundCtrlNeutralPrimaryRest}',
    foregroundCtrlNeutralPrimaryPressed: '{foregroundCtrlNeutralPrimaryRest}',
    foregroundCtrlNeutralPrimaryRest: palette
      ? neutral[800]
      : colorNeutralForeground1,
    foregroundCtrlNeutralSecondaryDisabled: palette
      ? neutral[350]
      : colorNeutralForegroundDisabled,
    foregroundCtrlNeutralSecondaryHover: '{foregroundCtrlNeutralSecondaryRest}',
    foregroundCtrlNeutralSecondaryPressed:
      '{foregroundCtrlNeutralSecondaryRest}',
    foregroundCtrlNeutralSecondaryRest: palette
      ? neutral[450]
      : colorNeutralForegroundHint,
    foregroundCtrlOnactivebrandDisabled: '{foregroundCtrlOnbrandDisabled}',
    foregroundCtrlOnactivebrandHover: '{foregroundCtrlOnbrandRest}',
    foregroundCtrlOnactivebrandPressed: '{foregroundCtrlOnbrandRest}',
    foregroundCtrlOnactivebrandRest: '{foregroundCtrlOnbrandRest}',
    foregroundCtrlOnbrandDisabled: palette
      ? neutral[350]
      : colorNeutralForegroundDisabled,
    foregroundCtrlOnbrandHover: '{foregroundCtrlOnbrandRest}',
    foregroundCtrlOnbrandPressed: '{foregroundCtrlOnbrandRest}',
    foregroundCtrlOnbrandRest: palette
      ? neutral[0]
      : colorNeutralForegroundOnBrand,
    foregroundCtrlOnimageRest: palette
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

export function lightShadowColors(shadow: ShadowColors): ThemeShadowColors {
  return {
    shadowToolbarKeyColor: shadow.shadowKeyLowLight,
    shadowToolbarAmbientColor: shadow.shadowAmbientLowLight,
    shadowWindowActiveKeyColor: shadow.shadowKeyHighLight,
    shadowWindowActiveAmbientColor: shadow.shadowAmbientHighLight,
    shadowWindowInactiveKeyColor: shadow.shadowKeyHighLight,
    shadowWindowInactiveAmbientColor: shadow.shadowAmbientHighLight,
    shadowCardRestKeyColor: '{nullColor}',
    shadowCardRestAmbientColor: '{nullColor}',
    shadowCardHoverKeyColor: '{nullColor}',
    shadowCardPressedKeyColor: '{nullColor}',
    shadowCardDisabledKeyColor: '{nullColor}',
    shadowFlyoutKeyColor: shadow.shadowKeyLowLight,
    shadowFlyoutAmbientColor: shadow.shadowAmbientLowLight,
    shadowCtrlOnDragKeyColor: '{shadowFlyoutKeyColor}',
    shadowCtrlOnDragAmbientColor: '{shadowFlyoutAmbientColor}',
    shadowLayerKeyColor: shadow.shadowKeyHighLight,
    shadowLayerAmbientColor: shadow.shadowAmbientHighLight,
  };
}

export function lightMaterialColors(
  neutral: NeutralColors,
): ThemeMaterialColors {
  return {
    materialAcrylicDefaultColorblend: '{nullColor}',
    materialAcrylicDefaultLumblend: '{nullColor}',
    materialAcrylicDefaultSolid: neutral[0],
    materialAcrylicShellDefaultColorblend: neutral[0],
    materialAcrylicShellDefaultLumblend: neutral[0],
    materialAcrylicShellDefaultSolid: neutral[0],
    materialMicaDarkerColorblend: neutral[0],
    materialMicaDarkerLumblend: neutral[0],
    materialMicaDarkerSolid: neutral[0],
    materialMicaDefaultColorblend: neutral[0],
    materialMicaDefaultLumblend: neutral[0],
    materialMicaDefaultSolid: neutral[0],
    materialMicaThinColorblend: neutral[0],
    materialMicaThinLumblend: neutral[0],
    materialMicaThinSolid: neutral[0],
  };
}

export function lightStatusColors(
  neutral: NeutralColors,
  vibrant: VibrantColors,
): ThemeStatusColors {
  return {
    statusBrandBackground: vibrant[600],
    statusBrandForeground: neutral[0],
    statusBrandStroke: vibrant[500],
    statusBrandTintBackground: vibrant[100],
    statusBrandTintForeground: vibrant[600],
    statusBrandTintStroke: alphaWhite[0],
    statusDangerBackground: statusDanger[600],
    statusDangerForeground: neutral[0],
    statusDangerStroke: statusDanger[500],
    statusDangerTintBackground: statusDanger[100],
    statusDangerTintForeground: statusDanger[600],
    statusDangerTintStroke: alphaWhite[0],
    statusSuccessBackground: statusSuccess[600],
    statusSuccessForeground: neutral[0],
    statusSuccessStroke: statusSuccess[500],
    statusSuccessTintBackground: statusSuccess[100],
    statusSuccessTintForeground: statusSuccess[600],
    statusSuccessTintStroke: alphaWhite[0],
    statusWarningBackground: statusWarning[600],
    statusWarningForeground: neutral[0],
    statusWarningStroke: statusWarning[500],
    statusWarningTintBackground: statusWarning[100],
    statusWarningTintForeground: statusWarning[600],
    statusWarningTintStroke: alphaWhite[0],
    statusInformativeBackground: vibrant[100],
    statusInformativeForeground: neutral[500],
    statusInformativeStroke: '{nullColor}',
    statusInformativeTintBackground: neutral[150],
    statusInformativeTintForeground: neutral[800],
    statusInformativeTintStroke: alphaWhite[0],
    statusImportantBackground: '{nullColor}',
    statusImportantForeground: '{nullColor}',
    statusImportantStroke: alphaWhite[0],
    statusImportantTintBackground: alphaWhite[0],
    statusImportantTintForeground: alphaWhite[0],
    statusImportantTintStroke: alphaWhite[0],
    statusAwayForeground: '#c85d00', // Kumo vibrant.orange.600
    statusOofForeground: '#8a42ab', // Kumo vibrant.purple.600
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
