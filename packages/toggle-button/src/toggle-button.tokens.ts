import {
  required as buttonRequired,
  optional as buttonOptional
} from '@mai-ui/button/tokens.js';
export * from '@mai-ui/button/tokens.js';

export const colorBrandBackgroundSelected = "var(--color-brand-background-selected)";
export const colorNeutralBackground1Selected = "var(--color-neutral-background-1-selected)";
export const colorTransparentBackgroundSelected = "var(--color-transparent-background-selected)";
export const colorSubtleBackgroundSelected = "var(--color-subtle-background-selected)";
export const colorNeutralForeground1Selected = "var(--color-neutral-foreground-1-selected)";
export const colorNeutralForegroundOnBrand = "var(--color-neutral-foreground-on-brand)";
export const colorNeutralStroke1Selected = "var(--color-neutral-stroke-1-selected)";

export const smtcBackgroundControlBrandSelected = `var(--smtc-background-control-brand-selected, ${colorBrandBackgroundSelected})`;
export const smtcBackgroundControlNeutralSelected = `var(--smtc-background-control-neutral-selected, ${colorNeutralBackground1Selected})`;
export const smtcBackgroundControlOutlineSelected = `var(--smtc-background-control-outline-selected, ${colorTransparentBackgroundSelected})`;
export const smtcBackgroundControlSubtleSelected = `var(--smtc-background-control-subtle-selected, ${colorSubtleBackgroundSelected})`;
export const smtcForegroundControlNeutralSelected = `var(--smtc-foreground-control-neutral-selected, ${colorNeutralForeground1Selected})`;
export const smtcForegroundControlOnBrandSelected = `var(--smtc-foreground-control-on-brand-selected, ${colorNeutralForegroundOnBrand})`;
export const smtcStrokeControlNeutralSelected = `var(--smtc-stroke-control-neutral-selected, ${colorNeutralStroke1Selected})`;

export const reqired = {
  ...buttonRequired,
  colorBrandBackgroundSelected,
  colorNeutralBackground1Selected,
  colorTransparentBackgroundSelected,
  colorSubtleBackgroundSelected,
  colorNeutralForeground1Selected,
  colorNeutralForegroundOnBrand,
  colorNeutralStroke1Selected,
};
export const optional = {
  ...buttonOptional,
  smtcBackgroundControlBrandSelected,
  smtcBackgroundControlNeutralSelected,
  smtcBackgroundControlOutlineSelected,
  smtcBackgroundControlSubtleSelected,
  smtcForegroundControlNeutralSelected,
  smtcForegroundControlOnBrandSelected,
  smtcStrokeControlNeutralSelected,
};