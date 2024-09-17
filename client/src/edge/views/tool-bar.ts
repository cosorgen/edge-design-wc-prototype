import {
  customElement,
  FASTElement,
  html,
  css,
  repeat,
  observable,
} from '@microsoft/fast-element';
import { spacingHorizontalS, spacingHorizontalXS } from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';
import '../controls/omnibox-control.js';
import '../controls/omnibox-input.js';
import '../controls/omnibox-dropdown.js';
import '../../windows/controls/mica-material.js';
import { TabService } from '#servicestabService.js';
import { inject } from '@microsoft/fast-element/di.js';

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
  <div id="omnibox">
    ${repeat(
      (x) => x.ts.tabs,
      html`
        <omnibox-control
          ?active="${(x, c) => x.active && !c.parent.dropdownActive}"
        >
          <omnibox-input
            initialValue="${(x, c) => c.parent.omniboxValue}"
            @submit="${(x, c) =>
              c.parent.handleOmniboxSubmit(c.event as CustomEvent)}"
            @change="${(x, c) =>
              c.parent.handleOmniboxChange(c.event as CustomEvent)}"
            @click="${(x, c) => c.parent.handleOmniBoxClick()}"
          ></omnibox-input>
        </omnibox-control>
      `,
    )}
    <omnibox-dropdown ?active="${(x) => x.dropdownActive}">
      <omnibox-input
        slot="input"
        initialValue="${(x) => x.omniboxValue}"
        @submit="${(x, c) => x.handleOmniboxSubmit(c.event as CustomEvent)}"
        @change="${(x, c) => x.handleOmniboxChange(c.event as CustomEvent)}"
      ></omnibox-input>
      ${repeat(
        (x) => x.ts.suggestions,
        html` <omnibox-suggestion></omnibox-suggestion> `,
      )}
    </omnibox-dropdown>
  </div>
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

  #omnibox {
    flex: 1;
    position: relative;
  }
`;

@customElement({
  name: 'tool-bar',
  template,
  styles,
})
export class Toolbar extends FASTElement {
  @inject(TabService) ts!: TabService;
  @observable dropdownActive = false;
  @observable omniboxValue = '';

  handleOmniboxSubmit(e: CustomEvent) {
    // TODO: make sure e.detail is a valid URL
    this.ts.navigate(e.detail);
  }

  handleOmniboxChange(e: CustomEvent) {
    if (e.detail === this.omniboxValue) {
      return;
    }

    this.omniboxValue = e.detail;

    this.ts.generateSuggestions(e.detail);
    if (!this.dropdownActive) {
      this.dropdownActive = true;
    }
  }

  handleOmniBoxClick() {
    this.dropdownActive = true;
  }
}
