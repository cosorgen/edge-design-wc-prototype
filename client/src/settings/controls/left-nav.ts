import {
  css,
  html,
  FASTElement,
  customElement,
  attr,
} from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  borderRadiusSmall,
  colorBrandForeground1,
  colorNeutralForeground1,
  colorSubtleBackgroundHover,
  colorSubtleBackgroundSelected,
  spacingHorizontalM,
  strokeWidthThickest,
  typographyStyles,
} from '@phoenixui/themes';

const template = html` <slot></slot> `;

const styles = css`
  :host {
    width: 200px;
    display: flex;
    flex-direction: column;
  }
`;

@customElement({
  name: 'left-nav',
  template,
  styles,
})
export class LeftNav extends FASTElement {}

const template2 = html`
  <button @click="${(x) => x.handleButtonClick()}">
    <slot></slot>
  </button>
`;

const styles2 = css`
  button {
    position: relative;
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    padding-left: ${spacingHorizontalM};
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: ${borderRadiusSmall};

    font-family: ${typographyStyles.body1.fontFamily};
    font-size: ${typographyStyles.body1.fontSize};
    font-weight: ${typographyStyles.body1.fontWeight};
    line-height: ${typographyStyles.body1.lineHeight};
    color: ${colorNeutralForeground1};
  }

  button:hover {
    background: ${colorSubtleBackgroundHover};
  }

  :host([selected]) button {
    background: ${colorSubtleBackgroundSelected};

    &::before {
      --indicator-height: clamp(4px, 50%, 16px);
      content: '';
      position: absolute;
      left: 0;
      top: calc(50% - var(--indicator-height) / 2);
      width: ${strokeWidthThickest};
      height: var(--indicator-height);
      background-color: ${colorBrandForeground1};
      border-radius: ${borderRadiusCircular};
    }
  }
`;

@customElement({
  name: 'left-nav-item',
  template: template2,
  styles: styles2,
})
export class LeftNavItem extends FASTElement {
  @attr({ mode: 'boolean' }) selected = false;

  handleButtonClick() {
    this.selected = !this.selected;
  }
}
