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
  spacingFrame,
  spacingVerticalM,
  spacingVerticalXXL,
} from '@edge-design/copilot-theme';
import '../controls/copilot-chat-entry.js';
import { CopilotChatEntry } from '../controls/copilot-chat-entry.js';
import { inject } from '@microsoft/fast-element/di.js';
import { CopilotService } from '#servicescopilotService.js';

const template = html<CopilotChat>``;

const styles = css`
  :host {
    display: block;
    height: 100%;
    overflow: hidden;
  }

  :host(:not([empty])) {
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

  :host([inline]) {
    height: fit-content;
  }

  :host([inline]:not([empty])) {
    padding: ${spacingVerticalXXL};
    padding-block-end: 0;
  }
`;

@customElement({ name: 'copilot-chat', template, styles })
export class CopilotChat extends FASTElement {
  @inject(CopilotService) cs!: CopilotService;
  @attr({ mode: 'boolean' }) inline = false;
  @attr({ mode: 'boolean' }) empty = true;
  _updateInterval?: ReturnType<typeof setInterval>;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListeners();
    this.updateChat(); // Initial chat update
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListeners();
  }

  addEventListeners() {
    Observable.getNotifier(this.cs).subscribe(this);
    this._updateInterval = setInterval(() => this.updateChat(), 60000); // update chat every minute for time updates
  }

  removeEventListeners() {
    Observable.getNotifier(this.cs).unsubscribe(this);
    clearInterval(this._updateInterval);
  }

  handleChange(subject: unknown, key: string) {
    if (key === 'threadsById' || key === 'activeThreadId') {
      this.updateChat();
    }
  }

  updateChat() {
    if (this.shadowRoot) {
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

          let entry = this.shadowRoot.querySelector(
            `#${message.id}`,
          ) as CopilotChatEntry;
          if (!entry) {
            entry = document.createElement(
              'copilot-chat-entry',
            ) as CopilotChatEntry;
            entry.setAttribute('id', message.id);
            entry.setAttribute('inline', '');
            if (message.role === 'system') entry.setAttribute('system', '');
            this.shadowRoot.appendChild(entry);
            this.empty = false;

            // Scroll message into view if it's the last message
            if (x === messageIds.length - 1) {
              Updates.enqueue(() => {
                entry.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
        this.$emit('sizechanged', this.getBoundingClientRect());
      });
    }
  }

  clearChat() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = '';
    this.empty = true;
  }
}
