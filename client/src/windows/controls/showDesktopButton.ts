import { FASTElement, css, customElement, html } from '@microsoft/fast-element';
import {
  borderRadiusSmall,
  spacingHorizontalM,
} from '@phoenixui/web-components';
import {
  colorShellFillTaksbarItemSecondary,
  colorShellFillTaksbarItemTeritary,
} from '../designSystem.js';

const styles = css`
  button {
    user-select: none;
    width: ${spacingHorizontalM};
    cursor: pointer;
    height: 44px;
    border-radius: ${borderRadiusSmall};
    border: none;
    background: none;
  }
  button:hover {
    background: ${colorShellFillTaksbarItemSecondary};
  }
  button:hover:active {
    background: ${colorShellFillTaksbarItemTeritary};
  }
`;

@customElement({
  name: 'show-desktop-button',
  template: html`<button>&NonBreakingSpace;</button>`,
  styles,
})
export default class ShowDesktopButton extends FASTElement {}
