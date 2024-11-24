import { css, customElement, FASTElement, html } from '@microsoft/fast-element';
import {
  borderRadiusSmall,
  strokeWidthThin,
  colorShellFillTaskbarItemIndicator,
  colorShellFillTaksbarItemPrimary,
  colorShellFillTaksbarItemSecondary,
  colorShellFillTaksbarItemTeritary,
  colorShellStrokeTaskbarItemSecondary,
  colorShellStrokeTaskbarItemQuinary,
  colorFillAccent,
} from '@mai-ui/windows-theme';

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
    user-select: none;
  }

  [part='backplate'] {
    position: absolute;
    inset: 2px;
    border-radius: ${borderRadiusSmall};
    overflow: hidden;
    z-index: -1;
  }

  button:hover [part='backplate'],
  :host([running][active]) [part='backplate'] {
    background: ${colorShellFillTaksbarItemSecondary};
    border: ${strokeWidthThin} solid ${colorShellStrokeTaskbarItemSecondary};
  }

  button:hover:active [part='backplate'] {
    background: ${colorShellFillTaksbarItemTeritary};
    border: ${strokeWidthThin} solid ${colorShellStrokeTaskbarItemQuinary};
  }

  :host([running][active]) button:hover [part='backplate'] {
    background: ${colorShellFillTaksbarItemPrimary};
  }

  :host([running][active]) button:hover:active [part='backplate'] {
    background: ${colorShellFillTaksbarItemTeritary};
  }

  :host([running]) [part='indicator'] {
    background: ${colorShellFillTaskbarItemIndicator};
    position: absolute;
    bottom: 2px;
    left: calc(50% - 3px);
    width: 6px;
    height: 3px;
    border-radius: 3px;
  }

  :host([running][active]) [part='indicator'] {
    background: ${colorFillAccent};
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
