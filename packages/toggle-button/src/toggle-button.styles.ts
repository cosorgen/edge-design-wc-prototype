import { css } from '@microsoft/fast-element';
import { styles as ButtonStyles } from '../../button/src/button.styles.js';
import { forcedColorsStylesheetBehavior } from '@fluentui/web-components/utilities.js';
import {
  outlineState,
  pressedState,
  primaryState,
  subtleState,
} from '@mai-ui/component-framework/states.js';
import { backgroundControlNeutralSelected } from '@mai-ui/design-tokens/toggle-button.js';

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
    border-color: ${strokeControlNonePre};
    color: ${colorNeutralForeground1};
  }

  :host(${pressedState}:hover) {
    border-color: ${colorNeutralStroke1Hover};
    background-color: ${colorNeutralBackground1Hover};
  }

  :host(${pressedState}:active) {
    border-color: ${colorNeutralStroke1Pressed};
    background-color: ${colorNeutralBackground1Pressed};
  }

  :host(${pressedState}${primaryState}) {
    border-color: transparent;
    background-color: ${colorBrandBackgroundSelected};
    color: ${colorNeutralForegroundOnBrand};
  }

  :host(${pressedState}${primaryState}:hover) {
    background-color: ${colorBrandBackgroundHover};
  }

  :host(${pressedState}${primaryState}:active) {
    background-color: ${colorBrandBackgroundPressed};
  }

  :host(${pressedState}${subtleState}) {
    border-color: transparent;
    background-color: ${colorSubtleBackgroundSelected};
    color: ${colorNeutralForeground2Selected};
  }

  :host(${pressedState}${subtleState}:hover) {
    background-color: ${colorSubtleBackgroundHover};
    color: ${colorNeutralForeground2Hover};
  }

  :host(${pressedState}${subtleState}:active) {
    background-color: ${colorSubtleBackgroundPressed};
    color: ${colorNeutralForeground2Pressed};
  }

  :host(${pressedState}${outlineState}),
  :host(${pressedState}${transparentState}) {
    background-color: ${colorTransparentBackgroundSelected};
  }

  :host(${pressedState}${outlineState}:hover) {
    background-color: ${colorTransparentBackgroundHover};
  }

  :host(${pressedState}${outlineState}:active) {
    background-color: ${colorTransparentBackgroundPressed};
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
