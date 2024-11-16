import {
  css,
  html,
  FASTElement,
  customElement,
  observable,
} from '@microsoft/fast-element';
import {
  spacingHorizontalL,
  spacingHorizontalXL,
  typographyStyles,
  spacingHorizontalM,
  spacingVerticalS,
} from '@phoenixui/themes';
import {
  colorShellFillCaptionControlPrimaryHover,
  colorShellFillCaptionControlPrimaryPressed,
  colorShellForegroundCaptionControlPrimaryHover,
  colorShellForegroundCaptionControlPrimaryPressed,
} from '../windows/designSystem.js';
import { inject } from '@microsoft/fast-element/di.js';
import WindowsService from '#serviceswindowsService.js';
import EdgeSettingsSerivce from '#servicessettingsService.js';
import { TabService } from '#servicestabService.js';
import { CopilotService } from '#servicescopilotService.js';
import '@phoenixui/web-components/button.js';
import '../windows/controls/mica-material.js';
import './views/appearance-settings.js';
import './views/browser-settings.js';
import './controls/left-nav.js';

const template = html<WindowsSettings>`
  <mica-material></mica-material>
  <div id="content">
    <div id="title-bar">
      <h1>Settings</h1>
      <div id="grabber" @mousedown="${(x) => x.$emit('windowmovestart')}"></div>
      <div>
        <phx-button
          size="large"
          shape="square"
          appearance="subtle"
          icon-only
          @click="${(x) => x.minimizeWindow()}"
        >
          <svg>
            <use
              x="2"
              y="2"
              href="./img/edge/icons.svg#chrome-minimize-20-regular"
            />
          </svg>
        </phx-button>
        <phx-button
          size="large"
          shape="square"
          appearance="subtle"
          icon-only
          @click="${(x) => x.maximizeWindow()}"
        >
          <svg>
            <use
              x="2"
              y="2"
              href="./img/edge/icons.svg#chrome-${(x) =>
                x.windowIsMaximized() ? 'restore' : 'maximize'}-20-regular"
            />
          </svg>
        </phx-button>
        <phx-button
          size="large"
          shape="square"
          appearance="subtle"
          icon-only
          id="close"
          @click="${(x) => x.ws.closeWindow(x.id)}"
        >
          <svg>
            <use
              x="2"
              y="2"
              href="./img/edge/icons.svg#chrome-close-20-regular"
            />
          </svg>
        </phx-button>
      </div>
    </div>

    <div id="container">
      <left-nav>
        <left-nav-item
          @click="${(x) => x.handleSidebarButtonClick('appearance')}"
          ?selected="${(x) => x.selectedPage === 'appearance'}"
        >
          Overall appearance
        </left-nav-item>
        <left-nav-item
          @click="${(x) => x.handleSidebarButtonClick('browser')}"
          ?selected="${(x) => x.selectedPage === 'browser'}"
        >
          Browser
        </left-nav-item>
      </left-nav>

      <div id="main">
        <appearance-settings
          ?hidden="${(x) => x.selectedPage !== 'appearance'}"
        ></appearance-settings>

        <browser-settings
          ?hidden="${(x) => x.selectedPage !== 'browser'}"
        ></browser-settings>
      </div>
    </div>
  </div>
`;

const styles = css`
  #container {
    display: flex;
    height: 100vh;
    padding: ${spacingHorizontalM};
    gap: ${spacingHorizontalXL};
  }

  #content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    overflow: hidden;
  }

  #title-bar {
    display: flex;
    align-items: center;
    padding-inline-start: ${spacingHorizontalL};
  }

  h1 {
    font-family: ${typographyStyles.subtitle2.fontFamily};
    font-size: ${typographyStyles.subtitle2.fontSize};
    font-weight: ${typographyStyles.subtitle2.fontWeight};
    line-height: ${typographyStyles.subtitle2.lineHeight};
    padding-top: ${spacingVerticalS};
    margin: 0;
    user-select: none;
  }

  #close:hover {
    background-color: ${colorShellFillCaptionControlPrimaryHover};
    color: ${colorShellForegroundCaptionControlPrimaryHover};
  }

  #close:active {
    background-color: ${colorShellFillCaptionControlPrimaryPressed};
    color: ${colorShellForegroundCaptionControlPrimaryPressed};
  }

  #grabber {
    flex: 1;
    height: 40px;
    user-select: none;
  }

  #main {
    overflow-y: auto;
  }
`;

type Section = 'appearance' | 'browser';

@customElement({
  name: 'windows-settings',
  template,
  styles,
})
export class WindowsSettings extends FASTElement {
  @inject(WindowsService) ws!: WindowsService;
  @inject(EdgeSettingsSerivce) ss!: EdgeSettingsSerivce;
  @inject(TabService) ts!: TabService;
  @inject(CopilotService) cs!: CopilotService;
  @observable selectedPage: Section = 'appearance';

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
    return this.ws.getWindowById(this.id)?.maximized || false;
  }

  maximizeWindow() {
    this.ws.maximizeWindow(this.ws.activeWindowId, !this.windowIsMaximized());
  }

  handleSidebarButtonClick(button: Section) {
    this.selectedPage = button;
  }
}
