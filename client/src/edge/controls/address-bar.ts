import { css, customElement, FASTElement, html } from '@microsoft/fast-element';

const template = html<AddressBar>`
  <input
    id="address-bar"
    part="address-bar"
    type="text"
    value="${(x) => x.value}"
    @input="${(x, c) => x.onInput(c.event)}"
    @keydown="${(x, c) => x.onKeyDown(c.event as KeyboardEvent)}"
  />
`;
const styles = css`
  :host {
    display: flex;
    align-items: center;
    padding: 0 8px;
    background-color: white;
    width: 100%;
    border-radius: 16px;
  }

  input {
    flex: 1;
    border: none;
    font-size: 14px;
    line-height: 20px;
    padding: 4px 8px;
    background-color: transparent;
    outline: none;
  }
`;

@customElement({ name: 'address-bar', template, styles })
export class AddressBar extends FASTElement {
  value = '';

  onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.dispatchEvent(new CustomEvent('navigate', { detail: this.value }));
    }
  }
}
