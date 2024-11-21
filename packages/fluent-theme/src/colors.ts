import { brandWeb } from './brandVariants.js';

export declare interface PhoenixColorTokens {
  colorBrandForeground1Hover: string;
  colorBrandForeground1Pressed: string;
  colorBrandForeground1Selected: string;
  colorBrandForeground2Selected: string;
  colorBrandStroke: string;
  colorBrandStrokeHover: string;
  colorBrandStrokePressed: string;
  colorLabelBerry: string;
  colorLabelBlue: string;
  colorLabelBrass: string;
  colorLabelHotPink: string;
  colorLabelMink: string;
  colorLabelPumpkin: string;
  colorLabelPurple: string;
  colorLabelRoyalBlue: string;
  colorLabelTeal: string;
  colorLayerBackgroundApp: string;
  colorLayerBackgroundBase: string;
  colorLayerBackgroundDialog: string;
  colorLayerBackgroundTooltip: string;
  colorLayerBackgroundTooltipStaticInverted: string;
  colorLayerStrokeBase: string;
  colorLayerStrokeFlyout: string;
  colorNeutralBackgroundTabActive: string;
  colorNeutralForegroundDisabledOnBrand: string;
  colorNeutralForegroundHint: string;
  colorNeutralForegroundOnLabel: string;
  colorNeutralBackgroundFloating: string;
  colorNeutralBackgroundFloatingHover: string;
  colorNeutralBackgroundFloatingPressed: string;
  colorNeutralBackgroundFloatingSelected: string;
  colorNeutralBackgroundFloatingDisabled: string;
  colorAiFlair1: string;
  colorAiFlair2: string;
  colorAiFlair3: string;
  colorLayerBackgroundPillMenu: string;
  colorLayerOmniboxBackground: string;
  colorLayerOmniboxBackgroundHover: string;
}

export const lightThemeColors: PhoenixColorTokens = {
  colorBrandForeground1Hover: brandWeb[70],
  colorBrandForeground1Pressed: brandWeb[60],
  colorBrandForeground1Selected: brandWeb[80],
  colorBrandForeground2Selected: brandWeb[70],
  colorBrandStroke: brandWeb[80],
  colorBrandStrokeHover: brandWeb[70],
  colorBrandStrokePressed: brandWeb[60],
  colorLabelBerry: '#C239B3',
  colorLabelBlue: '#296EEB',
  colorLabelBrass: '#986F0B',
  colorLabelHotPink: '#E3008C',
  colorLabelMink: '#706D6B',
  colorLabelPumpkin: '#CA5010',
  colorLabelPurple: '#8230FF',
  colorLabelRoyalBlue: '#004E8C',
  colorLabelTeal: '#038387',
  colorLayerBackgroundApp: '#dde2e8',
  colorLayerBackgroundBase: '#FFFFFF80',
  colorLayerBackgroundDialog: '#FFFFFF',
  colorLayerBackgroundTooltip: '#FFFFFF',
  colorLayerBackgroundTooltipStaticInverted: '#333333',
  colorLayerStrokeBase: '#75757566',
  colorLayerStrokeFlyout: '#0000000F',
  colorNeutralBackgroundFloating: '#FFFFFF',
  colorNeutralBackgroundFloatingDisabled: '#F0F0F0',
  colorNeutralBackgroundFloatingHover: '#F5F5F5',
  colorNeutralBackgroundFloatingPressed: '#E0E0E0',
  colorNeutralBackgroundFloatingSelected: '#F0F0F0',
  colorNeutralBackgroundTabActive: '#FFFFFFD9',
  colorNeutralForegroundDisabledOnBrand: '#FFFFFF85',
  colorNeutralForegroundHint: '#0000008F',
  colorNeutralForegroundOnLabel: '#FFFFFF',
  colorAiFlair1: '#296EEB',
  colorAiFlair2: '#6CEBE2',
  colorAiFlair3: '#34CFA9',
  colorLayerBackgroundPillMenu: '#ffffff80',
  colorLayerOmniboxBackground: '#F1F3F6',
  colorLayerOmniboxBackgroundHover: '#EBEEF1',
};

export const lightThemeSolidColors: Partial<PhoenixColorTokens> = {
  colorLayerBackgroundBase: '#FAFAFA',
};

export const darkThemeColors: PhoenixColorTokens = {
  colorBrandForeground1Hover: brandWeb[120],
  colorBrandForeground1Pressed: brandWeb[130],
  colorBrandForeground1Selected: brandWeb[110],
  colorBrandForeground2Selected: brandWeb[120],
  colorBrandStroke: brandWeb[110],
  colorBrandStrokeHover: brandWeb[120],
  colorBrandStrokePressed: brandWeb[130],
  colorLabelBerry: '#CF87DA',
  colorLabelBlue: '#69A1FA',
  colorLabelBrass: '#C1A256',
  colorLabelHotPink: '#EE5FB7',
  colorLabelMink: '#84817E',
  colorLabelPumpkin: '#DF8E64',
  colorLabelPurple: '#B696FF',
  colorLabelRoyalBlue: '#4A89BA',
  colorLabelTeal: '#4CB4B7',
  colorLayerBackgroundApp: '#000',
  colorLayerBackgroundBase: '#3A3A3A4D',
  colorLayerBackgroundDialog: '#292929',
  colorLayerBackgroundTooltip: '#292929',
  colorLayerBackgroundTooltipStaticInverted: '#3D3D3D',
  colorLayerStrokeBase: '#75757566',
  colorLayerStrokeFlyout: '#00000033',
  colorNeutralBackgroundTabActive: '#FFFFFF22',
  colorNeutralForegroundDisabledOnBrand: '#FFFFFF3D',
  colorNeutralForegroundHint: '#FFFFFF85',
  colorNeutralForegroundOnLabel: '#000000e5',
  colorNeutralBackgroundFloating: '#292929',
  colorNeutralBackgroundFloatingHover: '#3D3D3D',
  colorNeutralBackgroundFloatingPressed: '#1F1F1F',
  colorNeutralBackgroundFloatingSelected: '#1F1F1F',
  colorNeutralBackgroundFloatingDisabled: '#141414',
  colorAiFlair1: '#4D8DFA',
  colorAiFlair2: '#6CEBE2',
  colorAiFlair3: '#34CFA9',
  colorLayerBackgroundPillMenu: '#2C2C2C',
  colorLayerOmniboxBackground: '#0E0E0E',
  colorLayerOmniboxBackgroundHover: '#000000',
};

export const darkThemeSolidColors: Partial<PhoenixColorTokens> = {
  colorLayerBackgroundBase: '#1F1F1F',
};
