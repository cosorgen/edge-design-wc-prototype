import {
  html,
  css,
  FASTElement,
  customElement,
  Observable,
  attr,
  Updates,
} from '@microsoft/fast-element';
import {
  colorScrollbarForeground,
  spacingVerticalXL,
  spacingVerticalXXL,
  spacingFrame,
  spacingVerticalM,
} from '@mai-ui/copilot-theme';
import '../controls/copilot-chat-entry.js';
import { CopilotChatEntry } from '../controls/copilot-chat-entry.js';
import { inject } from '@microsoft/fast-element/di.js';
import { CopilotService } from '#servicescopilotService.js';

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

  #chat:not(:empty) {
    padding: ${spacingVerticalXL};
    padding-block-end: calc(68px + ${spacingFrame});
    height: calc(
      100% - ${spacingVerticalXL} -
        (64px + ${spacingFrame} + ${spacingVerticalM})
    );
    display: flex;
    flex-direction: column;
    overflow: hidden auto;
    scrollbar-color: ${colorScrollbarForeground} transparent;
    scrollbar-width: thin;
  }

  :host([inline]) #chat:not(:empty) {
    padding: ${spacingVerticalXXL};
    padding-block-end: 0;
    max-height: calc(100% - ${spacingVerticalXXL});
    height: fit-content;
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
    Observable.getNotifier(this.cs).subscribe(this);
    this._updateInterval = setInterval(() => this.updateChat(), 60000); // update chat every minute for time updates
    this._chatElement?.addEventListener('scroll', this.toggleChatScrollLock);
  }

  removeEventListeners() {
    Observable.getNotifier(this.cs).unsubscribe(this);
    clearInterval(this._updateInterval);
    this._chatElement?.removeEventListener('scroll', this.toggleChatScrollLock);
  }

  handleChange(subject: unknown, key: string) {
    if (key === 'threadsById' || key === 'activeThreadId') {
      this.updateChat();
    }
  }

  updateChat() {
    if (this._chatElement) {
      if (
        this.cs.activeThreadId &&
        this.cs.threadsById[this.cs.activeThreadId]
      ) {
        const messages = this.cs.threadsById[this.cs.activeThreadId].messages;
        const messageIds = Object.keys(messages);

        // Skip the first two messages since it's the user input and system prompt
        let foundFirstUserMessage = false;
        for (let x = 0; x < messageIds.length; x++) {
          const message = messages[messageIds[x]];
          if (message.id === 'system-prompt') continue; // skip system prompt
          if (message.role === 'context') continue; // skip context messages
          if (
            !foundFirstUserMessage &&
            message.role === 'user' &&
            this.inline
          ) {
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

            // Scroll message into view if it's the last message
            if (x === messageIds.length - 1) {
              Updates.enqueue(() => {
                entry.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                });
              });
            }
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
        }
      } else {
        this.clearChat();
      }

      Updates.enqueue(() => {
        this.$emit('contentchanged', this._chatElement?.clientHeight);
      });
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
