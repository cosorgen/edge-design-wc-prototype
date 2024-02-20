import { FASTElement, css, customElement, html } from '@microsoft/fast-element';
import {
  borderRadiusSmall,
  colorNeutralBackground2Hover,
  colorNeutralForeground1,
} from '@phoenixui/themes';

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
    background: ${colorNeutralBackground2Hover};
  }
`;

@customElement({
  name: 'copilot-button',
  template,
  styles,
})
export default class CopilotButton extends FASTElement {}
