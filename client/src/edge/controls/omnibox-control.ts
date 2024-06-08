import { css, customElement, FASTElement, html } from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  colorBrandStroke1,
  colorNeutralBackground1,
  colorNeutralForegroundHint,
  colorNeutralStroke1,
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
  <div part="container">
    <omnibox-status icon-only>
      <svg>
        <use href="img/edge/icons.svg#search-20-regular" />
      </svg>
    </omnibox-status>
    <omnibox-input></omnibox-input>
    <div id="actions">
      <phx-button size="small" appearance="subtle" shape="circular" icon-only>
        <svg>
          <use href="img/edge/icons.svg#star-add-20-regular" />
        </svg>
      </phx-button>
    </div>
  </div>
`;
const styles = css`
  :host {
    flex: 1;
    overflow: hidden;
    --stroke-diff: calc(${strokeWidthThick} - ${strokeWidthThin});
  }

  [part='container'] {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: calc(${spacingVerticalXXS} + var(--stroke-diff))
      calc(${spacingHorizontalXXS} + var(--stroke-diff));
    gap: ${spacingHorizontalXS};
    background-color: ${colorNeutralBackground1};
    border: ${strokeWidthThin} solid ${colorNeutralStroke1};
    border-radius: ${borderRadiusCircular};
  }

  [part='container']:has(omnibox-input:focus-within) {
    padding: ${spacingVerticalXXS} ${spacingHorizontalXXS};
    border: ${strokeWidthThick} solid ${colorBrandStroke1};
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
export class OmniboxControl extends FASTElement {}
