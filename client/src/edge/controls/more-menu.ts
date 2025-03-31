import {
  FASTElement,
  customElement,
  css,
  html,
  repeat,
  attr,
  when,
} from '@microsoft/fast-element';
import { MoreMenuEntry } from './menu-item.js';
import './menu-item.js';
import './more-menu-zoom.js';
import '@mai-ui/divider/define.js';
import '@edge-design/button/define.js';
import '@mai-ui/text-input/define.js';
import '@phoenixui/web-components/link.js';
import {
  backgroundCtrlNeutralRest,
  backgroundCtrlSubtleHover,
  backgroundCtrlSubtlePressed,
  backgroundCtrlSubtleRest,
  backgroundFlyoutSolid,
  cornerCtrlRest,
  cornerFlyoutRest,
  foregroundCtrlNeutralPrimaryRest,
  foregroundCtrlNeutralSecondaryRest,
  paddingContentXsmallnudge,
  paddingContentXxsmall,
  paddingFlyoutDefault,
  shadowFlyout,
  textGlobalBody3Fontsize,
  textGlobalBody3Lineheight,
  textGlobalCaption1Fontsize,
  textGlobalCaption1Lineheight,
  textStyleDefaultHeaderWeight,
  textStyleDefaultRegularFontFamily,
  textStyleDefaultRegularWeight,
} from '@edge-design/kumo-theme/tokens.js';

const defaultItems: MoreMenuEntry[][] = [
  [
    { title: 'New tab', type: 'action', shortcut: 'Ctrl+T' },
    { title: 'New window', type: 'action', shortcut: 'Ctrl+N' },
    { title: 'New InPrivate window', type: 'action', shortcut: 'Ctrl+Shift+N' },
  ],
  [{ type: 'zoom' }],
  [
    {
      title: 'Favorites',
      type: 'action',
      shortcut: 'Ctrl+Shift+O',
      keywords: ['bookmarks'],
    },
    { title: 'History', type: 'action', shortcut: 'Ctrl+H' },
    { title: 'Downloads', type: 'action' },
    { title: 'Extensions', type: 'action' },
    { title: 'Passwords', type: 'action' },
  ],
  [
    {
      title: 'Delete browsing data',
      type: 'action',
      shortcut: 'Ctrl+Shift+Delete',
    },
    { title: 'Print', type: 'action', shortcut: 'Ctrl+P' },
    { title: 'Screenshot', type: 'action', shortcut: 'Ctrl+Shift+S' },
    { title: 'Find on page', type: 'action', shortcut: 'Ctrl+F' },
    { title: 'More tools', type: 'sub-menu' },
  ],
  [
    {
      title: 'Settings',
      type: 'action',
      keywords: [
        'appearance',
        'profiles',
        'privacy',
        'security',
        'search',
        'services',
        'copilot',
        'sidebar',
        'start',
        'home',
        'tabs',
        'downloads',
        'cookies',
        'permissions',
        'share',
        'copy',
        'paste',
        'safety',
        'family',
        'printers',
        'system',
        'update',
        'reset',
        'phone',
        'accessibility',
        'about',
      ],
    },
    { title: 'Help and feedback', type: 'sub-menu' },
  ],
  [{ title: 'Close Microsoft Edge', type: 'action' }, { type: 'managed' }],
];

const template = html<MoreMenu>`
  ${repeat(
    () => defaultItems,
    html<MoreMenuEntry[]>`
      <div class="menu-group">
        ${repeat(
          (x) => x,
          html<MoreMenuEntry>`
            ${when(
              (x) => x.type === 'divider',
              html`<mai-divider appearance="subtle"></mai-divider>`,
            )}
            ${when(
              (x) => x.type === 'action',
              html` <menu-item
                @click="${(x, c) =>
                  c.parentContext.parent.handleMenuItemClick(x.title)}"
                end-slot
              >
                ${(x) => x.title}
                <span class="hint" slot="end">${(x) => x.shortcut}</span>
              </menu-item>`,
            )}
            ${when(
              (x) => x.type === 'sub-menu',
              html` <menu-item end-slot>
                ${(x) => x.title}
                <svg slot="end">
                  <use href="img/edge/icons.svg#chevron-right-20-regular" />
                </svg>
              </menu-item>`,
            )}
            ${when(
              (x) => x.type === 'zoom',
              html` <more-menu-zoom></more-menu-zoom>`,
            )}
            ${when(
              (x) => x.type === 'label',
              html` <div class="label">${(x) => x.title}</div>`,
            )}
            ${when(
              (x) => x.type === 'managed',
              html` <div class="label" id="managed">
                Managed by your organization
              </div>`,
            )}
          `,
        )}
      </div>
      <mai-divider appearance="subtle"></mai-divider>
    `,
  )}
`;

const styles = css`
  :host {
    min-width: 320px;
    max-width: 512px;
    display: flex;
    flex-direction: column;
    background: ${backgroundFlyoutSolid};
    border-radius: ${cornerFlyoutRest};
    box-shadow: ${shadowFlyout};
    overflow: hidden;
  }

  .menu-group {
    display: flex;
    flex-direction: column;
    padding: ${paddingFlyoutDefault};
  }

  .hint {
    color: ${foregroundCtrlNeutralSecondaryRest};
  }

  svg {
    width: 20px;
    height: 20px;
  }

  svg[slot='end'] {
    margin-inline-end: calc(0px - ${paddingContentXxsmall});
  }

  mai-divider {
    margin-block: 0;
  }

  .label {
    padding: ${paddingContentXsmallnudge};
    border-radius: ${cornerCtrlRest};

    font-family: ${textStyleDefaultRegularFontFamily};
    font-size: ${textGlobalBody3Fontsize};
    font-weight: ${textStyleDefaultRegularWeight};
    line-height: ${textGlobalBody3Lineheight};
    color: ${foregroundCtrlNeutralPrimaryRest};
    user-select: none;
  }

  #managed {
    background-color: ${backgroundCtrlNeutralRest};
    user-select: none;

    display: none;
  }

  :host([managed]) #managed {
    display: block;
  }

  #additional {
    font-family: ${textStyleDefaultRegularFontFamily};
    font-size: ${textGlobalCaption1Fontsize};
    font-weight: ${textStyleDefaultRegularWeight};
    line-height: ${textGlobalCaption1Lineheight};
    color: ${foregroundCtrlNeutralSecondaryRest};
  }

  button {
    border: none;
    background: ${backgroundCtrlSubtleRest};
    cursor: pointer;
    padding: 0;
    border-radius: ${cornerCtrlRest};
  }

  button:hover {
    background: ${backgroundCtrlSubtleHover};
  }

  button:active {
    background: ${backgroundCtrlSubtlePressed};
  }

  .bold {
    font-family: ${textStyleDefaultRegularFontFamily};
    font-size: ${textGlobalBody3Fontsize};
    font-weight: ${textStyleDefaultHeaderWeight};
    line-height: ${textGlobalBody3Lineheight};
  }

  .regular {
    font-family: ${textStyleDefaultRegularFontFamily};
    font-size: ${textGlobalBody3Fontsize};
    font-weight: ${textStyleDefaultRegularWeight};
    line-height: ${textGlobalBody3Lineheight};
  }
`;

@customElement({ name: 'more-menu', template, styles })
export default class MoreMenu extends FASTElement {
  @attr({ mode: 'boolean' }) managed = false;

  handleMenuItemClick(title: string) {
    this.$emit('moreaction', title);
  }
}
