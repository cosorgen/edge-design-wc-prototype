import {
  customElement,
  FASTElement,
  html,
  css,
  repeat,
  Observable,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import {
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  colorNeutralForeground1,
} from '@phoenixui/themes';
import { setTheme } from './designSystem.js';
import WindowsService from '#services/windowsService.js';
import installedApps from './installedApps.js';
import './views/task-bar.js';
import './controls/taskbar-button.js';
import './controls/mica-material.js';
import './controls/app-window.js';

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
  }
`;

const template = html<WindowsShell>`
  <mica-material
    id="desktop"
    image-only
    @click="${(x) => x.ws.activateWindow(null)}"
  ></mica-material>
  ${repeat(
    (x) => x.ws.windows,
    html`
      <app-window
        id="${(x) => x.id}"
        width="${(x) => x.width}"
        height="${(x) => x.height}"
        xPos="${(x) => x.xPos}"
        yPos="${(x) => x.yPos}"
        zIndex="${(x) => x.zIndex}"
        ?minimized="${(x) => x.minimized}"
        ?maximized="${(x) => x.maximized}"
        ?active="${(x, c) => x.id === c.parent.ws.activeWindowId}"
        @windowmove="${(x, c) =>
          c.parent.handleWindowMove(c.event as CustomEvent)}"
        @activate="${(x, c) => c.parent.ws.activateWindow(x.id)}"
      >
        ${(x) =>
          installedApps.filter((app) => app.name === x.appName)[0].element ||
          ''}
      </app-window>
    `,
    { positioning: true },
  )}
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
          @click="${(x, c) =>
            x.element ? c.parent.handleTaskbarButtonClick(x.name) : ''}"
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
`;

@customElement({ name: 'windows-shell', template, styles })
export class WindowsShell extends FASTElement {
  @inject(WindowsService) ws!: WindowsService;

  connectedCallback() {
    super.connectedCallback();
    this.setTheme();
    Observable.getNotifier(this.ws).subscribe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    Observable.getNotifier(this.ws).unsubscribe(this);
  }

  handleChange(source: unknown, propertyName: string) {
    if (propertyName === 'theme' || propertyName === 'transparency') {
      this.setTheme();
    }
  }

  setTheme() {
    setTheme(this.ws.theme);
  }

  handleTaskbarButtonClick(appName: string) {
    // find app windows
    const windows = this.ws.windows.filter((w) => w.appName === appName);

    // if no windows are open, open it
    if (windows.length === 0) {
      this.ws.openWindow(appName);
      return;
    }

    // if there's one window open
    if (windows.length === 1) {
      // if it's minimized, restore it
      if (windows[0].minimized) {
        this.ws.minimizeWindow(windows[0].id, false);
        return;
      }
      // if it's not active, activate it
      if (windows[0].id !== this.ws.activeWindowId) {
        this.ws.activateWindow(windows[0].id);
        return;
      }
      // if it's active, minimize it
      this.ws.minimizeWindow(windows[0].id);
      return;
    }

    // if there are multiple windows open
    return;
  }

  handleWindowMove(e: CustomEvent) {
    const { id, width, height, xPos, yPos } = e.detail;
    this.ws.moveWindow(id, width, height, xPos, yPos);
  }
}
