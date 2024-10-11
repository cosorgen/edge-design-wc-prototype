import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import '@phoenixui/web-components/button.js';
import { inject } from '@microsoft/fast-element/di.js';
import WindowsService, { Window } from '#serviceswindowsService.js';
import { TabService } from '#servicestabService.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import { colorLayerBackgroundPillMenu, spacingFrame } from '../designSystem.js';
import {
  colorShellFillCaptionControlPrimaryHover,
  colorShellFillCaptionControlPrimaryPressed,
  colorShellForegroundCaptionControlPrimaryHover,
  colorShellForegroundCaptionControlPrimaryPressed,
} from '../../windows/designSystem.js';
import {
  borderRadiusCircular,
  spacingHorizontalS,
  spacingHorizontalXS,
  spacingHorizontalXXS,
  strokeWidthThin,
} from '@phoenixui/themes';

const template = html` <div
    id="window-grabber"
    @mousedown="${(x) => x.handleTitleBarMouseDown()}"
  ></div>
  <div class="group" id="pill-menu">
    <flyout-menu>
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
        @moreaction="${(x, c) => x.handleMoreAction(c.event as CustomEvent)}"
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
      <use href="img/edge/icons.svg#chrome-minimize-20-regular" x="2" y="2" />
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
    id="close"
  >
    <svg>
      <use href="img/edge/icons.svg#chrome-close-20-regular" x="2" y="2" />
    </svg>
  </phx-button>`;

const styles = css`
  :host {
    --caption-controls-height: calc(
      32px + 2 * ${spacingFrame}
    ); /* height of a button + gaps */
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    inset-inline-end: max(
      /* equal spacing top and right */
        calc((var(--caption-controls-height) - 40px) / 2),
      0px
    );
    inset-block-start: 0;
    height: var(--caption-controls-height);
    width: ${(x) => (x.ews.sidepaneAppId !== null ? '384px' : '186px')};
  }

  #close:hover {
    background-color: ${colorShellFillCaptionControlPrimaryHover};
    color: ${colorShellForegroundCaptionControlPrimaryHover};
  }

  #close:active {
    background-color: ${colorShellFillCaptionControlPrimaryPressed};
    color: ${colorShellForegroundCaptionControlPrimaryPressed};
  }

  #pill-menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: ${spacingHorizontalS};
    padding: calc(${spacingHorizontalXXS} - ${strokeWidthThin})
      ${spacingHorizontalXXS};
    gap: ${spacingHorizontalXS};
    border-radius: ${borderRadiusCircular};
    background-color: ${colorLayerBackgroundPillMenu};
  }

  #window-grabber {
    flex: 1;
    height: 100%;
  }
`;

@customElement({ name: 'caption-controls', template, styles })
export class CaptionControls extends FASTElement {
  @inject(WindowsService) ws!: WindowsService;
  @inject(TabService) ts!: TabService;
  @inject(EdgeWindowService) ews!: EdgeWindowService;

  handleTitleBarMouseDown() {
    this.$emit('windowmovestart');
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
      case 'Settings':
      case 'Find on page':
      case 'Screenshot':
      case 'New InPrivate window':
        break;
      case 'Close Microsoft Edge':
        this.ws.closeAllWindows();
        break;
      default:
        this.ews.openToolbarItem(action);
        break;
    }
  }
}
