import {
  customElement,
  FASTElement,
  html,
  css,
  repeat,
  Observable,
  ViewTemplate,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import {
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  colorNeutralForeground1,
  windowsLightTheme,
  windowsDarkTheme,
  windowsDarkThemeSolid,
  windowsLightThemeSolid,
} from '@mai-ui/windows-theme';
import { setThemeFor } from '@mai-ui/component-framework';
import WindowsService from '#services/windowsService.js';
import installedApps from './installedApps.js';
import './views/task-bar.js';
import './controls/taskbar-button.js';
import './controls/mica-material.js';
import './controls/app-window.js';
import '../edge/index.js';
import '../settings/index.js';
import '../slides/index.js';

const appTemplates: Record<string, ViewTemplate> = {
  'Microsoft Edge': html`<microsoft-edge></microsoft-edge>`,
  Settings: html`<windows-settings></windows-settings>`,
  Slides: html`<figma-slides></figma-slides>`,
};

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
        ${(x) => appTemplates[x.appName] || ''}
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
            appTemplates[x.name]
              ? c.parent.handleTaskbarButtonClick(x.name)
              : ''}"
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
    const themes = {
      light: { reduced: windowsLightThemeSolid, normal: windowsLightTheme },
      dark: { reduced: windowsDarkThemeSolid, normal: windowsDarkTheme },
    };
    setThemeFor(this.shadowRoot!, themes[this.ws.theme][this.ws.transparency]);
  }

  handleTaskbarButtonClick(appName: string) {
    // find app windows
    const windows = this.ws.windows.filter((w) => w.appName === appName);

    // if no windows are open, open it
    if (windows.length === 0) {
      this.ws.openWindow(appName);
      return;
    }

    // handle the case of a single window
    const [window] = windows;

    // if the window is minimized, restore it and activate it
    if (window.minimized) {
      this.ws.minimizeWindow(window.id, false); // restore the window
      this.ws.activateWindow(window.id); // ensure the window is activated and brought to the front
      const appWindowElement = this.shadowRoot!.querySelector(
        `app-window[id="${window.id}"]`,
      ) as HTMLElement;
      appWindowElement?.focus();
      return;
    }

    // if the window is not active, activate it and bring it to the front
    if (window.id !== this.ws.activeWindowId) {
      this.ws.activateWindow(window.id); // activate the window to bring it to the front
      return;
    }

    // if the window is already active, minimize it
    this.ws.minimizeWindow(window.id);
  }

  handleWindowMove(e: CustomEvent) {
    const { id, width, height, xPos, yPos } = e.detail;
    this.ws.moveWindow(id, width, height, xPos, yPos);
  }
}
