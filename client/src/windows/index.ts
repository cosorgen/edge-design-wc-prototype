import {
  customElement,
  FASTElement,
  html,
  css,
  repeat,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import {
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  colorNeutralForeground1,
} from '@phoenixui/themes';
import { setThemeFor } from './designSystem.js';
import WindowsService from '#services/windowsService.js';
import installedApps from './installedApps.js';
import './views/taskBar.js';
import './controls/taskbarButton.js';
import './views/appWindow.js';

const styles = css`
  :host {
    display: block;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    color: ${colorNeutralForeground1};
    fill: currentColor;

    /* body1 */
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
  }

  #desktop {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-image: ${(x) =>
      x.ws.theme === 'dark'
        ? "url('/img/windows/desktopDark.jpg')"
        : "url('/img/windows/desktopLight.jpg')"};
    background-size: cover;
    background-position: center;
  }
`;

const template = html<WindowsShell>`
  <div id="desktop"></div>
  <task-bar>
    ${repeat(
      () => installedApps,
      html`
        <taskbar-button
          ?running="${(x, c) =>
            c.parent.ws.windows.some((w) => w.appName === x.name)}"
          ?active="${(x, c) =>
            c.parent.ws.windows.find(
              (win) => win.id === c.parent.ws.activeWindowId,
            )?.appName === x.name}"
          @click="${(x, c) => c.parent.handleTaskbarButtonClick(x.name)}"
        >
          <img
            src="${(x, c) =>
              c.parent.ws.theme === 'dark' && x.darkIcon
                ? x.darkIcon
                : x.lightIcon}"
          />
        </taskbar-button>
      `,
    )}
  </task-bar>
  ${repeat(
    (x) => x.ws.windows,
    html`
      <app-window
        width="${(x) => x.width}px"
        height="${(x) => x.height}px"
        xPos="${(x) => x.xPos}px"
        yPos="${(x) => x.yPos}px"
        zIndex="${(x) => x.zIndex}"
        ?minimized="${(x) => x.minimized}"
        ?maximized="${(x) => x.maximized}"
        ?active="${(x, c) => x.id === c.parent.ws.activeWindowId}"
      >
        ${(x) =>
          installedApps.filter((app) => app.name === x.appName)[0].element ||
          ''}
      </app-window>
    `,
  )}
`;

@customElement({ name: 'windows-shell', template, styles })
export class WindowsShell extends FASTElement {
  @inject(WindowsService) ws!: WindowsService;

  connectedCallback() {
    super.connectedCallback();

    // set our theme for the OS
    setThemeFor(this, this.ws.theme);

    // open default windows
    this.ws.openWindow('Microsoft Edge');
  }

  handleTaskbarButtonClick(appName: string) {
    // if app is running, focus it
    const window = this.ws.windows.find((w) => w.appName === appName);
    if (window) {
      this.ws.activateWindow(window.id);
      return;
    }

    // otherwise, open it
    this.ws.openWindow(appName);
  }
}
