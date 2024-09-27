import { FASTElement, customElement, css, html } from '@microsoft/fast-element';
import {
  colorNeutralForeground1,
  spacingHorizontalS,
  spacingHorizontalXXS,
  typographyStyles,
} from '@phoenixui/themes';

const template = html<MoreMenuZoom>`
  <div part="label">Zoom</div>
  <phx-button appearance="subtle" size="small" icon-only>
    <svg>
      <use href="img/edge/icons.svg#subtract-16-regular" />
    </svg>
  </phx-button>
  <div id="value">100%</div>
  <phx-button appearance="subtle" size="small" icon-only>
    <svg>
      <use href="img/edge/icons.svg#add-16-regular" />
    </svg>
  </phx-button>
  <phx-button appearance="subtle" size="small" icon-only>
    <svg>
      <use href="img/edge/icons.svg#arrow-maximize-16-regular" />
    </svg>
  </phx-button>
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalXXS};
    padding-inline-start: ${spacingHorizontalS};

    font-family: ${typographyStyles.body1.fontFamily};
    font-size: ${typographyStyles.body1.fontSize};
    line-height: ${typographyStyles.body1.lineHeight};
    font-weight: ${typographyStyles.body1.fontWeight};
    color: ${colorNeutralForeground1};
  }

  [part='label'] {
    flex: 1;
  }
`;

@customElement({
  name: 'more-menu-zoom',
  template,
  styles,
})
export default class MoreMenuZoom extends FASTElement {}
