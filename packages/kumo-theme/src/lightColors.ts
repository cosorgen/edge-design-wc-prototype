import { alphaBlack, alphaWhite, neutral } from './globalColors.js';

export const lightNullColors: ThemeNullColors = {
  nullColor: 'rgba(255, 255, 255, 0)',
};

export const lightBackgroundColors: ThemeBackgroundColors = {
  backgroundCtrlBrandRest: neutral[750],
  backgroundCtrlBrandHover: neutral[754],
  backgroundCtrlBrandPressed: neutral[758],
  backgroundCtrlBrandDisabled: neutral[200],
  backgroundActiveBrandRest: neutral[750],
  backgroundActiveBrandHover: neutral[754],
  backgroundActiveBrandPressed: neutral[758],
  backgroundActiveBrandDisabled: neutral[200],
  backgroundNeutralRest: neutral[150],
  backgroundNeutralHover: neutral[154],
  backgroundNeutralPressed: neutral[158],
  backgroundNeutralDisabled: neutral[200],
  backgroundSubtleRest: alphaWhite[0],
  backgroundSubtleHover: neutral[4],
  backgroundSubtlePressed: neutral[8],
  backgroundSubtleDisabled: alphaWhite[0],
  backgroundSubtleHoverSplit: lightNullColors.nullColor,
  backgroundOutlineRest: lightNullColors.nullColor,
  backgroundOutlineHover: lightNullColors.nullColor,
  backgroundOutlinePressed: lightNullColors.nullColor,
  backgroundOutlineDisabled: lightNullColors.nullColor,
  backgroundOnImageRest: alphaBlack[60],
  backgroundOnImageHover: alphaBlack[50],
  backgroundOnImagePressed: alphaBlack[40],
  backgroundShapeSafeNeutralRest: neutral[400],
  backgroundShapeSafeNeutralHover: '',
  backgroundShapeSafeNeutralPressed: '',
  backgroundShapeSafeNeutralDisabled: '',
  backgroundShapeSafeActiveBrandRest: '',
  backgroundShapeSafeActiveBrandDisabled: '',
  backgroundCardOnPrimaryDefaultRest: '',
  backgroundCardOnPrimaryDefaultHover: '',
  backgroundCardOnPrimaryDefaultPressed: '',
  backgroundCardOnPrimaryDefaultDisabled: '',
  backgroundCardOnPrimaryDefaultSelected: '',
  backgroundCardOnPrimaryAltRest: '',
  backgroundCardOnPrimaryAltHover: '',
  backgroundCardOnPrimaryAltPressed: '',
  backgroundCardOnPrimaryAltDisabled: '',
  backgroundCardOnSecondaryDefaultRest: '',
  backgroundCardOnSecondaryDefaultHover: '',
  backgroundCardOnSecondaryDefaultPressed: '',
  backgroundCardOnSecondaryDefaultDisabled: '',
  backgroundCardOnSecondaryAltRest: '',
  backgroundCardOnSecondaryAltHover: '',
  backgroundCardOnSecondaryAltPressed: '',
  backgroundCardOnSecondaryAltDisabled: '',
  backgroundCardOnFlyoutDefaultRest: '',
  backgroundCardOnFlyoutDefaultHover: '',
  backgroundCardOnFlyoutDefaultPressed: '',
  backgroundCardOnFlyoutDefaultDisabled: '',
  backgroundWebPagePrimary: '',
  backgroundWebPageSecondary: '',
  backgroundFlyoutSolid: '',
  backgroundFlyoutLumBlend: '',
  backgroundFlyoutColorBlend: '',
  backgroundToolbar: '',
  backgroundLayerPrimarySolid: '',
  backgroundLayerPrimaryStop1: '',
  backgroundLayerPrimaryStop2: '',
  backgroundLayerPrimaryStop3: '',
  backgroundLayerSecondary: '',
  backgroundLayerTertiary: '',
  backgroundWindowTabBandSolid: '',
  backgroundWindowTabBandInactive: '',
  backgroundWindowLumBlend: '',
  backgroundWindowColorBlend: '',
  backgroundWindowPrimarySolid: '',
  backgroundWindowPrimaryLumBlend: '',
  backgroundWindowPrimaryColorBlend: '',
  backgroundWindowSecondarySolid: '',
  backgroundWindowSecondaryLumBlend: '',
  backgroundWindowSecondaryColorBlend: '',
  backgroundSmoke: '',
};

// Aliasing tokens
lightBackgroundColors.backgroundShapeSafeNeutralHover =
  lightBackgroundColors.backgroundShapeSafeNeutralRest;
lightBackgroundColors.backgroundShapeSafeNeutralPressed =
  lightBackgroundColors.backgroundShapeSafeNeutralRest;
lightBackgroundColors.backgroundShapeSafeNeutralDisabled =
  lightForegroundColors.foregroundCtrlNeutralPrimaryDisabled;
lightBackgroundColors.backgroundActiveBrandRest =
  lightBackgroundColors.backgroundCtrlBrandRest;
lightBackgroundColors.backgroundActiveBrandDisabled =
  lightBackgroundColors.backgroundCtrlBrandDisabled;

export const lightColors: ThemeColors = {
  ...lightNullColors,
  ...lightBackgroundColors,
};
