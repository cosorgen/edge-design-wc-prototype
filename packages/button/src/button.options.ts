import type { ValuesOf } from '@fluentui/web-components/utilities.js';
export {
  ButtonFormTarget,
  ButtonType,
} from '@fluentui/web-components/button/options.js';

/**
 * ButtonAppearance constants
 * @public
 */
export const ButtonAppearance = {
  neutral: 'neutral',
  brand: 'brand',
  floating: 'floating',
  outline: 'outline',
  subtle: 'subtle',
} as const;

/**
 * A Button can be neutral, brand, floating, outline and subtle.
 * @public
 */
export type ButtonAppearance = ValuesOf<typeof ButtonAppearance>;

/**
 * A Button can be a size of small, medium or large.
 * @public
 */
export const ButtonSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

/**
 * A Button can be on of several preset sizes.
 * @public
 */
export type ButtonSize = ValuesOf<typeof ButtonSize>;

/**
 * ButtonShape constants
 * @public
 */
export const ButtonShape = {
  rounded: 'rounded',
  circular: 'circular',
  square: 'square',
} as const;

/**
 * A Button can be rounded, square or circular.
 * @public
 */
export type ButtonShape = ValuesOf<typeof ButtonShape>;
