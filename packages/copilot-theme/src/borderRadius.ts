import { type BorderRadiusTokens } from '@fluentui/tokens';

export declare interface PhoenixBorderRadiusTokens {
  borderRadiusLayerBase: string;
  borderRadiusLayerApp: string;
  borderRadiusLayerCard: string;
  borderRadiusLayerDialog: string;
  borderRadiusLayerFlyout: string;
  borderRadiusLayerPill: string;
}

export const phoenixBorderRadius: PhoenixBorderRadiusTokens = {
  borderRadiusLayerApp: '12px',
  borderRadiusLayerBase: '8px',
  borderRadiusLayerCard: '8px',
  borderRadiusLayerDialog: '8px',
  borderRadiusLayerFlyout: '8px',
  borderRadiusLayerPill: '99px',
};

export const borderRadiusOverrides: Partial<BorderRadiusTokens> = {
  borderRadiusLarge: '8px',
};

export declare interface CopilotBorderRadiusTokens {
  cornerControlRest: string;
  cornerControlHover: string;
  cornerControlPressed: string;
  cornerSmallControlRest: string;
  cornerSmallControlHover: string;
  cornerSmallControlPressed: string;
  cornerLargeControlRest: string;
  cornerLargeControlHover: string;
  cornerLargeControlPressed: string;
  cornerComposerRest: string;
}

export const copilotBorderRadius: CopilotBorderRadiusTokens = {
  cornerControlRest: '12px',
  cornerControlHover: '12px',
  cornerControlPressed: '12px',
  cornerSmallControlRest: '8px',
  cornerSmallControlHover: '8px',
  cornerSmallControlPressed: '8px',
  cornerLargeControlRest: '12px',
  cornerLargeControlHover: '12px',
  cornerLargeControlPressed: '12px',
  cornerComposerRest: '28px',
};
