import { ComponentDesignSystem } from "@mai-ui/component-framework/design-system.js";
import { MenuList } from "./menu-list.js";
import { styles } from "./menu-list.styles.js";
import { template } from "./menu-list.template.js";

/**
 * The Menu List custom element definition.
 *
 * @public
 * @remarks
 * HTML Element: `<mai-menu-list>`
 */
export const definition = MenuList.compose({
    name: `${ComponentDesignSystem.prefix}-menu-list`,
    template,
    styles,
});
