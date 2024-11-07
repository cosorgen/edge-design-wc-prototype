import EdgeWindowService from '#servicesedgeWindowService.js';
import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import { colorNeutralForeground1, spacingVerticalXL } from '@phoenixui/themes';
import '../controls/copilot-design-provider.js';
import './copilot-chat.js';
import EdgeSettingsSerivce from '#servicessettingsService.js';
import WindowsService from '#serviceswindowsService.js';

const template = html`
  <copilot-design-provider>
    <copilot-chat></copilot-chat>
  </copilot-design-provider>
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    color: ${colorNeutralForeground1};
  }

  copilot-design-provider {
    flex: 1;
    margin-bottom: calc(${spacingVerticalXL} + 68px);
    overflow-y: auto;
    overflow-x: hidden;
  }

  copilot-inline-chat {
    width: 100%;
    height: 100%;
  }
`;

@customElement({
  name: 'copilot-sidepane',
  template,
  styles,
})
export class CopilotSidepane extends FASTElement {
  @inject(EdgeWindowService) ews!: EdgeWindowService;
  @inject(EdgeSettingsSerivce) ess!: EdgeSettingsSerivce;
  @inject(WindowsService) ws!: WindowsService;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListeners();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListeners();
  }

  addEventListeners() {
    this.addEventListener('close', this.handleClose);
  }

  removeEventListeners() {
    this.removeEventListener('close', this.handleClose);
  }

  handleClose = () => {
    this.ews.closeSidepaneApp();
  };
}
