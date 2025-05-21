import {
  FASTElement,
  customElement,
  html,
  css,
  when,
  observable,
  Observable,
  attr,
} from '@microsoft/fast-element';
import { inject, DI, Registration } from '@microsoft/fast-element/di.js';
import {
  kumoLightTheme,
  kumoDarkTheme,
  phoenixSmtcLightTheme,
  phoenixSmtcDarkTheme,
  lightChromiumMapping,
  darkChromiumMapping,
} from '@phoenixui/themes';
import { setSmtcThemeFor } from '@phoenixui/web-components';
import {
  textStyleDefaultRegularWeight,
  ctrlTabBackgroundHorizontalActive,
  backgroundWindowTabbandSolid,
  foregroundContentNeutralPrimary,
  textGlobalBody3Fontsize,
  textGlobalBody3Lineheight,
  textStyleDefaultRegularFontfamily,
  backgroundWindowTabbandInactive,
  backgroundCtrlBrandRest,
  foregroundCtrlOnbrandRest,
} from '@phoenixui/themes/smtc-tokens.js';
import WindowsService from '#services/windowsService.js';
import EdgeSettingsService from '#services/settingsService.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import { TabService } from '#services/tabService.js';
import './views/tab-bar.js';
import './views/title-bar.js';
import './views/vertical-tab-bar.js';
import './views/tool-bar.js';
import './views/web-content.js';
import './views/copilot-entrypoint/index.js';
import './views/favorites-bar.js';
import './controls/side-pane.js';
import './views/copilot-sidepane.js';
import './views/caption-controls.js';
import { applyChromiumTheme } from './applyChromiumTheme.js';

const template = html<MicrosoftEdge>`
  <caption-controls></caption-controls>
  ${when(
    (x) => x.ss.verticalTabs,
    html`<title-bar></title-bar>`,
    html`<tab-bar></tab-bar>`,
  )}
  <div class="row">
    <div id="activeTab">
      <div id="content">
        <tool-bar></tool-bar>
        ${when(
          (x) => x.shouldFavoritesBarRender(),
          html`<favorites-bar></favorites-bar>`,
        )}
        <div id="web-vertical-tabs">
          ${when(
            (x) => x.ss.verticalTabs,
            html`<vertical-tab-bar></vertical-tab-bar>`,
          )}
          <web-content></web-content>
        </div>
      </div>
    </div>
    ${when(
      (x) => x.ews.activeSidepaneAppId,
      html`<side-pane id="${(x) => x.ews.activeSidepaneAppId}"></side-pane>`,
    )}
  </div>
  ${when(
    (x) => !x.ss.showLegacyCopilot,
    html`<copilot-entrypoint
      ?ntp="${(x) => x.ts.tabsById[x.ts.activeTabId!]?.url === 'edge://newtab'}"
      inline-position="center"
      block-position="end"
    ></copilot-entrypoint>`,
  )}
`;

const styles = css`
  :host {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    background-color: ${(x) =>
      x.ws.activeWindowId === x.id
        ? backgroundWindowTabbandSolid
        : backgroundWindowTabbandInactive};
    color: ${foregroundContentNeutralPrimary};
    fill: currentColor;

    font-family: ${textStyleDefaultRegularFontfamily};
    font-size: ${textGlobalBody3Fontsize};
    font-weight: ${textStyleDefaultRegularWeight};
    line-height: ${textGlobalBody3Lineheight};
  }

  ::selection {
    background-color: ${backgroundCtrlBrandRest};
    color: ${foregroundCtrlOnbrandRest};
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
    background-color: ${ctrlTabBackgroundHorizontalActive};
    overflow: hidden;
  }

  #web-vertical-tabs {
    display: flex;
    flex-direction: row;
    height: 100%;
    overflow: hidden;
  }

  .row {
    display: flex;
    flex-direction: row;
    gap: var(--paddingWindowDefault);
    height: 100%;
    min-height: 0px;
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: var(--paddingWindowDefault);
    width: 100%;
    min-width: 0px;
  }

  tool-bar,
  copilot-entrypoint {
    z-index: 1;
  }
`;

@customElement({ name: 'microsoft-edge', template, styles })
export class MicrosoftEdge extends FASTElement {
  @attr id!: string;
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
      propertyName === 'frameSpacing' ||
      propertyName === 'edgeTheme' ||
      propertyName === 'themeColor' ||
      propertyName === 'designSystem' ||
      propertyName === 'themePalette'
    ) {
      this.clearTheme();
      this.setTheme();
    }
  }

  setTheme() {
    // Set up edge design system
    const themes = {
      kumo: {
        light: kumoLightTheme,
        dark: kumoDarkTheme,
      },
      phoenix: {
        light: phoenixSmtcLightTheme,
        dark: phoenixSmtcDarkTheme,
      },
    };
    const themeKey = this.ss.theme === 'system' ? this.ws.theme : this.ss.theme;
    let selectedTheme = themes[this.ss.designSystem][themeKey];
    if (this.ss.themeColor) {
      selectedTheme = applyChromiumTheme(
        selectedTheme,
        themeKey === 'dark' ? darkChromiumMapping : lightChromiumMapping,
        this.ss.themeColor,
        this.ss.themePalette,
      );
    }
    selectedTheme.paddingWindowDefault = this.ss.frameSpacing; // override from settings
    setSmtcThemeFor(this.shadowRoot!, selectedTheme);
  }

  clearTheme() {
    while (this.shadowRoot!.adoptedStyleSheets.length > 1) {
      // Remove all but the first stylesheet
      this.shadowRoot!.adoptedStyleSheets.pop();
    }
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
