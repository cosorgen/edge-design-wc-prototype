import { css, customElement, FASTElement, html } from '@microsoft/fast-element';
import {
  borderRadiusLarge,
  colorNeutralForeground1,
  colorSubtleBackgroundHover,
  fontFamilyBase,
  fontSizeBase200,
  fontWeightRegular,
  lineHeightBase200,
  spacingHorizontalS,
  spacingHorizontalSNudge,
} from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';

const template = html<HorizontalTab>`
  <button @click="${(x, c) => x.activate(c.event)}">
    <div id="favicon" part="favicon">
      <slot name="favicon">
        <svg width="16" height="16">
          <use href="img/edge/icons.svg#tab-desktop-new-page-16-regular"></use>
        </svg>
      </slot>
    </div>
    <div id="title" part="title">
      <slot>New tab</slot>
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
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalS};
    padding-inline: ${spacingHorizontalS};
    padding-block: ${spacingHorizontalSNudge};
    width: 260px;
    min-width: 16px;
    height: 32px;
    color: ${colorNeutralForeground1};
    border-radius: ${borderRadiusLarge};
  }

  button:hover {
    background-color: ${colorSubtleBackgroundHover};
  }

  :host([active]) button {
    background-color: ${colorSubtleBackgroundHover};
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
