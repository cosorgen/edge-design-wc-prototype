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
  shadow28,
  spacingHorizontalS,
  spacingHorizontalXL,
  spacingHorizontalXS,
  strokeWidthThin,
} from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';
import '../controls/copilot-chat-entry.js';

const template = html`
  <div id="chat">
    <copilot-chat-entry bot>
      <span class="bold">
        Sure thing! Here's a quick summary of some uplifting news today:
      </span>
      A couple celebrated their engagement in the aisles of an Aldi store, where
      they had their first date Meanwhile, a college student became a trusted
      source of information during Hurricane Helene, helping many stay safe Can
      I help you with anything else?
    </copilot-chat-entry>
  </div>
  <div id="input-row">
    <div id="start">
      <phx-button appearance="subtle" size="large" icon-only>
        <img src="img/edge/copilot-icon.svg" />
      </phx-button>
    </div>
    <input
      type="text"
      placeholder="${(x) => x.placeholder}"
      @keydown="${(x, c) => x.handleKeydown(c.event)}"
    />
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
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    background: ${acrylicBackgroundLuminosity};
    background-blend-mode: luminosity;
    backdrop-filter: blur(${acrylicBackgroundBlur});
    border: ${strokeWidthThin} solid ${colorLayerBackgroundDialog};
    border-radius: 28px;
    box-shadow: ${shadow28};
    overflow: hidden;
  }

  #input-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalXS};
    padding: ${spacingHorizontalS};
  }

  #chat {
    display: none;
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
`;

@customElement({
  name: 'copilot-composer',
  template,
  styles,
})
export class CopilotComposer extends FASTElement {
  @attr placeholder = 'Message Copilot';

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
}
