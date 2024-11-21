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
