import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
  when,
} from '@microsoft/fast-element';
import '@phoenixui/web-components/toggle-button.js';
import './flyout-menu.js';
import './context-menu.js';
import './menu-item.js';
import { colorNeutralForeground1 } from '@phoenixui/themes';
import apps from '../installedApps.js';

const template = html<ToolbarSidepaneItem>`
  <flyout-menu @toggle="${(x) => x.handleFlyoutToggle()}">
    <phx-toggle-button
      appearance="subtle"
      icon-only
      slot="trigger"
      @click="${(x) => x.handleSidepaneToggle()}"
      ?pressed="${(x) => x.pressed}"
    >
      ${when(
        (x) => apps[x.id].iconId,
        html` <svg>
          <use href="./img/edge/icons.svg#${(x) => apps[x.id].iconId}" />
        </svg>`,
        html`<img
          width="20px"
          src="./img/edge/${(x) => x.id.toLowerCase()}AppLight.png"
        />`,
      )}
    </phx-toggle-button>
    <context-menu slot="context">
      <menu-item @click="${(x) => x.handlePinToggle()}">
        ${(x) => (x.pinned ? 'Hide from toolbar' : 'Always show in toolbar')}
      </menu-item>
    </context-menu>
  </flyout-menu>
`;

const styles = css`
  phx-toggle-button {
    color: ${colorNeutralForeground1};
  }
`;

@customElement({
  name: 'toolbar-sidepane-item',
  template,
  styles,
})
export class ToolbarSidepaneItem extends FASTElement {
  @attr id: string = '';
  @attr({ mode: 'boolean' }) pressed = false;
  @attr({ mode: 'boolean' }) pinned = false;

  handleFlyoutToggle() {
    // Don't allow the context menu closing to affect the toggle state
    this.shadowRoot
      ?.querySelector('phx-toggle-button')
      ?.setAttribute('pressed', this.pressed.toString());
  }

  handlePinToggle() {
    this.$emit('togglepintoolbaritem', !this.pinned);
  }

  handleSidepaneToggle() {
    this.$emit('togglesidepane', !this.pressed);
  }
}
