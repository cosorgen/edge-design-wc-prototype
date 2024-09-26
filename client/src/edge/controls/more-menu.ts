import {
  FASTElement,
  customElement,
  css,
  html,
  observable,
  repeat,
  attr,
  when,
} from '@microsoft/fast-element';
import {
  acrylicBackgroundBlur,
  acrylicBackgroundLuminosity,
  borderRadiusLayerFlyout,
  colorNeutralForegroundHint,
  curveDecelerateMax,
  durationFast,
  shadow28,
  spacingHorizontalXS,
  spacingVerticalS,
  spacingVerticalXS,
} from '@phoenixui/themes';
import { MoreMenuEntry } from './more-menu-item.js';
import './more-menu-item.js';
import './more-menu-zoom.js';
import '@phoenixui/web-components/divider.js';
import '@phoenixui/web-components/button.js';
import '@phoenixui/web-components/text-input.js';

const template = html<MoreMenu>`
  <phx-text-input appearance="filled-darker" placeholder="Search">
    <svg slot="start">
      <use href="img/edge/icons.svg#search-20-regular" />
    </svg>
  </phx-text-input>
  <div id="menu-items">
    ${repeat(
      (x) => x.items,
      html<MoreMenuEntry>` ${when(
        (x) => x.type === 'divider',
        html`<phx-divider></phx-divider>`,
      )}
      ${when(
        (x) => x.type === 'action',
        html` <more-menu-item
          @click="${(x, c) => c.parent.$emit('moreaction', x.title)}"
        >
          <span class="text-only" slot="start">${(x) => x.title}</span>
          <span class="text-only hint" slot="end">${(x) => x.shortcut}</span>
        </more-menu-item>`,
      )}
      ${when(
        (x) => x.type === 'sub-menu',
        html` <more-menu-item>
          <span class="text-only" slot="start">${(x) => x.title}</span>
          <svg slot="end">
            <use href="img/edge/icons.svg#chevron-right-20-regular" />
          </svg>
        </more-menu-item>`,
      )}
      ${when(
        (x) => x.type === 'zoom',
        html` <more-menu-zoom></more-menu-zoom>`,
      )}`,
    )}
  </div>
`;

const styles = css`
  :host {
    position: absolute;
    z-index: 1000;
    inset-inline-end: 156px;
    inset-block-start: 28px;
    min-width: 200px;
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

    /* Animation */
    opacity: 0;
    transform: translateY(-24px);
    transition: all ${durationFast} ${curveDecelerateMax};
  }

  :host([active]) {
    opacity: 1;
    transform: translateY(0);
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
  name: 'more-menu',
  template,
  styles,
})
export default class MoreMenu extends FASTElement {
  @observable items: MoreMenuEntry[] = [
    {
      title: 'New tab',
      type: 'action',
      shortcut: 'Ctrl+T',
    },
    {
      title: 'New window',
      type: 'action',
      shortcut: 'Ctrl+N',
    },
    {
      title: 'New InPrivate window',
      type: 'action',
      shortcut: 'Ctrl+Shift+N',
    },
    {
      title: 'Print',
      type: 'action',
      shortcut: 'Ctrl+P',
    },
    {
      title: 'Screenshot',
      type: 'action',
      shortcut: 'Ctrl+Shift+S',
    },
    {
      title: 'Find on page',
      type: 'action',
      shortcut: 'Ctrl+F',
    },
    {
      title: 'More tools',
      type: 'sub-menu',
    },
    {
      type: 'divider',
    },
    {
      type: 'zoom',
    },
    {
      type: 'divider',
    },
    {
      title: 'Favorites',
      type: 'action',
      shortcut: 'Ctrl+Shift+O',
    },
    {
      title: 'History',
      type: 'action',
      shortcut: 'Ctrl+H',
    },
    {
      title: 'Shopping',
      type: 'action',
    },
    {
      title: 'Downloads',
      type: 'action',
    },
    {
      title: 'Extensions',
      type: 'action',
    },
    {
      title: 'Browser Essentials',
      type: 'action',
    },
    {
      title: 'Passwords',
      type: 'action',
    },
    {
      type: 'divider',
    },
    {
      title: 'Settings',
      type: 'action',
    },
    {
      title: 'Help and feedback',
      type: 'sub-menu',
    },
  ];
  @attr({ mode: 'boolean' }) managedByOrganization = false;
  @attr({ mode: 'boolean' }) active = false;
}
