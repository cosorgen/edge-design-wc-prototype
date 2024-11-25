import {
  html,
  css,
  FASTElement,
  customElement,
  Observable,
} from '@microsoft/fast-element';
import {
  colorNeutralForeground1,
  spacingHorizontalS,
  spacingHorizontalXS,
  spacingVerticalXS,
  strokeWidthThin,
  typographyStyles,
  smtcCornerComposerRest,
  smtcEffectInnerShineStrong,
  smtcShadowLarge,
} from '@mai-ui/copilot-theme';
import '@mai-ui/button/define.js';
import '../../windows/controls/acrylic-material.js';
import '../controls/copilot-chat-entry.js';
import '../controls/copilot-design-provider.js';
import '../controls/copilot-input.js';
import './copilot-chat.js';
import { inject } from '@microsoft/fast-element/di.js';
import { CopilotService } from '#servicescopilotService.js';
import { TabService } from '#servicestabService.js';
import { CopilotChat } from './copilot-chat.js';
import { CopilotInput } from '../controls/copilot-input.js';
import EdgeWindowService from '#servicesedgeWindowService.js';

const template = html<CopilotComposer>`
  <copilot-design-provider>
    <acrylic-material></acrylic-material>
    <copilot-chat
      inline
      ?hidden="${(x) => x.ews.activeSidepaneAppId === 'Copilot'}"
    ></copilot-chat>
    <div id="input-row">
      <div id="start">
        <mai-button appearance="subtle" size="large" id="home" icon-only>
          <img src="img/edge/copilot-icon.svg" />
        </mai-button>
        <mai-button appearance="subtle" size="large" id="add" icon-only>
          <svg>
            <use x="2" y="2" href="img/edge/icons.svg#add-24-regular" />
          </svg>
        </mai-button>
      </div>
      <copilot-input
        placeholder="Message Copilot"
        @click="${(x) => x.focus()}"
        @submit="${(x, c) => x.handleSubmit(c.event)}"
        @close="${(x) => x.handleClose()}"
      ></copilot-input>
      <div id="end">
        <mai-button appearance="subtle" size="large" icon-only>
          <svg>
            <use x="2" y="2" href="img/edge/icons.svg#mic-new-24-regular" />
          </svg>
        </mai-button>
        <mai-button
          appearance="subtle"
          size="large"
          icon-only
          @click="${(x) => x.handleClose(true)}"
          class="${(x) =>
            x.ews.activeSidepaneAppId === 'Copilot' ||
            x.ews.activeSidepaneAppId === 'Legacy Copilot'
              ? 'hidden'
              : 'show'}"
        >
          <svg>
            <use x="2" y="2" href="img/edge/icons.svg#dismiss-24-regular" />
          </svg>
        </mai-button>
      </div>
    </div>
  </copilot-design-provider>
`;

const styles = css`
  copilot-design-provider {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    min-width: 16px;
    min-height: 16px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    color: ${colorNeutralForeground1};
    font-weight: ${typographyStyles.body2.fontWeight};
    font-family: ${typographyStyles.body2.fontFamily};
    font-size: ${typographyStyles.body2.fontSize};
    line-height: ${typographyStyles.body2.lineHeight};
  }

  acrylic-material {
    box-sizing: border-box;
    border-radius: ${smtcCornerComposerRest};
    border: ${strokeWidthThin} solid ${smtcEffectInnerShineStrong};
    box-shadow: ${smtcShadowLarge};
    overflow: hidden;
  }

  copilot-chat[hidden] {
    display: none;
  }

  #input-row {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: ${spacingHorizontalXS};
    padding: ${spacingHorizontalS};
    overflow: hidden;
  }

  #start,
  #end {
    display: flex;
    flex-direction: row;
    padding-block: ${spacingVerticalXS};
  }

  #end {
    opacity: 1;
    transform: translateX(0);
    transition:
      opacity 0.2s,
      transform 0.2s,
      display 0.2s allow-discrete;
  }

  #input-row:has(copilot-input:focus-within) #end,
  #input-row:has(copilot-input:focus-within) #home {
    opacity: 0;
    transform: translateX(80px);
    display: none;
  }

  @starting-styles {
    #end {
      opacity: 1;
      transform: translateX(0);
      display: flex;
    }
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
  @inject(EdgeWindowService) ews!: EdgeWindowService;
  _inputElement?: CopilotInput;
  _chatElement?: CopilotChat;

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
    ) as CopilotChat;
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
    if (notify) this.$emit('close');
  }

  updateContext() {
    if (this.ts.activeTabId && this.cs.activeThreadId) {
      this.cs.browserContextChanged(this.ts.tabsById[this.ts.activeTabId]);
    }
  }

  focus() {
    this._inputElement?.focus();
  }
}
