import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  colorBrandBackground2,
  colorBrandBackground2Hover,
  colorBrandBackground2Pressed,
  colorNeutralForeground1,
  curveDecelerateMax,
  durationFast,
  spacingHorizontalS,
  spacingHorizontalXS,
  spacingVerticalXXS,
  typographyStyles,
} from '@phoenixui/themes';

const template = html`
  <button>
    <svg>
      <use href="img/edge/icons.svg#shopping-20-regular"></use>
    </svg>
    <div>Coupons available</div>
  </button>
`;

const styles = css`
  button {
    border-radius: ${borderRadiusCircular};
    background: ${colorBrandBackground2};
    border: none;
    color: ${colorNeutralForeground1};
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${spacingHorizontalXS};
    padding: ${spacingVerticalXXS} ${spacingHorizontalS};

    /* Need for collapse */
    min-width: 24px;
    overflow: hidden;

    /* Animation on load */
    width: 40px;
    transform: translateX(100%);
    transition:
      width ${durationFast} ${curveDecelerateMax} 0.25s,
      transform ${durationFast} ${curveDecelerateMax} 0.25s;
  }

  :host([expanded]) button {
    transform: translateX(0px);
    width: 100%;
  }

  button:hover {
    background: ${colorBrandBackground2Hover};
  }

  :host([pressed='true']) button {
    background: ${colorBrandBackground2Hover};
  }

  button:active {
    background: ${colorBrandBackground2Pressed};
  }

  svg {
    height: 20px;
    width: 20px;
  }

  div {
    flex: 1;
    font-family: ${typographyStyles.caption1.fontFamily};
    font-size: ${typographyStyles.caption1.fontSize};
    font-weight: ${typographyStyles.caption1.fontWeight};
    line-height: ${typographyStyles.caption1.lineHeight};
    white-space: nowrap;
    overflow: hidden;
    min-width: 0px;
  }
`;

@customElement({
  name: 'shopping-button',
  template,
  styles,
})
export class ShoppingButton extends FASTElement {
  connectedCallback() {
    super.connectedCallback();
    requestAnimationFrame(() => {
      this.setAttribute('expanded', 'true');
    }); // wait for render
  }
}
