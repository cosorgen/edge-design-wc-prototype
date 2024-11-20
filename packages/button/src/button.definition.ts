import { ComponentDesignSystem } from "@mai-ui/component-framework/design-system.js";
import { Button } from "./button.js";
import { styles } from "./button.styles.js";
import { template } from "./button.template.js";

export const definition = Button.compose({
    name: `${ComponentDesignSystem.prefix}-button`,
    styles,
    template,
});
