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
  colorLayerBackgroundDialog,
  borderRadiusLarge,
  shadow2,
  colorLayerBackgroundApp,
  typographyStyles,
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
import './views/copilot-entrypoint/index.js';
import './views/favorites-bar.js';
import './controls/side-pane.js';
import './views/copilot-sidepane.js';
import './views/caption-controls.js';

const template = html<MicrosoftEdge>`
  <div class="row">
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
        (x) => !x.ss.showLegacyCopilot,
        html`<copilot-entrypoint
          ?ntp="${(x) =>
            x.ts.tabsById[x.ts.activeTabId!]?.url === 'edge://newtab'}"
          inline-position="center"
          block-position="end"
          active
        ></copilot-entrypoint>`,
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

    font-family: ${typographyStyles.body1.fontFamily};
    font-size: ${typographyStyles.body1.fontSize};
    font-weight: ${typographyStyles.body1.fontWeight};
    line-height: ${typographyStyles.body1.lineHeight};
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

  tool-bar,
  copilot-entrypoint {
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
  @inject(EdgeSettingsService) ss!: EdgeSettingsService;
  @observable ts!: TabService;
  @observable ews!: EdgeWindowService;
  _activeTabElement: HTMLElement | null = null;
  _copilotHandleElement: HTMLElement | null = null;

  constructor() {
    super();

    // Set up window state
    const container = DI.getOrCreateDOMContainer(this);
    this.ews = new EdgeWindowService();
    this.ts = new TabService();
    container.register(Registration.instance(TabService, this.ts));
    container.register(Registration.instance(EdgeWindowService, this.ews));
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.ews.id = this.id;
    this.setTheme();
    this.setElements();
    this.setEventListeners();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListeners();
    this.removeElements();
    Observable.getNotifier(this.ws).unsubscribe(this);
  }

  setElements() {
    this._copilotHandleElement =
      this.shadowRoot?.querySelector('copilot-entrypoint') || null;
    this._activeTabElement =
      this.shadowRoot?.getElementById('activeTab') || null;
  }

  removeElements() {
    this._copilotHandleElement = null;
    this._activeTabElement = null;
  }

  setEventListeners() {
    // Subscribe to changes in theme, transparency, and frame spacing
    Observable.getNotifier(this.ws).subscribe(this);
    Observable.getNotifier(this.ss).subscribe(this);
  }

  removeEventListeners() {
    Observable.getNotifier(this.ws).unsubscribe(this);
    Observable.getNotifier(this.ss).unsubscribe(this);
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
    if (!this.ts.activeTabId) return false;

    const activeTab = this.ts.tabsById[this.ts.activeTabId];
    return (
      this.ss.showFavoritesBar === 'always' ||
      (this.ss.showFavoritesBar === 'newtab' &&
        activeTab.url === 'edge://newtab')
    );
  }
}
