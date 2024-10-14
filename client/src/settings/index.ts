import { css, html, FASTElement, customElement } from '@microsoft/fast-element';
import {
  spacingHorizontalL,
  spacingHorizontalS,
  typographyStyles,
} from '@phoenixui/themes';
import '../windows/controls/mica-material.js';
import '@phoenixui/web-components/button.js';
import {
  colorShellFillCaptionControlPrimaryHover,
  colorShellFillCaptionControlPrimaryPressed,
  colorShellForegroundCaptionControlPrimaryHover,
  colorShellForegroundCaptionControlPrimaryPressed,
} from '../windows/designSystem.js';
import { inject } from '@microsoft/fast-element/di.js';
import WindowsService from '#serviceswindowsService.js';

const template = html<WindowsSettings>`
  <mica-material></mica-material>
  <div id="content">
    <div id="nav">
      <h1>Settings</h1>
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
    <div id="main">
      <div class="entry">
        <label for="theme">Theme</label>
        <select id="theme">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div class="entry">
        <label for="transparency">Transparency</label>
        <select id="transparency">
          <option value="normal">Normal</option>
          <option value="reduced">Reduced</option>
        </select>
      </div>
      <div class="entry">
        <label for="favorites-bar">Show favorites bar</label>
        <select id="favorites-bar">
          <option value="always">Always</option>
          <option value="never">Never</option>
          <option value="newtab">On new tab</option>
        </select>
      </div>
      <div class="entry">
        <label for="truncate-url">Truncate URL</label>
        <input id="truncate-url" type="checkbox" />
      </div>
      <div class="entry">
        <label for="legacy-copilot">Show legacy copilot</label>
        <input id="legacy-copilot" type="checkbox" />
      </div>
      <div class="entry">
        <label for="frame-spacing">Frame spacing</label>
        <input id="frame-spacing" type="number" value="4" />
      </div>
    </div>
  </div>
`;

const styles = css`
  #content {
    position: absolute;
    inset: 0;
  }

  #nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline-start: ${spacingHorizontalL};
  }

  h1 {
    font-family: ${typographyStyles.subtitle2.fontFamily};
    font-size: ${typographyStyles.subtitle2.fontSize};
    font-weight: ${typographyStyles.subtitle2.fontWeight};
    line-height: ${typographyStyles.subtitle2.lineHeight};
    margin: 0;
  }

  #close:hover {
    background-color: ${colorShellFillCaptionControlPrimaryHover};
    color: ${colorShellForegroundCaptionControlPrimaryHover};
  }

  #close:active {
    background-color: ${colorShellFillCaptionControlPrimaryPressed};
    color: ${colorShellForegroundCaptionControlPrimaryPressed};
  }

  #main {
    display: flex;
    flex-direction: column;
    padding: ${spacingHorizontalL};
  }

  .entry {
    display: flex;
    flex-direction: row;
    gap: ${spacingHorizontalS};
    align-items: center;
    padding-block: ${spacingHorizontalS};
  }
`;

@customElement({ name: 'windows-settings', template, styles })
export class WindowsSettings extends FASTElement {
  @inject(WindowsService) ws!: WindowsService;

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
}
