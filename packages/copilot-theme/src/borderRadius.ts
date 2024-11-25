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
  smtcCornerControlRest: string;
  smtcCornerControlHover: string;
  smtcCornerControlPressed: string;
  smtcCornerSmallControlRest: string;
  smtcCornerSmallControlHover: string;
  smtcCornerSmallControlPressed: string;
  smtcCornerLargeControlRest: string;
  smtcCornerLargeControlHover: string;
  smtcCornerLargeControlPressed: string;
  smtcCornerComposerRest: string;
  smtcCornerComposerInputRest: string;
  smtcCornerComposerSendButtonRest: string;
  smtcCornerComposerSendButtonHover: string;
  smtcCornerComposerSendButtonPressed: string;
}

export const copilotBorderRadius: CopilotBorderRadiusTokens = {
  smtcCornerControlRest: '12px',
  smtcCornerControlHover: '12px',
  smtcCornerControlPressed: '12px',
  smtcCornerSmallControlRest: '8px',
  smtcCornerSmallControlHover: '8px',
  smtcCornerSmallControlPressed: '8px',
  smtcCornerLargeControlRest: '12px',
  smtcCornerLargeControlHover: '12px',
  smtcCornerLargeControlPressed: '12px',
  smtcCornerComposerRest: '28px',
  smtcCornerComposerInputRest: '20px',
  smtcCornerComposerSendButtonRest: '14px',
  smtcCornerComposerSendButtonHover: '14px',
  smtcCornerComposerSendButtonPressed: '14px',
};
