import {
  customElement,
  FASTElement,
  html,
  css,
  repeat,
  observable,
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
import '../controls/identity-control.js';
import '../controls/horizontal-tab.js';
import '../controls/flyout-menu.js';
import '../controls/more-menu.js';
import { Tab, TabService } from '#services/tabService.js';
import WindowsService from '#services/windowsService.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import { spacingFrame } from '../designSystem.js';

const template = html<TabBar>`
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
        (x) => x.ts.tabs,
        html<Tab>` <horizontal-tab
            ?active="${(x) => x.active}"
            ?loading="${(x) => x.loading}"
            @activate="${(x, c) => c.parent.activateTab(x.id)}"
            @close="${(x, c) => c.parent.closeTab(x.id)}"
          >
            ${(x) =>
              x.favicon
                ? html`<img slot="favicon" src="${x.favicon}" />`
                : null}
            ${(x) =>
              x.title ? html`<span slot="title">${x.title}</span>` : null}
          </horizontal-tab>
          <phx-divider
            orientation="vertical"
            appearance="strong"
          ></phx-divider>`,
        { positioning: true },
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
      @mousedown="${(x) => x.handleTitleBarMouseDown()}"
    ></div>
  </div>
`;

const styles = css`
  :host {
    display: block;
    user-select: none;
    position: relative; /* for positioning shadow */
    width: calc(
      100% - ${(x) => (x.ews.activeSidepaneAppId !== null ? '0px' : '186px')}
    );
  }

  #content {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: ${spacingFrame};
  }

  .group {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalXS};
  }

  #shadow {
    position: absolute;
    inset-inline: 8px;
    bottom: calc(-2px - ${spacingFrame});
    height: 2px;
    box-shadow: ${shadow2};
  }

  #tabs {
    display: flex;
    flex-direction: row;
    gap: ${spacingFrame};
    overflow: hidden;
    padding: max(10px, ${spacingFrame});
    margin: min(-10px, calc(0px - ${spacingFrame})); /* for wings to not clip */
  }

  #window-grabber {
    flex: 1;
    height: calc(100% + (2 * ${spacingFrame}));
    margin-block-end: calc(0px - ${spacingFrame});
    min-width: ${(x) => (x.ews.activeSidepaneAppId ? '0px' : '24px')};
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
  @observable dragging = false;

  activateTab(tabId: string) {
    this.ts.activateTab(tabId);
  }

  closeTab(tabId: string) {
    this.ts.removeTab(tabId);
    if (this.ts.tabs.length === 0) {
      this.closeWindow();
    }
  }

  addTab() {
    this.ts.addTab();
  }

  closeWindow() {
    this.ws.closeWindow(this.ws.activeWindowId);
  }

  handleTitleBarMouseDown() {
    this.$emit('windowmovestart');
  }
}
