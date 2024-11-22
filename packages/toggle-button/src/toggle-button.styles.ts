import { css } from '@microsoft/fast-element';
import { styles as ButtonStyles } from '@mai-ui/button/styles.js';
import { forcedColorsStylesheetBehavior } from '@fluentui/web-components/utilities.js';
import {
  outlineState,
  pressedState,
  primaryState,
  subtleState,
} from '@mai-ui/component-framework/states.js';
import {
  backgroundControlNeutralSelected,
  strokeControlNonePressed,
  strokeControlNoneHover,
  backgroundControlNeutralHover,
  backgroundControlNeutralPressed,
  backgroundControlBrandHover,
  backgroundControlBrandPressed,
  backgroundControlSubtlePressed,
  backgroundControlSubtleHover,
  backgroundControlOutlineHover,
  backgroundControlOutlinePressed,
  backgroundControlOutlineSelected,
  backgroundControlSubtleSelected,
  foregroundControlOnBrandSelected,
  backgroundControlBrandSelected,
  strokeControlNoneSelected,
  foregroundControlNeutralSelected,
} from '@mai-ui/design-tokens/toggle-button.js';

/**
 * The styles for the ToggleButton component.
 *
 * @public
 * @privateRemarks
 * TODO: Need to support icon hover styles
 */
export const styles = css`
  ${ButtonStyles}

  :host(${pressedState}) {
    background-color: ${backgroundControlNeutralSelected};
    border-color: ${strokeControlNoneSelected};
    color: ${foregroundControlNeutralSelected};
  }

  :host(${pressedState}:hover) {
    border-color: ${strokeControlNoneHover};
    background-color: ${backgroundControlNeutralHover};
  }

  :host(${pressedState}:active) {
    border-color: ${strokeControlNonePressed};
    background-color: ${backgroundControlNeutralPressed};
  }

  :host(${pressedState}${primaryState}) {
    border-color: transparent;
    background-color: ${backgroundControlBrandSelected};
    color: ${foregroundControlOnBrandSelected};
  }

  :host(${pressedState}${primaryState}:hover) {
    background-color: ${backgroundControlBrandHover};
  }

  :host(${pressedState}${primaryState}:active) {
    background-color: ${backgroundControlBrandPressed};
  }

  :host(${pressedState}${subtleState}) {
    border-color: transparent;
    background-color: ${backgroundControlSubtleSelected};
  }

  :host(${pressedState}${subtleState}:hover) {
    background-color: ${backgroundControlSubtleHover};
  }

  :host(${pressedState}${subtleState}:active) {
    background-color: ${backgroundControlSubtlePressed};
  }

  :host(${pressedState}${outlineState}) {
    background-color: ${backgroundControlOutlineSelected};
  }

  :host(${pressedState}${outlineState}:hover) {
    background-color: ${backgroundControlOutlineHover};
  }

  :host(${pressedState}${outlineState}:active) {
    background-color: ${backgroundControlOutlinePressed};
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host(${pressedState}),
    :host(${pressedState}${primaryState}),
    :host(${pressedState}${subtleState}),
    :host(${pressedState}${outlineState}) {
      background: SelectedItem;
      color: SelectedItemText;
    }
  `),
);
