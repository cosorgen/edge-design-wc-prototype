import { customElement, FASTElement, html, css } from '@microsoft/fast-element';
import { spacingHorizontalS, spacingHorizontalXS } from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';
import '../controls/omnibox-control.js';
import '../../windows/controls/mica-material.js';

const template = html<Toolbar>`
  <div class="group">
    <phx-button appearance="subtle" icon-only disabled>
      <svg>
        <use href="img/edge/icons.svg#back-20-regular" />
      </svg>
    </phx-button>
    <phx-button appearance="subtle" icon-only>
      <svg>
        <use href="img/edge/icons.svg#arrow-clockwise-20-regular" />
      </svg>
    </phx-button>
  </div>
  <omnibox-control></omnibox-control>
  <div class="group">
    <phx-button appearance="subtle" icon-only>
      <svg>
        <use href="img/edge/icons.svg#star-list-horizontal-20-regular" />
      </svg>
    </phx-button>
    <phx-button appearance="subtle" icon-only>
      <svg>
        <use href="img/edge/icons.svg#more-horizontal-20-regular" />
      </svg>
    </phx-button>
    <phx-button id="copilot" appearance="subtle" icon-only>
      <img src="img/edge/copilot-icon.svg" />
    </phx-button>
  </div>
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    gap: ${spacingHorizontalS};
    user-select: none;
  }

  .group {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalXS};
  }

  #copilot::part(content) {
    width: 24px;
    height: 24px;
  }
`;

@customElement({
  name: 'tool-bar',
  template,
  styles,
})
export class Toolbar extends FASTElement {}
