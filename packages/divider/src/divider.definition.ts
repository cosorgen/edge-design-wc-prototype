import { ComponentDesignSystem } from '@mai-ui/component-framework/design-system.js';
import { Divider } from './divider.js';
import { styles } from './divider.styles.js';
import { template } from './divider.template.js';

export const definition = Divider.compose({
  name: `${ComponentDesignSystem.prefix}-divider`,
  styles,
  template,
});
