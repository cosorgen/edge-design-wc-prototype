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
  gapInsideCtrlDefault,
  paddingCtrlHorizontalDefault,
  paddingContentXsmall,
  foregroundCtrlNeutralPrimaryRest,
  cornerCtrlRest,
  foregroundCtrlNeutralPrimaryHover,
  textStyleDefaultRegularFontFamily,
  textStyleDefaultRegularWeight,
  textGlobalCaption1Fontsize,
  textGlobalCaption1Lineheight,
  cornerCtrlSmRest,
  ctrlTabBackgroundVerticalHover,
  ctrlTabBackgroundVerticalActive,
} from '@edge-design/kumo-theme/tokens.js';

const template = html<VerticalTab>`
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
    padding-block: ${paddingContentXsmall};
    color: ${foregroundCtrlNeutralPrimaryRest};
    border-radius: ${cornerCtrlRest};
  }

  button:hover {
    background-color: ${ctrlTabBackgroundVerticalHover};
    color: ${foregroundCtrlNeutralPrimaryHover};
  }

  :host([active]) button {
    cursor: default;
    background-color: ${ctrlTabBackgroundVerticalActive};
  }

  :host([active]) button:hover {
    background-color: ${ctrlTabBackgroundVerticalActive};
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

  mai-spinner {
    --size: 16px;
  }
`;

@customElement({ name: 'vertical-tab', template, styles })
export class VerticalTab extends FASTElement {
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
