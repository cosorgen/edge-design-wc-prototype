import {
  customElement,
  FASTElement,
  html,
  css,
  repeat,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import '@mai-ui/button/define.js';
import '@mai-ui/divider/define.js';
import '../controls/horizontal-tab.js';
import '../controls/flyout-menu.js';
import '../controls/context-menu.js';
import '../controls/menu-item.js';
import { TabService } from '#services/tabService.js';
import WindowsService from '#services/windowsService.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import {
  paddingContentXSmall,
  shadowLayerAmbient,
  shadowLayerKey,
} from '@mai-ui/design-tokens/tokens.js';
import { ctrlTabBackgroundHorizontalActive } from '@mai-ui/design-tokens/edge-tokens.js';
import EdgeSettingsSerivce from '#servicessettingsService.js';

const template = html<TabBar>`
  <div id="shadow"></div>
  <div id="content">
    <div class="group">
      <flyout-menu>
        <mai-button appearance="subtle" icon-only slot="trigger">
          <svg>
            <use href="img/edge/icons.svg#panel-left-text-20-regular" />
          </svg>
        </mai-button>
        <context-menu>
          <menu-item @click="${(x) => x.showVerticalTabs()}" start-slot>
            <svg slot="start">
              <use
                href="img/edge/icons.svg#tab-position-switch-to-vertical-20-regular"
              />
            </svg>
            Turn on vertical tabs
          </menu-item>
          <menu-item start-slot>
            <svg slot="start">
              <use href="img/edge/icons.svg#search-20-regular" />
            </svg>
            Search tabs
          </menu-item>
          <menu-item start-slot>
            <svg slot="start">
              <use href="img/edge/icons.svg#tabs-20-regular" />
            </svg>
            Organize tabs
          </menu-item>
          <menu-item start-slot>
            <svg slot="start">
              <use href="img/edge/icons.svg#tab-desktop-clock-20-regular" />
            </svg>
            Recently closed tabs
          </menu-item>
          <menu-item start-slot>
            <svg slot="start">
              <use href="img/edge/icons.svg#phone-desktop-20-regular" />
            </svg>
            Tabs from other devices
          </menu-item>
          <menu-item start-slot>
            <svg slot="start">
              <use href="img/edge/icons.svg#layer-diagonal-20-regular" />
            </svg>
            Create new workspace
          </menu-item>
        </context-menu>
      </flyout-menu>
    </div>
    <div id="tabs">
      ${repeat(
        (x) => x.ts.tabIds,
        html<string>` <horizontal-tab
            ?active="${(x, c) => x === c.parent.ts.activeTabId}"
            ?loading="${(x, c) => c.parent.ts.tabsById[x].loading}"
            @activate="${(x, c) => c.parent.activateTab(x)}"
            @close="${(x, c) => c.parent.closeTab(x)}"
          >
            ${(x, c) =>
              c.parent.ts.tabsById[x].favicon
                ? html`
                    ${c.parent.ts.tabsById[x].favicon.includes('.svg')
                      ? html`<svg slot="favicon">
                          <use href="${c.parent.ts.tabsById[x].favicon}"></use>
                        </svg>`
                      : html`<img
                          slot="favicon"
                          src="${c.parent.ts.tabsById[x].favicon}"
                        />`}
                  `
                : null}
            ${(x, c) =>
              c.parent.ts.tabsById[x].title
                ? html`<span slot="title"
                    >${c.parent.ts.tabsById[x].title}</span
                  >`
                : null}
          </horizontal-tab>
          <mai-divider
            orientation="vertical"
            appearance="strong"
          ></mai-divider>`,
      )}
    </div>
    <mai-button
      appearance="subtle"
      icon-only
      id="add"
      @click="${(x) => x.addTab()}"
    >
      <svg>
        <use href="img/edge/icons.svg#add-20-regular" />
      </svg>
    </mai-button>
    <div
      id="window-grabber"
      @mousedown="${(x, c) => x.handleTitleBarMouseDown(c.event)}"
      @mouseup="${(x, c) => x.handleContextMenu(c.event)}"
    ></div>
  </div>
`;

const styles = css`
  :host {
    display: block;
    user-select: none;
    position: relative; /* for positioning shadow */
    width: calc(100% - ${(x) => (x.ews.activeSidepaneAppId ? '0px' : '186px')});
    padding: var(--paddingWindowDefault);
  }

  #content {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: var(--paddingWindowDefault);
  }

  .group {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: calc(var(--paddingWindowDefault) * 2);
  }

  #shadow {
    position: absolute;
    inset-inline: 0;
    bottom: -2px;
    height: 2px;
    box-shadow: ${shadowLayerAmbient}, ${shadowLayerKey};
    background-color: ${ctrlTabBackgroundHorizontalActive};
  }

  #tabs {
    display: flex;
    flex-direction: row;
    gap: var(--paddingWindowDefault);
    overflow: hidden;
    padding: max(10px, var(--paddingWindowDefault));
    margin: min(
      -10px,
      calc(0px - var(--paddingWindowDefault))
    ); /* for wings to not clip */
  }

  #window-grabber {
    flex: 1;
    height: calc(100% + (2 * var(--paddingWindowDefault)));
    margin-block-end: calc(0px - var(--paddingWindowDefault));
    min-width: ${(x) => (x.ews.activeSidepaneAppId ? '0px' : '24px')};
  }

  mai-divider,
  mai-divider:before,
  mai-divider:after {
    min-height: unset;
    height: unset;
  }

  mai-divider {
    margin-block: ${paddingContentXSmall};
    margin-inline: calc(0px - (var(--paddingWindowDefault) / 2));
  }

  horizontal-tab[active] + mai-divider,
  mai-divider:has(+ horizontal-tab[active]),
  horizontal-tab:hover + mai-divider,
  mai-divider:has(+ horizontal-tab:hover),
  #tabs:has(+ #add:hover) > mai-divider:last-of-type {
    visibility: hidden;
  }
`;

@customElement({ name: 'tab-bar', template, styles })
export class TabBar extends FASTElement {
  @inject(WindowsService) ws!: WindowsService;
  @inject(TabService) ts!: TabService;
  @inject(EdgeWindowService) ews!: EdgeWindowService;
  @inject(EdgeSettingsSerivce) ss!: EdgeSettingsSerivce;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('contextmenu', this.handleContextMenu);
  }

  getTabList() {
    return this.ts.tabIds.map((tabId) => this.ts.tabsById[tabId]);
  }

  activateTab(tabId: string) {
    this.ts.activateTab(tabId);
  }

  closeTab(tabId: string) {
    this.ts.removeTab(tabId);
    if (this.ts.tabIds.length === 0) {
      this.closeWindow();
    }
  }

  addTab() {
    const newId = this.ts.addTab();
    this.activateTab(newId);
  }

  closeWindow() {
    this.ws.closeWindow(this.ws.activeWindowId);
  }

  handleTitleBarMouseDown(e: Event) {
    if (!(e instanceof MouseEvent)) return;
    if (e.button !== 0) return;
    this.$emit('windowmovestart');
  }

  handleContextMenu = (e: Event) => {
    e.preventDefault();
    return false;
  };

  showVerticalTabs() {
    this.ss.verticalTabs = true;
  }
}
