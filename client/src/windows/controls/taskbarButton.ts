import { css, customElement, FASTElement, html } from '@microsoft/fast-element';
import {
  borderRadiusSmall,
  colorBrandForeground1,
  colorNeutralForeground4,
} from '@phoenixui/themes';

const template = html`
  <slot></slot>
  <div part="backplate"></div>
  <div part="indicator"></div>
`;

const styles = css`
  :host {
    position: relative;
    width: 44px;
    height: 44px;
  }

  [part='backplate'] {
    position: absolute;
    inset: 1px;
    border-radius: ${borderRadiusSmall};
    overflow: hidden;
    z-index: -1;
  }

  [part='indicator'] {
    background: ${colorNeutralForeground4};
    position: absolute;
    bottom: 2px;
    left: calc(50% - 3px);
    width: 6px;
    height: 3px;
    border-radius: 3px;
  }

  :host([active]) [part='indicator'] {
    background: ${colorBrandForeground1};
    width: 16px;
    left: calc(50% - 8px);
  }
`;

@customElement({
  name: 'taskbar-button',
  template,
  styles,
})
export default class TaskbarButton extends FASTElement {}
