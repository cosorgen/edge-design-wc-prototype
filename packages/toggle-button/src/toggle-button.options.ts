import type { ValuesOf } from '@fluentui/web-components/utilities.js';
export type { ToggleButtonOptions } from '@fluentui/web-components/toggle-button/options.js';

/**
 * ToggleButtonAppearance constants
 * @public
 */
export const ToggleButtonAppearance = {
  neutral: 'neutral',
  brand: 'brand',
  floating: 'floating',
  outline: 'outline',
  subtle: 'subtle',
} as const;

/**
 * A Toggle Button can be neutral, brand, floating, outline and subtle.
 * @public
 */
export type ToggleButtonAppearance = ValuesOf<typeof ToggleButtonAppearance>;

/**
 * A Toggle Button can be a size of small, medium or large.
 * @public
 */
export const ToggleButtonSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

/**
 * A Toggle Button can be on of several preset sizes.
 * @public
 */
export type ToggleButtonSize = ValuesOf<typeof ToggleButtonSize>;

/**
 * ToggleButtonShape constants
 * @public
 */
export const ToggleButtonShape = {
  rounded: 'rounded',
  circular: 'circular',
  square: 'square',
} as const;

/**
 * A Toggle Button can be rounded, square or circular.
 * @public
 */
export type ToggleButtonShape = ValuesOf<typeof ToggleButtonShape>;
