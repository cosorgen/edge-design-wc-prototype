import { customElement, FASTElement, html, css } from '@microsoft/fast-element';
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
import './views/taskBar.js';

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

const template = html`
  <div id="desktop"></div>
  <task-bar></task-bar>
`;

@customElement({ name: 'windows-shell', template, styles })
export class WindowsShell extends FASTElement {
  @inject(WindowsService) ws!: WindowsService;

  connectedCallback() {
    super.connectedCallback();

    // set our theme for the OS
    setThemeFor(this, this.ws.theme);

    this.ws.openWindow('Microsoft Edge');
    console.log(this.ws.windowsById);
  }
}
