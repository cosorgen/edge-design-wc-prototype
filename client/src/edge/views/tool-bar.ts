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
import {
  spacingHorizontalS,
  spacingHorizontalXS,
  spacingFrame,
} from '@mai-ui/phoenix-theme';
import '@mai-ui/toggle-button/define.js';
import '@mai-ui/button/define.js';
import { OmniboxControl } from '../controls/omnibox-control/index.js';
import '../controls/omnibox-control/index.js';
import '../controls/omnibox-suggestion.js';
import '../controls/toolbar-flyout-item.js';
import '../controls/toolbar-sidepane-item.js';
import '../controls/omnibox-action-flyout.js';
import '../controls/context-menu.js';
import '../controls/menu-item.js';
import '../controls/identity-control.js';
import '../controls/identity-flyout.js';
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
import apps from '../installedApps.js';
import omniboxActions, { overflowItems } from '../omniboxActions.js';

const template = html<Toolbar>`
  <div class="group">
    <mai-button appearance="subtle" icon-only disabled>
      <svg>
        <use href="img/edge/icons.svg#back-20-regular" />
      </svg>
    </mai-button>
    <mai-button appearance="subtle" icon-only>
      <svg>
        <use href="img/edge/icons.svg#arrow-clockwise-20-regular" />
      </svg>
    </mai-button>
  </div>
  <omnibox-control
    ?full-width="${(x) => x.ess.fullWidthOmnibox}"
    ?truncate-url="${(x) => x.ess.truncateURL}"
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
      html`${when(
        (x) => apps[x].type === 'sidepane',
        html`<toolbar-sidepane-item
          id="${(x) => x}"
          ?pinned="${(x, c) => c.parent.ess.pinnedToolbarItems.includes(x)}"
          ?pressed="${(x, c) => x === c.parent.ews.activeSidepaneAppId}"
          @togglesidepane="${(x, c) => c.parent.toggleSidepane(x)}"
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
    ${when(
      (x) => x.ess.showMenusInL1,
      html`
        <flyout-menu>
          <identity-control
            appearance="signedIn"
            slot="trigger"
          ></identity-control>
          <identity-flyout></identity-flyout>
        </flyout-menu>
        <flyout-menu>
          <mai-toggle-button
            size="medium"
            appearance="subtle"
            icon-only
            slot="trigger"
          >
            <svg>
              <use href="img/edge/icons.svg#more-horizontal-20-regular" />
            </svg>
          </mai-toggle-button>
          <more-menu
            managed
            @moreaction="${(x, c) =>
              x.handleMoreAction(c.event as CustomEvent)}"
          ></more-menu>
        </flyout-menu>
        ${when(
          (x) => x.ess.showLegacyCopilot,
          html`
            <mai-toggle-button
              appearance="subtle"
              icon-only
              slot="trigger"
              @click="${(x) => x.toggleSidepane('Legacy Copilot')}"
              ?pressed="${(x) =>
                x.ews.activeSidepaneAppId === 'Legacy Copilot'}"
            >
              <img width="20px" src="./img/edge/copilotAppLight.png" />
            </mai-toggle-button>
          `,
        )}
      `,
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
    flex: ${(x) => (x.ess.fullWidthOmnibox ? 'none' : '1')};
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalXS};
  }

  flyout-menu > mai-toggle-button,
  .group > mai-button,
  .group > mai-toggle-button {
    /* Only direct buttons on toolbar need override */
    --smtc-corner-control-rest: 8px;
    --smtc-corner-control-hover: 8px;
    --smtc-corner-control-pressed: 8px;
    --smtc-corner-control-selected: 8px;
  }

  .right {
    justify-content: flex-end;
    min-width: 68px; /* Make equal with left side buttons */
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

    // Remove legacy copilot if it's not enabled or
    // if menus are in L1 (needed for correct order)
    if (!this.ess.showLegacyCopilot || this.ess.showMenusInL1)
      this._derivedToolbarItems = this._derivedToolbarItems.filter(
        (id) => id !== 'Legacy Copilot',
      );

    // Remove new copilot always
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
    if (event.detail) this.ews.openToolbarItem(id);
    else this.ews.closeToolbarItem();
  }

  toggleSidepane(id: string) {
    const isActive = this.ews.activeSidepaneAppId === id;
    this.$emit('togglesidepane', !isActive);
    if (isActive) {
      this.ews.closeSidepaneApp();
    } else {
      this.ews.openSidepaneApp(id);
    }
  }

  togglePinToolbarItem(id: string, event: Event) {
    if (!(event instanceof CustomEvent)) return;
    if (event.detail) this.ess.pinToolbarItem(id);
    else this.ess.unpinToolbarItem(id);
  }

  handleOmniboxActionClick(id: string, e: Event) {
    e.stopPropagation();
    return false;
  }

  handleMoreAction(e: CustomEvent) {
    const action = e.detail;
    switch (action) {
      case 'New tab':
        this.ts.addTab();
        break;
      case 'New window':
        this.ws.openWindow('Microsoft Edge');
        break;
      case 'Print':
        window.print(); // maybe see if we can print the current tab iframe?
        break;
      case 'Settings': {
        const settingsTabId = this.ts.addTab({
          id: `tab-${window.crypto.randomUUID()}`,
          title: 'Settings',
          url: 'edge://settings',
        });
        this.ts.activateTab(settingsTabId);
        break;
      }
      case 'Find on page':
      case 'Screenshot':
      case 'New InPrivate window':
        break;
      case 'Close Microsoft Edge':
        this.ws.closeAllWindows('Microsoft Edge');
        break;
      default:
        this.ews.openToolbarItem(action);
        break;
    }
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
