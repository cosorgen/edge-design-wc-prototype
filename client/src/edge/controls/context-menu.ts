import { FASTElement, customElement, css, html } from '@microsoft/fast-element';
import {
  borderRadiusLayerFlyout,
  colorNeutralForeground1,
  colorNeutralForegroundHint,
  shadow28,
  spacingHorizontalXS,
  spacingVerticalS,
  spacingVerticalXS,
} from '@phoenixui/themes';
import './menu-item.js';
import '../../windows/controls/acrylic-material.js';

const template = html<ContextMenu>`
  <acrylic-material></acrylic-material>
  <div id="menu-items">
    <slot></slot>
  </div>
`;

const styles = css`
  :host {
    position: relative;
    display: block;
    border-radius: ${borderRadiusLayerFlyout};
    box-shadow: ${shadow28};
    overflow: hidden;
    color: ${colorNeutralForeground1};
  }

  #menu-items {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 96px;
    max-width: 512px;
    padding: ${spacingVerticalS};
  }

  .hint {
    color: ${colorNeutralForegroundHint};
  }

  svg {
    width: 20px;
    height: 20px;
  }

  svg[slot='end'] {
    margin-inline-end: calc(0px - ${spacingHorizontalXS});
  }

  phx-divider {
    margin-block: ${spacingVerticalXS};
  }
`;

@customElement({
  name: 'context-menu',
  template,
  styles,
})
export default class ContextMenu extends FASTElement {}
