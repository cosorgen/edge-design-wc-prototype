import {
  attr,
  css,
  customElement,
  FASTElement,
  html,
  when,
} from '@microsoft/fast-element';
import '@edge-design/button/define.js';
import '@mai-ui/spinner/define.js';
import '../../windows/controls/mica-material.js';
import {
  shadowLayerAmbientX,
  shadowLayerKeyBlur,
  shadowLayerKeyColor,
  shadowLayerKeyX,
  shadowLayerKeyY,
  shadowLayerAmbientY,
  shadowLayerAmbientBlur,
  shadowLayerAmbientColor,
  gapInsideCtrlDefault,
  paddingCtrlHorizontalDefault,
  paddingContentXSmall,
  foregroundCtrlNeutralPrimaryRest,
  cornerCtrlRest,
  backgroundCtrlSubtleHover,
  foregroundCtrlNeutralPrimaryHover,
  textStyleDefaultRegularFontFamily,
  textStyleDefaultRegularWeight,
  textGlobalCaption1Fontsize,
  textGlobalCaption1Lineheight,
  ctrlTabBackgroundHorizontalActive,
  cornerCtrlSmRest,
  paddingWindowDefault,
} from '@edge-design/kumo-theme/tokens.js';

const template = html<HorizontalTab>`
  <div class="tab-background" id="bg"></div>
  <div class="tab-background" id="left-wing"></div>
  <div class="tab-background" id="right-wing"></div>
  <button @mousedown="${(x, c) => x.handleClick(c.event as MouseEvent)}">
    <div id="favicon" part="favicon">
      ${when(
        (x) => x.loading,
        html`<mai-spinner size="tiny"></mai-spinner>`,
        html`<slot name="favicon">
          <svg width="16" height="16">
            <use
              href="img/edge/icons.svg#tab-desktop-new-page-16-regular"
            ></use>
          </svg>
        </slot>`,
      )}
    </div>
    <div id="title" part="title">
      <slot name="title">New tab</slot>
    </div>
  </button>
  <mai-button
    size="small"
    appearance="subtle"
    icon-only
    @click="${(x, c) => x.close(c.event)}"
  >
    <svg>
      <use href="img/edge/icons.svg#dismiss-12-regular"></use>
    </svg>
  </mai-button>
`;

const styles = css`
  :host {
    position: relative;
    display: block;
    width: 260px;
    min-width: 16px;
    height: 32px;
  }

  :host([active]) {
    filter: drop-shadow(
        ${shadowLayerKeyX} ${shadowLayerKeyY} ${shadowLayerKeyBlur}
          ${shadowLayerKeyColor}
      )
      drop-shadow(
        ${shadowLayerAmbientX} ${shadowLayerAmbientY} ${shadowLayerAmbientBlur}
          ${shadowLayerAmbientColor}
      );
  }

  button {
    position: absolute;
    inset: 0;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${gapInsideCtrlDefault};
    padding-inline-start: ${paddingCtrlHorizontalDefault};
    padding-inline-end: calc(${paddingCtrlHorizontalDefault} + /*16px*/ 0px);
    padding-block: ${paddingContentXSmall};
    color: ${foregroundCtrlNeutralPrimaryRest};
    border-radius: ${cornerCtrlRest};
  }

  button:hover {
    background-color: ${backgroundCtrlSubtleHover};
    color: ${foregroundCtrlNeutralPrimaryHover};
  }

  :host([active]) button {
    cursor: default;
  }

  :host([active]) button:hover {
    background-color: transparent;
  }

  :host([active]) #bg,
  :host([active]) #left-wing,
  :host([active]) #right-wing {
    visibility: visible;
  }

  #title {
    flex: 1;
    mask-image: linear-gradient(
      90deg,
      white,
      white 80%,
      transparent 92%,
      transparent
    );
  }

  #title,
  [name='title']::slotted(*) {
    /* Caption1 */
    font-family: ${textStyleDefaultRegularFontFamily};
    font-size: ${textGlobalCaption1Fontsize};
    font-weight: ${textStyleDefaultRegularWeight};
    line-height: ${textGlobalCaption1Lineheight};
    text-align: start;
    white-space: nowrap;
    overflow: hidden;
  }

  #favicon,
  [name='favicon']::slotted(*) {
    width: 16px;
    height: 16px;
  }

  mai-button {
    position: absolute;
    inset-inline-end: ${paddingCtrlHorizontalDefault};
    inset-block: ${paddingCtrlHorizontalDefault};
  }

  mai-button svg,
  mai-button {
    width: 16px;
    height: 16px;
    min-width: 16px;
    min-height: 16px;
    padding: 0;
    border-radius: ${cornerCtrlSmRest};
  }

  .tab-background {
    background-color: ${ctrlTabBackgroundHorizontalActive};
  }

  #bg,
  #left-wing,
  #right-wing {
    visibility: hidden;
    position: absolute;
    overflow: hidden;
  }

  #bg {
    inset: 0;
    bottom: calc(0px - ${paddingWindowDefault});
    border-radius: ${cornerCtrlRest} ${cornerCtrlRest} 0 0;
  }

  #left-wing,
  #right-wing {
    width: 10px;
    height: 10px;
    bottom: calc(0px - ${paddingWindowDefault});
    clip-path: path('M0 10h10V0A10 10 0 0 1 0 10Z');
  }

  #left-wing {
    left: -10px;
  }

  #right-wing {
    right: -10px;
    transform: rotate(90deg);
  }

  mai-spinner {
    --size: 16px;
  }
`;

@customElement({ name: 'horizontal-tab', template, styles })
export class HorizontalTab extends FASTElement {
  @attr({ mode: 'boolean' }) active = false;
  @attr({ mode: 'boolean' }) loading = false;
  handleClick(e: MouseEvent) {
    e.stopPropagation();

    if (e.button === 0) {
      this.$emit('activate');
    } else if (e.button === 1) {
      this.$emit('close');
    }
  }

  close(e: Event) {
    e.stopPropagation();
    this.$emit('close');
  }
}
