import {
  html,
  css,
  FASTElement,
  customElement,
  attr,
} from '@microsoft/fast-element';
import {
  colorLayerBackgroundDialog,
  curveEasyEaseMax,
  durationNormal,
  spacingHorizontalXL,
  spacingVerticalM,
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

    /* Overrides for button tokens */
    --smtc-background-control-brand-rest: ${smtcBackgroundSendButtonRest};
    --smtc-background-control-brand-hover: ${smtcBackgroundSendButtonHover};
    --smtc-background-control-brand-pressed: ${smtcBackgroundSendButtonPressed};
    --smtc-foreground-control-on-brand-rest: ${smtcForegroundSendButtonRest};

    display: none;
    transform: translateX(40px);
    opacity: 0;
    transition:
      transform ${durationNormal} ${curveEasyEaseMax},
      opacity ${durationNormal} ${curveEasyEaseMax},
      display ${durationNormal} ${curveEasyEaseMax} allow-discrete;
  }

  [contenteditable]:not(:empty) + #send {
    display: inline-flex; /* reset display */
    transform: translateX(0);
    opacity: 1;
  }

  [contenteditable] {
    flex: 1;
    box-sizing: border-box;
    min-width: 206px;
    border: none;
    background: ${colorLayerBackgroundDialog};
    border-radius: ${smtcCornerComposerInputRest};
    padding-block: ${spacingVerticalM};
    padding-inline-start: ${spacingHorizontalXL};
    padding-inline-end: 64px;
    box-shadow: 0px 1px 30px rgba(0, 0, 0, 0.03);
    height: 50px;
    overflow-y: auto;
    overflow-x: hidden;

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

  [contenteditable]:empty {
    padding-inline-end: ${spacingHorizontalXL};
  }

  [contenteditable]:focus {
    outline: none;
  }

  @starting-style {
    [contenteditable]:not(:empty) + #send {
      transform: translateX(40px);
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
      this.handleClose();
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
    this._inputElement.innerHTML = '';
  }

  handleClose() {
    this.clearInput();
    this.$emit('close');
  }

  clearInput() {
    if (!this._inputElement) return;
    this._inputElement.innerHTML = '';
  }
}
