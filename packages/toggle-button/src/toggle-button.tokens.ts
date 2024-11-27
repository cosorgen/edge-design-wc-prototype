import {
  required as buttonRequired,
  optional as buttonOptional
} from '@mai-ui/button/tokens.js';
export * from '@mai-ui/button/tokens.js';

export const smtcBackgroundControlBrandSelected = "var(--smtc-background-control-brand-selected, var(--color-brand-background-1-selected))";
export const smtcBackgroundControlNeutralSelected = "var(--smtc-background-control-neutral-selected, var(--color-neutral-background-1-selected))";
export const smtcBackgroundControlOutlineSelected = "var(--smtc-background-control-outline-selected, var(--color-transparent-background-selected))";
export const smtcBackgroundControlSubtleSelected = "var(--smtc-background-control-subtle-selected, var(--color-subtle-background-selected))";
export const smtcForegroundControlNeutralSelected = "var(--smtc-foreground-control-neutral-selected, var(--color-neutral-foreground-1-selected))";
export const smtcForegroundControlOnBrandSelected = "var(--smtc-foreground-control-on-brand-selected, var(--color-neutral-foreground-on-brand))";
export const smtcStrokeControlNeutralSelected = "var(--smtc-stroke-control-neutral-selected, var(--color-neutral-stroke-1-selected))";

export const reqired = {
  ...buttonRequired,
  smtcBackgroundControlBrandSelected,
  smtcBackgroundControlNeutralSelected,
  smtcBackgroundControlOutlineSelected,
  smtcBackgroundControlSubtleSelected,
  smtcForegroundControlNeutralSelected,
  smtcForegroundControlOnBrandSelected,
  smtcStrokeControlNeutralSelected,
};
export const optional = {
  ...buttonOptional,
};