import {
  customElement,
  FASTElement,
  html,
  css,
  observable,
  repeat,
  when,
} from '@microsoft/fast-element';
import { spacingHorizontalS, spacingHorizontalXS } from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';
import { OmniboxControl } from '../controls/omnibox-control/index.js';
import '../controls/omnibox-control/index.js';
import '../controls/omnibox-suggestion.js';
import '../controls/toolbar-item.js';
import { TabService } from '#servicestabService.js';
import { inject } from '@microsoft/fast-element/di.js';
import {
  Suggestion,
  generateSuggestions,
} from '#servicesautoSuggestService.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import EdgeSettingsSerivce from '#servicessettingsService.js';
import { spacingFrame } from '../designSystem.js';

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
    ${repeat(
      (x) => x.ews.toolbarItems.filter((i) => i.pinned || i.open),
      html`<toolbar-item
        id="${(x) => x.id}"
        ?pinned="${(x) => x.pinned}"
        initially-open="${(x) => x.open}"
        @opentoolbaritem="${(x, c) => c.parent.ews.openToolbarItem(x.id)}"
        @closetoolbaritem="${(x, c) => c.parent.ews.closeToolbarItem(x.id)}"
        @pintoolbaritem="${(x, c) => c.parent.ews.pinToolbarItem(x.id)}"
        @unpintoolbaritem="${(x, c) => c.parent.ews.unpinToolbarItem(x.id)}"
      ></toolbar-item>`,
    )}
    ${when(
      (x) => x.showLegacyCopliot,
      html`
        <phx-toggle-button
          appearance="subtle"
          icon-only
          @click="${(x) => x.handleShowLegacyCopilot()}"
          ?pressed="${(x) => x.ews.sidepaneAppId === 'copilot'}"
        >
          <img id="copilot" src="img/edge/copilot-icon.svg" />
        </phx-toggle-button>
      `,
    )}
  </div>
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    gap: ${spacingHorizontalS};
    padding: ${spacingFrame} ${spacingHorizontalXS};
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
  @inject(EdgeSettingsSerivce) ess!: EdgeSettingsSerivce;
  @observable suggestions: Suggestion[] = [];
  @observable showLegacyCopliot = false;
  omniboxControl?: OmniboxControl | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.omniboxControl = this.shadowRoot?.querySelector('omnibox-control');
    generateSuggestions('').then((res) => {
      this.suggestions = res.suggestions;
    });

    // Get the showLegacyCopilot flag from URL
    const url = new URL(window.location.href);
    this.showLegacyCopliot =
      url.searchParams.get('showLegacyCopilot') === 'true';
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

  handleShowLegacyCopilot() {
    this.ews.sidepaneAppId =
      this.ews.sidepaneAppId === 'copilot' ? null : 'copilot';
  }
}
