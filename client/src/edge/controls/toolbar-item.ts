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
import {
  acrylicBackgroundBlur,
  acrylicBackgroundLuminosity,
  borderRadiusLayerDialog,
  colorNeutralForeground1,
  shadow28,
  spacingHorizontalL,
} from '@phoenixui/themes';

export type ToolbarApp = {
  type: 'flyout' | 'sidebar';
  template?: ViewTemplate;
  iconId?: string;
};

const apps: Record<string, ToolbarApp> = {
  favorites: {
    type: 'flyout',
    template: html`<favorites-hub></favorites-hub>`,
    iconId: 'star-20-regular',
  },
  extensions: {
    type: 'flyout',
    template: html`<extensions-hub></extensions-hub>`,
    iconId: 'puzzle-piece-20-regular',
  },
  Search: {
    type: 'sidebar',
  },
  Grammarly: {
    type: 'flyout',
    template: html`<div class="flyout-menu">Grammarly</div>`,
  },
  AdBlocker: {
    type: 'flyout',
    template: html`<div class="flyout-menu">AdBlocker</div>`,
  },
  Tools: {
    type: 'sidebar',
  },
};

const template = html<ToolbarItem>`
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

  .flyout-menu {
    width: 256px;
    height: 300px;
    padding: ${spacingHorizontalL};
    background: ${acrylicBackgroundLuminosity};
    background-blend-mode: luminosity;
    backdrop-filter: blur(${acrylicBackgroundBlur});
    border-radius: ${borderRadiusLayerDialog};
    box-shadow: ${shadow28};
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
