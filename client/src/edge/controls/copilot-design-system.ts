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
import {
  phoenixDarkThemeWin11,
  phoenixLightThemeWin11,
} from '@phoenixui/themes';
import { setThemeFor } from '@phoenixui/web-components';

const copilotLightTheme = {
  ...phoenixLightThemeWin11,
  backgroundGradient:
    '180deg, #FCF9F6 0%, #FCF9F6 60%, #FBEBE0 99%, #FDE5CD 100%',
  colorNeutralForeground1: '#33302E',
  colorNeutralCardBackground: '#fee5ce',
};
const copilotDarkTheme = {
  ...phoenixDarkThemeWin11,
  backgroundGradient:
    '180deg, rgba(16, 21, 36, 0.8) 0%, rgba(16, 21, 36, 0.8) 80%, rgba(16, 21, 36, 0.8) 100%',
  colorNeutralForeground1: '#F2DDCC',
  colorNeutralCardBackground: '#333333',
};

const template = html` <slot></slot> `;

@customElement({ name: 'copilot-design-system', template })
export class CopilotDesignSystem extends FASTElement {
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
