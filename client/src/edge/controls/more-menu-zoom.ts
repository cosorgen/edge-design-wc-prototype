import {
  foregroundCtrlNeutralPrimaryRest,
  gapBetweenContentXxxSmall,
  paddingCtrlHorizontalDefault,
  textGlobalBody3FontSize,
  textGlobalBody3LineHeight,
  textStyleDefaultRegularFontFamily,
  textStyleDefaultRegularWeight,
} from '@phoenixui/themes/smtc-tokens.js';
import { FASTElement, customElement, css, html } from '@microsoft/fast-element';

const template = html<MoreMenuZoom>`
  <div part="label">Zoom</div>
  <mai-button appearance="subtle" size="small" icon-only>
    <svg>
      <use href="img/edge/icons.svg#subtract-16-regular" />
    </svg>
  </mai-button>
  <div id="value">100%</div>
  <mai-button appearance="subtle" size="small" icon-only>
    <svg>
      <use href="img/edge/icons.svg#add-16-regular" />
    </svg>
  </mai-button>
  <mai-button appearance="subtle" size="small" icon-only>
    <svg>
      <use href="img/edge/icons.svg#arrow-maximize-16-regular" />
    </svg>
  </mai-button>
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${gapBetweenContentXxxSmall};
    padding-inline-start: ${paddingCtrlHorizontalDefault};

    font-family: ${textStyleDefaultRegularFontFamily};
    font-size: ${textGlobalBody3FontSize};
    line-height: ${textGlobalBody3LineHeight};
    font-weight: ${textStyleDefaultRegularWeight};
    color: ${foregroundCtrlNeutralPrimaryRest};
  }

  [part='label'] {
    flex: 1;
  }
`;

@customElement({ name: 'more-menu-zoom', template, styles })
export default class MoreMenuZoom extends FASTElement {}
