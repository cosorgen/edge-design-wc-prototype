import { customElement, FASTElement, html, css } from '@microsoft/fast-element';
import '@edge-design/button/define.js';
import '@mai-ui/divider/define.js';
import {
  backgroundCtrlSubtleHover,
  backgroundCtrlSubtleRest,
  cornerCircular,
  foregroundCtrlNeutralSecondaryHover,
  foregroundCtrlNeutralSecondaryRest,
  paddingCtrlSmHorizontalIcononly,
} from '@edge-design/kumo-theme/tokens.js';
import { backgroundCtrlSubtlePressed } from '@edge-design/kumo-theme/tokens.js';
import { foregroundCtrlNeutralSecondaryPressed } from '@edge-design/kumo-theme/tokens.js';

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
    padding: ${paddingCtrlSmHorizontalIcononly};
    margin: 0;
    color: ${foregroundCtrlNeutralSecondaryRest};
    border-radius: ${cornerCircular};
  }

  button:hover {
    background: ${backgroundCtrlSubtleHover};
    color: ${foregroundCtrlNeutralSecondaryHover};
    cursor: pointer;
  }

  button:hover:active,
  :host([pressed='true']) button {
    background: ${backgroundCtrlSubtlePressed};
    color: ${foregroundCtrlNeutralSecondaryPressed};
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
