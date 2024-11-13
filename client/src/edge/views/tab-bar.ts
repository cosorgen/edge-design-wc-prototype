import {
  customElement,
  FASTElement,
  html,
  css,
  repeat,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import {
  spacingHorizontalXS,
  shadow2,
  spacingVerticalSNudge,
  borderRadiusLarge,
} from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';
import '@phoenixui/web-components/toggle-button.js';
import '@phoenixui/web-components/divider.js';
import '../controls/horizontal-tab.js';
import '../../windows/controls/mica-material.js';
import '../views/caption-controls.js';
import { TabService } from '#services/tabService.js';
import WindowsService from '#services/windowsService.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import { spacingFrame } from '../designSystem.js';

const template = html<TabBar>`
  <mica-material tab-bar></mica-material>
  <div id="shadow"></div>
  <div id="content">
    <div class="group">
      <phx-button appearance="subtle" icon-only>
        <svg>
          <use href="img/edge/icons.svg#panel-left-text-20-regular" />
        </svg>
      </phx-button>
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
          <phx-divider
            orientation="vertical"
            appearance="strong"
          ></phx-divider>`,
      )}
    </div>
    <phx-button
      appearance="subtle"
      icon-only
      id="add"
      @click="${(x) => x.addTab()}"
    >
      <svg>
        <use href="img/edge/icons.svg#add-20-regular" />
      </svg>
    </phx-button>
    <div
      id="window-grabber"
      @mousedown="${(x, c) => x.handleTitleBarMouseDown(c.event)}"
      @mouseup="${(x, c) => x.handleContextMenu(c.event)}"
    ></div>
    <caption-controls></caption-controls>
  </div>
`;

const styles = css`
  :host {
    display: block;
    user-select: none;
    position: relative; /* for positioning shadow and mica */
  }

  #content {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: ${spacingFrame};
    padding-inline-start: ${spacingFrame};
    padding-block: calc(${spacingFrame} * 1.5) calc(${spacingFrame} * 0.5);
  }

  .group {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalXS};
  }

  #shadow {
    position: absolute;
    inset-inline: 0;
    bottom: -2px;
    height: 2px;
    box-shadow: ${shadow2};
  }

  #tabs {
    display: flex;
    flex-direction: row;
    gap: calc(${spacingFrame} / 2);
    overflow: hidden;
    padding: max(10px, ${spacingFrame});
    margin: min(-10px, calc(0px - ${spacingFrame})); /* for wings to not clip */
  }

  #window-grabber {
    flex: 1;
    height: calc(100% + (2 * ${spacingFrame}));
    margin-block-end: calc(0px - ${spacingFrame});
    min-width: 24px;
  }

  phx-button {
    border-radius: ${borderRadiusLarge};
  }

  phx-divider,
  phx-divider:before,
  phx-divider:after {
    min-height: unset;
    height: unset;
  }

  phx-divider {
    margin-block: ${spacingVerticalSNudge};
    margin-inline: calc(0px - (${spacingFrame} / 2));
  }

  horizontal-tab[active] + phx-divider,
  phx-divider:has(+ horizontal-tab[active]),
  horizontal-tab:hover + phx-divider,
  phx-divider:has(+ horizontal-tab:hover),
  #tabs:has(+ #add:hover) > phx-divider:last-of-type {
    visibility: hidden;
  }
`;

@customElement({
  name: 'tab-bar',
  template,
  styles,
})
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
