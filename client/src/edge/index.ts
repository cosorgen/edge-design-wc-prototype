import { FASTElement, customElement, html, css } from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import {
  micaBackdropFilter,
  micaBackgroundBlendMode,
  micaBackgroundColor,
  phoenixLightThemeWin11,
  colorNeutralForeground1,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  phoenixDarkThemeWin11,
} from '@phoenixui/themes';
import { setTheme } from '@phoenixui/web-components';
import WindowsService from '#services/windowsService.js';
import EdgeService from '#services/edgeService.js';
import EdgeWindowService from '#services/edgeWindowService.js';
import './views/tabBar.js';

const template = html<MicrosoftEdge>`
  <tab-bar></tab-bar>
  <address-bar></address-bar>
  <div class="row">
    <div class="column">
      ${(x) =>
        x.es.showFavoritesBar === 'always'
          ? html`<favorites-bar></favorites-bar>`
          : ''}
      <web-content></web-content>
    </div>
    ${(x) => (x.es.showSideBar ? html`<side-bar></side-bar>` : '')}
  </div>
`;

const styles = css`
  :host {
    display: block;
    width: 100%;
    height: 100%;
    background: ${micaBackgroundColor};
    backdrop-filter: ${micaBackdropFilter};
    background-blend-mode: ${micaBackgroundBlendMode};
    color: ${colorNeutralForeground1};
    fill: currentColor;

    /* body1 */
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
  }
`;

@customElement({
  name: 'microsoft-edge',
  template,
  styles,
})
export class MicrosoftEdge extends FASTElement {
  @inject(WindowsService) ws!: WindowsService;
  @inject(EdgeService) es!: EdgeService;
  ews = new EdgeWindowService();

  connectedCallback() {
    super.connectedCallback();

    // Set up edge design system
    const selectedTheme =
      this.es.theme === 'system' ? this.ws.theme : this.es.theme;
    const derivedTheme =
      selectedTheme === 'dark' ? phoenixDarkThemeWin11 : phoenixLightThemeWin11;
    setTheme(derivedTheme, this.shadowRoot!);
  }
}
