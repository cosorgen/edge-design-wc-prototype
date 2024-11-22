import { ComponentDesignSystem } from '@mai-ui/component-framework/design-system.js';
import { ToggleButton } from './toggle-button.js';
import { styles } from './toggle-button.styles.js';
import { template } from './toggle-button.template.js';

export const definition = ToggleButton.compose({
  name: `${ComponentDesignSystem.prefix}-toggle-button`,
  styles,
  template,
});
