import { css, customElement, FASTElement, html } from '@microsoft/fast-element';
import {
  borderRadiusSmall,
  colorBrandForeground1,
  colorNeutralBackground2Hover,
  colorNeutralBackground2Pressed,
  colorNeutralForeground4,
  colorNeutralStrokeSubtle,
  strokeWidthThin,
} from '@phoenixui/themes';

const template = html`
  <button>
    <slot></slot>
    <div part="backplate"></div>
    <div part="indicator"></div>
  </button>
`;

const styles = css`
  button {
    position: relative;
    width: 44px;
    height: 44px;
    cursor: pointer;
    border: none;
    background: none;
  }

  [part='backplate'] {
    position: absolute;
    inset: 2px;
    border-radius: ${borderRadiusSmall};
    overflow: hidden;
    z-index: -1;
  }

  button:hover [part='backplate'] {
    background: ${colorNeutralBackground2Hover};
    border: ${strokeWidthThin} solid ${colorNeutralStrokeSubtle};
  }

  button:hover:active [part='backplate'] {
    background: ${colorNeutralBackground2Pressed};
  }

  :host([running]) [part='indicator'] {
    background: ${colorNeutralForeground4};
    position: absolute;
    bottom: 2px;
    left: calc(50% - 3px);
    width: 6px;
    height: 3px;
    border-radius: 3px;
  }

  :host([running][active]) [part='indicator'] {
    background: ${colorBrandForeground1};
    width: 16px;
    left: calc(50% - 8px);
  }

  slot {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`;

@customElement({
  name: 'taskbar-button',
  template,
  styles,
})
export default class TaskbarButton extends FASTElement {}
