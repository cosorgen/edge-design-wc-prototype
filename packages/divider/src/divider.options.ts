export {
    DividerAlignContent,
    DividerOrientation,
    DividerRole,
} from "@fluentui/web-components/divider/options.js";
import type { ValuesOf } from "@fluentui/web-components/utilities.js";

/**
 * DividerAppearance - divider color defined by a design token alias.
 * @public
 */
export const DividerAppearance = {
    strong: "strong",
    subtle: "subtle",
} as const;

/**
 * The types for Appearance
 * @public
 */
export type DividerAppearance = ValuesOf<typeof DividerAppearance>;
