import { type BorderRadiusTokens } from '@fluentui/tokens';

export declare interface PhoenixBorderRadiusTokens {
  borderRadiusLayerBase: string;
  borderRadiusLayerApp: string;
  borderRadiusLayerCard: string;
  borderRadiusLayerDialog: string;
  borderRadiusLayerFlyout: string;
  borderRadiusLayerPill: string;
}

export const win11BorderRadius: PhoenixBorderRadiusTokens = {
  borderRadiusLayerApp: '8px',
  borderRadiusLayerBase: '8px',
  borderRadiusLayerCard: '8px',
  borderRadiusLayerDialog: '8px',
  borderRadiusLayerFlyout: '8px',
  borderRadiusLayerPill: '99px',
};

export const win11BorderRadiusOverrides: Partial<BorderRadiusTokens> = {
  borderRadiusLarge: '8px',
};

export const win10BorderRadius: PhoenixBorderRadiusTokens = {
  ...win11BorderRadius,
  borderRadiusLayerBase: '0px',
};

export const win10BorderRadiusOverrides: Partial<BorderRadiusTokens> = {
  ...win11BorderRadiusOverrides,
};

export const winNXTBorderRadius: PhoenixBorderRadiusTokens = {
  borderRadiusLayerApp: '12px',
  borderRadiusLayerBase: '16px',
  borderRadiusLayerCard: '12px',
  borderRadiusLayerDialog: '12px',
  borderRadiusLayerFlyout: '12px',
  borderRadiusLayerPill: '99px',
};

export const winNXTBorderRadiusOverrides: Partial<BorderRadiusTokens> = {
  borderRadiusMedium: '8px',
  borderRadiusLarge: '8px',
  borderRadiusXLarge: '8px',
};

export const macBorderRadius: PhoenixBorderRadiusTokens = {
  ...win11BorderRadius,
  borderRadiusLayerApp: '12px',
  borderRadiusLayerBase: '16px',
};

export const macBorderRadiusOverrides: Partial<BorderRadiusTokens> = {
  ...win11BorderRadiusOverrides,
};
