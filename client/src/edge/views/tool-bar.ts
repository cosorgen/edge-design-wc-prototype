import {
  customElement,
  FASTElement,
  html,
  css,
  observable,
  repeat,
  volatile,
  when,
} from '@microsoft/fast-element';
import '@phoenixui/web-components/button.js';
import { OmniboxControl } from '../controls/omnibox-control/index.js';
import '../controls/omnibox-control/index.js';
import '../controls/omnibox-suggestion.js';
import '../controls/toolbar-flyout-item.js';
import '../controls/omnibox-action-flyout.js';
import '../controls/context-menu.js';
import '../controls/menu-item.js';
import '../controls/identity-control.js';
import '../controls/identity-flyout.js';
import './more-menu.js';
import { TabService } from '#servicestabService.js';
import { inject } from '@microsoft/fast-element/di.js';
import {
  Suggestion,
  generateSuggestions,
} from '#servicesautoSuggestService.js';
import WindowsService from '#serviceswindowsService.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import EdgeSettingsService from '#servicessettingsService.js';
import FavoritesService from '#servicesfavoritesService.js';
import omniboxActions, { overflowItems } from '../omniboxActions.js';
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
    initialValue="${(x) => x.ts.tabsById[x.ts.activeTabId!].url}"
    @submit="${(x, c) => x.handleOmniboxSubmit(c.event as CustomEvent)}"
    @change="${(x, c) => x.handleOmniboxChange(c.event as CustomEvent)}"
    @blur="${(x, c) =>
      x.handleOmniboxChange({
        ...c.event,
        detail: ' ',
      } as CustomEvent)}"
  >
    ${when(
      (x) => x.ts.tabsById[x.ts.activeTabId || 0].actionIds?.top,
      (x) =>
        omniboxActions[x.ts.tabsById[x.ts.activeTabId || 0].actionIds!.top!],
    )}
    ${when(
      (x) => x.ts.tabsById[x.ts.activeTabId || 0].actionIds?.overflow,
      html`
        <omnibox-action-flyout id="more" slot="actions">
          <svg slot="trigger-content">
            <use href="img/edge/icons.svg#more-circle-20-regular" />
          </svg>
          <context-menu>
            ${repeat(
              (x) => x.ts.tabsById[x.ts.activeTabId || 0].actionIds!.overflow!,
              html`
                <menu-item
                  start-slot
                  @click="${(x, c) => c.event.stopPropagation()}"
                >
                  <span slot="start">
                    <svg>
                      <use
                        href="img/edge/icons.svg#${(x) =>
                          overflowItems[x].iconId}"
                      />
                    </svg>
                  </span>
                  ${(x) => overflowItems[x].title}
                </menu-item>
              `,
            )}
          </context-menu>
        </omnibox-action-flyout>
      `,
    )}
  </omnibox-control>
  <div class="group right">
    ${repeat(
      (x) => x.derivedToolbarItems,
      html`<toolbar-flyout-item
        id="${(x) => x}"
        ?pinned="${(x, c) => c.parent.ess.pinnedToolbarItems.includes(x)}"
        ?initially-open="${(x, c) => x === c.parent.ews.activeToolbarItemId}"
        @toggleflyout="${(x, c) => c.parent.toggleFlyout(x, c.event)}"
        @togglepintoolbaritem="${(x, c) =>
          c.parent.togglePinToolbarItem(x, c.event)}"
      ></toolbar-flyout-item>`,
      { positioning: true },
    )}
    <flyout-menu>
      <phx-toggle-button
        size="medium"
        appearance="subtle"
        icon-only
        slot="trigger"
      >
        <svg>
          <use href="img/edge/icons.svg#more-horizontal-20-regular" />
        </svg>
      </phx-toggle-button>
      <more-menu managed></more-menu>
    </flyout-menu>

    <phx-toggle-button
      appearance="subtle"
      icon-only
      slot="trigger"
      @click="${(x) => x.toggleSidepane('Copilot')}"
      ?pressed="${(x) => x.ews.activeSidepaneAppId === 'Copilot'}"
    >
      <img width="20px" src="./img/edge/copilotAppLight.png" />
    </phx-toggle-button>
  </div>
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    gap: calc(${spacingFrame} * 2);
    user-select: none;
  }

  .group {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingFrame};
  }

  .right {
    justify-content: flex-end;
  }
`;

@customElement({
  name: 'tool-bar',
  template,
  styles,
})
export class Toolbar extends FASTElement {
  @inject(TabService) ts!: TabService;
  @inject(WindowsService) ws!: WindowsService;
  @inject(EdgeWindowService) ews!: EdgeWindowService;
  @inject(EdgeSettingsService) ess!: EdgeSettingsService;
  @inject(FavoritesService) fs!: FavoritesService;
  @observable suggestions: Suggestion[] = [];
  _derivedToolbarItems: string[] = [];
  omniboxControl?: OmniboxControl | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.omniboxControl = this.shadowRoot?.querySelector('omnibox-control');
    generateSuggestions('').then((res) => {
      this.suggestions = res.suggestions;
    });
    this.addEventListener('contextmenu', this.handleContextMenu);
  }

  @volatile
  get derivedToolbarItems() {
    // Look for missing pinned items
    this.ess.pinnedToolbarItems.forEach((id) => {
      if (!this._derivedToolbarItems.includes(id)) {
        this._derivedToolbarItems.push(id); // Add pinned to the beginning
      }
    });

    // Look for missing active items
    if (
      this.ews.activeToolbarItemId &&
      !this._derivedToolbarItems.includes(this.ews.activeToolbarItemId)
    ) {
      this._derivedToolbarItems.unshift(this.ews.activeToolbarItemId); // Add temp to the end
    }

    //remove items that are not pinned or active
    this._derivedToolbarItems = this._derivedToolbarItems.filter((id) => {
      return (
        this.ess.pinnedToolbarItems.includes(id) ||
        id === this.ews.activeToolbarItemId ||
        id === this.ews.activeSidepaneAppId
      );
    });

    return this._derivedToolbarItems;
  }

  suggestionsChanged() {
    if (this.omniboxControl && this.omniboxControl instanceof OmniboxControl) {
      this.omniboxControl.suggestions = this.suggestions;
    }
  }

  handleOmniboxSubmit(e: CustomEvent) {
    if (!this.ts.activeTabId) return;
    this.ts.navigateTab(this.ts.activeTabId, e.detail);
  }

  handleOmniboxChange(e: CustomEvent) {
    generateSuggestions(e.detail).then((res) => {
      this.suggestions = res.suggestions;
    });
  }

  toggleFlyout(id: string, event: Event) {
    if (!(event instanceof CustomEvent)) return;
    event.detail ? this.ews.openToolbarItem(id) : this.ews.closeToolbarItem();
  }

  toggleSidepane(id: string) {
    const isActive = this.ews.activeSidepaneAppId === id;
    if (isActive) {
      this.ews.closeSidepaneApp();
    } else {
      this.ews.openSidepaneApp(id);
    }
  }

  togglePinToolbarItem(id: string, event: Event) {
    if (!(event instanceof CustomEvent)) return;
    event.detail ? this.ess.pinToolbarItem(id) : this.ess.unpinToolbarItem(id);
  }

  handleOmniboxActionClick(id: string, e: Event) {
    e.stopPropagation();
    return false;
  }

  pageIsFavorite() {
    const activeTabId = this.ts.activeTabId;
    if (activeTabId) {
      const activeTab = this.ts.tabsById[activeTabId];
      if (activeTab && activeTab.url) {
        return this.fs.isFavorite(activeTab.url);
      }
    }
    return false;
  }

  handleContextMenu = (e: Event) => {
    e.preventDefault();
    return false;
  };
}
