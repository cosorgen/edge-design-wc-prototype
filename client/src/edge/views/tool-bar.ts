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
import { spacingHorizontalS, spacingHorizontalXS } from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';
import { OmniboxControl } from '../controls/omnibox-control/index.js';
import '../controls/omnibox-control/index.js';
import '../controls/omnibox-suggestion.js';
import '../controls/toolbar-flyout-item.js';
import '../controls/toolbar-sidepane-item.js';
import '../controls/omnibox-action-flyout.js';
import '../controls/context-menu.js';
import '../controls/menu-item.js';
import { TabService } from '#servicestabService.js';
import { inject } from '@microsoft/fast-element/di.js';
import {
  Suggestion,
  generateSuggestions,
} from '#servicesautoSuggestService.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import EdgeSettingsSerivce from '#servicessettingsService.js';
import { spacingFrame } from '../designSystem.js';
import apps from '../installedApps.js';
import omniboxActions, { overflowItems } from '../omniboxActions.js';
import FavoritesService from '#servicesfavoritesService.js';

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
    ?truncate-url="${(x) => x.ess.truncateURL}"
    initialValue="${(x) => x.ts.getActiveTab()?.url}"
    @submit="${(x, c) => x.handleOmniboxSubmit(c.event as CustomEvent)}"
    @change="${(x, c) => x.handleOmniboxChange(c.event as CustomEvent)}"
    @blur="${(x, c) =>
      x.handleOmniboxChange({
        ...c.event,
        detail: ' ',
      } as CustomEvent)}"
  >
    ${when(
      (x) => x.ts.getActiveTab()?.actionIds?.top,
      (x) => omniboxActions[x.ts.getActiveTab()!.actionIds!.top!],
    )}
    ${when(
      (x) => x.ts.getActiveTab()?.actionIds?.overflow,
      html`
        <omnibox-action-flyout id="more" slot="actions">
          <svg slot="trigger-content">
            <use href="img/edge/icons.svg#more-circle-20-regular" />
          </svg>
          <context-menu>
            ${repeat(
              (x) => x.ts.getActiveTab()!.actionIds!.overflow!,
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
      html`${when(
        (x) => apps[x].type === 'sidepane',
        html`<toolbar-sidepane-item
          id="${(x) => x}"
          ?pinned="${(x, c) => c.parent.ess.pinnedToolbarItems.includes(x)}"
          ?pressed="${(x, c) => x === c.parent.ews.activeSidepaneAppId}"
          @togglesidepane="${(x, c) => c.parent.toggleSidepane(x, c.event)}"
          @togglepintoolbaritem="${(x, c) =>
            c.parent.togglePinToolbarItem(x, c.event)}"
        ></toolbar-sidepane-item>`,
        html`<toolbar-flyout-item
          id="${(x) => x}"
          ?pinned="${(x, c) => c.parent.ess.pinnedToolbarItems.includes(x)}"
          ?initially-open="${(x, c) => x === c.parent.ews.activeToolbarItemId}"
          @toggleflyout="${(x, c) => c.parent.toggleFlyout(x, c.event)}"
          @togglepintoolbaritem="${(x, c) =>
            c.parent.togglePinToolbarItem(x, c.event)}"
        ></toolbar-flyout-item>`,
      )}`,
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
    z-index: 1; /* for omnibox to be over web content */
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

    // Look for missing active sidepane items
    if (
      this.ews.activeSidepaneAppId &&
      !this._derivedToolbarItems.includes(this.ews.activeSidepaneAppId)
    ) {
      this._derivedToolbarItems.unshift(this.ews.activeSidepaneAppId); // Add temp to the end
    }

    //remove items that are not pinned or active
    this._derivedToolbarItems = this._derivedToolbarItems.filter((id) => {
      return (
        this.ess.pinnedToolbarItems.includes(id) ||
        id === this.ews.activeToolbarItemId ||
        id === this.ews.activeSidepaneAppId
      );
    });

    // Remove copilot if it's disabled
    if (!this.ess.showLegacyCopilot)
      this._derivedToolbarItems = this._derivedToolbarItems.filter(
        (id) => id !== 'Copilot',
      );

    return this._derivedToolbarItems;
  }

  suggestionsChanged() {
    if (this.omniboxControl && this.omniboxControl instanceof OmniboxControl) {
      this.omniboxControl.suggestions = this.suggestions;
    }
  }

  handleOmniboxSubmit(e: CustomEvent) {
    const id = this.ts.getActiveTab()?.id;
    if (!id) return;
    this.ts.navigateTabById(id, e.detail);
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

  toggleSidepane(id: string, event: Event) {
    if (!(event instanceof CustomEvent)) return;
    event.detail ? this.ews.openSidepaneApp(id) : this.ews.closeSidepaneApp();
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
    const activeTab = this.ts.getActiveTab();

    if (activeTab && activeTab.url) {
      return this.fs.isFavorite(activeTab.url);
    }

    return false;
  }

  handleContextMenu = (e: Event) => {
    e.preventDefault();
    return false;
  };
}
