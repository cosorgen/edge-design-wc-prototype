import { ComponentDesignSystem } from "@mai-ui/component-framework/design-system.js";
import { Composer } from "./composer.js";
import { styles } from "./composer.styles.js";
import { template } from "./composer.template.js";

/**
 * The {@link Composer } custom element definition.
 *
 * @public
 * @remarks
 * HTML Element: `<mai-composer>`
 */
export const definition = Composer.compose({
    name: `${ComponentDesignSystem.prefix}-composer`,
    template,
    styles,
});
