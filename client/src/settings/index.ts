import { css, html, FASTElement, customElement } from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorBrandStroke,
  colorLayerBackgroundDialog,
  colorNeutralBackground1,
  colorNeutralForeground1,
  colorNeutralStroke2,
  colorNeutralStrokeAccessible,
  spacingHorizontalL,
  spacingHorizontalS,
  spacingVerticalXS,
  strokeWidthThick,
  strokeWidthThin,
  typographyStyles,
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
import { Checkbox } from '@phoenixui/web-components';
import { TabService } from '#servicestabService.js';

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
    <div id="main">
      <div class="entry">
        <label for="theme">Theme</label>
        <select id="theme" @change="${(x) => x.updateTheme()}">
          <option value="light" ?selected="${(x) => x.ws.theme === 'light'}">
            Light
          </option>
          <option value="dark" ?selected="${(x) => x.ws.theme === 'dark'}">
            Dark
          </option>
        </select>
      </div>
      <div class="entry">
        <label for="transparency">Transparency</label>
        <select id="transparency" @change="${(x) => x.updateTransparency()}">
          <option
            value="normal"
            ?selected="${(x) => x.ws.transparency === 'normal'}"
          >
            Normal
          </option>
          <option
            value="reduced"
            ?selected="${(x) => x.ws.transparency === 'reduced'}"
          >
            Reduced
          </option>
        </select>
      </div>
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
        <label for="truncate-url">Truncate URL</label>
        <phx-switch
          slot="input"
          id="truncate-url"
          ?checked="${(x) => x.ss.truncateURL}"
          @change="${(x) => x.toggleTruncateUrl()}"
        ></phx-switch>
      </div>
      <div class="entry">
        <label for="legacy-copilot"> Show legacy copilot </label>
        <phx-switch
          slot="input"
          id="legacy-copilot"
          ?checked=${(x) => x.ss.showLegacyCopilot}
          @change="${(x) => x.toggleShowLegacyCopilot()}"
        ></phx-switch>
      </div>
      <div class="entry">
        <label for="legacy-newtab"> Show legacy new tab page </label>
        <phx-switch
          slot="input"
          id="legacy-newtab"
          ?checked=${(x) => x.ss.showLegacyNewTab}
          @change="${(x) => x.toggleShowLegacyNewTab()}"
        ></phx-switch>
      </div>
      <div class="entry">
        <label for="frame-spacing">Frame spacing</label>
        <phx-text-input
          id="frame-spacing"
          type="number"
          value="${(x) => parseInt(x.ss.frameSpacing)}"
          slot="input"
          @change="${(x) => x.updateFrameSpacing()}"
        >
        </phx-text-input>
      </div>
      <div class="entry">
        <label for="shopping-trigger">Shopping trigger URL</label>
        <phx-text-input
          id="shopping-trigger"
          type="text"
          value="${(x) => x.ts.shoppingTriggerURL}"
          slot="input"
          @blur="${(x) => x.updateShoppingTrigger()}"
        >
        </phx-text-input>
      </div>
    </div>
  </div>
`;

const styles = css`
  #content {
    position: absolute;
    inset: 0;
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
    margin: 0;
    user-select: none;
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
    display: flex;
    flex-direction: column;
    padding: ${spacingHorizontalL};
  }

  .entry {
    display: flex;
    flex-direction: row;
    min-height: 40px;
    align-items: center;
    gap: ${spacingHorizontalL};

    label {
      min-width: 160px;
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

@customElement({ name: 'windows-settings', template, styles })
export class WindowsSettings extends FASTElement {
  @inject(WindowsService) ws!: WindowsService;
  @inject(EdgeSettingsSerivce) ss!: EdgeSettingsSerivce;
  @inject(TabService) ts!: TabService;

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
      (this.shadowRoot?.querySelector('#legacy-copilot') as Checkbox)
        ?.checked || false,
    );
  }

  toggleTruncateUrl() {
    this.ss.setTruncateURL(
      (this.shadowRoot?.querySelector('#truncate-url') as Checkbox)?.checked ||
        false,
    );
  }

  toggleShowLegacyNewTab() {
    this.ss.setShowLegacyNewTab(
      (this.shadowRoot?.querySelector('#legacy-newtab') as Checkbox)?.checked ||
        false,
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
}
