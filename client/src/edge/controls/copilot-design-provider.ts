import EdgeWindowService from '#servicesedgeWindowService.js';
import EdgeSettingsSerivce from '#servicessettingsService.js';
import WindowsService from '#serviceswindowsService.js';
import {
  html,
  FASTElement,
  customElement,
  Observable,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import { setThemeFor } from '@phoenixui/web-components';
import { copilotLightTheme, copilotDarkTheme } from '../copilotDesignSystem.js';

const template = html` <slot></slot> `;

@customElement({ name: 'copilot-design-provider', template })
export class CopilotDesignProvider extends FASTElement {
  @inject(EdgeWindowService) ews!: EdgeWindowService;
  @inject(EdgeSettingsSerivce) ess!: EdgeSettingsSerivce;
  @inject(WindowsService) ws!: WindowsService;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListeners();
    this.setTheme();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListeners();
  }

  addEventListeners() {
    Observable.getNotifier(this.ess).subscribe(this, 'theme');
    Observable.getNotifier(this.ws).subscribe(this, 'theme');
  }

  removeEventListeners() {
    Observable.getNotifier(this.ess).unsubscribe(this);
    Observable.getNotifier(this.ws).unsubscribe(this);
  }

  handleChange(target: unknown, property: string) {
    if (property === 'theme') this.setTheme();
  }

  setTheme() {
    const themes = {
      light: copilotLightTheme,
      dark: copilotDarkTheme,
    };
    const themeSelection =
      this.ess.theme === 'system' ? this.ws.theme : this.ess.theme;

    setThemeFor(this.shadowRoot!, themes[themeSelection]);
  }
}
