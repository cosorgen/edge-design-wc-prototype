import { customElement, FASTElement, html, css } from '@microsoft/fast-element';
import '@mai-ui/button/define.js';
import '@mai-ui/divider/define.js';
import {
  cornerCircular,
  foregroundCtrlNeutralSecondaryHover,
  foregroundCtrlNeutralSecondaryRest,
  paddingCtrlSmHorizontalIconOnly,
  foregroundCtrlNeutralSecondaryPressed,
  backgroundCtrlSubtleRest,
  backgroundCtrlSubtleHover,
  backgroundCtrlSubtlePressed,
  backgroundCtrlSubtleSelectedRest,
  foregroundCtrlNeutralPrimaryRest,
  backgroundCtrlSubtleSelectedHover,
  foregroundCtrlNeutralPrimaryHover,
  backgroundCtrlSubtleSelectedPressed,
  foregroundCtrlNeutralPrimaryPressed,
} from '@mai-ui/design-tokens/tokens.js';

const template = html<OmniboxActionButton>`
  <button>
    <slot></slot>
  </button>
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: ${backgroundCtrlSubtleRest};
    border: none;
    padding: ${paddingCtrlSmHorizontalIconOnly};
    margin: 0;
    color: ${foregroundCtrlNeutralSecondaryRest};
    border-radius: ${cornerCircular};
  }

  button:hover {
    background: ${backgroundCtrlSubtleHover};
    color: ${foregroundCtrlNeutralSecondaryHover};
    cursor: pointer;
  }

  button:hover:active {
    background: ${backgroundCtrlSubtlePressed};
    color: ${foregroundCtrlNeutralSecondaryPressed};
  }

  :host([aria-pressed='true']) button {
    background: ${backgroundCtrlSubtleSelectedRest};
    color: ${foregroundCtrlNeutralPrimaryRest};
  }

  :host([aria-pressed='true']) button:hover {
    background: ${backgroundCtrlSubtleSelectedHover};
    color: ${foregroundCtrlNeutralPrimaryHover};
  }

  :host([aria-pressed='true']) button:hover:active {
    background: ${backgroundCtrlSubtleSelectedPressed};
    color: ${foregroundCtrlNeutralPrimaryPressed};
  }

  ::slotted(svg),
  ::slotted(img) {
    width: 20px;
    height: 20px;
  }

  mai-divider {
    min-height: 16px;
    height: 100%;
  }
`;

@customElement({ name: 'omnibox-action-button', template, styles })
export class OmniboxActionButton extends FASTElement {}
