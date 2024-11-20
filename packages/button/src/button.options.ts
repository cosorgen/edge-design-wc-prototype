import type { ValuesOf } from "@fluentui/web-components/utilities.js";
export {
    ButtonFormTarget,
    ButtonType,
} from "@fluentui/web-components/button/options.js";

/**
 * ButtonAppearance constants
 * @public
 */
export const ButtonAppearance = {
    neutral: "neutral",
    outline: "outline",
    primary: "primary",
    transparent: "transparent",
} as const;

/**
 * A Button can be secondary, primary, outline, subtle, transparent
 * @public
 */
export type ButtonAppearance = ValuesOf<typeof ButtonAppearance>;

/**
 * A Button can be a size of small, medium or large.
 * @public
 */
export const ButtonSize = {
    medium: "medium",
    large: "large",
} as const;

/**
 * A Button can be on of several preset sizes.
 * @public
 */
export type ButtonSize = ValuesOf<typeof ButtonSize>;
