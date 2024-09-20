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
import { OmniboxControl } from '../controls/omnibox-control/index.js';
import '../controls/omnibox-control/index.js';
import '../controls/omnibox-suggestion.js';
import '../../windows/controls/mica-material.js';
import { TabService } from '#servicestabService.js';
import { inject } from '@microsoft/fast-element/di.js';
import {
  Suggestion,
  generateSuggestions,
} from '#servicesautoSuggestService.js';

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
  ${repeat(
    (x) => x.ts.tabs,
    html`
      <omnibox-control
        ?active="${(x) => x.active}"
        initialValue="${(x) => x.url}"
        @submit="${(x, c) =>
          c.parent.handleOmniboxSubmit(c.event as CustomEvent)}"
        @change="${(x, c) =>
          c.parent.handleOmniboxChange(c.event as CustomEvent)}"
      ></omnibox-control>
    `,
  )}
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
export class Toolbar extends FASTElement {
  @inject(TabService) ts!: TabService;
  @observable suggestions: Suggestion[] = [];
  omniboxControl?: OmniboxControl | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.omniboxControl = this.shadowRoot?.querySelector('omnibox-control');
    generateSuggestions('').then((res) => {
      this.suggestions = res.suggestions;
    });
  }

  suggestionsChanged() {
    if (this.omniboxControl && this.omniboxControl instanceof OmniboxControl) {
      this.omniboxControl.suggestions = this.suggestions;
    }
  }

  handleOmniboxSubmit(e: CustomEvent) {
    this.ts.navigate(e.detail);
  }

  handleOmniboxChange(e: CustomEvent) {
    generateSuggestions(e.detail).then((res) => {
      this.suggestions = res.suggestions;
    });
  }
}
