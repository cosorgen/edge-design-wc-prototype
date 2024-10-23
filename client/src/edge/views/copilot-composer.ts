import {
  html,
  css,
  FASTElement,
  customElement,
  attr,
} from '@microsoft/fast-element';
import {
  acrylicBackgroundBlur,
  acrylicBackgroundLuminosity,
  colorLayerBackgroundDialog,
  colorNeutralForeground1,
  colorNeutralForegroundHint,
  curveEasyEaseMax,
  durationNormal,
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

const template = html<CopilotComposer>`
  <copilot-design-provider>
    <div id="chat">
      <copilot-chat-entry bot>
        <span class="bold">
          Sure thing! Here's a quick summary of some uplifting news today:
        </span>
        <br /><br />
        A couple celebrated their engagement in the aisles of an Aldi store,
        where they had their first date
        <br /><br />
        Meanwhile, a college student became a trusted source of information
        during Hurricane Helene, helping many stay safe
        <br /><br />
        Can I help you with anything else?
      </copilot-chat-entry>
    </div>
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
          @click="${(x) => x.$emit('close')}"
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
    padding: ${spacingVerticalXXL};
    .bold {
      font-weight: ${typographyStyles.body1Strong.fontWeight};
      font-family: ${typographyStyles.body1Strong.fontFamily};
      font-size: ${typographyStyles.body1Strong.fontSize};
      line-height: ${typographyStyles.body1Strong.lineHeight};
    }
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
  @attr placeholder = 'Message Copilot';
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
      'input',
    ) as HTMLInputElement;
  }

  unsestElements() {
    this._inputElement = null;
  }

  handleKeydown(e: Event) {
    if (!(e instanceof KeyboardEvent)) return;

    const input = this.shadowRoot?.querySelector('input');

    if (e.key === 'Enter') {
      this.$emit('submit', input?.value);
      if (input) input.value = '';
      return;
    }
    if (e.key === 'Escape') {
      this.$emit('close');
      return;
    }

    return true;
  }

  focus() {
    const input = this.shadowRoot?.querySelector('input');
    if (input) input.focus();
  }

  handleSubmit() {
    if (!this._inputElement) return;

    this._inputElement.value = '';
  }
}
