import {
  foregroundCtrlNeutralPrimaryRest,
  gapBetweenContentXxxsmall,
  paddingCtrlHorizontalDefault,
  textGlobalBody3Fontsize,
  textGlobalBody3Lineheight,
  textStyleDefaultRegularFontFamily,
  textStyleDefaultRegularWeight,
} from '@edge-design/kumo-theme/tokens.js';
import { FASTElement, customElement, css, html } from '@microsoft/fast-element';

const template = html<MoreMenuZoom>`
  <div part="label">Zoom</div>
  <mai-button appearance="subtle" size="small" icon-only>
    <svg>
      <use href="img/edge/icons.svg#subtract-20-regular" />
    </svg>
  </mai-button>
  <div id="value">100%</div>
  <mai-button appearance="subtle" size="small" icon-only>
    <svg>
      <use href="img/edge/icons.svg#add-20-regular" />
    </svg>
  </mai-button>
  <mai-button appearance="subtle" size="small" icon-only>
    <svg>
      <use href="img/edge/icons.svg#arrow-maximize-20-regular" />
    </svg>
  </mai-button>
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${gapBetweenContentXxxsmall};
    padding-inline-start: ${paddingCtrlHorizontalDefault};

    font-family: ${textStyleDefaultRegularFontFamily};
    font-size: ${textGlobalBody3Fontsize};
    line-height: ${textGlobalBody3Lineheight};
    font-weight: ${textStyleDefaultRegularWeight};
    color: ${foregroundCtrlNeutralPrimaryRest};
  }

  phx-divider {
    height: 32px !important;
    min-height: 32px !important;
    width: 1px;
    margin: 0 ${spacingHorizontalXXS};
  }

  [part='label'] {
    flex: 1;
    margin-left: 26px;
  }
`;

@customElement({ name: 'more-menu-zoom', template, styles })
export default class MoreMenuZoom extends FASTElement {}
