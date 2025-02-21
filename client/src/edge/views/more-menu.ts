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
  borderRadiusLayerFlyout,
  borderRadiusMedium,
  colorBrandBackground2,
  colorNeutralForeground1,
  colorNeutralForeground2,
  colorNeutralForegroundHint,
  colorSubtleBackgroundHover,
  colorSubtleBackgroundPressed,
  shadow28,
  spacingHorizontalSNudge,
  spacingHorizontalXS,
  spacingVerticalXS,
  typographyStyles,
  colorNeutralStrokeSubtle,
} from '@phoenixui/themes';
import { MoreMenuEntry } from '../controls/menu-item.js';
import '../controls/menu-item.js';
import '../controls/more-menu-zoom.js';
import '@phoenixui/web-components/divider.js';
import '@phoenixui/web-components/button.js';
import '@phoenixui/web-components/link.js';
import { TabService } from '#servicestabService.js';
import { inject } from '@microsoft/fast-element/di.js';
import WindowsService from '#serviceswindowsService.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import '../../windows/controls/acrylic-material.js';

const defaultItems: MoreMenuEntry[] = [
  {
    title: 'New tab',
    type: 'action',
    shortcut: 'Ctrl+T',
    icon: 'img/edge/icons.svg#new-tab-20-regular',
  },
  {
    title: 'New window',
    type: 'action',
    shortcut: 'Ctrl+N',
    icon: 'img/edge/icons.svg#new-window-20-regular',
  },
  {
    title: 'New InPrivate window',
    type: 'action',
    shortcut: 'Ctrl+Shift+N',
    icon: 'img/edge/icons.svg#new-private-window-20-regular',
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
    icon: 'img/edge/icons.svg#favorites-20-regular',
  },
  {
    title: 'History',
    type: 'action',
    shortcut: 'Ctrl+H',
    icon: 'img/edge/icons.svg#history-20-regular',
  },
  {
    title: 'Downloads',
    type: 'action',
    icon: 'img/edge/icons.svg#downloads-20-regular',
  },
  {
    title: 'Apps',
    type: 'sub-menu',
    icon: 'img/edge/icons.svg#apps-20-regular',
  },
  {
    title: 'Extensions',
    type: 'action',
    icon: 'img/edge/icons.svg#extensions-20-regular',
  },
  {
    title: 'Browser Essentials',
    type: 'action',
    icon: 'img/edge/icons.svg#browser-essentials-20-regular',
  },
  {
    title: 'Microsoft Password Manager',
    type: 'action',
    icon: 'img/edge/icons.svg#password-20-regular',
  },
  {
    type: 'divider',
  },
  {
    title: 'Print...',
    type: 'action',
    shortcut: 'Ctrl+P',
    icon: 'img/edge/icons.svg#print-20-regular',
  },
  {
    title: 'Screenshot',
    type: 'action',
    shortcut: 'Ctrl+Shift+S',
    icon: 'img/edge/icons.svg#screenshot-20-regular',
  },
  {
    title: 'Find on Page...',
    type: 'action',
    shortcut: 'Ctrl+F',
    icon: 'img/edge/icons.svg#find-page-20-regular',
  },
  {
    title: 'More tools',
    type: 'sub-menu',
    icon: '',
  },
  {
    type: 'divider',
  },
  {
    title: 'Settings',
    type: 'action',
    icon: 'img/edge/icons.svg#settings-20-regular',
  },
  {
    title: 'Help and feedback',
    type: 'sub-menu',
    icon: 'img/edge/icons.svg#help-20-regular',
  },
];

const template = html<MoreMenu>`
  <acrylic-material></acrylic-material>
  <div id="menu-items">
    ${repeat(
      (x) => x.items,
      html<MoreMenuEntry>`
        ${when(
          (item) => item.type === 'divider',
          html`<phx-divider></phx-divider>`,
        )}
        ${when(
          (item) => item.type === 'action',
          html`
            <menu-item
              @click="${(item, c) => c.parent.handleMenuItemClick(item.title)}"
              end-slot
            >
              ${when(
                (item) => item.icon,
                html`<span slot="start"
                  ><svg><use href="${(item) => item.icon}" /></svg
                ></span>`,
                html`<span slot="start" class="icon-placeholder"></span>`,
              )}
              ${(item) => item.title}
              <span class="hint" slot="end">${(item) => item.shortcut}</span>
            </menu-item>
          `,
        )}
        ${when(
          (item) => item.type === 'sub-menu',
          html`
            <menu-item end-slot>
              ${when(
                (item) => item.icon,
                html`<span slot="start"
                  ><svg><use href="${(item) => item.icon}" /></svg
                ></span>`,
                html`<span slot="start" class="icon-placeholder"></span>`,
              )}
              ${(item) => item.title}
              <svg slot="end">
                <use href="img/edge/icons.svg#chevron-right-20-regular" />
              </svg>
            </menu-item>
          `,
        )}
        ${when(
          (item) => item.type === 'zoom',
          html`<more-menu-zoom></more-menu-zoom>`,
        )}
      `,
    )}
  </div>
`;

const styles = css`
  :host {
    display: block;
    position: relative;
    border-radius: ${borderRadiusLayerFlyout};
    box-shadow: ${shadow28};
    overflow: hidden;
  }

  #menu-items {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 200px;
    max-width: 512px;
    padding: ${spacingVerticalXS};
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
    color: ${colorNeutralStrokeSubtle} !important;
  }

  .label {
    padding: ${spacingHorizontalSNudge};
    border-radius: ${borderRadiusMedium};

    font-family: ${typographyStyles.body1.fontFamily};
    font-size: ${typographyStyles.body1.fontSize};
    font-weight: ${typographyStyles.body1.fontWeight};
    line-height: ${typographyStyles.body1.lineHeight};
    color: ${colorNeutralForeground1};
    user-select: none;
  }

  .icon-placeholder {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: transparent;
  }

  #managed {
    background-color: ${colorBrandBackground2};
    user-select: none;

    display: none;
  }

  :host([managed]) #managed {
    display: block;
  }

  #additional {
    font-family: ${typographyStyles.caption1.fontFamily};
    font-size: ${typographyStyles.caption1.fontSize};
    font-weight: ${typographyStyles.caption1.fontWeight};
    line-height: ${typographyStyles.caption1.lineHeight};
    color: ${colorNeutralForeground2};
  }

  button {
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0;
    border-radius: ${borderRadiusMedium};
  }

  button:hover {
    background: ${colorSubtleBackgroundHover};
  }

  button:active {
    background: ${colorSubtleBackgroundPressed};
  }

  .bold {
    font-family: ${typographyStyles.body1Strong.fontFamily};
    font-weight: ${typographyStyles.body1Strong.fontWeight};
    line-height: ${typographyStyles.body1Strong.lineHeight};
    font-size: ${typographyStyles.body1Strong.fontSize};
  }

  .regular {
    font-family: ${typographyStyles.body1.fontFamily};
    font-weight: ${typographyStyles.body1.fontWeight};
    line-height: ${typographyStyles.body1.lineHeight};
    font-size: ${typographyStyles.body1.fontSize};
  }
`;

@customElement({
  name: 'more-menu',
  template,
  styles,
})
export default class MoreMenu extends FASTElement {
  @attr({ mode: 'boolean' }) managed = false;
  @inject(TabService) ts!: TabService;
  @inject(WindowsService) ws!: WindowsService;
  @inject(EdgeWindowService) ews!: EdgeWindowService;
  @observable items: MoreMenuEntry[] = [...defaultItems];

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  handleMenuItemClick(action: string) {
    switch (action) {
      case 'New tab': {
        const id = this.ts.addTab();
        this.ts.activateTab(id);
        break;
      }
      case 'New window': {
        const id = this.ws.openWindow('Microsoft Edge');
        this.ws.activateWindow(id);
        break;
      }
      case 'Print...':
        window.print(); // maybe see if we can print the current tab iframe?
        break;
      case 'Settings': {
        const id = this.ts.addTab({
          id: `tab-${window.crypto.randomUUID()}`,
          title: 'Settings',
          url: 'edge://settings',
        });
        this.ts.activateTab(id);
        break;
      }
      case 'Find on Page...':
      case 'Screenshot':
      case 'New InPrivate window':
        break;
      case 'Close Microsoft Edge':
        this.ws.closeAllWindows('Microsoft Edge');
        break;
      default:
        this.ews.openToolbarItem(action);
        break;
    }
  }
}
