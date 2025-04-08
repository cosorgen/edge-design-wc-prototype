import {
  customElement,
  FASTElement,
  html,
  css,
  repeat,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import '@edge-design/button/define.js';
import '../controls/vertical-tab.js';
import { TabService } from '#services/tabService.js';
import WindowsService from '#services/windowsService.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import {
  ctrlTabBackgroundHorizontalActive,
  foregroundCtrlNeutralSecondaryRest,
  paddingWindowDefault,
  textGlobalCaption1Fontsize,
} from '@edge-design/kumo-theme/tokens.js';
import EdgeSettingsSerivce from '#servicessettingsService.js';

const template = html<VerticalTabBar>`
  <div class="group">
    <mai-button
      appearance="subtle"
      icon-only
      @click="${(x) => x.hideVerticalTabs()}"
    >
      <svg>
        <use href="img/edge/icons.svg#panel-left-text-20-regular" />
      </svg>
    </mai-button>
  </div>
  <div id="tabs">
    ${repeat(
      (x) => x.ts.tabIds,
      html<string>`
        <vertical-tab
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
              ? html`<span slot="title">${c.parent.ts.tabsById[x].title}</span>`
              : null}
        </vertical-tab>
      `,
    )}
  </div>
  <mai-divider appearance="subtle"></mai-divider>
  <mai-button appearance="subtle" id="add" @click="${(x) => x.addTab()}">
    <svg slot="start">
      <use href="img/edge/icons.svg#add-20-regular" />
    </svg>
    Add tab
    <div slot="end">Ctrl+T</div>
  </mai-button>
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    gap: calc(${paddingWindowDefault} * 2);
    user-select: none;
    padding: ${paddingWindowDefault};
    padding-inline-end: 0;
    background: ${ctrlTabBackgroundHorizontalActive};
  }

  .group {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: calc(${paddingWindowDefault} * 2);
  }

  #tabs {
    display: flex;
    flex-direction: column;
    gap: ${paddingWindowDefault};
    min-height: 16px;
  }

  #add {
    overflow: hidden;

    div[slot='end'] {
      font-size: ${textGlobalCaption1Fontsize};
      color: ${foregroundCtrlNeutralSecondaryRest};
      width: fit-content;
    }
  }

  #add::part(content) {
    flex: 1;
    justify-content: flex-start;
  }
`;

@customElement({ name: 'vertical-tab-bar', template, styles })
export class VerticalTabBar extends FASTElement {
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

  handleContextMenu = (e: Event) => {
    e.preventDefault();
    return false;
  };

  hideVerticalTabs() {
    this.ss.verticalTabs = false;
  }
}
