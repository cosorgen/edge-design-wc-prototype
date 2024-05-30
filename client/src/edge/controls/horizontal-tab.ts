import { css, customElement, FASTElement, html } from '@microsoft/fast-element';
import {
  borderRadiusLarge,
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
} from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';
import '../../windows/controls/mica-material.js';

const template = html<HorizontalTab>`
  <mica-material id="bg"></mica-material>
  <mica-material id="left-wing"></mica-material>
  <mica-material id="right-wing"></mica-material>
  <button @click="${(x, c) => x.activate(c.event)}">
    <div id="favicon" part="favicon">
      <slot name="favicon">
        <svg width="16" height="16">
          <use href="img/edge/icons.svg#tab-desktop-new-page-16-regular"></use>
        </svg>
      </slot>
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
    padding-inline: ${spacingHorizontalS};
    padding-block: ${spacingHorizontalSNudge};
    color: ${colorNeutralForeground1};
    border-radius: ${borderRadiusLarge};
  }

  button:hover {
    background-color: ${colorSubtleBackgroundHover};
  }

  :host([active]) button:hover {
    background-color: transparent;
  }

  :host([active]) #bg,
  :host([active]) #left-wing,
  :host([active]) #right-wing {
    visibility: visible;
  }

  #title,
  [name='title']::slotted(*) {
    display: flex;
    flex-direction: column;

    /* Caption1 */
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase200};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase200};
  }

  #favicon,
  [name='favicon']::slotted(*) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    overflow: hidden;
  }

  phx-button {
    position: absolute;
    inset-inline-end: ${spacingHorizontalS};
    inset-block: ${spacingHorizontalS};
  }

  phx-button svg,
  phx-button::part(control) {
    width: 16px;
    height: 16px;
    min-width: 16px;
    min-height: 16px;
    padding: 0;
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
    bottom: -2px;
    border-radius: ${borderRadiusLarge} ${borderRadiusLarge} 0 0;
  }

  #left-wing,
  #right-wing {
    width: 10px;
    height: 10px;
    bottom: -2px;
    clip-path: path('M0 10h10V0A10 10 0 0 1 0 10Z');
  }

  #left-wing {
    left: -10px;
  }

  #right-wing {
    right: -10px;
    transform: rotate(90deg);
  }
`;

@customElement({
  name: 'horizontal-tab',
  template,
  styles,
})
export class HorizontalTab extends FASTElement {
  activate(e: Event) {
    e.stopPropagation();
    this.$emit('activate');
  }

  close(e: Event) {
    e.stopPropagation();
    this.$emit('close');
  }
}
