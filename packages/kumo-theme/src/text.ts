import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
} from './globalValues.js';

export type TextGlobal = {
  textGlobalCaption2FontSize: string;
  textGlobalCaption2LineHeight: string;
  textGlobalCaption1FontSize: string;
  textGlobalCaption1LineHeight: string;
  textGlobalBody3FontSize: string;
  textGlobalBody3LineHeight: string;
  textGlobalBody2FontSize: string;
  textGlobalBody2LineHeight: string;
  textGlobalBody1FontSize: string;
  textGlobalBody1LineHeight: string;
  textGlobalSubtitle2FontSize: string;
  textGlobalSubtitle2LineHeight: string;
  textGlobalSubtitle1FontSize: string;
  textGlobalSubtitle1LineHeight: string;
  textGlobalTitle2FontSize: string;
  textGlobalTitle2LineHeight: string;
  textGlobalTitle1FontSize: string;
  textGlobalTitle1LineHeight: string;
  textGlobalDisplay2FontSize: string;
  textGlobalDisplay2LineHeight: string;
  textGlobalDisplay1FontSize: string;
  textGlobalDisplay1LineHeight: string;
};

export type TextStyle = {
  textStyleDefaultRegularFontFamily: string;
  textStyleDefaultRegularLetterSpacing: string;
  textStyleDefaultRegularWeight: string;
  textStyleDefaultHeaderCase: string;
  textStyleDefaultHeaderFontFamily: string;
  textStyleDefaultHeaderLetterSpacing: string;
  textStyleDefaultHeaderWeight: string;
  textStyleArticleRegularFontFamily: string;
  textStyleArticleRegularLetterSpacing: string;
  textStyleArticleRegularWeight: string;
  textStyleArticleHeaderCase: string;
  textStyleArticleHeaderFontFamily: string;
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
  textButtonWeightDefault: string;
  textButtonWeightSelected: string;
};

export type TextRamp = {
  textRampItemBodyFontSize: string;
  textRampItemBodyLineHeight: string;
  textRampLegalFontSize: string;
  textRampLegalLineHeight: string;
  textRampMetadataFontSize: string;
  textRampMetadataLineHeight: string;
  textRampItemHeaderFontSize: string;
  textRampItemHeaderLineHeight: string;
  textRampReadingBodyFontSize: string;
  textRampReadingBodyLineHeight: string;
  textRampSubsectionHeaderFontSize: string;
  textRampSubsectionHeaderLineHeight: string;
  textRampSectionHeaderFontSize: string;
  textRampSectionHeaderLineHeight: string;
  textRampPageHeaderFontSize: string;
  textRampPageHeaderLineHeight: string;
};

export type TextRampSm = {
  textRampSmItemBodyFontSize: string;
  textRampSmItemBodyLineHeight: string;
  textRampSmLegalFontSize: string;
  textRampSmLegalLineHeight: string;
  textRampSmMetadataFontSize: string;
  textRampSmMetadataLineHeight: string;
  textRampSmItemHeaderFontSize: string;
  textRampSmItemHeaderLineHeight: string;
  textRampSmReadingBodyFontSize: string;
  textRampSmReadingBodyLineHeight: string;
  textRampSmSubsectionHeaderFontSize: string;
  textRampSmSubsectionHeaderLineHeight: string;
  textRampSmSectionHeaderFontSize: string;
  textRampSmSectionHeaderLineHeight: string;
  textRampSmPageHeaderFontSize: string;
  textRampSmPageHeaderLineHeight: string;
};

export type TextRampLg = {
  textRampLgItemBodyFontSize: string;
  textRampLgItemBodyLineHeight: string;
  textRampLgLegalFontSize: string;
  textRampLgLegalLineHeight: string;
  textRampLgMetadataFontSize: string;
  textRampLgMetadataLineHeight: string;
  textRampLgItemHeaderFontSize: string;
  textRampLgItemHeaderLineHeight: string;
  textRampLgReadingBodyFontSize: string;
  textRampLgReadingBodyLineHeight: string;
  textRampLgSubsectionHeaderFontSize: string;
  textRampLgSubsectionHeaderLineHeight: string;
  textRampLgSectionHeaderFontSize: string;
  textRampLgSectionHeaderLineHeight: string;
  textRampLgPageHeaderFontSize: string;
  textRampLgPageHeaderLineHeight: string;
};

export const textGlobal: TextGlobal = {
  textGlobalCaption2FontSize: fontSize[100],
  textGlobalCaption2LineHeight: lineHeight[100],
  textGlobalCaption1FontSize: fontSize[200],
  textGlobalCaption1LineHeight: lineHeight[200],
  textGlobalBody3FontSize: fontSize[300],
  textGlobalBody3LineHeight: lineHeight[300],
  textGlobalBody2FontSize: fontSize[400],
  textGlobalBody2LineHeight: lineHeight[400],
  textGlobalBody1FontSize: fontSize[450],
  textGlobalBody1LineHeight: lineHeight[500],
  textGlobalSubtitle2FontSize: fontSize[400],
  textGlobalSubtitle2LineHeight: lineHeight[400],
  textGlobalSubtitle1FontSize: fontSize[500],
  textGlobalSubtitle1LineHeight: lineHeight[500],
  textGlobalTitle2FontSize: fontSize[600],
  textGlobalTitle2LineHeight: lineHeight[600],
  textGlobalTitle1FontSize: fontSize[700],
  textGlobalTitle1LineHeight: lineHeight[700],
  textGlobalDisplay2FontSize: '56px',
  textGlobalDisplay2LineHeight: '84px',
  textGlobalDisplay1FontSize: '74px',
  textGlobalDisplay1LineHeight: '112px',
};

export const textStyle: TextStyle = {
  textStyleDefaultRegularFontFamily: fontFamily.base,
  textStyleDefaultRegularLetterSpacing: '0px',
  textStyleDefaultRegularWeight: fontWeight.regular,
  textStyleDefaultHeaderCase: '{nullString}',
  textStyleDefaultHeaderFontFamily: fontFamily.base,
  textStyleDefaultHeaderLetterSpacing: '{textStyleDefaultRegularLetterSpacing}',
  textStyleDefaultHeaderWeight: fontWeight.semibold,
  textStyleArticleRegularFontFamily: fontFamily.serif,
  textStyleArticleRegularLetterSpacing: '{textStyleDefaultHeaderLetterSpacing}',
  textStyleArticleRegularWeight: fontWeight.regular,
  textStyleArticleHeaderCase: '{nullString}',
  textStyleArticleHeaderFontFamily: fontFamily.serif,
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
  textButtonWeightDefault: '{textStyleDefaultRegularWeight}',
  textButtonWeightSelected: '{textStyleDefaultHeaderWeight}',
};

export const textRamp: TextRamp = {
  textRampItemBodyFontSize: '{textGlobalBody3FontSize}',
  textRampItemBodyLineHeight: '{textGlobalBody3LineHeight}',
  textRampLegalFontSize: fontSize[300],
  textRampLegalLineHeight: lineHeight[300],
  textRampMetadataFontSize: '{textGlobalCaption1FontSize}',
  textRampMetadataLineHeight: '{textGlobalCaption1LineHeight}',
  textRampItemHeaderFontSize: '{textGlobalBody2FontSize}',
  textRampItemHeaderLineHeight: '{textGlobalBody2LineHeight}',
  textRampReadingBodyFontSize: '{textGlobalBody2FontSize}',
  textRampReadingBodyLineHeight: '{textGlobalBody2LineHeight}',
  textRampSubsectionHeaderFontSize: '{textGlobalSubtitle2FontSize}',
  textRampSubsectionHeaderLineHeight: '{textGlobalSubtitle2LineHeight}',
  textRampSectionHeaderFontSize: '{textGlobalSubtitle1FontSize}',
  textRampSectionHeaderLineHeight: '{textGlobalSubtitle1LineHeight}',
  textRampPageHeaderFontSize: '{textGlobalTitle2FontSize}',
  textRampPageHeaderLineHeight: '{textGlobalTitle2LineHeight}',
};

export const textRampSm: TextRampSm = {
  textRampSmItemBodyFontSize: '{textGlobalCaption1FontSize}',
  textRampSmItemBodyLineHeight: '{textGlobalCaption1LineHeight}',
  textRampSmLegalFontSize: fontSize[200],
  textRampSmLegalLineHeight: lineHeight[200],
  textRampSmMetadataFontSize: '{textGlobalCaption1FontSize}',
  textRampSmMetadataLineHeight: '{textGlobalCaption1LineHeight}',
  textRampSmItemHeaderFontSize: '{textGlobalBody3FontSize}',
  textRampSmItemHeaderLineHeight: '{textGlobalBody3LineHeight}',
  textRampSmReadingBodyFontSize: '{textGlobalBody3FontSize}',
  textRampSmReadingBodyLineHeight: '{textGlobalBody3LineHeight}',
  textRampSmSubsectionHeaderFontSize: '{textGlobalBody1FontSize}',
  textRampSmSubsectionHeaderLineHeight: '{textGlobalBody1LineHeight}',
  textRampSmSectionHeaderFontSize: '{textGlobalBody1FontSize}',
  textRampSmSectionHeaderLineHeight: '{textGlobalBody1LineHeight}',
  textRampSmPageHeaderFontSize: '{textGlobalSubtitle1FontSize}',
  textRampSmPageHeaderLineHeight: '{textGlobalSubtitle1LineHeight}',
};

export const textRampLg: TextRampLg = {
  textRampLgItemBodyFontSize: '{textGlobalBody2FontSize}',
  textRampLgItemBodyLineHeight: '{textGlobalBody2LineHeight}',
  textRampLgLegalFontSize: fontSize[400],
  textRampLgLegalLineHeight: lineHeight[400],
  textRampLgMetadataFontSize: '{textGlobalBody3FontSize}',
  textRampLgMetadataLineHeight: '{textGlobalBody3LineHeight}',
  textRampLgItemHeaderFontSize: '{textGlobalBody1FontSize}',
  textRampLgItemHeaderLineHeight: '{textGlobalBody1LineHeight}',
  textRampLgReadingBodyFontSize: '{textGlobalBody1FontSize}',
  textRampLgReadingBodyLineHeight: '{textGlobalBody1LineHeight}',
  textRampLgSubsectionHeaderFontSize: '{textGlobalSubtitle1FontSize}',
  textRampLgSubsectionHeaderLineHeight: '{textGlobalSubtitle1LineHeight}',
  textRampLgSectionHeaderFontSize: '{textGlobalSubtitle1FontSize}',
  textRampLgSectionHeaderLineHeight: '{textGlobalSubtitle1LineHeight}',
  textRampLgPageHeaderFontSize: '{textGlobalTitle1FontSize}',
  textRampLgPageHeaderLineHeight: '{textGlobalTitle1LineHeight}',
};
