import { css, customElement, FASTElement, html } from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  colorNeutralBackground1,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  spacingHorizontalS,
  spacingVerticalXS,
} from '@phoenixui/themes';

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
    padding: 0 ${spacingHorizontalS};
    background-color: ${colorNeutralBackground1};
    width: 100%;
    border-radius: ${borderRadiusCircular};
  }

  input {
    flex: 1;
    border: none;
    /* body1 */
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    font-weight: ${fontWeightRegular};
    padding: ${spacingVerticalXS} ${spacingHorizontalS};
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
