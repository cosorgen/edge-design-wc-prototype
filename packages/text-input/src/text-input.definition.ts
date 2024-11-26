import { ComponentDesignSystem } from '@mai-ui/component-framework/design-system.js';
import { TextInput } from './text-input.js';
import { styles } from './text-input.styles.js';
import { template } from './text-input.template.js';

export const definition = TextInput.compose({
  name: `${ComponentDesignSystem.prefix}-text-input`,
  styles,
  template,
  shadowOptions: {
    delegatesFocus: true,
  },
});
