import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
  when,
  ViewTemplate,
} from '@microsoft/fast-element';
import '@phoenixui/web-components/toggle-button.js';
import './flyout-menu.js';
import './context-menu.js';
import './menu-item.js';
import './favorites-hub.js';
import '../views/extensions-hub.js';
import { colorNeutralForeground1 } from '@phoenixui/themes';

export type ToolbarApp = {
  template: ViewTemplate;
  iconId: string;
};

const apps: Record<string, ToolbarApp> = {
  favorites: {
    template: html`<favorites-hub></favorites-hub>`,
    iconId: 'star-20-regular',
  },
  extensions: {
    template: html`<extensions-hub></extensions-hub>`,
    iconId: 'puzzle-piece-20-regular',
  },
};

const template = html<ToolbarItem>`
  <flyout-menu
    @toggle="${(x, c) => x.handleFlyoutToggle(c.event)}"
    ?initially-open="${(x) => x.initOpen}"
  >
    <phx-toggle-button appearance="subtle" icon-only slot="trigger">
      <svg>
        <use href="img/edge/icons.svg#${(x) => apps[x.id].iconId}" />
      </svg>
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
  name: 'toolbar-item',
  template,
  styles,
})
export class ToolbarItem extends FASTElement {
  @attr id: string = '';
  @attr({ mode: 'boolean', attribute: 'initially-open' }) initOpen = false;
  @attr({ mode: 'boolean' }) pinned = false;
  _flyoutCounter = 0;
  _flyoutTimer?: NodeJS.Timeout;

  // It's possible for the flyout-menu to send multiple toggle events in quick
  // succession. We debounce these events to ensure that we only open the
  // toolbar when the last event has been processed.
  handleFlyoutToggle(e: Event) {
    if (!(e instanceof ToggleEvent)) return;

    const open = e.newState === 'open';
    this._flyoutCounter += open ? 1 : -1;

    clearTimeout(this._flyoutTimer);
    this._flyoutTimer = setTimeout(() => {
      this._flyoutCounter > 0
        ? this.$emit('opentoolbaritem')
        : this.$emit('closetoolbaritem');
    }, 150);
  }

  pinItem(pin: boolean) {
    pin
      ? this.$emit('pintoolbaritem', this.id)
      : this.$emit('unpintoolbaritem', this.id);
  }
}
