import { FASTElement, css, customElement, html } from '@microsoft/fast-element';
import {
  borderRadiusSmall,
  spacingHorizontalS,
  spacingHorizontalXS,
  colorNeutralForeground1,
} from '@phoenixui/themes';
import {
  colorShellFillTaksbarItemSecondary,
  colorShellFillTaksbarItemTeritary,
} from '../designSystem.js';

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
    gap: ${spacingHorizontalS};
    user-select: none;
    padding: 0 ${spacingHorizontalXS};
    cursor: pointer;
    height: 44px;
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
  name: 'system-tray',
  template,
  styles,
})
export default class SystemTray extends FASTElement {}
