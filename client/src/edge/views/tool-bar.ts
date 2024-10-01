import {
  customElement,
  FASTElement,
  html,
  css,
  observable,
  when,
} from '@microsoft/fast-element';
import { spacingHorizontalS, spacingHorizontalXS } from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';
import '@phoenixui/web-components/toggle-button.js';
import { OmniboxControl } from '../controls/omnibox-control/index.js';
import '../controls/omnibox-control/index.js';
import '../controls/omnibox-suggestion.js';
import '../controls/flyout-menu.js';
import '../controls/favorites-menu.js';
import '../controls/context-menu.js';
import '../controls/menu-item.js';
import { TabService } from '#servicestabService.js';
import { inject } from '@microsoft/fast-element/di.js';
import {
  Suggestion,
  generateSuggestions,
} from '#servicesautoSuggestService.js';
import EdgeWindowService from '#servicesedgeWindowService.js';

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
  <omnibox-control
    id="omnibox_${(x) => x.ts.getActiveTab()?.id}"
    ?active="${(x) => x.ts.getActiveTab()?.active}"
    initialValue="${(x) => x.ts.getActiveTab()?.url}"
    @submit="${(x, c) => x.handleOmniboxSubmit(c.event as CustomEvent)}"
    @change="${(x, c) => x.handleOmniboxChange(c.event as CustomEvent)}"
    @blur="${(x, c) =>
      x.handleOmniboxChange({
        ...c.event,
        detail: ' ',
      } as CustomEvent)}"
  ></omnibox-control>
  <div class="group right">
    ${when(
      (x) => x.ews.favoritesOpen,
      html` <flyout-menu
        @flyoutclose="${(x) => x.handleFavoriteStateChange(false)}"
        @flyoutopen="${(x) => x.handleFavoriteStateChange(true)}"
        @contextclose="${(x) => x.handleFavoriteStateChange(false)}"
        @contextopen="${(x) => x.handleFavoriteStateChange(true)}"
        initially-open
      >
        <phx-toggle-button appearance="subtle" icon-only slot="trigger">
          <svg>
            <use href="img/edge/icons.svg#star-20-regular" />
          </svg>
        </phx-toggle-button>
        <favorites-menu></favorites-menu>
        <context-menu slot="context">
          <menu-item @click="${() => console.log('Aways show')}">
            Always show favorites in toolbar
          </menu-item>
        </context-menu>
      </flyout-menu>`,
    )}
  </div>
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    gap: ${spacingHorizontalS};
    padding: 0 ${spacingHorizontalXS};
    user-select: none;
  }

  .group {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalXS};
  }

  .right {
    justify-content: flex-end;
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
  @inject(EdgeWindowService) ews!: EdgeWindowService;
  @observable suggestions: Suggestion[] = [];
  omniboxControl?: OmniboxControl | null = null;
  favTimer: NodeJS.Timeout | null = null;

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

  handleFavoriteStateChange(open: boolean) {
    clearTimeout(this.favTimer as NodeJS.Timeout);
    this.favTimer = setTimeout(() => {
      this.ews.toggleFavoritesOpen(open);
    }, 100); // Delay updating state to leave open if conditionally rendered and showing context menu
  }
}
