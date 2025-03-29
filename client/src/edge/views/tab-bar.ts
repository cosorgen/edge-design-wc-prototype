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
import { TabService } from '#services/tabService.js';
import WindowsService from '#services/windowsService.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import {
  ctrlTabBackgroundHorizontalActive,
  paddingContentXSmallNudge,
  shadowLayer,
  paddingWindowDefault,
} from '@edge-design/kumo-theme/tokens.js';

const template = html<TabBar>`
  <div id="shadow"></div>
  <div id="content">
    <div class="group">
      <mai-button appearance="subtle" icon-only>
        <svg>
          <use href="img/edge/icons.svg#panel-left-text-20-regular" />
        </svg>
      </mai-button>
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
    padding: ${paddingWindowDefault};
  }

  #content {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: ${paddingWindowDefault};
  }

  .group {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${paddingWindowDefault};
  }

  #shadow {
    position: absolute;
    inset-inline: 0;
    bottom: -2px;
    height: 2px;
    box-shadow: ${shadowLayer};
    background-color: ${ctrlTabBackgroundHorizontalActive};
  }

  #tabs {
    display: flex;
    flex-direction: row;
    gap: ${paddingWindowDefault};
    overflow: hidden;
    padding: max(10px, ${paddingWindowDefault});
    margin: min(
      -10px,
      calc(0px - ${paddingWindowDefault})
    ); /* for wings to not clip */
  }

  #window-grabber {
    flex: 1;
    height: calc(100% + (2 * ${paddingWindowDefault}));
    margin-block-end: calc(0px - ${paddingWindowDefault});
    min-width: ${(x) => (x.ews.activeSidepaneAppId ? '0px' : '24px')};
  }

  mai-divider,
  mai-divider:before,
  mai-divider:after {
    min-height: unset;
    height: unset;
  }

  mai-divider {
    margin-block: ${paddingContentXSmallNudge};
    margin-inline: calc(0px - (${paddingWindowDefault} / 2));
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
}
