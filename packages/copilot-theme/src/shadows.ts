export declare interface PhoenixShadowTokens {
  shadowBaseX: string;
  shadowDiffuseX: string;

  shadow2BaseY: string;
  shadow2BaseBlur: string;
  shadow2DiffuseY: string;
  shadow2DiffuseBlur: string;

  shadow4BaseY: string;
  shadow4BaseBlur: string;
  shadow4DiffuseY: string;
  shadow4DiffuseBlur: string;

  shadow8BaseY: string;
  shadow8BaseBlur: string;
  shadow8DiffuseY: string;
  shadow8DiffuseBlur: string;

  shadow16BaseY: string;
  shadow16BaseBlur: string;
  shadow16DiffuseY: string;
  shadow16DiffuseBlur: string;

  shadow28BaseY: string;
  shadow28BaseBlur: string;
  shadow28DiffuseY: string;
  shadow28DiffuseBlur: string;

  shadow64DiffuseY: string;
  shadow64BaseBlur: string;
  shadow64BaseY: string;
  shadow64DiffuseBlur: string;

  shadowBaseLayer: string;
  shadowBaseLayerInactive: string;
  shadowBaseLayerBaseY: string;
  shadowBaseLayerBaseBlur: string;
  shadowBaseLayerDiffuseY: string;
  shadowBaseLayerDiffuseBlur: string;
}

export const lightThemeShadows: PhoenixShadowTokens = {
  shadowBaseX: '0px',
  shadowDiffuseX: '0px',

  shadow2BaseY: '0px',
  shadow2BaseBlur: '2px',
  shadow2DiffuseY: '1px',
  shadow2DiffuseBlur: '2px',

  shadow4BaseY: '0px',
  shadow4BaseBlur: '2px',
  shadow4DiffuseY: '2px',
  shadow4DiffuseBlur: '4px',

  shadow8BaseY: '0px',
  shadow8BaseBlur: '2px',
  shadow8DiffuseY: '4px',
  shadow8DiffuseBlur: '8px',

  shadow16BaseY: '0px',
  shadow16BaseBlur: '8px',
  shadow16DiffuseY: '8px',
  shadow16DiffuseBlur: '16px',

  shadow28BaseY: '0px',
  shadow28BaseBlur: '8px',
  shadow28DiffuseY: '14px',
  shadow28DiffuseBlur: '28px',

  shadow64BaseY: '0px',
  shadow64BaseBlur: '8px',
  shadow64DiffuseY: '32px',
  shadow64DiffuseBlur: '64px',

  shadowBaseLayer:
    '0px 2px 21px 0px rgba(0, 0, 0, 0.22), 0px 32px 64px 0px rgba(0, 0, 0, 0.28)',
  shadowBaseLayerInactive:
    '0px 2px 10.67px 0px rgba(0, 0, 0, 0.15), 0px 16px 32px 0px rgba(0, 0, 0, 0.19)',
  shadowBaseLayerBaseY: '2px',
  shadowBaseLayerBaseBlur: '21px',
  shadowBaseLayerDiffuseY: '32px',
  shadowBaseLayerDiffuseBlur: '64px',
};

export const darkThemeShadows: PhoenixShadowTokens = {
  shadowBaseX: '0px',
  shadowDiffuseX: '0px',

  shadow2BaseY: '0px',
  shadow2BaseBlur: '2px',
  shadow2DiffuseY: '1px',
  shadow2DiffuseBlur: '2px',

  shadow4BaseY: '0px',
  shadow4BaseBlur: '2px',
  shadow4DiffuseY: '2px',
  shadow4DiffuseBlur: '4px',

  shadow8BaseY: '0px',
  shadow8BaseBlur: '2px',
  shadow8DiffuseY: '4px',
  shadow8DiffuseBlur: '8px',

  shadow16BaseY: '0px',
  shadow16BaseBlur: '8px',
  shadow16DiffuseY: '8px',
  shadow16DiffuseBlur: '16px',

  shadow28BaseY: '0px',
  shadow28BaseBlur: '8px',
  shadow28DiffuseY: '14px',
  shadow28DiffuseBlur: '28px',

  shadow64BaseY: '0px',
  shadow64BaseBlur: '8px',
  shadow64DiffuseY: '32px',
  shadow64DiffuseBlur: '64px',

  shadowBaseLayer:
    '0px 2px 21px 0px rgba(0, 0, 0, 0.55), 0px 32px 64px 0px rgba(0, 0, 0, 0.56)',
  shadowBaseLayerInactive:
    '0px 2px 10.67px 0px rgba(0, 0, 0, 0.37), 0px 16px 32px 0px rgba(0, 0, 0, 0.37)',
  shadowBaseLayerBaseY: '2px',
  shadowBaseLayerBaseBlur: '21px',
  shadowBaseLayerDiffuseY: '32px',
  shadowBaseLayerDiffuseBlur: '64px',
};

export type CopilotShadowTokens = {
  smtcShadowLarge: string;
  smtcShadowSmall: string;
};

export const copilotLightShadows: CopilotShadowTokens = {
  smtcShadowLarge: '0px 16px 24px -2px rgba(0, 0, 0, 0.12)',
  smtcShadowSmall: '0px 0.5px 3px 0px rgba(0, 0, 0, 0.20)',
};

export const copilotDarkShadows: CopilotShadowTokens = {
  smtcShadowLarge: '0px 16px 24px -2px rgba(0, 0, 0, 0.3)',
  smtcShadowSmall: '0px 0.5px 3px 0px rgba(0, 0, 0, 0.40)',
};
