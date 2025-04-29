import {
  customElement,
  FASTElement,
  html,
  attr,
  when,
} from '@microsoft/fast-element';
import '@mai-ui/button/define.js';
import './flyout-menu.js';
import './context-menu.js';
import './menu-item.js';
import apps from '../installedApps.js';

function toCamelCase(str: string) {
  return str
    .replace(/\s+([a-z])/g, (g) => g[1].toUpperCase())
    .replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    .replace(/\s/g, '');
}

const template = html<ToolbarSidepaneItem>`
  <flyout-menu @toggle="${(x) => x.handleFlyoutToggle()}">
    <mai-button
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
          src="./img/edge/${(x) => toCamelCase(x.id)}AppLight.png"
        />`,
      )}
    </mai-button>
    <context-menu slot="context">
      <menu-item @click="${(x) => x.handlePinToggle()}">
        ${(x) => (x.pinned ? 'Hide from toolbar' : 'Always show in toolbar')}
      </menu-item>
    </context-menu>
  </flyout-menu>
`;

@customElement({ name: 'toolbar-sidepane-item', template })
export class ToolbarSidepaneItem extends FASTElement {
  @attr id: string = '';
  @attr({ mode: 'boolean' }) pressed = false;
  @attr({ mode: 'boolean' }) pinned = false;

  handleFlyoutToggle() {
    // Don't allow the context menu closing to affect the toggle state
    this.shadowRoot
      ?.querySelector('mai-button')
      ?.setAttribute('pressed', this.pressed.toString());
  }

  handlePinToggle() {
    this.$emit('togglepintoolbaritem', !this.pinned);
  }

  handleSidepaneToggle() {
    this.$emit('togglesidepane', !this.pressed);
  }
}
