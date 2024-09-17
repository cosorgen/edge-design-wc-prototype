import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
} from '@microsoft/fast-element';
import {
  borderRadiusLayerDialog,
  colorLayerBackgroundDialog,
  shadow28,
  spacingHorizontalS,
} from '@phoenixui/themes';

const template = html<OmniboxDropdown>`
  <slot name="input"></slot>
  <slot></slot>
`;

const styles = css`
  :host {
    position: absolute;
    inset: 0;
    display: none;
    min-height: 56px;
    background-color: ${colorLayerBackgroundDialog};
    box-shadow: ${shadow28};
    border-radius: ${borderRadiusLayerDialog};
    padding: ${spacingHorizontalS};
  }

  :host([active]) {
    display: flex;
  }
`;

@customElement({
  name: 'omnibox-dropdown',
  template,
  styles,
})
export class OmniboxDropdown extends FASTElement {
  @attr({ mode: 'boolean' }) active = false;
}
