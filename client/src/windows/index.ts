import { customElement, FASTElement, html, css } from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import {
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  colorNeutralForeground1,
  webLightTheme,
  webDarkTheme,
} from '@phoenixui/themes';
import { setThemeFor } from '@fluentui/web-components';
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

  img {
    position: absolute;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
`;

const template = html`
  <img
    src=${(x: WindowsShell) =>
      x.ws.theme === 'dark'
        ? 'img/windows/desktopDark.jpg'
        : 'img/windows/desktopLight.jpg'}
    decoding="async"
    loading="lazy"
    alt="layers of transparent glass panes"
  />
  <task-bar></task-bar>
`;

@customElement({ name: 'windows-shell', template, styles })
export class WindowsShell extends FASTElement {
  @inject(WindowsService) ws!: WindowsService;

  connectedCallback() {
    super.connectedCallback();
    // set our theme for the OS
    setThemeFor(
      document.getElementsByTagName('app-root')[0] as HTMLElement,
      this.ws.theme === 'dark' ? webDarkTheme : webLightTheme,
    );
  }
}
