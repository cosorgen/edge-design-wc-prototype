import { CurveTokens } from '@fluentui/tokens';

export type PhoenixDurationTokens = {
  durationSuperFast: string;
};

export type PhoenixCurveTokens = {
  curveLinearDecelerateMax: string;
};

export const durationTokens: PhoenixDurationTokens = {
  durationSuperFast: '80ms',
};

export const curveTokens: PhoenixCurveTokens = {
  curveLinearDecelerateMax: 'cubic-bezier(0.55, 0.55, 0, 1)',
};

export const curveTokenOverrides: Partial<CurveTokens> = {
  curveAccelerateMax: 'cubic-bezier(1,0,1,1)',
  curveAccelerateMid: 'cubic-bezier(0.7,0,1,0.5)',
  curveDecelerateMax: 'cubic-bezier(0,0,0,1)',
  curveDecelerateMid: 'cubic-bezier(0.1,0.9,0.2,1)',
  curveEasyEaseMax: 'cubic-bezier(0.8,0,0.1,1)',
};
