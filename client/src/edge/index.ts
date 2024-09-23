import {
  FASTElement,
  customElement,
  html,
  css,
  when,
} from '@microsoft/fast-element';
import { inject, DI, Registration } from '@microsoft/fast-element/di.js';
import {
  colorNeutralForeground1,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  colorLayerBackgroundDialog,
  borderRadiusLarge,
  shadow2,
  colorLayerBackgroundApp,
} from '@phoenixui/themes';
import {
  edgeLightTheme,
  edgeDarkTheme,
  edgeDarkThemeSolid,
  edgeLightThemeSolid,
  spacingFrame,
} from './designSystem.js';
import { setThemeFor } from '@phoenixui/web-components';
import WindowsService from '#services/windowsService.js';
import EdgeSettingsService from '#services/settingsService.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import { TabService } from '#services/tabService.js';
import './views/tab-bar.js';
import './views/tool-bar.js';
import './views/web-content.js';
import './views/copilot-composer.js';

const template = html<MicrosoftEdge>`
  <tab-bar></tab-bar>
  <div id="activeTab">
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
  <copilot-composer></copilot-composer>
`;

const styles = css`
  :host {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    gap: ${spacingFrame};
    color: ${colorNeutralForeground1};
    fill: currentColor;
    background-color: ${colorLayerBackgroundApp};
    padding: ${spacingFrame};

    /* body1 */
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
  }

  #activeTab {
    position: relative;
    width: 100%;
    flex: 1;
    overflow: hidden;
    padding: 0 2px 2px 2px; /* for shadow */
    margin: 0 -2px -2px -2px; /* for shadow */
  }

  #content {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: ${spacingFrame};
    padding-block-start: ${spacingFrame};
    background-color: ${colorLayerBackgroundDialog};
    border-radius: ${borderRadiusLarge};
    box-shadow: ${shadow2};
    overflow: hidden;
  }

  .row {
    display: flex;
    flex-direction: row;
    gap: ${spacingFrame};
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: ${spacingFrame};
  }
`;

@customElement({
  name: 'microsoft-edge',
  template,
  styles,
})
export class MicrosoftEdge extends FASTElement {
  @inject(WindowsService) ws!: WindowsService;
  @inject(EdgeWindowService) ews!: EdgeWindowService;
  @inject(EdgeSettingsService) ss!: EdgeSettingsService;

  constructor() {
    super();
    // Set up window state
    const container = DI.getOrCreateDOMContainer(this);
    const ts = new TabService();
    const ews = new EdgeWindowService();
    container.register(Registration.instance(TabService, ts));
    container.register(Registration.instance(EdgeWindowService, ews));

    // set up theme
    this.setTheme();
  }

  setTheme() {
    // Set up edge design system
    const themes = {
      reduced: {
        light: edgeLightThemeSolid,
        dark: edgeDarkThemeSolid,
      },
      normal: {
        light: edgeLightTheme,
        dark: edgeDarkTheme,
      },
    };
    const selectedTheme =
      this.ss.theme === 'system' ? this.ws.theme : this.ss.theme;
    setThemeFor(this.shadowRoot!, themes[this.ws.transparency][selectedTheme]);
  }
}
