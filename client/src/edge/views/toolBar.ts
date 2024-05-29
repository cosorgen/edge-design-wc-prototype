import {
  customElement,
  FASTElement,
  html,
  css,
  // repeat,
} from '@microsoft/fast-element';
// import { inject } from '@microsoft/fast-element/di.js';
import {
  spacingHorizontalXS,
  spacingVerticalXXS,
  spacingHorizontalS,
  spacingVerticalSNudge,
  shadow2,
  spacingHorizontalXXS,
  // spacingHorizontalSNudge,
} from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';
import '../controls/address-bar.js';
import '../../windows/controls/mica-material.js';

const template = html<Toolbar>`
  <mica-material appearance="toolbar"></mica-material>
  <div id="content">
    <div class="group">
      <phx-button size="medium" appearance="subtle" icon-only>
        <svg>
          <use href="img/edge/icons.svg#back-20-regular"></use>
        </svg>
      </phx-button>
      <phx-button size="medium" appearance="subtle" icon-only>
        <svg>
          <use href="img/edge/icons.svg#arrow-clockwise-20-regular"></use>
        </svg>
      </phx-button>
    </div>
    <address-bar></address-bar>
    <div class="group">
      <phx-button size="medium" appearance="subtle" icon-only>
        <svg>
          <use href="img/edge/icons.svg#star-list-horizontal-20-regular"></use>
        </svg>
      </phx-button>
      <phx-button size="medium" appearance="subtle" icon-only>
        <svg>
          <use href="img/edge/icons.svg#more-horizontal-20-regular"></use>
        </svg>
      </phx-button>
      <phx-button size="medium" appearance="subtle" icon-only>
        <img src="img/edge/copilot-icon.svg" />
      </phx-button>
    </div>
  </div>
`;

const styles = css`
  :host {
    position: relative;
    display: block;
    overflow: hidden;
  }

  #content {
    display: flex;
    flex-direction: row;
    position: relative;
    box-sizing: border-box;
    justify-content: flex-start;
    align-items: center;
    gap: ${spacingHorizontalS};
    padding-inline: ${spacingHorizontalXS};
    padding-block-start: ${spacingVerticalSNudge};
    padding-block-end: ${spacingVerticalXXS};
  }

  .group {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalXS};
  }

  #shadow {
    position: absolute;
    inset-inline: 0;
    bottom: -2px;
    height: 2px;
    box-shadow: ${shadow2};
  }

  #tabs {
    display: flex;
    flex-direction: row;
    gap: ${spacingHorizontalXXS};
  }
`;

@customElement({
  name: 'tool-bar',
  template,
  styles,
})
export class Toolbar extends FASTElement {
  connectedCallback() {
    super.connectedCallback();
    this.positionMicaLayers();
  }

  positionMicaLayers() {
    const imgEl = this.shadowRoot!.querySelector(
      'mica-material',
    ) as HTMLElement;
    const { top, left } = imgEl.getBoundingClientRect();
    imgEl.style.top = `-${top}px`;
    imgEl.style.left = `-${left}px`;
  }
}
