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
  lightTheme as kumoLightThemeThemable,
  darkTheme as kumoDarkThemeThemable,
  setThemeFor,
} from '@edge-design/kumo-theme';
import { lightTheme as kumoLightTheme } from '@edge-design/kumo-theme/lightTheme.js';
import { darkTheme as kumoDarkTheme } from '@edge-design/kumo-theme/darkTheme.js';
import {
  lightTheme as phoenixKumoLightThemeThemable,
  darkTheme as phoenixKumoDarkThemeThemable,
} from '@edge-design/phoenix-theme';
import { lightTheme as phoenixKumoLightTheme } from '@edge-design/phoenix-theme/lightTheme.js';
import { darkTheme as phoenixKumoDarkTheme } from '@edge-design/phoenix-theme/darkTheme.js';
import {
  phoenixLightThemeSolidWin11,
  phoenixDarkThemeSolidWin11,
} from '@phoenixui/themes';
import { setThemeFor as phxSetThemeFor } from '@phoenixui/web-components';
import {
  textStyleDefaultRegularWeight,
  ctrlTabBackgroundHorizontalActive,
  backgroundWindowTabBandSolid,
  foregroundContentNeutralPrimary,
  textGlobalBody3Fontsize,
  textGlobalBody3Lineheight,
  textStyleDefaultRegularFontFamily,
  paddingWindowDefault,
  backgroundWindowTabBandInactive,
  backgroundCtrlBrandRest,
  foregroundCtrlOnbrandRest,
} from '@edge-design/kumo-theme/tokens.js';
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
        ? backgroundWindowTabBandSolid
        : backgroundWindowTabBandInactive};
    color: ${foregroundContentNeutralPrimary};
    fill: currentColor;

    font-family: ${textStyleDefaultRegularFontFamily};
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
    gap: ${paddingWindowDefault};
    height: 100%;
    min-height: 0px;
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: ${paddingWindowDefault};
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
      propertyName === 'designSystem'
    ) {
      this.clearTheme();
      this.setTheme();
    }
  }

  setTheme() {
    // Set up edge design system
    const themes = {
      kumo: {
        default: {
          light: kumoLightTheme,
          dark: kumoDarkTheme,
        },
        themable: {
          light: kumoLightThemeThemable,
          dark: kumoDarkThemeThemable,
        },
      },
      phoenix: {
        default: {
          light: phoenixKumoLightTheme,
          dark: phoenixKumoDarkTheme,
        },
        themable: {
          light: phoenixKumoLightThemeThemable,
          dark: phoenixKumoDarkThemeThemable,
        },
      },
    };
    const themeKey = this.ss.theme === 'system' ? this.ws.theme : this.ss.theme;
    let selectedTheme =
      themes[this.ss.designSystem][this.ss.themeColor ? 'themable' : 'default'][
        themeKey
      ];
    if (this.ss.themeColor) {
      selectedTheme = selectedTheme(this.ss.themeColor);
    }
    selectedTheme.paddingWindowDefault = this.ss.frameSpacing; // override from settings
    setThemeFor(this.shadowRoot!, selectedTheme);
    if (this.ss.designSystem === 'phoenix' && this.ss.themeColor) {
      phxSetThemeFor(
        this.shadowRoot!,
        themeKey === 'dark'
          ? phoenixDarkThemeSolidWin11
          : phoenixLightThemeSolidWin11,
      );
    }
  }

  clearTheme() {
    this.shadowRoot!.adoptedStyleSheets.pop();
    if (this.ss.designSystem === 'kumo' && this.ss.themeColor) {
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
