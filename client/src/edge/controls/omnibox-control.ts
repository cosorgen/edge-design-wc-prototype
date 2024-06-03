import { css, customElement, FASTElement, html } from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  colorBrandStroke1,
  colorNeutralBackground1,
  colorNeutralForegroundHint,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  spacingHorizontalXS,
  spacingVerticalXS,
  spacingVerticalXXS,
  strokeWidthThick,
} from '@phoenixui/themes';
import './omnibox-status.js';
import '@phoenixui/web-components/button.js';

const template = html<OmniboxControl>`
  <div part="container">
    <omnibox-status icon-only>
      <svg>
        <use href="img/edge/icons.svg#search-20-regular" />
      </svg>
    </omnibox-status>
    <div
      part="input"
      contenteditable
      autocapitalize="off"
      autocorrect="off"
      spellcheck="false"
      placeholder="Search or enter web address"
    ></div>
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
  }

  [part='container'] {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${spacingVerticalXS} ${spacingHorizontalXS};
    gap: ${spacingHorizontalXS};
    background-color: ${colorNeutralBackground1};
    border-radius: ${borderRadiusCircular};
  }

  [part='container']:has([part='input']:focus-visible) {
    outline: ${strokeWidthThick} solid ${colorBrandStroke1};
    padding: ${spacingVerticalXXS} ${spacingHorizontalXS};
    margin-block: ${spacingVerticalXXS};
  }

  [part='input'] {
    flex: 1;
    /* body1 */
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    font-weight: ${fontWeightRegular};
    cursor: text;
    outline: none;

    &:empty::before {
      content: attr(placeholder);
      color: ${colorNeutralForegroundHint};
    }
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
