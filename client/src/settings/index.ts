import {
  css,
  html,
  FASTElement,
  customElement,
  observable,
} from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorBrandStroke,
  colorLayerBackgroundDialog,
  colorNeutralBackground1,
  colorNeutralForeground1,
  colorNeutralStroke2,
  colorNeutralStrokeAccessible,
  spacingHorizontalL,
  spacingHorizontalXL,
  spacingHorizontalS,
  spacingVerticalXS,
  strokeWidthThick,
  strokeWidthThin,
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
} from '@phoenixui/themes';
import '../windows/controls/mica-material.js';
import '@phoenixui/web-components/button.js';
import '@phoenixui/web-components/label.js';
import '@phoenixui/web-components/radio-group.js';
import '@phoenixui/web-components/radio.js';
import '@phoenixui/web-components/text-input.js';
import '@phoenixui/web-components/switch.js';
import '@phoenixui/web-components/field.js';
import {
  colorShellFillCaptionControlPrimaryHover,
  colorShellFillCaptionControlPrimaryPressed,
  colorShellForegroundCaptionControlPrimaryHover,
  colorShellForegroundCaptionControlPrimaryPressed,
} from '../windows/designSystem.js';
import { inject } from '@microsoft/fast-element/di.js';
import WindowsService from '#serviceswindowsService.js';
import EdgeSettingsSerivce from '#servicessettingsService.js';
import { TabService } from '#servicestabService.js';
import { CopilotService } from '#servicescopilotService.js';
import './views/appearance.js';

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
        <phx-button
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
        </phx-button>
        <phx-button
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
        </phx-button>
        <phx-button
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
        </phx-button>
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
      </div>

      <div id="main">
        <appearance-settings
          ?hidden="${(x) => x.selectedButton !== 'appearance'}"
        ></appearance-settings>

        <!-- Browser Section -->
        <div ?hidden="${(x) => x.selectedButton !== 'browser'}">
          <h2>Browser</h2>
          <div class="entry">
            <label for="favorites-bar">Show favorites bar</label>
            <select
              id="favorites-bar"
              @change="${(x) => x.updateShowFavoritesBar()}"
              value="${(x) => x.ss.showFavoritesBar}"
            >
              <option
                value="always"
                ?selected="${(x) => x.ss.showFavoritesBar === 'always'}"
              >
                Always
              </option>
              <option
                value="never"
                ?selected="${(x) => x.ss.showFavoritesBar === 'never'}"
              >
                Never
              </option>
              <option
                value="newtab"
                ?selected="${(x) => x.ss.showFavoritesBar === 'newtab'}"
              >
                On new tab
              </option>
            </select>
          </div>
          <div class="entry">
            <label for="shopping-trigger">Shopping trigger URL</label>
            <phx-text-input
              id="shopping-trigger"
              type="text"
              value="${(x) => x.ts.shoppingTriggerURL}"
              @blur="${(x) => x.updateShoppingTrigger()}"
            >
            </phx-text-input>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

const styles = css`
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

  select {
    padding: ${spacingVerticalXS} ${spacingHorizontalS};
    border-radius: ${borderRadiusMedium};
    border: ${strokeWidthThin} solid ${colorNeutralStroke2};
    border-bottom: ${strokeWidthThin} solid ${colorNeutralStrokeAccessible};
    background-color: ${colorNeutralBackground1};

    font-family: ${typographyStyles.body1.fontFamily};
    font-size: ${typographyStyles.body1.fontSize};
    font-weight: ${typographyStyles.body1.fontWeight};
    line-height: ${typographyStyles.body1.lineHeight};
    color: ${colorNeutralForeground1};
  }

  select:focus,
  select:focus-visible {
    border-bottom: ${strokeWidthThick} solid ${colorBrandStroke};
    outline: none;
  }

  select option {
    background-color: ${colorLayerBackgroundDialog};
    color: ${colorNeutralForeground1};
  }
`;

type Section = 'appearance' | 'browser';

@customElement({ name: 'windows-settings', template, styles })
export class WindowsSettings extends FASTElement {
  @inject(WindowsService) ws!: WindowsService;
  @inject(EdgeSettingsSerivce) ss!: EdgeSettingsSerivce;
  @inject(TabService) ts!: TabService;
  @inject(CopilotService) cs!: CopilotService;

  @observable selectedButton: Section = 'appearance';

  handleSidebarButtonClick(button: Section) {
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

  updateShowFavoritesBar() {
    this.ss.setShowFavoritesBar(
      ((this.shadowRoot?.querySelector('#favorites-bar') as HTMLSelectElement)
        ?.value as 'always' | 'never' | 'newtab') || 'never',
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
}
