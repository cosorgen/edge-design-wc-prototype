import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
} from '@microsoft/fast-element';
import '@mai-ui/toggle-button/define.js';
import './flyout-menu.js';
import {
  acrylicBackgroundBlur,
  acrylicBackgroundLuminosity,
  borderRadiusLayerDialog,
  colorNeutralForeground1,
  colorNeutralForegroundHint,
  shadow28,
  spacingHorizontalL,
} from '@mai-ui/phoenix-theme';

const template = html<OmniboxActionFlyout>`
  <flyout-menu ?initially-open="${(x) => x.initOpen}">
    <mai-toggle-button
      size="small"
      appearance="subtle"
      shape="circular"
      icon-only
      slot="trigger"
      @click="${(x, c) => x.handleTriggrClick(c.event)}"
    >
      <slot name="trigger-content"></slot>
    </mai-toggle-button>
    <slot></slot>
  </flyout-menu>
`;

const styles = css`
  ::slotted(.flyout-menu) {
    width: 256px;
    height: 300px;
    padding: ${spacingHorizontalL};
    background: ${acrylicBackgroundLuminosity};
    background-blend-mode: luminosity;
    backdrop-filter: blur(${acrylicBackgroundBlur});
    border-radius: ${borderRadiusLayerDialog};
    box-shadow: ${shadow28};
    color: ${colorNeutralForeground1};
  }

  flyout-menu > mai-toggle-button {
    --smtc-foreground-control-neutral-primary-rest: ${colorNeutralForegroundHint};
  }
`;

@customElement({
  name: 'omnibox-action-flyout',
  template,
  styles,
})
export class OmniboxActionFlyout extends FASTElement {
  @attr id: string = '';
  @attr({ mode: 'boolean', attribute: 'initially-open' }) initOpen = false;

  connectedCallback(): void {
    super.connectedCallback();
    // Prevent omnibox open on click
    this.addEventListener('click', this.handleTriggrClick);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleTriggrClick);
  }

  handleTriggrClick(e: Event) {
    e.stopPropagation();
  }
}
