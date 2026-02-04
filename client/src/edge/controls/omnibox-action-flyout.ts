import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
} from '@microsoft/fast-element';
import '@mai-ui/button/define.js';
import './flyout-menu.js';
import './omnibox-action-button.js';
import {
  backgroundFlyoutSolid,
  cornerFlyoutRest,
  foregroundCtrlNeutralPrimaryRest,
  paddingFlyoutDefault,
  shadowFlyoutAmbient,
  shadowFlyoutKey,
} from '@mai-ui/design-tokens/tokens.js';

const template = html<OmniboxActionFlyout>`
  <flyout-menu ?initially-open="${(x) => x.initOpen}">
    <omnibox-action-button
      slot="trigger"
      @click="${(x, c) => x.handleTriggrClick(c.event)}"
    >
      <slot name="trigger-content"></slot>
    </omnibox-action-button>
    <slot></slot>
  </flyout-menu>
`;

const styles = css`
  ::slotted(.flyout-menu) {
    width: 256px;
    height: 300px;
    padding: ${paddingFlyoutDefault};
    background: ${backgroundFlyoutSolid};
    border-radius: ${cornerFlyoutRest};
    box-shadow: ${shadowFlyoutAmbient}, ${shadowFlyoutKey};
    color: ${foregroundCtrlNeutralPrimaryRest};
  }
`;

@customElement({ name: 'omnibox-action-flyout', template, styles })
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
