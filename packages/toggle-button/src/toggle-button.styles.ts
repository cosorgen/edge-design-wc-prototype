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
  smtcBackgroundControlNeutralSelected,
  smtcStrokeControlNonePressed,
  smtcStrokeControlNoneHover,
  smtcBackgroundControlNeutralHover,
  smtcBackgroundControlNeutralPressed,
  smtcBackgroundControlBrandHover,
  smtcBackgroundControlBrandPressed,
  smtcBackgroundControlSubtlePressed,
  smtcBackgroundControlSubtleHover,
  smtcBackgroundControlOutlineHover,
  smtcBackgroundControlOutlinePressed,
  smtcBackgroundControlOutlineSelected,
  smtcBackgroundControlSubtleSelected,
  smtcForegroundControlOnBrandSelected,
  smtcBackgroundControlBrandSelected,
  smtcStrokeControlNoneSelected,
  smtcForegroundControlNeutralSelected,
} from './toggle-button.tokens.js';

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
    background-color: ${smtcBackgroundControlNeutralSelected};
    border-color: ${smtcStrokeControlNoneSelected};
    color: ${smtcForegroundControlNeutralSelected};
  }

  :host(${pressedState}:hover) {
    border-color: ${smtcStrokeControlNoneHover};
    background-color: ${smtcBackgroundControlNeutralHover};
  }

  :host(${pressedState}:active) {
    border-color: ${smtcStrokeControlNonePressed};
    background-color: ${smtcBackgroundControlNeutralPressed};
  }

  :host(${pressedState}${primaryState}) {
    border-color: transparent;
    background-color: ${smtcBackgroundControlBrandSelected};
    color: ${smtcForegroundControlOnBrandSelected};
  }

  :host(${pressedState}${primaryState}:hover) {
    background-color: ${smtcBackgroundControlBrandHover};
  }

  :host(${pressedState}${primaryState}:active) {
    background-color: ${smtcBackgroundControlBrandPressed};
  }

  :host(${pressedState}${subtleState}) {
    border-color: transparent;
    background-color: ${smtcBackgroundControlSubtleSelected};
  }

  :host(${pressedState}${subtleState}:hover) {
    background-color: ${smtcBackgroundControlSubtleHover};
  }

  :host(${pressedState}${subtleState}:active) {
    background-color: ${smtcBackgroundControlSubtlePressed};
  }

  :host(${pressedState}${outlineState}) {
    background-color: ${smtcBackgroundControlOutlineSelected};
  }

  :host(${pressedState}${outlineState}:hover) {
    background-color: ${smtcBackgroundControlOutlineHover};
  }

  :host(${pressedState}${outlineState}:active) {
    background-color: ${smtcBackgroundControlOutlinePressed};
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
