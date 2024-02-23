import { FASTElement, css, customElement, html } from '@microsoft/fast-element';
import {
  borderRadiusSmall,
  colorNeutralForeground1,
  spacingHorizontalXS,
} from '@phoenixui/web-components';
import {
  colorShellFillTaksbarItemSecondary,
  colorShellFillTaksbarItemTeritary,
} from '../designSystem.js';

const template = html<ShowMoreButton>`
  <button>
    <svg width="16" height="16">
      <use href="img/windows/icons.svg#chevron-up"></use>
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
  name: 'show-more-button',
  template,
  styles,
})
export default class ShowMoreButton extends FASTElement {}
