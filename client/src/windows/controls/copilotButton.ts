import { FASTElement, css, customElement, html } from '@microsoft/fast-element';
import {
  borderRadiusSmall,
  colorNeutralForeground1,
} from '@phoenixui/web-components';
import {
  colorShellFillTaksbarItemSecondary,
  colorShellFillTaksbarItemTeritary,
} from '../designSystem.js';

const template = html<CopilotButton>`
  <button>
    <img src="img/windows/copilot-24.svg" />
  </button>
`;

const styles = css`
  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
    height: 44px;
    width: 44px;
    border-radius: ${borderRadiusSmall};
    border: none;
    background: none;
    color: ${colorNeutralForeground1};
  }
  button:hover {
    background: ${colorShellFillTaksbarItemSecondary};
  }
  button:hover:active {
    background: ${colorShellFillTaksbarItemTeritary};
  }
`;

@customElement({
  name: 'copilot-button',
  template,
  styles,
})
export default class CopilotButton extends FASTElement {}
