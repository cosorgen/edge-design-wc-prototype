import { ComponentDesignSystem } from "@mai-ui/component-framework/design-system.js";
import { Switch } from "./switch.js";
import { styles } from "./switch.styles.js";
import { template } from "./switch.template.js";

/**
 * The Switch custom element definition.
 *
 * @public
 * @remarks
 * HTML Element: `<mai-switch>`
 */
export const definition = Switch.compose({
    name: `${ComponentDesignSystem.prefix}-switch`,
    template,
    styles,
});
