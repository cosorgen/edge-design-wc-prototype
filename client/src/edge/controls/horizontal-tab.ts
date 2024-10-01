import {
  attr,
  css,
  customElement,
  FASTElement,
  html,
  when,
} from '@microsoft/fast-element';
import {
  borderRadiusLarge,
  colorLayerBackgroundDialog,
  colorNeutralForeground1,
  colorNeutralShadowAmbient,
  colorNeutralShadowKey,
  colorSubtleBackgroundHover,
  fontFamilyBase,
  fontSizeBase200,
  fontWeightRegular,
  lineHeightBase200,
  shadow2BaseBlur,
  shadow2BaseY,
  shadow2DiffuseBlur,
  shadow2DiffuseY,
  shadowBaseX,
  shadowDiffuseX,
  spacingHorizontalS,
  spacingHorizontalSNudge,
  spacingVerticalXXS,
} from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';
import '@phoenixui/web-components/spinner.js';
import '../../windows/controls/mica-material.js';

const template = html<HorizontalTab>`
  <div class="tab-background" id="bg"></div>
  <div class="tab-background" id="left-wing"></div>
  <div class="tab-background" id="right-wing"></div>
  <button @mousedown="${(x, c) => x.handleClick(c.event as MouseEvent)}">
    <div id="favicon" part="favicon">
      ${when(
        (x) => x.loading,
        html`<phx-spinner size="tiny"></phx-spinner>`,
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
  <phx-button
    size="small"
    appearance="subtle"
    icon-only
    @click="${(x, c) => x.close(c.event)}"
  >
    <svg>
      <use href="img/edge/icons.svg#dismiss-16-regular"></use>
    </svg>
  </phx-button>
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
        ${shadowBaseX} ${shadow2BaseY} ${shadow2BaseBlur}
          ${colorNeutralShadowAmbient}
      )
      drop-shadow(
        ${shadowDiffuseX} ${shadow2DiffuseY} ${shadow2DiffuseBlur}
          ${colorNeutralShadowKey}
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
    gap: ${spacingHorizontalS};
    padding-inline-start: ${spacingHorizontalS};
    padding-inline-end: calc(${spacingHorizontalS} + /*16px*/ 0px);
    padding-block: ${spacingHorizontalSNudge};
    color: ${colorNeutralForeground1};
    border-radius: ${borderRadiusLarge};
  }

  button:hover {
    background-color: ${colorSubtleBackgroundHover};
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
    margin-block-end: ${spacingVerticalXXS};
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
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase200};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase200};
    text-align: start;
    white-space: nowrap;
    overflow: hidden;
  }

  #favicon,
  [name='favicon']::slotted(*) {
    width: 16px;
    height: 16px;
  }

  phx-button {
    position: absolute;
    inset-inline-end: ${spacingHorizontalS};
    inset-block: ${spacingHorizontalS};
  }

  phx-button svg,
  phx-button {
    width: 16px;
    height: 16px;
    min-width: 16px;
    min-height: 16px;
    padding: 0;
  }

  .tab-background {
    background-color: ${colorLayerBackgroundDialog};
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
    bottom: -4px;
    border-radius: ${borderRadiusLarge} ${borderRadiusLarge} 0 0;
  }

  #left-wing,
  #right-wing {
    width: 10px;
    height: 10px;
    bottom: -4px;
    clip-path: path('M0 10h10V0A10 10 0 0 1 0 10Z');
  }

  #left-wing {
    left: -10px;
  }

  #right-wing {
    right: -10px;
    transform: rotate(90deg);
  }

  phx-spinner {
    --size: 16px;
  }
`;

@customElement({
  name: 'horizontal-tab',
  template,
  styles,
})
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
