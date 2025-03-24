export type NeutralColors = {
  0: string; // white
  4: string;
  8: string;
  100: string;
  104: string; // hover is +4
  108: string; // pressed is +8
  150: string;
  154: string;
  158: string;
  200: string;
  250: string;
  300: string;
  304: string;
  308: string;
  350: string;
  400: string;
  404: string;
  408: string;
  450: string;
  454: string;
  458: string;
  500: string;
  550: string;
  554: string;
  558: string;
  600: string;
  650: string;
  700: string;
  704: string;
  708: string;
  750: string;
  754: string;
  758: string;
  800: string;
  804: string;
  808: string;
  1000: string; // black
};

export type VibrantColors = {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export type AlphaBlackColors = {
  0: string;
  5: string;
  10: string;
  20: string;
  30: string;
  40: string;
  50: string;
  60: string;
  70: string;
  80: string;
  90: string;
};

export type AlphaWhiteColors = {
  0: string;
  5: string;
  10: string;
  20: string;
  30: string;
  40: string;
  50: string;
  60: string;
  70: string;
  80: string;
  90: string;
};

export type AlphaVibrant100Colors = {
  0: string;
  5: string;
  10: string;
  20: string;
  30: string;
  40: string;
  50: string;
  60: string;
  70: string;
  80: string;
  90: string;
};

export type AlphaVibrant800Colors = {
  0: string;
  5: string;
  10: string;
  20: string;
  30: string;
  40: string;
  50: string;
  60: string;
  70: string;
  80: string;
  90: string;
};

export type ShadowColors = {
  shadowKeyLowLight: string;
  shadowKeyLowDark: string;
  shadowKeyHighLight: string;
  shadowKeyHighDark: string;
  shadowAmbientLowLight: string;
  shadowAmbientLowDark: string;
  shadowAmbientHighLight: string;
  shadowAmbientHighDark: string;
};

export type StatusDangerColors = {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export type StatusSuccessColors = {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export type StatusWarningColors = {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export const neutral: NeutralColors = {
  0: '#ffffff',
  4: '#f3f7fb',
  8: '#e2e6ea',
  100: '#f6fafe',
  104: '#e4ebf4',
  108: '#d7dce8',
  150: '#eff4fa',
  154: '#e7ebf1',
  158: '#d6dae0',
  200: '#eaeef4',
  250: '#d9dde3',
  300: '#c8ccd3',
  304: '#bfc4ca',
  308: '#afb4ba',
  350: '#a4a9b0',
  400: '#8d9198',
  404: '#9499a0',
  408: '#a5a9b0',
  450: '#6e7279',
  454: '#676b72',
  458: '#585c63',
  500: '#5b5f66',
  550: '#41454c',
  554: '#484b53',
  558: '#565a61',
  600: '#363940',
  650: '#2d3038',
  700: '#292c33',
  704: '#2f333a',
  708: '#3d4047',
  750: '#24282f',
  754: '#2b2e35',
  758: '#383b43',
  800: '#1e2024',
  804: '#24262a',
  808: '#313237',
  1000: '#000000',
};

export const vibrant: VibrantColors = {
  100: '#ecf4ff',
  200: '#daeaff',
  300: '#b4d5ff',
  400: '#4599ff',
  500: '#007ef4',
  600: '#016dd4',
  700: '#00458a',
  800: '#1b3556',
  900: '#212d3d',
};

export const alphaBlack: AlphaBlackColors = {
  0: 'rgba(0, 0, 0, 0)',
  5: 'rgba(0, 0, 0, 0.05)',
  10: 'rgba(0, 0, 0, 0.1)',
  20: 'rgba(0, 0, 0, 0.2)',
  30: 'rgba(0, 0, 0, 0.3)',
  40: 'rgba(0, 0, 0, 0.4)',
  50: 'rgba(0, 0, 0, 0.5)',
  60: 'rgba(0, 0, 0, 0.6)',
  70: 'rgba(0, 0, 0, 0.7)',
  80: 'rgba(0, 0, 0, 0.8)',
  90: 'rgba(0, 0, 0, 0.9)',
};

export const alphaWhite: AlphaWhiteColors = {
  0: 'rgba(255, 255, 255, 0)',
  5: 'rgba(255, 255, 255, 0.05)',
  10: 'rgba(255, 255, 255, 0.1)',
  20: 'rgba(255, 255, 255, 0.2)',
  30: 'rgba(255, 255, 255, 0.3)',
  40: 'rgba(255, 255, 255, 0.4)',
  50: 'rgba(255, 255, 255, 0.5)',
  60: 'rgba(255, 255, 255, 0.6)',
  70: 'rgba(255, 255, 255, 0.7)',
  80: 'rgba(255, 255, 255, 0.8)',
  90: 'rgba(255, 255, 255, 0.9)',
};

export const alphaVibrant100: AlphaVibrant100Colors = {
  0: 'rgba(236, 244, 255, 0)',
  5: 'rgba(236, 244, 255, 0.05)',
  10: 'rgba(236, 244, 255, 0.1)',
  20: 'rgba(236, 244, 255, 0.2)',
  30: 'rgba(236, 244, 255, 0.3)',
  40: 'rgba(236, 244, 255, 0.4)',
  50: 'rgba(236, 244, 255, 0.5)',
  60: 'rgba(236, 244, 255, 0.6)',
  70: 'rgba(236, 244, 255, 0.7)',
  80: 'rgba(236, 244, 255, 0.8)',
  90: 'rgba(236, 244, 255, 0.9)',
};

export const alphaVibrant800: AlphaVibrant800Colors = {
  0: 'rgba(33, 45, 61, 0)',
  5: 'rgba(33, 45, 61, 0.05)',
  10: 'rgba(33, 45, 61, 0.1)',
  20: 'rgba(33, 45, 61, 0.2)',
  30: 'rgba(33, 45, 61, 0.3)',
  40: 'rgba(33, 45, 61, 0.4)',
  50: 'rgba(33, 45, 61, 0.5)',
  60: 'rgba(33, 45, 61, 0.6)',
  70: 'rgba(33, 45, 61, 0.7)',
  80: 'rgba(33, 45, 61, 0.8)',
  90: 'rgba(33, 45, 61, 0.9)',
};

export const shadow: ShadowColors = {
  shadowKeyLowLight: 'rgba(27, 53, 86, 0.08)',
  shadowKeyLowDark: 'rgba(0, 0, 0, 0.24)',
  shadowKeyHighLight: 'rgba(33, 45, 61, 0.12)',
  shadowKeyHighDark: 'rgba(0, 0, 0, 0.3)',
  shadowAmbientLowLight: 'rgba(27, 53, 86, 0.04)',
  shadowAmbientLowDark: 'rgba(0, 0, 0, 0.12)',
  shadowAmbientHighLight: 'rgba(33, 45, 61, 0.06)',
  shadowAmbientHighDark: 'rgba(0, 0, 0, 0.15)',
};

export const statusDanger: StatusDangerColors = {
  100: '#fff0ef',
  200: '#fee0df',
  300: '#fcc0be',
  400: '#ef6569',
  500: '#df3c4a',
  600: '#d1203a',
  700: '#7e1e26',
  800: '#522525',
  900: '#3b2525',
};

export const statusSuccess: StatusSuccessColors = {
  100: '#eaf7f0',
  200: '#d5f0e1',
  300: '#a9e0c4',
  400: '#00b877',
  500: '#009d63',
  600: '#018050',
  700: '#005833',
  800: '#073f2a',
  900: '#1c3127',
};

export const statusWarning: StatusWarningColors = {
  100: '#fdf1e9',
  200: '#fbe3d3',
  300: '#f5c7a6',
  400: '#e47700',
  500: '#c96000',
  600: '#c85d00',
  700: '#743100',
  800: '#4e2b0d',
  900: '#39281c',
};
