import {
  backgroundCtrlBrandHover,
  backgroundCtrlBrandPressed,
  backgroundCtrlBrandRest,
  cornerCircular,
  curveDecelerateMax,
  durationSlow,
  gapBetweenContentXxsmall,
  paddingContentXxsmall,
  paddingContentXxxsmall,
  statusBrandTintForeground,
  textGlobalCaption1Fontsize,
  textGlobalCaption1Lineheight,
  textStyleDefaultRegularFontFamily,
  textStyleDefaultRegularWeight,
} from '@edge-design/kumo-theme/tokens.js';
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
    gap: ${gapBetweenContentXxsmall};

    /* Need for collapse */
    min-width: 24px;
    overflow: hidden;

    /* Animation on load */
    padding: ${paddingContentXxxsmall};
    transition: all ${durationSlow} ${curveDecelerateMax};
  }

  :host([expanded]) button {
    padding: ${paddingContentXxxsmall} ${paddingContentXxsmall};
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
    font-size: ${textGlobalCaption1Fontsize};
    font-weight: ${textStyleDefaultRegularWeight};
    line-height: ${textGlobalCaption1Lineheight};
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
