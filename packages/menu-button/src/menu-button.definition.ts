import { ComponentDesignSystem } from "@mai-ui/component-framework/design-system.js";
import { MenuButton } from "./menu-button.js";
import { styles } from "./menu-button.styles.js";
import { template } from "./menu-button.template.js";

/**
 * The Menu Button custom element definition
 *
 * @public
 * @remarks
 * HTML Element: `<mai-menu-button>`
 */
export const definition = MenuButton.compose({
    name: `${ComponentDesignSystem.prefix}-menu-button`,
    template,
    styles,
});
