import {
  FASTElement,
  customElement,
  html,
  css,
  when,
} from '@microsoft/fast-element';
import { inject, DI, Registration } from '@microsoft/fast-element/di.js';
import {
  phoenixLightThemeWin11,
  colorNeutralForeground1,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  phoenixDarkThemeWin11,
  spacingVerticalXS,
  phoenixLightThemeSolidWin11,
  phoenixDarkThemeSolidWin11,
} from '@phoenixui/themes';
import { setThemeFor } from '@phoenixui/web-components';
import WindowsService from '#services/windowsService.js';
import settingsService from '#services/settingsService.js';
import { TabService } from '#services/tabService.js';
import '../windows/controls/mica-material.js';
import './views/tab-bar.js';
import './views/tool-bar.js';
import './views/web-content.js';

const template = html<MicrosoftEdge>`
  <tab-bar></tab-bar>
  <div id="activeTab">
    <mica-material></mica-material>
    <div id="content">
      <tool-bar></tool-bar>
      <div class="row" style="flex: 1;">
        <div class="column" style="flex: 1;">
          ${when(
            (x) => x.ss.showFavoritesBar === 'always',
            html`<favorites-bar></favorites-bar>`,
          )}
          <web-content></web-content>
        </div>
        ${when((x) => x.ss.showSideBar, html`<side-bar></side-bar>`)}
      </div>
    </div>
  </div>
`;

const styles = css`
  :host {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    color: ${colorNeutralForeground1};
    fill: currentColor;

    /* body1 */
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};

    --edge-frame-spacing: ${spacingVerticalXS};
  }

  #activeTab {
    position: relative;
    flex: 1;
    overflow: hidden;
  }

  #content {
    box-sizing: border-box;
    position: relative;
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

  tool-bar {
    z-index: 1;
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

  constructor() {
    super();
    // Set up window state
    const container = DI.getOrCreateDOMContainer(this);
    const ts = new TabService();
    container.register(Registration.instance(TabService, ts));

    // set up theme
    this.setTheme();
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
