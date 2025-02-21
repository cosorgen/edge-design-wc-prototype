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
import { colorNeutralForeground1, typographyStyles } from '@phoenixui/themes';
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
import '../windows/controls/mica-material.js';
import './views/tab-bar.js';
import './views/tool-bar.js';
import './views/web-content.js';
import './views/favorites-bar.js';
import './controls/side-pane.js';
import './views/caption-controls.js';

const template = html<MicrosoftEdge>`
  <tab-bar></tab-bar>
  <div id="activeTab">
    <mica-material></mica-material>
    <div id="content">
      <tool-bar></tool-bar>
      ${when(
        (x) => x.shouldFavoritesBarRender(),
        html`<favorites-bar></favorites-bar>`,
      )}
      <div class="row">
        <web-content></web-content>
        ${when(
          (x) => x.ews.activeSidepaneAppId,
          html`<side-pane
            id="${(x) => x.ews.activeSidepaneAppId}"
          ></side-pane>`,
        )}
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
    fill: currentcolor;

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
  }

  #content {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: ${spacingFrame};
    padding: ${spacingFrame};
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

    const tabId = this.ts.activeTabId;
    if (tabId) {
      if (this.ss.savePassword) {
        this.ts.navigateTab(tabId, 'https://www.figma.com/login');
        setTimeout(() => {
          this.ews.openOmniboxItem('save-password');
        }, 1000);
      } else {
        this.ts.navigateTab(
          tabId,
          'https://www.madmoizelle.com/soleil-bonheur-161498',
        );
        setTimeout(() => {
          this.ews.openOmniboxItem('translate');
        }, 1000);
      }
    }
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
