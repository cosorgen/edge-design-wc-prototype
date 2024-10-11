import {
  customElement,
  FASTElement,
  html,
  css,
  observable,
  repeat,
  volatile,
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
      (x) => x.derivedToolbarItems,
      html`<toolbar-item
        id="${(x) => x}"
        ?pinned="${(x, c) => c.parent.ess.pinnedToolbarItems.includes(x)}"
        ?initially-open="${(x, c) =>
          x === c.parent.ews.activeToolbarItemId ||
          x === c.parent.ews.activeSidepaneAppId}"
        @toggleflyout="${(x, c) => c.parent.toggleFlyout(x, c.event)}"
        @togglesidepane="${(x, c) => c.parent.toggleSidepane(x, c.event)}"
        @pintoolbaritem="${(x, c) => c.parent.ess.pinToolbarItem(x)}"
        @unpintoolbaritem="${(x, c) => c.parent.ess.unpinToolbarItem(x)}"
      ></toolbar-item>`,
      { positioning: true },
    )}
  </div>
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    gap: ${spacingHorizontalS};
    padding: ${spacingFrame};
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
  _derivedToolbarItems: string[] = [];
  omniboxControl?: OmniboxControl | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.omniboxControl = this.shadowRoot?.querySelector('omnibox-control');
    generateSuggestions('').then((res) => {
      this.suggestions = res.suggestions;
    });
  }

  @volatile
  get derivedToolbarItems() {
    this._derivedToolbarItems = [...this.ess.pinnedToolbarItems];
    if (
      this.ews.activeToolbarItemId &&
      !this._derivedToolbarItems.includes(this.ews.activeToolbarItemId)
    ) {
      this._derivedToolbarItems.unshift(this.ews.activeToolbarItemId);
    }

    return this._derivedToolbarItems;
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

  toggleFlyout(id: string, event: Event) {
    if (!(event instanceof CustomEvent)) return;

    const open = event.detail;
    open
      ? id !== this.ews.activeToolbarItemId && this.ews.openToolbarItem(id)
      : this.ews.closeToolbarItem();
  }

  toggleSidepane(id: string, event: Event) {
    id !== this.ews.activeSidepaneAppId
      ? this.ews.openSidepaneApp(id)
      : this.ews.closeSidepaneApp();

    this.toggleFlyout(id, event);
  }
}
