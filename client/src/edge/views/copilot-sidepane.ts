import {
  html,
  css,
  FASTElement,
  customElement,
  Observable,
  attr,
} from '@microsoft/fast-element';
import {
  acrylicBackgroundBlur,
  acrylicBackgroundLuminosity,
  colorNeutralForeground1,
  shadow2,
} from '@phoenixui/themes';
import '../controls/copilot-design-provider.js';
import './copilot-chat.js';
import { inject } from '@microsoft/fast-element/di.js';
import { CopilotService } from '#servicescopilotService.js';

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

  :host([background]) {
    background: ${acrylicBackgroundLuminosity};
    background-blend-mode: luminosity;
    backdrop-filter: blur(${acrylicBackgroundBlur});
    box-shadow: ${shadow2};
  }

  copilot-design-provider {
    flex: 1;
    overflow: hidden;
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
  @inject(CopilotService) cs!: CopilotService;
  @attr({ mode: 'boolean' }) background = false;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListeners();
    this.reflectAttributes();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListeners();
  }

  addEventListeners() {
    Observable.getNotifier(this.cs).subscribe(this, 'sidepaneBackground');
  }

  removeEventListeners() {
    Observable.getNotifier(this.cs).unsubscribe(this, 'sidepaneBackground');
  }

  handleChange(obj: unknown, key: string) {
    if (key === 'sidepaneBackground') {
      this.reflectAttributes();
    }
  }

  reflectAttributes() {
    this.background = this.cs.sidepaneBackground;
  }
}
