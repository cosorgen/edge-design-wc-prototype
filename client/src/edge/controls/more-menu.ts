import {
  FASTElement,
  customElement,
  css,
  html,
  observable,
  repeat,
  attr,
  when,
  ViewTemplate,
} from '@microsoft/fast-element';
import {
  acrylicBackgroundBlur,
  acrylicBackgroundLuminosity,
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
  spacingVerticalS,
  spacingVerticalXS,
  typographyStyles,
} from '@mai-ui/phoenix-theme';
import { MoreMenuEntry } from './menu-item.js';
import './menu-item.js';
import './more-menu-zoom.js';
import '@phoenixui/web-components/divider.js';
import '@phoenixui/web-components/button.js';
import '@phoenixui/web-components/text-input.js';
import '@phoenixui/web-components/link.js';

const defaultItems: MoreMenuEntry[] = [
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
    keywords: ['bookmarks'],
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
  {
    title: 'Help and feedback',
    type: 'sub-menu',
  },
  {
    type: 'divider',
  },
  {
    title: 'Close Microsoft Edge',
    type: 'action',
  },
];

const template = html<MoreMenu>`
  <phx-text-input
    appearance="filled-darker"
    placeholder="Search"
    @keyup="${(x, c) => x.handleInputKeyUp(c.event as KeyboardEvent)}"
  >
    <svg slot="start">
      <use href="img/edge/icons.svg#search-20-regular" />
    </svg>
    ${when(
      (x) => x.searchValue !== '',
      html` <button slot="end" @click="${(x) => x.clearSearch()}">
        <svg>
          <use href="img/edge/icons.svg#dismiss-16-regular" />
        </svg>
      </button>`,
    )}
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
        html` <menu-item
          @click="${(x, c) => c.parent.handleMenuItemClick(x.title)}"
          end-slot
        >
          ${(x, c) => c.parent.formatTitle(x.title)}
          <span class="hint" slot="end">${(x) => x.shortcut}</span>
        </menu-item>`,
      )}
      ${when(
        (x) => x.type === 'sub-menu',
        html` <menu-item end-slot>
          ${(x, c) => c.parent.formatTitle(x.title)}
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
      )}`,
    )}
    ${when(
      (x) => x.additionalSettings(),
      html`<phx-divider></phx-divider>
        <div class="label" id="additional">
          Also ${(x) => x.additionalSettings()} results found in
          <phx-link inline>Settings</phx-link>
        </div> `,
    )}
    ${when(
      (x) => x.searchValue === '',
      html`<div class="label" id="managed">Managed by your organization</div>`,
    )}
  </div>
`;

const styles = css`
  :host {
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
  @observable items: MoreMenuEntry[] = [...defaultItems];
  @observable searchValue = '';
  _inputElement: HTMLInputElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.setElements();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unsetElements();
  }

  setElements() {
    this._inputElement = this.shadowRoot?.querySelector(
      'phx-text-input',
    ) as HTMLInputElement;
  }

  unsetElements() {
    this._inputElement = null;
  }

  handleMenuItemClick(title: string) {
    this.$emit('moreaction', title);
  }

  handleInputKeyUp(e: KeyboardEvent) {
    if (!this._inputElement) return;

    this.searchValue = this._inputElement.value || '';
    this._inputElement.value = this._inputElement.value || '';

    if (e.key === 'Escape') {
      this.clearSearch();
      this.$emit('closemenu');
    }

    this.filterItems();
  }

  clearSearch() {
    this.searchValue = '';
    this._inputElement!.value = '';
    this.items = [...defaultItems];
  }

  filterItems() {
    this.items = defaultItems.filter(
      (item) =>
        (item.title &&
          item.title.toLowerCase().includes(this.searchValue.toLowerCase())) ||
        (item.keywords &&
          item.title !== 'Settings' &&
          item.keywords.some((k) =>
            k.includes(this.searchValue.toLowerCase()),
          )),
    );

    if (this.searchValue === '') this.items = [...defaultItems];
    if (this.items.length === 0)
      this.items = [{ title: 'No results', type: 'label' }];
  }

  additionalSettings() {
    if (this.searchValue === '') return 0;
    return defaultItems
      .find((i) => i.title === 'Settings')
      ?.keywords?.filter((k) => k.includes(this.searchValue.toLowerCase()))
      .length;
  }

  formatTitle(title?: string) {
    if (this.searchValue === '' || !title) return html`${title || ''}`;

    const formattedTitle = title.replaceAll(
      new RegExp(this.searchValue, 'gi'),
      (match) => `<span class="regular">${match}</span>`,
    );

    return html`<span class="bold">
      ${new ViewTemplate(formattedTitle)}
    </span>`;
  }
}
