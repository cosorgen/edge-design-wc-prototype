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
import './extensions-hub.js';
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
    @flyoutclose="${(x) => x.handleFlyoutChange(false)}"
    @flyoutopen="${(x) => x.handleFlyoutChange(true)}"
    @contextclose="${(x) => x.handleFlyoutChange(false)}"
    @contextopen="${(x) => x.handleFlyoutChange(true)}"
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
  @attr id: string = 'favorites';
  @attr({ mode: 'boolean', attribute: 'initially-open' }) initOpen = false;
  @attr({ mode: 'boolean' }) pinned = false;
  favTimer: NodeJS.Timeout | null = null;

  handleFlyoutChange(open: boolean) {
    clearTimeout(this.favTimer as NodeJS.Timeout);
    this.favTimer = setTimeout(() => {
      if (!open) this.$emit('closetoolbaritem', this.id);
      else this.$emit('opentoolbaritem', this.id);
    }, 100); // Delay updating state to leave open if conditionally rendered and showing context menu
  }

  pinItem(pin: boolean) {
    pin
      ? this.$emit('pintoolbaritem', this.id)
      : this.$emit('unpintoolbaritem', this.id);
  }
}
