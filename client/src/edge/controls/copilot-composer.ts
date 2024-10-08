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
  colorNeutralForegroundHint,
  shadow28,
  spacingHorizontalS,
  spacingHorizontalXL,
  spacingHorizontalXS,
  strokeWidthThin,
} from '@phoenixui/themes';

const template = html`
  <div id="start">
    <slot name="start"></slot>
  </div>
  <input
    type="text"
    placeholder="${(x) => x.placeholder}"
    @keydown="${(x, c) => x.handleKeydown(c.event)}"
  />
  <div id="end">
    <slot name="end"></slot>
  </div>
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalXS};
    padding: ${spacingHorizontalS};
    background: ${acrylicBackgroundLuminosity};
    background-blend-mode: luminosity;
    backdrop-filter: blur(${acrylicBackgroundBlur});
    border: ${strokeWidthThin} solid ${colorLayerBackgroundDialog};
    border-radius: 28px;
    box-shadow: ${shadow28};
    overflow: hidden;
  }

  input {
    box-sizing: border-box;
    height: 48px;
    min-width: 156px;
    border: none;
    background: ${colorLayerBackgroundDialog};
    border-radius: 20px;
    color: inherit;
    padding: ${spacingHorizontalXS};
    padding-inline-start: ${spacingHorizontalXL};
    box-shadow: 0px 1px 30px rgba(0, 0, 0, 0.03);

    font-size: 18px;
    line-height: 26px;
  }

  input:focus {
    outline: none;
  }

  input:empty::placeholder {
    color: ${colorNeutralForegroundHint};
  }
`;

@customElement({
  name: 'copilot-composer',
  template,
  styles,
})
export class CopilotComposer extends FASTElement {
  @attr placeholder = 'Talk about your page';

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

  handleHome() {
    this.$emit('home');
  }
}
