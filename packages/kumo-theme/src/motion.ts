export type Curve = {
  curveAccelerateMid: string;
  curveDecelerateMid: string;
  curveDecelerateMin: string;
  curveEasyEase: string;
  curveEasyEaseMax: string;
  curveLinear: string;
};

export type Duration = {
  durationFast: string;
  durationFaster: string;
  durationGentle: string;
  durationNormal: string;
  durationSlow: string;
  durationSlower: string;
  durationUltraFast: string;
  durationUltraSlow: string;
};

export const curve: Curve = {
  curveEasyEase: 'cubic-bezier(0.33, 0, 0.67, 1);',
  curveAccelerateMid: 'cubic-bezier(1, 0, 1, 1)',
  curveDecelerateMid: 'cubic-bezier(0, 0, 0, 1)',
  curveDecelerateMin: 'cubic-bezier(0.33, 0, 0.1, 1)',
  curveEasyEaseMax: 'cubic-bezier(0.8, 0, 0.2, 1)',
  curveLinear: 'cubic-bezier(0, 0, 1, 1)',
};

export const duration: Duration = {
  durationFast: '150ms',
  durationFaster: '100ms',
  durationGentle: '250ms',
  durationNormal: '200ms',
  durationSlow: '300ms',
  durationSlower: '400ms',
  durationUltraFast: '50ms',
  durationUltraSlow: '500ms',
};
