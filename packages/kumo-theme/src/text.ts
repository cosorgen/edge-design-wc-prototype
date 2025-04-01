import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
} from './globalValues.js';

export type TextGlobal = {
  textGlobalCaption2Fontsize: string;
  textGlobalCaption2Lineheight: string;
  textGlobalCaption1Fontsize: string;
  textGlobalCaption1Lineheight: string;
  textGlobalBody3Fontsize: string;
  textGlobalBody3Lineheight: string;
  textGlobalBody2Fontsize: string;
  textGlobalBody2Lineheight: string;
  textGlobalBody1Fontsize: string;
  textGlobalBody1Lineheight: string;
  textGlobalSubtitle2Fontsize: string;
  textGlobalSubtitle2Lineheight: string;
  textGlobalSubtitle1Fontsize: string;
  textGlobalSubtitle1Lineheight: string;
  textGlobalTitle2Fontsize: string;
  textGlobalTitle2Lineheight: string;
  textGlobalTitle1Fontsize: string;
  textGlobalTitle1Lineheight: string;
  textGlobalDisplay2Fontsize: string;
  textGlobalDisplay2Lineheight: string;
  textGlobalDisplay1Fontsize: string;
  textGlobalDisplay1Lineheight: string;
};

export type TextStyle = {
  textStyleDefaultRegularFontfamily: string;
  textStyleDefaultRegularFontFamily: string;
  textStyleDefaultRegularLetterSpacing: string;
  textStyleDefaultRegularLetterspacing: string;
  textStyleDefaultRegularWeight: string;
  textStyleDefaultHeaderCase: string;
  textStyleDefaultHeaderFontfamily: string;
  textStyleDefaultHeaderLetterSpacing: string;
  textStyleDefaultHeaderWeight: string;
  textStyleArticleRegularFontFamily: string;
  textStyleArticleRegularLetterSpacing: string;
  textStyleArticleRegularWeight: string;
  textStyleArticleHeaderCase: string;
  textStyleArticleHeaderFontfamily: string;
  textStyleArticleHeaderLetterSpacing: string;
  textStyleArticleHeaderWeight: string;
  textStyleAiRegularFontFamily: string;
  textStyleAiRegularLetterSpacing: string;
  textStyleAiRegularWeight: string;
  textStyleAiHeaderCase: string;
  textStyleAiHeaderFontFamily: string;
  textStyleAiHeaderLetterSpacing: string;
  textStyleAiHeaderWeight: string;
  textStyleCodeRegularFontFamily: string;
  textStyleCodeRegularLetterSpacing: string;
  textStyleCodeRegularWeight: string;
  textStyleCodeHeaderCase: string;
  textStyleCodeHeaderFontFamily: string;
  textStyleCodeHeaderLetterSpacing: string;
  textStyleCodeHeaderWeight: string;
  textStyleDataVizRegularFontFamily: string;
  textStyleDataVizRegularLetterSpacing: string;
  textStyleDataVizRegularWeight: string;
  textStyleDataVizHeaderCase: string;
  textStyleDataVizHeaderFontFamily: string;
  textStyleDataVizHeaderLetterSpacing: string;
  textStyleDataVizHeaderWeight: string;
  textStyleQuoteRegularFontFamily: string;
  textStyleQuoteRegularLetterSpacing: string;
  textStyleQuoteRegularWeight: string;
  textStyleQuoteHeaderCase: string;
  textStyleQuoteHeaderFontFamily: string;
  textStyleQuoteHeaderLetterSpacing: string;
  textStyleQuoteHeaderWeight: string;
};

export type TextCtrl = {
  textCtrlWeightDefault: string;
  textCtrlWeightSelected: string;
  textCtrlButtonWeightDefault: string;
  textCtrlButtonWeightSelected: string;
  textControlDefaultBodyFontSize: string;
};

export type TextRamp = {
  textRampItembodyFontsize: string;
  textRampItembodyLineheight: string;
  textRampLegalFontsize: string;
  textRampLegalLineheight: string;
  textRampMetadataFontsize: string;
  textRampMetadataLineheight: string;
  textRampItemHeaderFontsize: string;
  textRampItemHeaderLineheight: string;
  textRampReadingbodyFontsize: string;
  textRampReadingbodyLineheight: string;
  textRampSubsectionHeaderFontsize: string;
  textRampSubsectionHeaderLineheight: string;
  textRampSectionheaderFontsize: string;
  textRampSectionheaderLineheight: string;
  textRampPageHeaderFontsize: string;
  textRampPageHeaderLineheight: string;
  textRampCaption2LineHeight: string;
  textRampCaption2FontSize: string;
  textRampBody2FontSize: string;
  textRampBody2LineHeight: string;
  textRampTitle3LineHeight: string;
  textRampTitle3FontSize: string;
  textRampTitle2LineHeight: string;
  textRampTitle2FontSize: string;
  textRampTitle1LineHeight: string;
  textRampTitle1FontSize: string;
  textRampSubtitle2LineHeight: string;
  textRampSubtitle2FontSize: string;
  textRampSubtitle1LineHeight: string;
  textRampSubtitle1FontSize: string;
  textRampCaption1LineHeight: string;
  textRampCaption1FontSize: string;
  textRampBody1LineHeight: string;
  textRampBody1FontSize: string;
  textRampBody3LineHeight: string;
};

export type TextRampSm = {
  textRampSmItembodyFontsize: string;
  textRampSmItembodyLineheight: string;
  textRampSmLegalFontsize: string;
  textRampSmLegalLineheight: string;
  textRampSmMetadataFontsize: string;
  textRampSmMetadataLineheight: string;
  textRampSmItemHeaderFontsize: string;
  textRampSmItemHeaderLineheight: string;
  textRampSmReadingBodyFontsize: string;
  textRampSmReadingBodyLineheight: string;
  textRampSmSubsectionHeaderFontsize: string;
  textRampSmSubsectionHeaderLineheight: string;
  textRampSmSectionHeaderFontsize: string;
  textRampSmSectionHeaderLineheight: string;
  textRampSmPageHeaderFontsize: string;
  textRampSmPageHeaderLineheight: string;
};

export type TextRampLg = {
  textRampLgItembodyFontsize: string;
  textRampLgItembodyLineheight: string;
  textRampLgLegalFontsize: string;
  textRampLgLegalLineheight: string;
  textRampLgMetadataFontsize: string;
  textRampLgMetadataLineheight: string;
  textRampLgItemHeaderFontsize: string;
  textRampLgItemHeaderLineheight: string;
  textRampLgReadingBodyFontsize: string;
  textRampLgReadingBodyLineheight: string;
  textRampLgSubsectionHeaderFontsize: string;
  textRampLgSubsectionHeaderLineheight: string;
  textRampLgSectionHeaderFontsize: string;
  textRampLgSectionHeaderLineheight: string;
  textRampLgPageHeaderFontsize: string;
  textRampLgPageHeaderLineheight: string;
};

export const textGlobal: TextGlobal = {
  textGlobalCaption2Fontsize: fontSize[100],
  textGlobalCaption2Lineheight: lineHeight[100],
  textGlobalCaption1Fontsize: fontSize[200],
  textGlobalCaption1Lineheight: lineHeight[200],
  textGlobalBody3Fontsize: fontSize[300],
  textGlobalBody3Lineheight: lineHeight[300],
  textGlobalBody2Fontsize: fontSize[400],
  textGlobalBody2Lineheight: lineHeight[400],
  textGlobalBody1Fontsize: fontSize[450],
  textGlobalBody1Lineheight: lineHeight[500],
  textGlobalSubtitle2Fontsize: fontSize[400],
  textGlobalSubtitle2Lineheight: lineHeight[400],
  textGlobalSubtitle1Fontsize: fontSize[500],
  textGlobalSubtitle1Lineheight: lineHeight[500],
  textGlobalTitle2Fontsize: fontSize[600],
  textGlobalTitle2Lineheight: lineHeight[600],
  textGlobalTitle1Fontsize: fontSize[700],
  textGlobalTitle1Lineheight: lineHeight[700],
  textGlobalDisplay2Fontsize: '56px',
  textGlobalDisplay2Lineheight: '84px',
  textGlobalDisplay1Fontsize: '74px',
  textGlobalDisplay1Lineheight: '112px',
};

export const textStyle: TextStyle = {
  textStyleDefaultRegularFontfamily: fontFamily.base,
  textStyleDefaultRegularFontFamily: '{textStyleDefaultRegularFontfamily}',
  textStyleDefaultRegularLetterSpacing: '0px',
  textStyleDefaultRegularLetterspacing:
    '{textStyleDefaultRegularLetterSpacing}',
  textStyleDefaultRegularWeight: fontWeight.regular,
  textStyleDefaultHeaderCase: '{nullString}',
  textStyleDefaultHeaderFontfamily: fontFamily.base,
  textStyleDefaultHeaderLetterSpacing: '{textStyleDefaultRegularLetterSpacing}',
  textStyleDefaultHeaderWeight: fontWeight.semibold,
  textStyleArticleRegularFontFamily: fontFamily.serif,
  textStyleArticleRegularLetterSpacing: '{textStyleDefaultHeaderLetterSpacing}',
  textStyleArticleRegularWeight: fontWeight.regular,
  textStyleArticleHeaderCase: '{nullString}',
  textStyleArticleHeaderFontfamily: fontFamily.serif,
  textStyleArticleHeaderLetterSpacing: '{textStyleDefaultHeaderLetterSpacing}',
  textStyleArticleHeaderWeight: fontWeight.medium,
  textStyleAiRegularFontFamily: fontFamily.base,
  textStyleAiRegularLetterSpacing: '{textStyleDefaultRegularLetterSpacing}',
  textStyleAiRegularWeight: fontWeight.regular,
  textStyleAiHeaderCase: '{nullString}',
  textStyleAiHeaderFontFamily: fontFamily.serif,
  textStyleAiHeaderLetterSpacing: '{textStyleAiRegularLetterSpacing}',
  textStyleAiHeaderWeight: fontWeight.medium,
  textStyleCodeRegularFontFamily: fontFamily.base,
  textStyleCodeRegularLetterSpacing: '{textStyleDefaultRegularLetterSpacing}',
  textStyleCodeRegularWeight: '{textStyleDefaultRegularWeight}',
  textStyleCodeHeaderCase: '{nullString}',
  textStyleCodeHeaderFontFamily: fontFamily.base,
  textStyleCodeHeaderLetterSpacing: '{textStyleDefaultHeaderLetterSpacing}',
  textStyleCodeHeaderWeight: '{textStyleDefaultHeaderWeight}',
  textStyleDataVizRegularFontFamily: fontFamily.base,
  textStyleDataVizRegularLetterSpacing:
    '{textStyleDefaultRegularLetterSpacing}',
  textStyleDataVizRegularWeight: '{textStyleDefaultRegularWeight}',
  textStyleDataVizHeaderCase: '{nullString}',
  textStyleDataVizHeaderFontFamily: fontFamily.base,
  textStyleDataVizHeaderLetterSpacing: '{textStyleDefaultHeaderLetterSpacing}',
  textStyleDataVizHeaderWeight: '{textStyleDefaultHeaderWeight}',
  textStyleQuoteRegularFontFamily: fontFamily.base,
  textStyleQuoteRegularLetterSpacing: '{textStyleDefaultRegularLetterSpacing}',
  textStyleQuoteRegularWeight: '{textStyleDefaultRegularWeight}',
  textStyleQuoteHeaderCase: '{nullString}',
  textStyleQuoteHeaderFontFamily: fontFamily.base,
  textStyleQuoteHeaderLetterSpacing: '{textStyleDefaultHeaderLetterSpacing}',
  textStyleQuoteHeaderWeight: '{textStyleDefaultHeaderWeight}',
};

export const textCtrl: TextCtrl = {
  textCtrlWeightDefault: '{textStyleDefaultRegularWeight}',
  textCtrlWeightSelected: '{textStyleDefaultHeaderWeight}',
  textCtrlButtonWeightDefault: '{textStyleDefaultRegularWeight}',
  textCtrlButtonWeightSelected: '{textStyleDefaultHeaderWeight}',
  textControlDefaultBodyFontSize: '{textGlobalBody3Fontsize}',
};

export const textRamp: TextRamp = {
  textRampItembodyFontsize: '{textGlobalBody3Fontsize}',
  textRampItembodyLineheight: '{textGlobalBody3Lineheight}',
  textRampLegalFontsize: fontSize[300],
  textRampLegalLineheight: lineHeight[300],
  textRampMetadataFontsize: '{textGlobalCaption1Fontsize}',
  textRampMetadataLineheight: '{textGlobalCaption1Lineheight}',
  textRampItemHeaderFontsize: '{textGlobalBody2Fontsize}',
  textRampItemHeaderLineheight: '{textGlobalBody2Lineheight}',
  textRampReadingbodyFontsize: '{textGlobalBody2Fontsize}',
  textRampReadingbodyLineheight: '{textGlobalBody2Lineheight}',
  textRampSubsectionHeaderFontsize: '{textGlobalSubtitle2Fontsize}',
  textRampSubsectionHeaderLineheight: '{textGlobalSubtitle2Lineheight}',
  textRampSectionheaderFontsize: '{textGlobalSubtitle1Fontsize}',
  textRampSectionheaderLineheight: '{textGlobalSubtitle1Lineheight}',
  textRampPageHeaderFontsize: '{textGlobalTitle2Fontsize}',
  textRampPageHeaderLineheight: '{textGlobalTitle2Lineheight}',
  textRampCaption2LineHeight: '{textGlobalCaption2Lineheight}',
  textRampCaption2FontSize: '{textGlobalCaption2Fontsize}',
  textRampBody2FontSize: '{textGlobalBody2Fontsize}',
  textRampBody2LineHeight: '{textGlobalBody2Lineheight}',
  textRampTitle3LineHeight: '{textGlobalSubtitle1Lineheight}',
  textRampTitle3FontSize: '{textGlobalSubtitle1Fontsize}',
  textRampTitle2LineHeight: '{textGlobalTitle2Lineheight}',
  textRampTitle2FontSize: '{textGlobalTitle2Fontsize}',
  textRampTitle1LineHeight: '{textGlobalTitle1Lineheight}',
  textRampTitle1FontSize: '{textGlobalTitle1Fontsize}',
  textRampSubtitle2LineHeight: '{textGlobalSubtitle2Lineheight}',
  textRampSubtitle2FontSize: '{textGlobalSubtitle2Fontsize}',
  textRampSubtitle1LineHeight: '{textGlobalSubtitle1Lineheight}',
  textRampSubtitle1FontSize: '{textGlobalSubtitle1Fontsize}',
  textRampCaption1LineHeight: '{textGlobalCaption1Lineheight}',
  textRampCaption1FontSize: '{textGlobalCaption1Fontsize}',
  textRampBody1LineHeight: '{textGlobalBody1Lineheight}',
  textRampBody1FontSize: '{textGlobalBody1Fontsize}',
  textRampBody3LineHeight: '{textGlobalBody3Lineheight}',
};

export const textRampSm: TextRampSm = {
  textRampSmItembodyFontsize: '{textGlobalCaption1Fontsize}',
  textRampSmItembodyLineheight: '{textGlobalCaption1Lineheight}',
  textRampSmLegalFontsize: fontSize[200],
  textRampSmLegalLineheight: lineHeight[200],
  textRampSmMetadataFontsize: '{textGlobalCaption1Fontsize}',
  textRampSmMetadataLineheight: '{textGlobalCaption1Lineheight}',
  textRampSmItemHeaderFontsize: '{textGlobalBody3Fontsize}',
  textRampSmItemHeaderLineheight: '{textGlobalBody3Lineheight}',
  textRampSmReadingBodyFontsize: '{textGlobalBody3Fontsize}',
  textRampSmReadingBodyLineheight: '{textGlobalBody3Lineheight}',
  textRampSmSubsectionHeaderFontsize: '{textGlobalBody1Fontsize}',
  textRampSmSubsectionHeaderLineheight: '{textGlobalBody1Lineheight}',
  textRampSmSectionHeaderFontsize: '{textGlobalBody1Fontsize}',
  textRampSmSectionHeaderLineheight: '{textGlobalBody1Lineheight}',
  textRampSmPageHeaderFontsize: '{textGlobalSubtitle1Fontsize}',
  textRampSmPageHeaderLineheight: '{textGlobalSubtitle1Lineheight}',
};

export const textRampLg: TextRampLg = {
  textRampLgItembodyFontsize: '{textGlobalBody2Fontsize}',
  textRampLgItembodyLineheight: '{textGlobalBody2Lineheight}',
  textRampLgLegalFontsize: fontSize[400],
  textRampLgLegalLineheight: lineHeight[400],
  textRampLgMetadataFontsize: '{textGlobalBody3Fontsize}',
  textRampLgMetadataLineheight: '{textGlobalBody3Lineheight}',
  textRampLgItemHeaderFontsize: '{textGlobalBody1Fontsize}',
  textRampLgItemHeaderLineheight: '{textGlobalBody1Lineheight}',
  textRampLgReadingBodyFontsize: '{textGlobalBody1Fontsize}',
  textRampLgReadingBodyLineheight: '{textGlobalBody1Lineheight}',
  textRampLgSubsectionHeaderFontsize: '{textGlobalSubtitle1Fontsize}',
  textRampLgSubsectionHeaderLineheight: '{textGlobalSubtitle1Lineheight}',
  textRampLgSectionHeaderFontsize: '{textGlobalSubtitle1Fontsize}',
  textRampLgSectionHeaderLineheight: '{textGlobalSubtitle1Lineheight}',
  textRampLgPageHeaderFontsize: '{textGlobalTitle1Fontsize}',
  textRampLgPageHeaderLineheight: '{textGlobalTitle1Lineheight}',
};
