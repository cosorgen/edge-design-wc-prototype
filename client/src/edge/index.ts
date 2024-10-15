import {
  FASTElement,
  customElement,
  html,
  css,
  when,
  observable,
  Observable,
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
import './views/copilot-entrypoint.js';
import './views/favorites-bar.js';
import './controls/side-pane.js';
import './views/copilot-sidepane.js';
import './views/caption-controls.js';

const template = html<MicrosoftEdge>`
  <div class="row" style="--spacingFrame: ${(x) => x.ss.frameSpacing}">
    <caption-controls></caption-controls>
    <div class="column">
      <tab-bar></tab-bar>
      <div id="activeTab">
        <div id="content">
          <tool-bar></tool-bar>
          ${when(
            (x) => x.shouldFavoritesBarRender(),
            html`<favorites-bar></favorites-bar>`,
          )}
          <web-content></web-content>
        </div>
      </div>
      ${when(
        (x) =>
          !x.ss.showLegacyCopilot && x.ews.activeSidepaneAppId !== 'Copilot',
        html`<copilot-entrypoint></copilot-entrypoint>`,
      )}
    </div>
    ${when(
      (x) => x.ews.activeSidepaneAppId,
      html`<side-pane id="${(x) => x.ews.activeSidepaneAppId}"></side-pane>`,
    )}
  </div>
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
    background-color: ${colorLayerBackgroundDialog};
    border-radius: ${borderRadiusLarge};
    box-shadow: ${shadow2};
    overflow: hidden;
  }

  .row {
    display: flex;
    flex-direction: row;
    gap: ${spacingFrame};
    height: 100%;
    min-height: 0px;
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: ${spacingFrame};
    width: 100%;
    min-width: 0px;
  }
`;

@customElement({
  name: 'microsoft-edge',
  template,
  styles,
})
export class MicrosoftEdge extends FASTElement {
  @inject(WindowsService) ws!: WindowsService;
  @inject(EdgeSettingsService) ss!: EdgeSettingsService;
  @observable ts!: TabService;
  @observable ews!: EdgeWindowService;

  constructor() {
    super();
    // Set up window state
    const container = DI.getOrCreateDOMContainer(this);
    this.ts = new TabService();
    this.ews = new EdgeWindowService();
    container.register(Registration.instance(TabService, this.ts));
    container.register(Registration.instance(EdgeWindowService, this.ews));
  }

  connectedCallback(): void {
    super.connectedCallback();

    // Set id for edge window
    this.ews.id = this.id;

    // Set up theme and subscribe to changes
    this.setTheme();
    Observable.getNotifier(this.ws).subscribe(this);
    Observable.getNotifier(this.ss).subscribe(this);
  }

  handleChange(source: unknown, propertyName: string) {
    if (
      propertyName === 'theme' ||
      propertyName === 'transparency' ||
      propertyName === 'frameSpacing'
    ) {
      this.setTheme();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    Observable.getNotifier(this.ws).unsubscribe(this);
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
    const themeKey = this.ss.theme === 'system' ? this.ws.theme : this.ss.theme;

    const selectedTheme = themes[this.ws.transparency][themeKey];
    selectedTheme.spacingFrame = this.ss.frameSpacing; // override from settings

    setThemeFor(this.shadowRoot!, selectedTheme);
  }

  shouldFavoritesBarRender() {
    return (
      this.ss.showFavoritesBar === 'always' ||
      (this.ss.showFavoritesBar === 'newtab' &&
        this.ts.getActiveTab()?.url === 'edge://newtab')
    );
  }
}
