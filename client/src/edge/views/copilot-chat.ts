import {
  html,
  css,
  FASTElement,
  customElement,
  Observable,
  Updates,
  attr,
} from '@microsoft/fast-element';
import {
  colorScrollbarForeground,
  curveEasyEaseMax,
  durationUltraSlow,
  spacingVerticalXL,
  spacingVerticalXXL,
} from '@phoenixui/themes';
import '../controls/copilot-chat-entry.js';
import { CopilotChatEntry } from '../controls/copilot-chat-entry.js';
import { inject } from '@microsoft/fast-element/di.js';
import { CopilotService } from '#servicescopilotService.js';
import { spacingFrame } from '../designSystem.js';

const template = html<CopilotChat>`<div id="chat"></div>`;

const styles = css`
  :host {
    display: block;
    height: 100%;
    overflow: hidden;
  }

  :host([inline]) {
    height: fit-content;
    max-height: 100%;
  }

  #chat {
    height: 0px;
    transition: height ${durationUltraSlow} ${curveEasyEaseMax};
  }

  #chat:not(:empty) {
    padding: ${spacingVerticalXL};
    padding-block-end: calc(68px + ${spacingFrame});
    height: fit-content;
    max-height: calc(100% - ${spacingVerticalXXL});
    display: flex;
    flex-direction: column;
    overflow: hidden auto;
    scrollbar-color: ${colorScrollbarForeground} transparent;
    scrollbar-width: thin;
  }

  :host([inline]) #chat:not(:empty) {
    padding: ${spacingVerticalXXL};
    padding-block-end: 0;
  }
`;

@customElement({
  name: 'copilot-chat',
  template,
  styles,
})
export class CopilotChat extends FASTElement {
  @inject(CopilotService) cs!: CopilotService;
  @attr({ mode: 'boolean' }) inline = false;
  _updateInterval?: NodeJS.Timeout;
  _chatElement?: HTMLElement;
  _lockChatScroll = true;

  connectedCallback(): void {
    super.connectedCallback();
    this.setElements();
    this.addEventListeners();
    this.updateChat(); // Initial chat update
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListeners();
    this.unsetElements();
  }

  setElements() {
    this._chatElement = this.shadowRoot?.querySelector(
      '#chat',
    ) as HTMLDivElement;
  }

  unsetElements() {
    this._chatElement = undefined;
  }

  addEventListeners() {
    Observable.getNotifier(this.cs).subscribe(this, 'threadsById');
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
  }

  updateChat() {
    if (this.cs.activeThreadId && this._chatElement) {
      const messages = this.cs.threadsById[this.cs.activeThreadId].messages;
      const messageIds = Object.keys(messages);

      // Skip the first two messages since it's the user input and system prompt
      let foundFirstUserMessage = false;
      for (let x = 0; x < messageIds.length; x++) {
        const message = messages[messageIds[x]];
        if (message.id === 'system-prompt') continue; // skip system prompt
        if (message.role === 'context') continue; // skip context messages
        if (!foundFirstUserMessage && message.role === 'user' && this.inline) {
          foundFirstUserMessage = true;
          continue;
        }

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
          entry.message = message.content;
          entry.removeAttribute('pending');
          entry.setAttribute(
            'style',
            `--text-transition-duration: ${Math.min(2000, message.content.split(' ').length * 100)}ms`,
          );
        }

        // Update time regardless of message change
        entry.timestamp = message.timestamp;

        Updates.enqueue(() => {
          if (this._lockChatScroll && this._chatElement) {
            const lastMessage = this._chatElement?.lastElementChild;
            if (lastMessage) {
              lastMessage.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }
          }
        });
      }
    }
  }

  clearChat() {
    if (!this._chatElement) return;
    this._chatElement.innerHTML = '';
  }

  toggleChatScrollLock = () => {
    if (!this._chatElement) return;
    const { scrollTop, scrollHeight, clientHeight } = this._chatElement;
    this._lockChatScroll = scrollTop + clientHeight >= scrollHeight;
  };
}
