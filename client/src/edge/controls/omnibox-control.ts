import {
  attr,
  css,
  customElement,
  FASTElement,
  html,
  observable,
} from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  borderRadiusLayerDialog,
  colorBrandStroke1,
  colorNeutralBackground1,
  colorNeutralForegroundHint,
  colorNeutralStroke1,
  shadow28,
  spacingHorizontalXS,
  spacingHorizontalXXS,
  spacingVerticalXXS,
  strokeWidthThick,
  strokeWidthThin,
} from '@phoenixui/themes';
import './omnibox-status.js';
import './omnibox-input.js';
import '@phoenixui/web-components/button.js';

const template = html<OmniboxControl>`
  <div part="container" ?expanded="${(x) => x.expanded}">
    <div id="top-row">
      <omnibox-status icon-only>
        <svg>
          <use href="img/edge/icons.svg#search-20-regular" />
        </svg>
      </omnibox-status>
      <omnibox-input
        @click="${(x) => (x.expanded = true)}"
        @blur="${(x) => (x.expanded = false)}"
      ></omnibox-input>
      <div id="actions">
        <phx-button size="small" appearance="subtle" shape="circular" icon-only>
          <svg>
            <use href="img/edge/icons.svg#star-add-20-regular" />
          </svg>
        </phx-button>
      </div>
    </div>
    <slot name="suggestions"></slot>
  </div>
`;
const styles = css`
  :host {
    flex: 1;
    position: relative;
    display: none;
    height: 32px;
    --stroke-diff: calc(${strokeWidthThick} - ${strokeWidthThin});
  }

  :host([active]) {
    display: block;
  }

  [part='container'] {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: ${colorNeutralBackground1};
    border: ${strokeWidthThin} solid ${colorNeutralStroke1};
    border-radius: ${borderRadiusCircular};
    padding: calc(${spacingVerticalXXS} + var(--stroke-diff))
      calc(${spacingHorizontalXXS} + var(--stroke-diff));
  }

  [part='container']:has(omnibox-input:focus-within) {
    padding: ${spacingVerticalXXS} ${spacingHorizontalXXS};
    border: ${strokeWidthThick} solid ${colorBrandStroke1};
  }

  [part='container'][expanded] {
    border-radius: ${borderRadiusLayerDialog};
    box-shadow: ${shadow28};
  }

  #top-row {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalXS};
  }

  slot[name='suggestions']::slotted(*) {
    display: none;
    flex-direction: column;
  }

  [expanded] slot[name='suggestions']::slotted(*) {
    display: flex;
  }

  #actions {
    display: flex;
    flex-direction: row;

    phx-button::part(content) {
      color: ${colorNeutralForegroundHint};
    }
  }
`;

@customElement({ name: 'omnibox-control', template, styles })
export class OmniboxControl extends FASTElement {
  @attr({ mode: 'boolean' }) active = false;
  @observable expanded = false;
}
