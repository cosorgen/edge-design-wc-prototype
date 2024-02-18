import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
} from '@microsoft/fast-element';
import {
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
} from '@phoenixui/themes';
import { setThemeFor } from '@fluentui/web-components';
import { phoenixLightThemeWin11 } from '@phoenixui/themes';

type OSTheme = 'light' | 'dark';
type OS = 'windows' | 'mac' | 'linux';

const backgroundImages = {
  light: {
    windows: '/img/desktopLight.jpg',
    mac: '/img/macLight.jpg',
    linux: '/img/linuxLight.jpg',
  },
  dark: {
    windows: '/img/desktopDark.jpg',
    mac: '/img/macDark.jpg',
    linux: '/img/linuxDark.jpg',
  },
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

const template = html`<div>
  <img
    src=${(x: AppRoot) => backgroundImages[x.theme][x.os]}
    decoding="async"
    loading="lazy"
    alt="layers of transparent glass panes"
  />
</div>`;

@customElement({ name: 'app-root', template, styles })
export class AppRoot extends FASTElement {
  @attr os: OS = 'windows';
  @attr theme: OSTheme = 'light';

  connectedCallback() {
    super.connectedCallback();
    // set our theme for the OS
    setThemeFor(
      document.getElementsByTagName('app-root')[0] as HTMLElement,
      phoenixLightThemeWin11,
    );
  }
}
