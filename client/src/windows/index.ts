import { customElement, FASTElement, html, css } from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import {
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  phoenixDarkThemeWin11,
} from '@phoenixui/themes';
import { setThemeFor } from '@fluentui/web-components';
import { phoenixLightThemeWin11 } from '@phoenixui/themes';
import WindowsService from './services/windowsService';

const backgroundImages = {
  light: '/img/desktopLight.jpg',
  dark: '/img/desktopDark.jpg',
};

const styles = css`
  :host {
    /* body1 */
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
  }

  img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
`;

const template = html`
  <main>
    <img
      src=${(x: WindowsShell) => backgroundImages[x.ws.theme]}
      decoding="async"
      loading="lazy"
      alt="layers of transparent glass panes"
    />
  </main>
`;

@customElement({ name: 'windows-shell', template, styles })
export class WindowsShell extends FASTElement {
  @inject(WindowsService) ws!: WindowsService;

  connectedCallback() {
    super.connectedCallback();
    // set our theme for the OS
    setThemeFor(
      document.getElementsByTagName('app-root')[0] as HTMLElement,
      this.ws.theme === 'dark' ? phoenixDarkThemeWin11 : phoenixLightThemeWin11,
    );
  }
}
