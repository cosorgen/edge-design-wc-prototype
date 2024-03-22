import { customElement, FASTElement, html, css } from '@microsoft/fast-element';
import {
  spacingHorizontalXS,
  spacingVerticalXXS,
  spacingHorizontalS,
  tabBarBackgroundBlur,
} from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';
import '../controls/identityControl.js';

const template = html<TabBar>`
  <div class="group">
    <identity-control></identity-control>
  </div>
  <div class="group">
    <phx-button appearance="subtle" icon-only>
      <svg>
        <use href="img/edge/icons.svg#layer-diagonal-20-regular"></use>
      </svg>
    </phx-button>
    <phx-button appearance="subtle" icon-only>
      <svg>
        <use href="img/edge/icons.svg#tab-position-horizontal-20-regular"></use>
      </svg>
    </phx-button>
  </div>
`;

const styles = css`
  :host {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: ${spacingHorizontalS};
    height: 40px;
    padding-inline: ${spacingHorizontalXS};
    padding-block-end: ${spacingVerticalXXS};

    /* Tab bar material */
    backdrop-filter: blur(calc(${tabBarBackgroundBlur} / 2));
  }

  .group {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalXS};
  }
`;

@customElement({
  name: 'tab-bar',
  template,
  styles,
})
export class TabBar extends FASTElement {
  connectedCallback() {
    super.connectedCallback();
  }
}
