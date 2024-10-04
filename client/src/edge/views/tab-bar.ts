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
  spacingHorizontalXXS,
  spacingVerticalSNudge,
  borderRadiusLarge,
  borderRadiusCircular,
  spacingHorizontalS,
} from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';
import '@phoenixui/web-components/toggle-button.js';
import '@phoenixui/web-components/divider.js';
import '../controls/identity-control.js';
import '../controls/horizontal-tab.js';
import '../controls/flyout-menu.js';
import '../controls/more-menu.js';
import { Tab, TabService } from '#services/tabService.js';
import WindowsService, { Window } from '#services/windowsService.js';
import {
  colorShellFillCaptionControlPrimaryHover,
  colorShellFillCaptionControlPrimaryPressed,
  colorShellForegroundCaptionControlPrimaryHover,
  colorShellForegroundCaptionControlPrimaryPressed,
} from '../../windows/designSystem.js';
import { colorLayerBackgroundPillMenu, spacingFrame } from '../designSystem.js';
import EdgeWindowService from '#servicesedgeWindowService.js';

const template = html<TabBar>`
  <div id="shadow"></div>
  <div id="content">
    <div class="group">
      <phx-button class="toolbar" appearance="subtle" icon-only>
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
      class="toolbar"
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
    <div class="group" id="caption-controls" style="gap: 0;">
      <div class="group" id="pill-menu">
        <flyout-menu @toggle="${(x, c) => x.handleFlyoutToggle(c.event)}">
          <phx-toggle-button
            size="small"
            appearance="subtle"
            shape="circular"
            icon-only
            slot="trigger"
          >
            <svg>
              <use href="img/edge/icons.svg#more-horizontal-20-regular" />
            </svg>
          </phx-toggle-button>
          <more-menu
            @moreaction="${(x, c) =>
              x.handleMoreAction(c.event as CustomEvent)}"
          ></more-menu>
        </flyout-menu>
        <identity-control appearance="signedIn"></identity-control>
      </div>
      <phx-button
        size="large"
        appearance="subtle"
        shape="square"
        icon-only
        @click="${(x) => x.minimizeWindow()}"
      >
        <svg>
          <use
            href="img/edge/icons.svg#chrome-minimize-20-regular"
            x="2"
            y="2"
          />
        </svg>
      </phx-button>
      <phx-button
        size="large"
        appearance="subtle"
        shape="square"
        icon-only
        @click="${(x) => x.maximizeWindow()}"
      >
        <svg>
          <use
            href="${(x) =>
              x.windowIsMaximized()
                ? 'img/edge/icons.svg#chrome-restore-20-regular'
                : 'img/edge/icons.svg#chrome-maximize-20-regular'}"
            x="2"
            y="2"
          />
        </svg>
      </phx-button>
      <phx-button
        size="large"
        appearance="subtle"
        shape="square"
        icon-only
        @click="${(x) => x.closeWindow()}"
      >
        <svg>
          <use href="img/edge/icons.svg#chrome-close-20-regular" x="2" y="2" />
        </svg>
      </phx-button>
    </div>
  </div>
`;

const styles = css`
  :host {
    display: block;
    width: 100%;
    user-select: none;
    position: relative; /* for positioning shadow */
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
    bottom: -6px;
    height: 2px;
    box-shadow: ${shadow2};
  }

  #tabs {
    display: flex;
    flex-direction: row;
    gap: ${spacingHorizontalXXS};
    overflow: hidden;
    padding: 10px;
    margin: -10px; /* for wings to not clip */
  }

  #add {
    margin-inline-start: ${spacingHorizontalXXS};
  }

  #window-grabber {
    flex: 1;
    height: 100%;
    min-width: 208px;
  }

  #pill-menu {
    margin-right: ${spacingHorizontalS};
    padding: ${spacingHorizontalXXS};
    gap: ${spacingHorizontalXS};
    border-radius: ${borderRadiusCircular};
    background-color: ${colorLayerBackgroundPillMenu};
  }

  #caption-controls {
    position: absolute;
    inset-inline-end: calc(0px - ${spacingFrame});
    inset-block: 0;
  }

  #caption-controls phx-button:nth-child(4):hover {
    background-color: ${colorShellFillCaptionControlPrimaryHover};
    color: ${colorShellForegroundCaptionControlPrimaryHover};
  }

  #caption-controls phx-button:nth-child(4):active {
    background-color: ${colorShellFillCaptionControlPrimaryPressed};
    color: ${colorShellForegroundCaptionControlPrimaryPressed};
  }

  phx-button.toolbar {
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
    margin-inline: calc(0px - ${spacingHorizontalXXS});
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

  minimizeWindow() {
    this.ws.minimizeWindow(this.ws.activeWindowId);
  }

  windowIsMaximized() {
    const window = this.ws.getActiveWindow() as Window;
    return window?.maximized || false;
  }

  maximizeWindow() {
    if (this.windowIsMaximized()) {
      this.ws.restoreWindow(this.ws.activeWindowId);
    } else {
      this.ws.maximizeWindow(this.ws.activeWindowId);
    }
  }

  handleTitleBarMouseDown() {
    this.$emit('windowmovestart');
  }

  handleFlyoutToggle(e: Event) {
    if (!(e instanceof ToggleEvent)) return;
    this.ews.disableWebview = e.newState === 'open';
  }

  handleMoreAction(e: CustomEvent) {
    console.log('handleMoreAction', e.detail);
    const action = e.detail;
    switch (action) {
      case 'New tab':
        this.addTab();
        break;
      case 'New window':
        this.ws.openWindow('Microsoft Edge');
        break;
      case 'Print':
        window.print(); // maybe see if we can print the current tab iframe?
        break;
      case 'Favorites':
        this.ews.openToolbarItem('favorites');
        break;
      case 'Extensions':
        this.ews.openToolbarItem('extensions');
        break;
    }
  }
}
