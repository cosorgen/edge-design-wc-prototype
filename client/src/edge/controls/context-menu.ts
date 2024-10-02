import { FASTElement, customElement, css, html } from '@microsoft/fast-element';
import {
  acrylicBackgroundBlur,
  acrylicBackgroundLuminosity,
  borderRadiusLayerFlyout,
  colorNeutralForegroundHint,
  shadow28,
  spacingHorizontalXS,
  spacingVerticalS,
  spacingVerticalXS,
} from '@phoenixui/themes';
import './menu-item.js';

const template = html<ContextMenu>`
  <div id="menu-items">
    <slot></slot>
  </div>
`;

const styles = css`
  :host {
    min-width: 96px;
    max-width: 512px;
    display: flex;
    flex-direction: column;
    gap: ${spacingVerticalS};
    padding: ${spacingVerticalS};
    background: ${acrylicBackgroundLuminosity};
    background-blend-mode: luminosity;
    backdrop-filter: blur(${acrylicBackgroundBlur});
    border-radius: ${borderRadiusLayerFlyout};
    box-shadow: ${shadow28};
    overflow: hidden;
  }

  #menu-items {
    display: flex;
    flex-direction: column;
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
