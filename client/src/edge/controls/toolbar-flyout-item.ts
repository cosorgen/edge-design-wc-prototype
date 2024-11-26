import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
  when,
} from '@microsoft/fast-element';
import '@mai-ui/toggle-button/define.js';
import './flyout-menu.js';
import './context-menu.js';
import './menu-item.js';
import {
  acrylicBackgroundBlur,
  acrylicBackgroundLuminosity,
  borderRadiusLayerDialog,
  colorNeutralForeground1,
  shadow28,
  spacingHorizontalL,
} from '@mai-ui/phoenix-theme';
import apps from '../installedApps.js';

const template = html<ToolbarFlyoutItem>`
  <flyout-menu
    @toggle="${(x, c) => x.handleFlyoutToggle(c.event)}"
    ?initially-open="${(x) => x.initOpen}"
  >
    <mai-toggle-button appearance="subtle" icon-only slot="trigger">
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
    </mai-toggle-button>
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
  flyout-menu > mai-toggle-button {
    /* Override button corner radius */
    --smtc-corner-control-rest: 8px;
    --smtc-corner-control-hover: 8px;
    --smtc-corner-control-pressed: 8px;
    --smtc-corner-control-selected: 8px;
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
