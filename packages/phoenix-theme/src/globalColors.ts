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
  104: string;
  108: string;
  200: string;
  300: string;
  304: string;
  308: string;
  400: string;
  500: string;
  504: string;
  508: string;
  600: string;
  604: string;
  608: string;
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

// Brand Colors:
// 10: h268 c14 t10
// 20: h268 c19 t14
// 30: h269 c27 t19
// 40: h268 c33 t25
// 50: h269 c43 t30
// 60: h269 c52 t36
// 70: h271 c63 t42
// 80: h270 c68 t48
// 90: h269 c66 t51
// 100: h267 c64 t56
// 110: h266 c61 t59
// 120: h263 c53 t66
// 130: h262 c46 t72
// 140: h258 c34 t80
// 150: h255 c25 t87
// 160: h250 c15 t93

export const brand = {
  10: '#151B29',
  20: '#1A2338',
  30: '#202E4F',
  40: '#243966',
  50: '#264587',
  60: '#2551A8',
  70: '#235CCF',
  80: '#2169EB', // light primAry
  90: '#3275F0',
  100: '#4082F5',
  110: '#4D8DFA', // DArk primAry
  120: '#69A1FA',
  130: '#86B3FC',
  140: '#A7C9FC',
  150: '#C4DCFF',
  160: '#E0EDFF',
};

export const solid = {
  0: '#000000',
  2: '#040404',
  4: '#0A0A0A',
  6: '#0F0F0F',
  8: '#141414',
  10: '#1A1A1A',
  12: '#1F1F1F',
  14: '#242424',
  16: '#292929',
  18: '#2E2E2E',
  20: '#333333',
  22: '#383838',
  24: '#3D3D3D',
  26: '#424242',
  28: '#474747',
  30: '#4D4D4D',
  32: '#525252',
  34: '#575757',
  36: '#5C5C5C',
  38: '#616161',
  40: '#666666',
  42: '#6B6B6B',
  44: '#707070',
  46: '#757575',
  48: '#7A7A7A',
  50: '#808080',
  52: '#858585',
  54: '#8A8A8A',
  56: '#8F8F8F',
  58: '#949494',
  60: '#999999',
  62: '#9E9E9E',
  64: '#A3A3A3',
  66: '#A8A8A8',
  68: '#ADADAD',
  70: '#B3B3B3',
  72: '#B8B8B8',
  74: '#BDBDBD',
  76: '#C2C2C2',
  78: '#C7C7C7',
  80: '#CCCCCC',
  82: '#D1D1D1',
  84: '#D6D6D6',
  86: '#DBDBDB',
  88: '#E0E0E0',
  90: '#E6E6E6',
  92: '#EBEBEB',
  94: '#F0F0F0',
  96: '#F5F5F5',
  98: '#FAFAFA',
  100: '#FFFFFF',
};

export const transparent = {
  0: '#00000080',
  2: '#04040480',
  4: '#0A0A0A80',
  6: '#0F0F0F80',
  8: '#14141480',
  10: '#1A1A1A80',
  12: '#1F1F1F80',
  14: '#24242480',
  16: '#29292980',
  18: '#2E2E2E80',
  20: '#33333380',
  22: '#38383880',
  24: '#3D3D3D80',
  26: '#42424280',
  28: '#47474780',
  30: '#4D4D4D80',
  32: '#52525280',
  34: '#57575780',
  36: '#5C5C5C80',
  38: '#61616180',
  40: '#66666680',
  42: '#6B6B6B80',
  44: '#70707080',
  46: '#75757580',
  48: '#7A7A7A80',
  50: '#80808080',
  52: '#85858580',
  54: '#8A8A8A80',
  56: '#8F8F8F80',
  58: '#94949480',
  60: '#99999980',
  62: '#9E9E9E80',
  64: '#A3A3A380',
  66: '#A8A8A880',
  68: '#ADADAD80',
  70: '#B3B3B380',
  72: '#B8B8B880',
  74: '#BDBDBD80',
  76: '#C2C2C280',
  78: '#C7C7C780',
  80: '#CCCCCC80',
  82: '#D1D1D180',
  84: '#D6D6D680',
  86: '#DBDBDB80',
  88: '#E0E0E080',
  90: '#E6E6E680',
  92: '#EBEBEB80',
  94: '#F0F0F080',
  96: '#F5F5F580',
  98: '#FAFAFA80',
  100: '#FFFFFF80',
};

// Neutral Colors in Kumo:
// 0: h209 c3 t100
// 4: h232 c6 t97
// 8: h232 c6 t91
// 100: h232 c6 t98
// 104: h244 c9 t93
// 108: h257 c10 t88
// 150: h238 c7 t96
// 154: h242 c7 t93
// 158: h243 c7 t87
// 200: h242 c7 t94
// 250: h243 c7 t88
// 300: h248 c7 t82
// 304: h240 c7 t79
// 308: h241 c7 t73
// 350: h246 c8 t69
// 400: h251 c7 t60
// 404: h247 c8 t63
// 408: h250 c7 t69
// 450: h253 c7 t48
// 454: h254 c8 t45
// 458: h255 c8 t39
// 500: h254 c8 t40
// 550: h256 c8 t29
// 554: h264 c8 t32
// 558: h255 c8 t38
// 600: h262 c8 t24
// 650: h266 c8 t20
// 700: h263 c8 t18
// 704: h258 c8 t21
// 708: h262 c8 t27
// 750: h259 c8 t16
// 754: h263 c8 t19
// 758: h265 c8 t25
// 800: h259 c5 t12
// 804: h258 c5 t15
// 808: h270 c5 t21
// 1000: h0 c0 t0

export const neutral: NeutralColors = {
  0: transparent[100],
  4: transparent[96],
  8: transparent[92],
  100: transparent[98],
  104: transparent[94],
  108: transparent[88],
  150: transparent[96],
  154: transparent[94],
  158: transparent[88],
  200: transparent[94],
  250: transparent[88],
  300: transparent[82],
  304: transparent[80],
  308: transparent[74],
  350: transparent[70],
  400: transparent[60],
  404: transparent[64],
  408: transparent[70],
  450: transparent[48],
  454: transparent[44],
  458: transparent[40],
  500: transparent[40],
  550: transparent[30],
  554: transparent[32],
  558: transparent[38],
  600: transparent[24],
  650: transparent[20],
  700: transparent[18],
  704: transparent[22],
  708: transparent[28],
  750: transparent[16],
  754: transparent[20],
  758: transparent[26],
  800: transparent[12],
  804: transparent[16],
  808: transparent[22],
  1000: transparent[0],
};


// Vibrant Colors in Kumo:
// 100: h247 c10 t96
// 104: h247 c16 t93
// 108: h248 c26 t87
// 200: h250 c17 t92
// 300: h253 c30 t84
// 304: h262 c58 t64
// 308: h262 c51 t70
// 400: h260 c61 t63
// 500: h263 c67 t53
// 504: h266 c62 t43
// 508: h266 c57 t37
// 600: h262 c61 t47
// 604: h267 c16 t21
// 608: h264 c16 t27
export const vibrant: VibrantColors = {
  100: brand[160],
  104: brand[140],
  108: brand[150],
  200: brand[150],
  300: brand[130],
  304: brand[140],
  308: brand[130],
  400: brand[120],
  500: brand[90],
  504: brand[70],
  508: brand[80],
  600: brand[60],
  604: brand[30],
  608: brand[40],
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
