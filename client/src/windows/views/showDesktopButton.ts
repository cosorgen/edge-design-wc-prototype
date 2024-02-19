import { FASTElement, css, customElement } from '@microsoft/fast-element';
import {
  borderRadiusSmall,
  colorNeutralBackground2Hover,
  spacingHorizontalM,
} from '@phoenixui/themes';

const styles = css`
  :host {
    user-select: none;
    width: ${spacingHorizontalM};
    cursor: pointer;
    height: 44px;
    border-radius: ${borderRadiusSmall};
  }
  :host(:hover) {
    background: ${colorNeutralBackground2Hover};
  }
`;

@customElement({
  name: 'show-desktop-button',
  styles,
})
export default class ShowDesktopButton extends FASTElement {}
