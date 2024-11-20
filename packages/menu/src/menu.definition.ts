import { ComponentDesignSystem } from "@mai-ui/component-framework/design-system.js";
import { Menu } from "./menu.js";
import { styles } from "./menu.styles.js";
import { template } from "./menu.template.js";

/**
 * The Menu custom element definition
 *
 * @public
 * @remarks
 * HTML Element: `<mai-menu>`
 */
export const definition = Menu.compose({
    name: `${ComponentDesignSystem.prefix}-menu`,
    template,
    styles,
});
