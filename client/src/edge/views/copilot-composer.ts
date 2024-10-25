import {
  html,
  css,
  FASTElement,
  customElement,
  attr,
  Observable,
} from '@microsoft/fast-element';
import {
  acrylicBackgroundBlur,
  acrylicBackgroundLuminosity,
  colorLayerBackgroundDialog,
  colorNeutralForeground1,
  colorNeutralForegroundHint,
  colorScrollbarForeground,
  curveEasyEaseMax,
  durationNormal,
  durationUltraSlow,
  shadow28,
  spacingHorizontalS,
  spacingHorizontalXL,
  spacingHorizontalXS,
  spacingVerticalXXL,
  strokeWidthThin,
  typographyStyles,
} from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';
import '../controls/copilot-chat-entry.js';
import { CopilotChatEntry } from '../controls/copilot-chat-entry.js';
import { inject } from '@microsoft/fast-element/di.js';
import { CopilotService } from '#servicescopilotService.js';
import moment from 'moment';
import { TabService } from '#servicestabService.js';

const template = html<CopilotComposer>`
  <copilot-design-provider>
    <div id="chat"></div>
    <div id="input-row">
      <div id="start">
        <phx-button appearance="subtle" size="large" icon-only>
          <img src="img/edge/copilot-icon.svg" />
        </phx-button>
      </div>
      <div id="input-wrapper">
        <input
          type="text"
          placeholder="${(x) => x.placeholder}"
          @keydown="${(x, c) => x.handleKeydown(c.event)}"
        />
        <phx-button
          appearance="primary"
          size="large"
          @click="${(x) => x.handleSubmit()}"
          icon-only
          id="send"
        >
          <svg>
            <use href="img/edge/icons.svg#arrow-up-24-regular" />
          </svg>
        </phx-button>
      </div>
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
          @click="${(x) => x.handleClose()}"
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
    display: flex;
    flex-direction: column;
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
    align-items: center;
    gap: ${spacingHorizontalXS};
    padding: ${spacingHorizontalS};
  }

  #chat {
    height: 0px;
    transition: height ${durationUltraSlow} ${curveEasyEaseMax};
  }

  #chat:not(:empty) {
    padding: ${spacingVerticalXXL};
    padding-block-end: 0;
    display: flex;
    flex-direction: column;
    height: fit-content;
    max-height: 50vh;
    overflow-y: auto;
    scrollbar-color: ${colorScrollbarForeground} transparent;
    scrollbar-width: thin;
  }

  #input-wrapper {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
  }

  #send {
    position: absolute;
    right: 6px;
    border-radius: 14px;
    color: ${colorNeutralForeground1};

    display: none;
    transform: translateY(8px);
    opacity: 0;
    transition:
      transform ${durationNormal} ${curveEasyEaseMax},
      opacity ${durationNormal} ${curveEasyEaseMax},
      display ${durationNormal} ${curveEasyEaseMax} allow-discrete;
  }

  input:not(:placeholder-shown) + #send {
    display: inline-flex; /* reset display */
    transform: translateY(0);
    opacity: 1;
  }

  input {
    flex: 1;
    box-sizing: border-box;
    height: 48px;
    min-width: 206px;
    border: none;
    background: ${colorLayerBackgroundDialog};
    border-radius: 20px;
    padding: ${spacingHorizontalXS};
    padding-inline-start: ${spacingHorizontalXL};
    box-shadow: 0px 1px 30px rgba(0, 0, 0, 0.03);

    font-size: 18px;
    line-height: 26px;
    color: ${colorNeutralForeground1};
  }

  input:focus {
    outline: none;
  }

  input:empty::placeholder {
    color: ${colorNeutralForegroundHint};
  }

  #start,
  #end {
    display: flex;
    flex-direction: row;
  }

  @starting-style {
    input:not(:placeholder-shown) + #send {
      transform: translateY(8px);
      opacity: 0;
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
  @attr placeholder = 'Message Copilot';
  _inputElement: HTMLInputElement | null = null;
  _chatElement: HTMLElement | null = null;
  _threadId?: string;
  _updateInterval?: NodeJS.Timeout;
  _lockChatScroll = true;

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
      'input',
    ) as HTMLInputElement;
    this._chatElement = this.shadowRoot?.querySelector('#chat') as HTMLElement;
  }

  unsestElements() {
    this._inputElement = null;
    this._chatElement = null;
  }

  addEventListeners() {
    Observable.getNotifier(this.cs).subscribe(this, 'threadsById');
    Observable.getNotifier(this.ts).subscribe(this, 'activeTabId');
    this._updateInterval = setInterval(() => this.updateChat(), 60000); // update chat every minute for time updates
    this._chatElement?.addEventListener('scroll', this.toggleChatScrollLock);
  }

  removeEventListeners() {
    Observable.getNotifier(this.cs).unsubscribe(this);
    clearInterval(this._updateInterval);
    this._chatElement?.removeEventListener('scroll', this.toggleChatScrollLock);
  }

  handleChange(subject: unknown, key: string) {
    if (key === 'threadsById') {
      this.updateChat();
    }
    if (key === 'activeTabId' || key === 'tabsById') {
      this.updateContext();
    }
  }

  handleKeydown(e: Event) {
    if (!(e instanceof KeyboardEvent)) return;

    if (e.key === 'Enter') {
      this.handleSubmit();
      return;
    }
    if (e.key === 'Escape') {
      this.handleClose();
      return;
    }

    return true;
  }

  focus() {
    this._inputElement?.focus();
  }

  handleSubmit() {
    if (!this._inputElement) return;
    const message = this._inputElement.value;
    if (!message) return;
    if (!this._threadId) {
      this._threadId = this.cs.newThread();
      if (this.ts.activeTabId) {
        this.cs.browserContextChanged(
          this._threadId,
          this.ts.tabsById[this.ts.activeTabId],
        );
      }
    }
    this.cs.send(message, this._threadId);
    this._inputElement.value = '';
  }

  handleClose() {
    this.clearChat();
    this.$emit('close');
  }

  updateChat() {
    if (this._threadId && this._chatElement) {
      const messages = this.cs.threadsById[this._threadId].messages;
      const messageIds = Object.keys(messages);

      // Skip the first two messages since it's the user input and system prompt
      for (let x = 0; x < messageIds.length; x++) {
        const message = messages[messageIds[x]];
        if (message.id === 'system-prompt') continue; // skip system prompt
        if (message.role === 'context') continue; // skip context messages

        let entry = this._chatElement.querySelector(
          `#${message.id}`,
        ) as CopilotChatEntry;
        if (!entry) {
          entry = document.createElement(
            'copilot-chat-entry',
          ) as CopilotChatEntry;
          entry.setAttribute('id', message.id);
          entry.setAttribute('inline', '');
          if (message.role === 'system') entry.setAttribute('system', '');
          this._chatElement.appendChild(entry);
        }

        if (message.status === 'pending') {
          entry.setAttribute('pending', '');
        } else {
          entry.innerText = message.content;
          entry.removeAttribute('pending');
          entry.setAttribute(
            'style',
            `--text-transition-duration: ${Math.min(2000, message.content.split(' ').length * 100)}ms`,
          );
        }

        const timeMessage = moment(message.timestamp).fromNow();
        if (entry.getAttribute('time') !== timeMessage) {
          entry.setAttribute('time', timeMessage);
        }

        if (this._lockChatScroll)
          this._chatElement.scrollTop = this._chatElement.scrollHeight;
      }
    }
  }

  clearChat() {
    if (!this._chatElement) return;
    this._chatElement.innerHTML = '';
    this._threadId = undefined;
  }

  updateContext() {
    if (this.ts.activeTabId && this._threadId) {
      this.cs.browserContextChanged(
        this._threadId,
        this.ts.tabsById[this.ts.activeTabId],
      );
    }
  }

  toggleChatScrollLock = () => {
    if (!this._chatElement) return;
    const { scrollTop, scrollHeight, clientHeight } = this._chatElement;
    this._lockChatScroll = scrollTop + clientHeight >= scrollHeight;
  };
}
