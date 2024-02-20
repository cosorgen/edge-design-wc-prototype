import { FASTElement, css, customElement, html } from '@microsoft/fast-element';
import {
  borderRadiusSmall,
  colorNeutralBackground2Hover,
  spacingHorizontalXS,
} from '@phoenixui/themes';

const template = html<SystemTray>`
  <button>
    <svg width="16" height="16">
      <use href="img/windows/icons.svg#wifi" />
    </svg>
    <svg width="16" height="16">
      <use href="img/windows/icons.svg#volume" />
    </svg>
    <svg width="16" height="16">
      <use href="img/windows/icons.svg#battery" />
    </svg>
  </button>
`;

const styles = css`
  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: ${spacingHorizontalXS};
    user-select: none;
    padding: 0 ${spacingHorizontalXS};
    cursor: pointer;
    height: 44px;
    border-radius: ${borderRadiusSmall};
    border: none;
    background: none;
  }
  button:hover {
    background: ${colorNeutralBackground2Hover};
  }
`;

@customElement({
  name: 'system-tray',
  template,
  styles,
})
export default class SystemTray extends FASTElement {}
