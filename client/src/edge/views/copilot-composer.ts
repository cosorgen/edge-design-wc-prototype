import {
  html,
  css,
  FASTElement,
  customElement,
  Observable,
} from '@microsoft/fast-element';
import {
  acrylicBackgroundBlur,
  acrylicBackgroundLuminosity,
  colorLayerBackgroundDialog,
  colorNeutralForeground1,
  shadow28,
  spacingHorizontalS,
  spacingHorizontalXS,
  spacingVerticalXS,
  strokeWidthThin,
  typographyStyles,
} from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';
import '../controls/copilot-chat-entry.js';
import '../controls/copilot-design-provider.js';
import '../controls/copilot-input.js';
import './copilot-inline-chat.js';
import { inject } from '@microsoft/fast-element/di.js';
import { CopilotService } from '#servicescopilotService.js';
import { TabService } from '#servicestabService.js';
import { CopilotInlineChat } from './copilot-inline-chat.js';
import { CopilotInput } from '../controls/copilot-input.js';

const template = html<CopilotComposer>`
  <copilot-design-provider>
    <copilot-inline-chat></copilot-inline-chat>
    <div id="input-row">
      <div id="start">
        <phx-button appearance="subtle" size="large" icon-only>
          <img src="img/edge/copilot-icon.svg" />
        </phx-button>
      </div>
      <copilot-input
        placeholder="Message Copilot"
        @submit="${(x, c) => x.handleSubmit(c.event)}"
        @close="${(x) => x.handleClose()}"
      ></copilot-input>
      <div id="end">
        <phx-button appearance="subtle" size="large" icon-only slot="end">
          <svg>
            <use x="2" y="2" href="img/edge/icons.svg#add-24-regular" />
          </svg>
        </phx-button>
        <phx-button appearance="subtle" size="large" icon-only slot="end">
          <svg>
            <use x="2" y="2" href="img/edge/icons.svg#mic-new-24-regular" />
          </svg>
        </phx-button>
        <phx-button
          appearance="subtle"
          size="large"
          icon-only
          slot="end"
          @click="${(x) => x.handleClose(true)}"
        >
          <svg>
            <use x="2" y="2" href="img/edge/icons.svg#dismiss-24-regular" />
          </svg>
        </phx-button>
      </div>
    </div>
  </copilot-design-provider>
`;

const styles = css`
  copilot-design-provider {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background: ${acrylicBackgroundLuminosity};
    background-blend-mode: luminosity;
    backdrop-filter: blur(${acrylicBackgroundBlur});
    border: ${strokeWidthThin} solid ${colorLayerBackgroundDialog};
    border-radius: 28px;
    box-shadow: ${shadow28};
    overflow: hidden;

    color: ${colorNeutralForeground1};
    font-weight: ${typographyStyles.body2.fontWeight};
    font-family: ${typographyStyles.body2.fontFamily};
    font-size: ${typographyStyles.body2.fontSize};
    line-height: ${typographyStyles.body2.lineHeight};
  }

  #input-row {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: ${spacingHorizontalXS};
    padding: ${spacingHorizontalS};
  }

  #start,
  #end {
    display: flex;
    flex-direction: row;
    padding-block: ${spacingVerticalXS};
  }
`;

@customElement({
  name: 'copilot-composer',
  template,
  styles,
})
export class CopilotComposer extends FASTElement {
  @inject(CopilotService) cs!: CopilotService;
  @inject(TabService) ts!: TabService;
  _inputElement?: CopilotInput;
  _chatElement?: CopilotInlineChat;

  connectedCallback(): void {
    super.connectedCallback();
    this.setElements();
    this.addEventListeners();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListeners();
    this.unsestElements();
  }

  setElements() {
    this._inputElement = this.shadowRoot?.querySelector(
      'copilot-input',
    ) as CopilotInput;
    this._chatElement = this.shadowRoot?.querySelector(
      'copilot-inline-chat',
    ) as CopilotInlineChat;
  }

  unsestElements() {
    this._inputElement = undefined;
    this._chatElement = undefined;
  }

  addEventListeners() {
    Observable.getNotifier(this.ts).subscribe(this, 'activeTabId');
  }

  removeEventListeners() {
    Observable.getNotifier(this.cs).unsubscribe(this);
  }

  handleChange(subject: unknown, key: string) {
    if (key === 'activeTabId' || key === 'tabsById') {
      this.updateContext();
    }
  }

  handleSubmit(e: Event) {
    if (!(e instanceof CustomEvent)) return;

    const message = e.detail as string;
    if (!message) return;

    if (!this.cs.activeThreadId) {
      this.cs.newThread();
      if (this.ts.activeTabId) {
        this.cs.browserContextChanged(this.ts.tabsById[this.ts.activeTabId]);
      }
    }

    this.cs.send(message);
  }

  handleClose(notify = false) {
    this._chatElement?.clearChat();
    this._inputElement?.clearInput();
    this.cs.activeThreadId = undefined;
    notify && this.$emit('close');
  }

  updateContext() {
    if (this.ts.activeTabId) {
      this.cs.browserContextChanged(this.ts.tabsById[this.ts.activeTabId]);
    }
  }

  focus() {
    this._inputElement?.focus();
  }
}
