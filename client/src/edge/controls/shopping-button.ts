import {
  backgroundCtrlBrandHover,
  backgroundCtrlBrandPressed,
  backgroundCtrlBrandRest,
  cornerCircular,
  gapBetweenContentXxSmall,
  paddingContentXxSmall,
  statusBrandTintForeground,
  textGlobalCaption1FontSize,
  textGlobalCaption1LineHeight,
  textStyleDefaultRegularFontFamily,
  textStyleDefaultRegularWeight,
} from '@mai-ui/design-tokens/tokens.js';
import {
  curveDecelerateMax,
  durationSlow,
} from '@mai-ui/design-tokens/tokens.js';
import { html, css, FASTElement, customElement } from '@microsoft/fast-element';

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
    border-radius: ${cornerCircular};
    background: ${backgroundCtrlBrandRest};
    border: none;
    color: ${statusBrandTintForeground};
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${gapBetweenContentXxSmall};

    /* Need for collapse */
    min-width: 24px;
    overflow: hidden;

    /* Animation on load */
    padding: ${paddingContentXxSmall};
    transition: all ${durationSlow} ${curveDecelerateMax};
  }

  :host([expanded]) button {
    padding: ${paddingContentXxSmall} ${paddingContentXxSmall};
  }

  button:hover {
    background: ${backgroundCtrlBrandHover};
  }

  :host([pressed='true']) button {
    background: ${backgroundCtrlBrandPressed};
  }

  button:active {
    background: ${backgroundCtrlBrandPressed};
  }

  svg {
    height: 20px;
    width: 20px;
  }

  div {
    flex: 1;
    font-family: ${textStyleDefaultRegularFontFamily};
    font-size: ${textGlobalCaption1FontSize};
    font-weight: ${textStyleDefaultRegularWeight};
    line-height: ${textGlobalCaption1LineHeight};
    white-space: nowrap;
    overflow: hidden;
    min-width: 0px;

    /* Animation on load */
    width: 0px;
    transition: all ${durationSlow} ${curveDecelerateMax};
  }

  :host([expanded]) div {
    width: var(--max-label-width);
  }
`;

@customElement({ name: 'shopping-button', template, styles })
export class ShoppingButton extends FASTElement {
  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      this.setAttribute(
        'style',
        '--max-label-width: ' +
          this.shadowRoot?.querySelector('div')?.scrollWidth +
          'px',
      );
      this.setAttribute('expanded', '');
    }, 1000); // delay for animation
  }
}
