import {
  css,
  html,
  FASTElement,
  customElement,
  observable,
} from '@microsoft/fast-element';
import '../windows/controls/mica-material.js';
import '@edge-design/button/define.js';
import '@mai-ui/text-input/define.js';
import '@mai-ui/switch/define.js';
import '@mai-ui/dropdown/define.js';
import '@mai-ui/listbox/define.js';
import '@mai-ui/option/define.js';
import {
  colorLayerBackgroundDialog,
  colorNeutralForeground1,
  spacingHorizontalL,
  spacingHorizontalXL,
  typographyStyles,
  borderRadiusCircular,
  fontFamilyBase,
  fontSizeBase300,
  lineHeightBase300,
  colorSubtleBackgroundHover,
  colorSubtleBackgroundSelected,
  colorBrandForeground1,
  borderRadiusSmall,
  spacingHorizontalM,
  spacingVerticalS,
  colorShellFillCaptionControlPrimaryHover,
  colorShellFillCaptionControlPrimaryPressed,
  colorShellForegroundCaptionControlPrimaryHover,
  colorShellForegroundCaptionControlPrimaryPressed,
} from '@edge-design/windows-theme';
import { inject } from '@microsoft/fast-element/di.js';
import WindowsService from '#serviceswindowsService.js';
import EdgeSettingsSerivce from '#servicessettingsService.js';
import { TabService } from '#servicestabService.js';
import { CopilotService } from '#servicescopilotService.js';

const template = html<WindowsSettings>`
  <mica-material
    top="${(x) => x.ws.getWindowById(x.id)?.yPos}"
    left="${(x) => x.ws.getWindowById(x.id)?.xPos}"
  ></mica-material>
  <div id="content">
    <div id="nav">
      <h1>Settings</h1>
      <div id="grabber" @mousedown="${(x) => x.$emit('windowmovestart')}"></div>
      <div>
        <mai-button
          size="large"
          shape="square"
          appearance="subtle"
          icon-only
          @click="${(x) => x.minimizeWindow()}"
        >
          <svg>
            <use
              x="2"
              y="2"
              href="./img/edge/icons.svg#chrome-minimize-20-regular"
            />
          </svg>
        </mai-button>
        <mai-button
          size="large"
          shape="square"
          appearance="subtle"
          icon-only
          @click="${(x) => x.maximizeWindow()}"
        >
          <svg>
            <use
              x="2"
              y="2"
              href="./img/edge/icons.svg#chrome-${(x) =>
                x.windowIsMaximized() ? 'restore' : 'maximize'}-20-regular"
            />
          </svg>
        </mai-button>
        <mai-button
          size="large"
          shape="square"
          appearance="subtle"
          icon-only
          id="close"
          @click="${(x) => x.ws.closeWindow(x.id)}"
        >
          <svg>
            <use
              x="2"
              y="2"
              href="./img/edge/icons.svg#chrome-close-20-regular"
            />
          </svg>
        </mai-button>
      </div>
    </div>

    <div id="container">
      <div id="sidebar">
        <button
          class="${(x) =>
            x.selectedButton === 'appearance' ? 'selected' : ''}"
          @click="${(x) => x.handleSidebarButtonClick('appearance')}"
        >
          Overall appearance
        </button>
        <button
          class="${(x) => (x.selectedButton === 'browser' ? 'selected' : '')}"
          @click="${(x) => x.handleSidebarButtonClick('browser')}"
        >
          Browser
        </button>
        <button
          class="${(x) => (x.selectedButton === 'newtab' ? 'selected' : '')}"
          @click="${(x) => x.handleSidebarButtonClick('newtab')}"
        >
          New tab pages
        </button>
        <button
          class="${(x) => (x.selectedButton === 'copilot' ? 'selected' : '')}"
          @click="${(x) => x.handleSidebarButtonClick('copilot')}"
        >
          Copilot
        </button>
      </div>

      <div id="main">
        <!-- Overall Appearance Section -->
        <div ?hidden="${(x) => x.selectedButton !== 'appearance'}">
          <h2>Overall appearance</h2>
          <div class="entry">
            <label for="design-system">Design system</label>
            <mai-dropdown
              id="design-system"
              @change="${(x) => x.updateDesignSystem()}"
            >
              <mai-listbox>
                <mai-option
                  value="kumo"
                  ?selected="${(x) => x.ss.designSystem === 'kumo'}"
                >
                  Kumo
                </mai-option>
                <mai-option
                  value="phoenix"
                  ?selected="${(x) => x.ss.designSystem === 'phoenix'}"
                >
                  Phoenix
                </mai-option>
              </mai-listbox>
            </mai-dropdown>
          </div>
          <div class="entry">
            <label for="theme">Theme</label>
            <mai-dropdown id="theme" @change="${(x) => x.updateTheme()}">
              <mai-listbox>
                <mai-option
                  value="light"
                  ?selected="${(x) => x.ws.theme === 'light'}"
                >
                  Light
                </mai-option>
                <mai-option
                  value="dark"
                  ?selected="${(x) => x.ws.theme === 'dark'}"
                >
                  Dark
                </mai-option>
              </mai-listbox>
            </mai-dropdown>
          </div>
          <div class="entry">
            <label for="transparency">Transparency</label>
            <mai-dropdown
              id="transparency"
              @change="${(x) => x.updateTransparency()}"
            >
              <mai-listbox>
                <mai-option
                  value="normal"
                  ?selected="${(x) => x.ws.transparency === 'normal'}"
                >
                  Normal
                </mai-option>
                <mai-option
                  value="reduced"
                  ?selected="${(x) => x.ws.transparency === 'reduced'}"
                >
                  Reduced
                </mai-option>
              </mai-listbox>
            </mai-dropdown>
          </div>
          <div class="entry">
            <label for="frame-spacing">Frame spacing</label>
            <mai-text-input
              id="frame-spacing"
              type="number"
              value="${(x) => parseInt(x.ss.frameSpacing)}"
              @change="${(x) => x.updateFrameSpacing()}"
            >
            </mai-text-input>
          </div>
          <div class="entry">
            <label for="theme-color">Theme color</label>
            <input
              type="color"
              id="theme-color"
              value="${(x) => x.ss.themeColor}"
              @change="${(x) => x.updateThemeColor()}"
            />
          </div>
        </div>

        <!-- Browser Section -->
        <div ?hidden="${(x) => x.selectedButton !== 'browser'}">
          <h2>Browser</h2>
          <div class="entry">
            <label for="show-menus-l0">Show menus in L1</label>
            <mai-switch
              slot="input"
              id="show-menus-l0"
              ?checked="${(x) => x.ss.showMenusInL1}"
              @change="${(x) => x.toggleshowMenusInL1()}"
            ></mai-switch>
          </div>
          <div class="entry">
            <label for="favorites-bar">Show favorites bar</label>
            <mai-dropdown
              id="favorites-bar"
              @change="${(x) => x.updateShowFavoritesBar()}"
              value="${(x) => x.ss.showFavoritesBar}"
            >
              <mai-listbox>
                <mai-option
                  value="always"
                  ?selected="${(x) => x.ss.showFavoritesBar === 'always'}"
                >
                  Always
                </mai-option>
                <mai-option
                  value="never"
                  ?selected="${(x) => x.ss.showFavoritesBar === 'never'}"
                >
                  Never
                </mai-option>
                <mai-option
                  value="newtab"
                  ?selected="${(x) => x.ss.showFavoritesBar === 'newtab'}"
                >
                  On new tab
                </mai-option>
              </mai-listbox>
            </mai-dropdown>
          </div>
          <div class="entry">
            <label for="truncate-url">Truncate URL</label>
            <mai-switch
              id="truncate-url"
              ?checked="${(x) => x.ss.truncateURL}"
              @change="${(x) => x.toggleTruncateUrl()}"
            ></mai-switch>
          </div>
          <div class="entry">
            <label for="full-width-omnibox">Full width omnibox</label>
            <mai-switch
              slot="input"
              id="full-width-omnibox"
              ?checked="${(x) => x.ss.fullWidthOmnibox}"
              @change="${(x) => x.toggleFullWidthOmnibox()}"
            ></mai-switch>
          </div>
          <div class="entry">
            <label for="shopping-trigger">Shopping trigger URL</label>
            <mai-text-input
              id="shopping-trigger"
              type="text"
              value="${(x) => x.ts.shoppingTriggerURL}"
              @blur="${(x) => x.updateShoppingTrigger()}"
            >
            </mai-text-input>
          </div>
        </div>

        <!-- New Tab Pages Section -->
        <div ?hidden="${(x) => x.selectedButton !== 'newtab'}">
          <h2>New tab pages</h2>
          <div class="entry">
            <label for="legacy-newtab"> Show legacy new tab page </label>
            <mai-switch
              id="legacy-newtab"
              ?checked="${(x) => x.ss.showLegacyNewTab}"
              @change="${(x) => x.toggleShowLegacyNewTab()}"
            ></mai-switch>
          </div>
          <div class="entry">
            <label for="show-copilot-ntp"> Show copilot new tab page </label>
            <mai-switch
              slot="input"
              id="show-copilot-ntp"
              ?checked="${(x) => x.ss.showCopilotNTP}"
              @change="${(x) => x.toggleShowCopilotNTP()}"
            ></mai-switch>
          </div>
        </div>

        <!-- Copilot Section -->
        <div ?hidden="${(x) => x.selectedButton !== 'copilot'}">
          <h2>Copilot</h2>
          <div class="entry">
            <label for="legacy-copilot"> Show legacy copilot </label>
            <mai-switch
              id="legacy-copilot"
              ?checked="${(x) => x.ss.showLegacyCopilot}"
              @change="${(x) => x.toggleShowLegacyCopilot()}"
            ></mai-switch>
          </div>
          <div class="entry">
            <label for="composer-hint"> Show composer hint </label>
            <mai-switch
              id="composer-hint"
              ?checked="${(x) => x.cs.showHint}"
              @change="${(x) => x.toggleShowComposerHint()}"
            ></mai-switch>
          </div>
          <div class="entry">
            <label for="legacy-newtab"> Auto open composer on hover </label>
            <mai-switch
              id="composer-auto-open"
              ?checked="${(x) => x.cs.autoOpen}"
              @change="${(x) => x.toggleAutoOpenComposer()}"
            ></mai-switch>
          </div>
          <div class="entry">
            <label for="composer-auto-open-delay"
              >Composer auto open delay (ms)</label
            >
            <mai-text-input
              id="composer-auto-open-delay"
              type="number"
              value="${(x) => x.cs.autoOpenDelay}"
              @change="${(x) => x.updateComposerAutoOpenDelay()}"
              ?disabled="${(x) => !x.cs.autoOpen}"
            >
            </mai-text-input>
          </div>
          <div class="entry">
            <label for="copilot-sidepane-background">
              Copilot sidepane background
            </label>
            <mai-switch
              id="copilot-sidepane-background"
              ?checked="${(x) => x.cs.sidepaneBackground}"
              @change="${(x) => x.toggleShowSidepaneBackground()}"
            ></mai-switch>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

const styles = css`
  :host {
    --smtc-background-layer-primarysolid: ${colorLayerBackgroundDialog};
  }

  #container {
    display: flex;
    height: 100vh;
    padding: ${spacingHorizontalM};
    gap: ${spacingHorizontalXL};
  }

  #content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    overflow: hidden;
  }

  #nav {
    display: flex;
    align-items: center;
    padding-inline-start: ${spacingHorizontalL};
    --smtc-corner-ctrl-rest: 0px;
    --smtc-corner-ctrl-hover: 0px;
    --smtc-corner-ctrl-pressed: 0px;
  }

  h1 {
    font-family: ${typographyStyles.subtitle2.fontFamily};
    font-size: ${typographyStyles.subtitle2.fontSize};
    font-weight: ${typographyStyles.subtitle2.fontWeight};
    line-height: ${typographyStyles.subtitle2.lineHeight};
    padding-top: ${spacingVerticalS};
    margin: 0;
    user-select: none;
  }

  h2 {
    font-family: ${typographyStyles.body1Strong.fontFamily};
    font-size: ${typographyStyles.body1Strong.fontSize};
    font-weight: ${typographyStyles.body1Strong.fontWeight};
    line-height: 32px;
    margin: 0;
    user-select: none;
  }

  button {
    position: relative;
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    padding-left: ${spacingHorizontalM};
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: ${borderRadiusSmall};

    /* Body1 */
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    color: ${colorNeutralForeground1};
  }

  button:hover {
    background: ${colorSubtleBackgroundHover};
  }

  button.selected {
    background: ${colorSubtleBackgroundSelected};
  }

  button.selected::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 16px;
    background-color: ${colorBrandForeground1};
    border-radius: ${borderRadiusCircular};
  }

  #sidebar {
    width: 200px;
    display: flex;
    flex-direction: column;
  }

  #close:hover {
    background-color: ${colorShellFillCaptionControlPrimaryHover};
    color: ${colorShellForegroundCaptionControlPrimaryHover};
  }

  #close:active {
    background-color: ${colorShellFillCaptionControlPrimaryPressed};
    color: ${colorShellForegroundCaptionControlPrimaryPressed};
  }

  #grabber {
    flex: 1;
    height: 40px;
    user-select: none;
  }

  #main {
    overflow-y: auto;
  }

  .entry {
    display: flex;
    flex-direction: row;
    min-height: 40px;
    align-items: center;
    gap: ${spacingHorizontalL};
    grid-column: span 1;

    label {
      width: 200px;
    }
  }

  @media (max-width: 768px) {
    #main {
      grid-template-columns: 1fr; /* Switch to single column on small screens */
    }
  }
`;

@customElement({ name: 'windows-settings', template, styles })
export class WindowsSettings extends FASTElement {
  @inject(WindowsService) ws!: WindowsService;
  @inject(EdgeSettingsSerivce) ss!: EdgeSettingsSerivce;
  @inject(TabService) ts!: TabService;
  @inject(CopilotService) cs!: CopilotService;

  @observable selectedButton = 'appearance';

  handleSidebarButtonClick(button: string) {
    this.selectedButton = button;
  }

  handleTitleBarMouseDown() {
    this.$emit('windowmovestart');
  }

  closeWindow() {
    this.ws.closeWindow(this.ws.activeWindowId);
  }

  minimizeWindow() {
    this.ws.minimizeWindow(this.ws.activeWindowId);
  }

  windowIsMaximized() {
    return this.ws.getWindowById(this.id)?.maximized || false;
  }

  maximizeWindow() {
    this.ws.maximizeWindow(this.ws.activeWindowId, !this.windowIsMaximized());
  }

  updateFrameSpacing() {
    this.ss.setFrameSpacing(
      `${
        (this.shadowRoot?.getElementById('frame-spacing') as HTMLInputElement)
          ?.value || '0'
      }px`,
    );
  }

  toggleShowLegacyCopilot() {
    this.ss.setShowLegacyCopilot(
      (this.shadowRoot?.querySelector('#legacy-copilot') as HTMLInputElement)
        ?.checked || false,
    );
  }

  toggleShowCopilotNTP() {
    this.ss.setShowCopilotNTP(
      (this.shadowRoot?.querySelector('#show-copilot-ntp') as HTMLInputElement)
        ?.checked || false,
    );
  }

  toggleTruncateUrl() {
    this.ss.setTruncateURL(
      (this.shadowRoot?.querySelector('#truncate-url') as HTMLInputElement)
        ?.checked || false,
    );
  }

  toggleShowLegacyNewTab() {
    this.ss.setShowLegacyNewTab(
      (this.shadowRoot?.querySelector('#legacy-newtab') as HTMLInputElement)
        ?.checked || false,
    );
  }

  toggleshowMenusInL1() {
    this.ss.setShowMenusInL1(
      (this.shadowRoot?.querySelector('#show-menus-l0') as HTMLInputElement)
        ?.checked || false,
    );
  }

  toggleFullWidthOmnibox() {
    this.ss.setFullWidthOmnibox(
      (
        this.shadowRoot?.querySelector(
          '#full-width-omnibox',
        ) as HTMLInputElement
      )?.checked || false,
    );
  }

  updateShowFavoritesBar() {
    this.ss.setShowFavoritesBar(
      ((this.shadowRoot?.querySelector('#favorites-bar') as HTMLSelectElement)
        ?.value as 'always' | 'never' | 'newtab') || 'never',
    );
  }

  updateTheme() {
    this.ws.setTheme(
      ((this.shadowRoot?.querySelector('#theme') as HTMLSelectElement)
        ?.value as 'light' | 'dark') || 'light',
    );
  }

  updateTransparency() {
    this.ws.setTransparency(
      ((this.shadowRoot?.querySelector('#transparency') as HTMLSelectElement)
        ?.value as 'normal' | 'reduced') || 'normal',
    );
  }

  updateShoppingTrigger() {
    const newTrigger = (
      this.shadowRoot?.querySelector('#shopping-trigger') as HTMLInputElement
    ).value;
    if (newTrigger && newTrigger !== '') {
      this.ts.updateShoppingTriggerURL(newTrigger);
    }
  }

  toggleShowComposerHint() {
    this.cs.setShowHint(
      (this.shadowRoot?.querySelector('#composer-hint') as HTMLInputElement)
        ?.checked || false,
    );
  }

  toggleAutoOpenComposer() {
    this.cs.setAutoOpen(
      (
        this.shadowRoot?.querySelector(
          '#composer-auto-open',
        ) as HTMLInputElement
      )?.checked || false,
    );
  }

  updateComposerAutoOpenDelay() {
    const newDelay = parseInt(
      (
        this.shadowRoot?.querySelector(
          '#composer-auto-open-delay',
        ) as HTMLInputElement
      ).value,
    );
    if (newDelay && newDelay !== 0) {
      this.cs.setAutoOpenDelay(newDelay);
    }
  }

  toggleShowSidepaneBackground() {
    this.cs.setShowSidepaneBackground(
      (
        this.shadowRoot?.querySelector(
          '#copilot-sidepane-background',
        ) as HTMLInputElement
      )?.checked || false,
    );
  }

  updateThemeColor() {
    const newColor = (
      this.shadowRoot?.querySelector('#theme-color') as HTMLInputElement
    ).value;
    if (newColor && newColor !== '') {
      this.ss.setThemeColor(newColor);
    }
  }

  updateDesignSystem() {
    const newDesignSystem = (
      this.shadowRoot?.querySelector('#design-system') as HTMLSelectElement
    ).value as 'kumo' | 'phoenix';
    if (newDesignSystem) {
      this.ss.setDesignSystem(newDesignSystem);
    }
  }
}
