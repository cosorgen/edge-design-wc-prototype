import { ComponentDesignSystem } from '@mai-ui/component-framework/design-system.js';
import { Spinner } from './spinner.js';
import { styles } from './spinner.styles.js';
import { template } from './spinner.template.js';

export const definition = Spinner.compose({
  name: `${ComponentDesignSystem.prefix}-spinner`,
  styles,
  template,
});
