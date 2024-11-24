import { type BorderRadiusTokens } from '@fluentui/tokens';

export declare interface WindowsBorderRadiusTokens {
  borderRadiusLayerBase: string;
  borderRadiusLayerApp: string;
  borderRadiusLayerCard: string;
  borderRadiusLayerDialog: string;
  borderRadiusLayerFlyout: string;
  borderRadiusLayerPill: string;
}

export const borderRadiusTokens: WindowsBorderRadiusTokens = {
  borderRadiusLayerApp: '8px',
  borderRadiusLayerBase: '8px',
  borderRadiusLayerCard: '8px',
  borderRadiusLayerDialog: '8px',
  borderRadiusLayerFlyout: '8px',
  borderRadiusLayerPill: '99px',
};

export const borderRadiusTokenOverrides: Partial<BorderRadiusTokens> = {
  borderRadiusLarge: '8px',
};
