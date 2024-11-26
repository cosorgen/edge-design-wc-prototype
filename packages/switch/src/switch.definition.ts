import { ComponentDesignSystem } from '@mai-ui/component-framework/design-system.js';
import { Switch } from './switch.js';
import { styles } from './switch.styles.js';
import { template } from './switch.template.js';

export const definition = Switch.compose({
  name: `${ComponentDesignSystem.prefix}-switch`,
  styles,
  template,
});
