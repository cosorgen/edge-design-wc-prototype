import { ComponentDesignSystem } from "@mai-ui/component-framework/design-system.js";
import { MenuItem } from "./menu-item.js";
import { styles } from "./menu-item.styles.js";
import { template } from "./menu-item.template.js";

/**
 * The Menu Item custom element definition.
 *
 * @public
 * @remarks
 * HTML Element: `<mai-menu-item>`
 */
export const definition = MenuItem.compose({
    name: `${ComponentDesignSystem.prefix}-menu-item`,
    template,
    styles,
});
