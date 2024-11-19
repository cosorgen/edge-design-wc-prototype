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

const template = html<ToolbarFlyoutItem>`
  <flyout-menu
    @toggle="${(x, c) => x.handleFlyoutToggle(c.event)}"
    ?initially-open="${(x) => x.initOpen}"
  >
    <phx-toggle-button appearance="subtle" icon-only slot="trigger">
      ${when(
        (x) => apps[x.id].iconId,
        html`<svg>
          <use href="./img/edge/icons.svg#${(x) => apps[x.id].iconId}" />
        </svg>`,
        html`<img
          width="20px"
          src="./img/edge/${(x) => x.id.toLowerCase()}AppLight.png"
        />`,
      )}
    </phx-toggle-button>
    ${(x) => apps[x.id].template}
    <context-menu slot="context">
      ${when(
        (x) => x.pinned,
        html`
          <menu-item @click="${(x) => x.pinItem(false)}">
            Hide from toolbar
          </menu-item>
        `,
        html`
          <menu-item @click="${(x) => x.pinItem(true)}">
            Always show in toolbar
          </menu-item>
        `,
      )}
    </context-menu>
  </flyout-menu>
`;

const styles = css`
  phx-toggle-button {
    color: ${colorNeutralForeground1};
  }
`;

@customElement({
  name: 'toolbar-flyout-item',
  template,
  styles,
})
export class ToolbarFlyoutItem extends FASTElement {
  @attr id: string = '';
  @attr({ mode: 'boolean', attribute: 'initially-open' }) initOpen = false;
  @attr({ mode: 'boolean' }) pinned = false;

  handleFlyoutToggle(e: Event) {
    if (!(e instanceof ToggleEvent)) return;

    this.$emit('toggleflyout', e.newState === 'open');
  }

  pinItem(pin: boolean) {
    this.$emit('togglepintoolbaritem', pin);
  }
}
