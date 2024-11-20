import { BaseDivider } from "@fluentui/web-components/divider/index.js";
import { toggleState } from "@mai-ui/component-framework/toggle-state.js";
import { attr } from "@microsoft/fast-element";
import type { DividerAppearance } from "./divider.options.js";

/**
 * A Divider Custom HTML Element.
 * Based on BaseDivider and includes style and layout specific attributes
 *
 * @public
 */
export class Divider extends BaseDivider {
    /**
     * @public
     * @remarks
     * A divider can have one of the preset appearances. Select from strong, brand, subtle. When not specified, the divider has its default appearance.
     */
    @attr
    public appearance?: DividerAppearance;

    /**
     * Handles changes to appearance attribute custom states
     * @param prev - the previous state
     * @param next - the next state
     */
    public appearanceChanged(
        prev: DividerAppearance | undefined,
        next: DividerAppearance | undefined,
    ) {
        if (prev) {
            toggleState(this.elementInternals, `${prev}`, false);
        }
        if (next) {
            toggleState(this.elementInternals, `${next}`, true);
        }
    }

    /**
     * @public
     * @remarks
     * Adds padding to the beginning and end of the divider.
     */
    @attr({ mode: "boolean" })
    public inset?: boolean;

    /**
     * Handles changes to inset custom states
     * @param prev - the previous state
     * @param next - the next state
     */
    public insetChanged(prev: boolean, next: boolean) {
        toggleState(this.elementInternals, "inset", next);
    }
}
