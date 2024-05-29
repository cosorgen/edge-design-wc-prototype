import { FASTElement, customElement, html, css } from '@microsoft/fast-element';
import { inject, DI, Registration } from '@microsoft/fast-element/di.js';
import {
  phoenixLightThemeWin11,
  colorNeutralForeground1,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  phoenixDarkThemeWin11,
  spacingVerticalS,
  phoenixLightThemeSolidWin11,
  phoenixDarkThemeSolidWin11,
} from '@phoenixui/themes';
import { setThemeFor } from '@phoenixui/web-components';
import WindowsService from '#services/windowsService.js';
import settingsService from '#services/settingsService.js';
import { TabService } from '#services/tabService.js';
import '../windows/controls/mica-material.js';
import './views/tabBar.js';
import './views/toolBar.js';

const template = html<MicrosoftEdge>`
  <tab-bar></tab-bar>
  <tool-bar></tool-bar>
  <div id="activeTab">
    <mica-material></mica-material>
    <div id="content">
      <div class="row">
        <div class="column">
          ${(x) =>
            x.ss.showFavoritesBar === 'always'
              ? html`<favorites-bar></favorites-bar>`
              : ''}
          <web-content></web-content>
        </div>
        ${(x) => (x.ss.showSideBar ? html`<side-bar></side-bar>` : '')}
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
  @inject(settingsService) ss!: settingsService;

  connectedCallback() {
    super.connectedCallback();
    this.setTheme();

    // Set up window state
    const container = DI.getOrCreateDOMContainer(this);
    container.register(Registration.instance(TabService, new TabService()));
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
      this.ss.theme === 'system' ? this.ws.theme : this.ss.theme;
    setThemeFor(this.shadowRoot!, themes[this.ws.transparency][selectedTheme]);
  }
}
