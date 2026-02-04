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
import lightChromiumMapping from '@mai-ui/design-tokens/chromium-mapping/light-chromium-mapping.json' with { type: 'json' };
import darkChromiumMapping from '@mai-ui/design-tokens/chromium-mapping/dark-chromium-mapping.json' with { type: 'json' };
import maiPhoenixLight from '@mai-ui/design-tokens/themes/phoenix.light/phoenix.light.json' with { type: 'json' };
import maiPhoenixDark from '@mai-ui/design-tokens/themes/phoenix.dark/phoenix.dark.json' with { type: 'json' };
import maiCompactThemedLight from '@mai-ui/design-tokens/themes/compact-themed.light/compact-themed.light.json' with { type: 'json' };
import maiCompactThemedDark from '@mai-ui/design-tokens/themes/compact-themed.dark/compact-themed.dark.json' with { type: 'json' };
import maiCompactNeutralLight from '@mai-ui/design-tokens/themes/compact-neutral.light/compact-neutral.light.json' with { type: 'json' };
import maiCompactNeutralDark from '@mai-ui/design-tokens/themes/compact-neutral.dark/compact-neutral.dark.json' with { type: 'json' };
import maiBaselineLight from '@mai-ui/design-tokens/themes/default.light/default.light.json' with { type: 'json' };
import maiBaselineDark from '@mai-ui/design-tokens/themes/default.dark/default.dark.json' with { type: 'json' };
import { setThemeFor } from '@edge-design/utilities';
import {
  textStyleDefaultRegularWeight,
  backgroundWindowTabBandSolid,
  foregroundContentNeutralPrimary,
  textGlobalBody3FontSize,
  textGlobalBody3LineHeight,
  textStyleDefaultRegularFontFamily,
  backgroundCtrlBrandRest,
  foregroundCtrlOnBrandRest,
} from '@mai-ui/design-tokens/tokens.js';
import {
  ctrlTabBackgroundHorizontalActive,
  backgroundWindowTabBandInactive,
  backgroundWindowTabBandVerticalTabs,
} from '@mai-ui/design-tokens/edge-tokens.js';
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
import {
  applyChromiumTheme,
  type PaletteDefinition,
} from './applyChromiumTheme.js';

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
    font-size: ${textGlobalBody3FontSize};
    font-weight: ${textStyleDefaultRegularWeight};
    line-height: ${textGlobalBody3LineHeight};
  }

  :host([vertical-tabs-active]) {
    background-color: ${backgroundWindowTabBandVerticalTabs};
  }

  ::selection {
    background-color: ${backgroundCtrlBrandRest};
    color: ${foregroundCtrlOnBrandRest};
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

  :host([vertical-tabs-active]) #content {
    background-color: transparent;
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
  @attr({ mode: 'boolean', attribute: 'vertical-tabs-active' })
  verticalTabsActive = false;
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
    if (propertyName === 'verticalTabs') {
      this.verticalTabsActive = this.ss.verticalTabs;
    }
  }

  setTheme() {
    // Set up edge design system
    const themes = {
      'mai-phoenix': {
        light: maiPhoenixLight as unknown as Record<string, string>,
        dark: maiPhoenixDark as unknown as Record<string, string>,
      },
      'compact-themed': {
        light: maiCompactThemedLight as unknown as Record<string, string>,
        dark: maiCompactThemedDark as unknown as Record<string, string>,
      },
      'compact-neutral': {
        light: maiCompactNeutralLight as unknown as Record<string, string>,
        dark: maiCompactNeutralDark as unknown as Record<string, string>,
      },
      baseline: {
        light: maiBaselineLight as unknown as Record<string, string>,
        dark: maiBaselineDark as unknown as Record<string, string>,
      },
    };
    const themeKey = this.ss.theme === 'system' ? this.ws.theme : this.ss.theme;
    let selectedTheme = { ...themes[this.ss.designSystem][themeKey] };
    if (this.ss.themeColor) {
      selectedTheme = applyChromiumTheme(
        selectedTheme,
        (themeKey === 'dark'
          ? darkChromiumMapping
          : lightChromiumMapping) as Record<string, PaletteDefinition | string>,
        this.ss.themeColor,
        this.ss.themePalette,
      );
    }
    selectedTheme.paddingWindowDefault = this.ss.frameSpacing; // override from settings
    selectedTheme['smtc-corner-ctrl-hover'] =
      selectedTheme['smtc-corner-ctrl-rest']; // override to remove smtc corner radius
    selectedTheme['smtc-corner-ctrl-pressed'] =
      selectedTheme['smtc-corner-ctrl-rest']; // override to remove smtc corner radius
    setThemeFor(this.shadowRoot!, selectedTheme);
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
