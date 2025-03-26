export type Curve = {
  curveEasyEase: string;
};

export type Duration = {
  durationSlow: string;
  durationNormal: string;
  durationFaster: string;
  durationUltraFast: string;
};

export const curve: Curve = {
  curveEasyEase: 'cubic-bezier(0.33, 0, 0.67, 1);',
};

export const duration: Duration = {
  durationSlow: '300ms',
  durationNormal: '200ms',
  durationFaster: '100ms',
  durationUltraFast: '50ms',
};
