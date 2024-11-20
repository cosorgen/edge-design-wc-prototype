import { html, css, FASTElement, customElement } from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  colorLayerBackgroundDialog,
  colorNeutralForeground1,
  colorNeutralForegroundHint,
  spacingHorizontalS,
  spacingHorizontalXL,
  spacingHorizontalXS,
} from '@mai-ui/phoenix-theme';

const template = html`
  <div id="start"></div>
  <input
    type="text"
    placeholder="Search or chat with Copilot"
    @keydown="${(x, c) => x.handleKeydown(c.event)}"
  />
  <div id="end">
    <slot name="end">
      <mai-button appearance="subtle" size="large" icon-only>
        <svg>
          <use x="2" y="2" href="img/edge/icons.svg#add-20-regular" />
        </svg>
      </mai-button>
      <mai-button appearance="subtle" size="large" icon-only>
        <svg>
          <use href="img/edge/icons.svg#headphones-24-regular" />
        </svg> </mai-button
    ></slot>
  </div>
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalXS};
    padding: ${spacingHorizontalS};
    background: ${colorLayerBackgroundDialog};
    border-radius: ${borderRadiusCircular};
    box-shadow:
      0px 104.789px 29.556px 0px rgba(0, 0, 0, 0),
      0px 67.172px 26.869px 0px rgba(0, 0, 0, 0.01),
      0px 37.616px 22.391px 0px rgba(0, 0, 0, 0.02),
      0px 17.017px 17.017px 0px rgba(0, 0, 0, 0.04),
      0px 4.478px 8.956px 0px rgba(0, 0, 0, 0.05);
  }

  input {
    flex: 1;
    box-sizing: border-box;
    height: 48px;
    min-width: 156px;
    border: none;
    background: ${colorLayerBackgroundDialog};
    border-radius: 20px;
    padding: ${spacingHorizontalXS};
    padding-inline-start: ${spacingHorizontalXL};

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
`;

@customElement({
  name: 'newtab-composer',
  template,
  styles,
})
export class NewtabComposer extends FASTElement {
  focus() {
    const input = this.shadowRoot?.querySelector('input');
    if (input) input.focus();
  }

  handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      const value = (e.target as HTMLInputElement)?.value || '';
      this.$emit('submit', { url: value });
    }

    return true; // allow event to continue bubbling
  }
}
