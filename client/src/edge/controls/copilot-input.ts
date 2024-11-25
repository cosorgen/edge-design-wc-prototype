import {
  html,
  css,
  FASTElement,
  customElement,
  attr,
} from '@microsoft/fast-element';
import {
  durationNormal,
  spacingHorizontalXL,
  smtcTextComposerInputFontSize,
  smtcTextComposerInputLineHeight,
  smtcTextComposerInputFontWeight,
  smtcTextComposerInputFontVariationSettings,
  smtcForegroundComposerInputHint,
  smtcForegroundComposerInputRest,
  smtcCornerComposerInputRest,
  smtcBackgroundSendButtonRest,
  smtcBackgroundSendButtonHover,
  smtcBackgroundSendButtonPressed,
  smtcForegroundSendButtonRest,
  smtcBackgroundComposerInputRest,
  smtcForegroundSendButtonHover,
  smtcForegroundSendButtonPressed,
  smtcCornerComposerSendButtonRest,
  smtcCornerComposerSendButtonHover,
  smtcCornerComposerSendButtonPressed,
  curveEasyEase,
} from '@mai-ui/copilot-theme';
import '@phoenixui/web-components/button.js';

const template = html<CopilotInput>`
  <div
    contenteditable
    placeholder="${(x) => x.placeholder}"
    @keydown="${(x, c) => x.handleKeydown(c.event)}"
    @keyup="${(x, c) => x.handleKeyUp(c.event)}"
  ></div>
  <mai-button
    appearance="primary"
    size="large"
    @click="${(x) => x.handleSubmit()}"
    icon-only
    id="send"
  >
    <svg>
      <use href="img/edge/icons.svg#arrow-up-24-regular" />
    </svg>
  </mai-button>
`;

const styles = css`
  :host {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    border-radius: ${smtcCornerComposerInputRest};
    overflow: hidden;
  }

  #send {
    position: absolute;
    right: 6px;
    bottom: 6px;
    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;

    /* Overrides for button tokens */
    --smtc-background-control-brand-rest: ${smtcBackgroundSendButtonRest};
    --smtc-background-control-brand-hover: ${smtcBackgroundSendButtonHover};
    --smtc-background-control-brand-pressed: ${smtcBackgroundSendButtonPressed};
    --smtc-foreground-control-on-brand-rest: ${smtcForegroundSendButtonRest};
    --smtc-foreground-control-on-brand-hover: ${smtcForegroundSendButtonHover};
    --smtc-foreground-control-on-brand-pressed: ${smtcForegroundSendButtonPressed};
    --smtc-corner-control-rest: ${smtcCornerComposerSendButtonRest};
    --smtc-corner-control-hover: ${smtcCornerComposerSendButtonHover};
    --smtc-corner-control-pressed: ${smtcCornerComposerSendButtonPressed};
    box-shadow: 0px 0.5px 1px 0.5px #0000000a;

    display: none;
    transform: translateX(120px);
    opacity: 0;
    transition:
      transform ${durationNormal} ${curveEasyEase},
      opacity ${durationNormal} ${curveEasyEase},
      display ${durationNormal} ${curveEasyEase} allow-discrete;
  }

  :host(:not([empty])) #send {
    display: inline-flex; /* reset display */
    transform: translateX(0);
    opacity: 1;
  }

  [contenteditable] {
    flex: 1;
    box-sizing: border-box;
    min-width: 206px;
    border: none;
    background: ${smtcBackgroundComposerInputRest};
    border-radius: ${smtcCornerComposerInputRest};
    padding-block: 11px; /* Not in system to make height 48px */
    padding-inline-start: ${spacingHorizontalXL};
    padding-inline-end: 64px;
    box-shadow: 0px 1px 30px 0px rgba(0, 0, 0, 0.03);
    overflow: hidden;

    font-size: ${smtcTextComposerInputFontSize};
    line-height: ${smtcTextComposerInputLineHeight};
    font-weight: ${smtcTextComposerInputFontWeight};
    font-variation-settings: ${smtcTextComposerInputFontVariationSettings};
    color: ${smtcForegroundComposerInputRest};

    &:empty::before {
      content: attr(placeholder);
      color: ${smtcForegroundComposerInputHint};
      cursor: text;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  :host([empty]) [contenteditable] {
    padding-inline-end: ${spacingHorizontalXL};
  }

  [contenteditable]:focus {
    outline: none;
  }

  @starting-style {
    :host(:not([empty])) #send {
      transform: translateX(120px);
      opacity: 0;
    }
  }
`;

@customElement({
  name: 'copilot-input',
  template,
  styles,
})
export class CopilotInput extends FASTElement {
  @attr placeholder = '';
  @attr({ mode: 'boolean' }) empty = true;
  _inputElement: HTMLInputElement | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.setElements();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unsestElements();
  }

  setElements() {
    this._inputElement = this.shadowRoot?.querySelector(
      '[contenteditable]',
    ) as HTMLInputElement;
  }

  unsestElements() {
    this._inputElement = null;
  }

  handleKeydown(e: Event) {
    if (!(e instanceof KeyboardEvent)) return;

    if (e.key === 'Enter' && !e.shiftKey) {
      this.handleSubmit();
      return;
    }
    if (e.key === 'Escape') {
      this._inputElement?.blur();
      return;
    }

    return true;
  }

  handleKeyUp(e: Event) {
    if (!(e instanceof KeyboardEvent)) return;
    if (
      (e.key === 'Backspace' || e.key === 'Delete') &&
      this._inputElement?.innerText === '\n'
    ) {
      this._inputElement!.innerHTML = ''; // need to clear innerHTML to show the placeholder
    }

    if (this._inputElement?.innerText) {
      this.empty = false;
    } else {
      this.empty = true;
    }

    return true;
  }

  focus() {
    this._inputElement?.focus();
  }

  handleSubmit() {
    if (!this._inputElement) return;
    const message = this._inputElement.innerText;
    if (!message) return;
    this.$emit('submit', message);
    this.clearInput();
  }

  handleClose() {
    this.clearInput();
    this.$emit('close');
  }

  clearInput() {
    if (!this._inputElement) return;
    this._inputElement.innerHTML = '';
    this.empty = true;
  }
}
