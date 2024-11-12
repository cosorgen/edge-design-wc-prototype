import EdgeSettingsSerivce from '#servicessettingsService.js';
import WindowsService from '#serviceswindowsService.js';
import {
  css,
  html,
  FASTElement,
  customElement,
  attr,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import { typographyStyles } from '@phoenixui/themes';
import '../controls/setting-entry.js';
import '../controls/setting-select.js';

const template = html<AppearanceSettings>`
  <h2>Overall appearance</h2>
  <setting-entry>
    <label for="theme">Theme</label>
    <select is="setting-select" id="theme" @change="${(x) => x.updateTheme()}">
      <option value="light" ?selected="${(x) => x.ws.theme === 'light'}">
        Light
      </option>
      <option value="dark" ?selected="${(x) => x.ws.theme === 'dark'}">
        Dark
      </option>
    </select>
  </setting-entry>
  <setting-entry>
    <label for="transparency">Transparency</label>
    <select
      is="setting-select"
      id="transparency"
      @change="${(x) => x.updateTransparency()}"
    >
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
  </setting-entry>
  <setting-entry>
    <label for="frame-spacing">Frame spacing</label>
    <phx-text-input
      id="frame-spacing"
      type="number"
      value="${(x) => parseInt(x.ss.frameSpacing)}"
      @change="${(x) => x.updateFrameSpacing()}"
    >
    </phx-text-input>
  </setting-entry>
`;

const styles = css`
  :host {
    display: block;
  }

  :host([hidden]) {
    display: none;
  }

  h2 {
    font-family: ${typographyStyles.body1Strong.fontFamily};
    font-size: ${typographyStyles.body1Strong.fontSize};
    font-weight: ${typographyStyles.body1Strong.fontWeight};
    line-height: 32px;
    margin: 0;
    user-select: none;
  }
`;

@customElement({ name: 'appearance-settings', template, styles })
export class AppearanceSettings extends FASTElement {
  @attr({ mode: 'boolean' }) hidden = false;
  @inject(EdgeSettingsSerivce) ss!: EdgeSettingsSerivce;
  @inject(WindowsService) ws!: WindowsService;

  updateFrameSpacing() {
    this.ss.setFrameSpacing(
      `${
        (this.shadowRoot?.getElementById('frame-spacing') as HTMLInputElement)
          ?.value || '0'
      }px`,
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
}
