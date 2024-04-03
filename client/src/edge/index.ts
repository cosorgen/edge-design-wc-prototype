import { FASTElement, customElement, html, css } from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import {
  phoenixLightThemeWin11,
  colorNeutralForeground1,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  phoenixDarkThemeWin11,
  spacingVerticalS,
  tabActiveBackgroundBlur,
  tabActiveBackgroundLuminosity,
  tabActiveBackgroundColor,
  tabActiveBackgroundNormal,
  phoenixLightThemeSolidWin11,
  phoenixDarkThemeSolidWin11,
} from '@phoenixui/themes';
import { setTheme } from '@phoenixui/web-components';
import WindowsService from '#services/windowsService.js';
import EdgeService from '#services/edgeService.js';
import EdgeWindowService from '#services/edgeWindowService.js';
import './views/tabBar.js';
import { desktopBackground } from '../windows/designSystem.js';

const template = html<MicrosoftEdge>`
  <tab-bar></tab-bar>
  <div id="activeTab">
    <div class="material-layer" id="image"></div>
    <div class="material-layer" id="blur"></div>
    <div class="material-layer" id="luminosity"></div>
    <div class="material-layer" id="color"></div>
    <div class="material-layer" id="normal"></div>
    <div id="content">
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
    </div>
  </div>
`;

const styles = css`
  :host {
    width: 100%;
    height: 100%;
    color: ${colorNeutralForeground1};
    fill: currentColor;

    /* body1 */
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};

    --edge-frame-spacing: ${spacingVerticalS};
  }

  #activeTab {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .material-layer {
    position: absolute;
    inset: 0;
  }

  #image {
    width: 100vw;
    height: 100vh;
    background: ${desktopBackground};
    background-size: cover;
    background-position: center;
  }

  #blur {
    backdrop-filter: blur(calc(${tabActiveBackgroundBlur} / 2));
  }

  #luminosity {
    background: ${tabActiveBackgroundLuminosity};
    mix-blend-mode: luminosity;
  }

  #color {
    background: ${tabActiveBackgroundColor};
    mix-blend-mode: color;
  }

  #normal {
    background: ${tabActiveBackgroundNormal};
  }

  #content {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--edge-frame-spacing);
    padding: var(--edge-frame-spacing);
  }

  .row {
    display: flex;
    flex-direction: row;
    gap: var(--edge-frame-spacing);
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: var(--edge-frame-spacing);
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
    this.setTheme();
    this.positionMaterialImage();
  }

  setTheme() {
    // Set up edge design system
    const themes = {
      reduced: {
        light: phoenixLightThemeSolidWin11,
        dark: phoenixDarkThemeSolidWin11,
      },
      normal: {
        light: phoenixLightThemeWin11,
        dark: phoenixDarkThemeWin11,
      },
    };
    const selectedTheme =
      this.es.theme === 'system' ? this.ws.theme : this.es.theme;
    setTheme(themes[this.ws.transparency][selectedTheme], this.shadowRoot!);
  }

  positionMaterialImage() {
    const imgEl = this.shadowRoot!.getElementById('image') as HTMLElement;
    const { top, left } = imgEl.getBoundingClientRect();
    imgEl.style.top = `-${top}px`;
    imgEl.style.left = `-${left}px`;
  }
}
