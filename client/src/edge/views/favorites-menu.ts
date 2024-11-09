import {
  FASTElement,
  customElement,
  css,
  html,
  observable,
  repeat,
  when,
  attr,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import FavoritesService, {
  Favorite,
  FavoriteFolder,
} from '#services/favoritesService.js';
import { TabService } from '#services/tabService.js';
import EdgeSettingsSerivce from '#servicessettingsService.js';
import '../controls/favorites-item.js';
import '../controls/context-menu.js';
import '../controls/menu-item.js';
import {
  acrylicBackgroundBlur,
  acrylicBackgroundLuminosity,
  borderRadiusLayerFlyout,
  colorNeutralForeground1,
  shadow28,
  borderRadiusMedium,
  spacingHorizontalS,
  typographyStyles,
  spacingHorizontalMNudge,
} from '@phoenixui/themes';
import '@phoenixui/web-components/accordion.js';
import '@phoenixui/web-components/accordion-item.js';
import '@phoenixui/web-components/text-input.js';
import { spacingHorizontalXXS } from '@phoenixui/themes/tokens.js';

const template = html<FavoritesMenu>`
  <div id="header">
    <span>Favorites</span>
    <div id="icons">
      <phx-button
        size="small"
        appearance="subtle"
        icon-only
        @click="${(x) => x.handleAddFavorite()}"
      >
        <svg><use href="./img/edge/icons.svg#open-20-regular" /></svg>
      </phx-button>
      <flyout-menu>
        <phx-button size="small" appearance="subtle" icon-only slot="trigger">
          <svg>
            <use href="./img/edge/icons.svg#more-horizontal-20-regular" />
          </svg>
        </phx-button>
        <context-menu>
          <menu-item @click="${(x) => x.handleAddFavorite()}">
            Add this page to favorites
          </menu-item>
          <menu-item> Add new folder </menu-item>
          ${when(
            (x) => x.ess.pinnedToolbarItems.includes('Favorites'),
            html` <menu-item
              @click="${(x) => x.ess.unpinToolbarItem('Favorites')}"
            >
              Hide favorites button in toolbar
            </menu-item>`,
            html` <menu-item
              @click="${(x) => x.ess.pinToolbarItem('Favorites')}"
            >
              Show favorites button in toolbar
            </menu-item>`,
          )}
        </context-menu>
      </flyout-menu>
    </div>
  </div>
  <div id="content">
    <phx-text-input
      appearance="filled-darker"
      placeholder="Search"
      @input="${(x, c) => x.handleInput(c.event as InputEvent)}"
      value="${(x) => x.searchValue}"
    >
      <svg slot="start">
        <use href="img/edge/icons.svg#search-20-regular" />
      </svg>
      ${when(
        (x) => x.searchValue !== '',
        html`<button slot="end" @click="${(x) => x.clearSearch()}">
          <svg><use href="img/edge/icons.svg#dismiss-16-regular" /></svg>
        </button>`,
      )}
    </phx-text-input>
    <phx-accordion>
      <phx-accordion-item expanded>
        <span slot="heading" class="folder-heading">
          <svg><use href="./img/edge/icons.svg#star-20-regular" /></svg>
          Favorites bar
        </span>
        <div class="vertical-container">
          ${repeat(
            (x) => x.filteredFavorites,
            html`${when(
              (x) => x.type === 'folder',
              html`<phx-accordion-item>
                <span slot="heading" class="folder-heading">
                  <svg>
                    <use href="./img/edge/icons.svg#folder-20-regular" />
                  </svg>
                  ${(x) => x.title}
                </span>
                <div class="vertical-container">
                  ${repeat(
                    [1, 2, 3],
                    html`<favorites-item
                      type="site"
                      title="${(item) => `Favorite ${item}`}"
                      favicon="https://www.microsoft.com/favicon.ico?v2"
                      @click="${(item, c) => c.parent.handleItemClick(item)}"
                    ></favorites-item>`,
                  )}
                </div>
              </phx-accordion-item>`,
              html`<favorites-item
                type="${(x) => x.type}"
                title="${(x) => x.title}"
                favicon="${(x) => x.favicon}"
                @click="${(x, c) => c.parent.handleItemClick(x)}"
              ></favorites-item>`,
            )}`,
          )}
        </div>
      </phx-accordion-item>
    </phx-accordion>
  </div>
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    min-width: 256px;
    max-width: 358px;
    background: ${acrylicBackgroundLuminosity};
    backdrop-filter: blur(${acrylicBackgroundBlur});
    border-radius: ${borderRadiusLayerFlyout};
    box-shadow: ${shadow28};
    color: ${colorNeutralForeground1};
  }

  #header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${spacingHorizontalS};
    font-family: ${typographyStyles.body1Strong.fontFamily};
    font-size: ${typographyStyles.body1Strong.fontSize};
    font-weight: ${typographyStyles.body1Strong.fontWeight};
  }

  #icons {
    gap: ${spacingHorizontalXXS};
  }

  #content {
    display: flex;
    flex-direction: column;
    padding: 0 ${spacingHorizontalS} ${spacingHorizontalS};
  }

  button {
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0;
    border-radius: ${borderRadiusMedium};
  }

  favorites-item,
  phx-accordion {
    width: 100%;
  }

  phx-accordion-item {
    max-width: none !important;
  }

  favorites-item::part(favorite-button) {
    height: 32px !important;
    gap: ${spacingHorizontalMNudge};
    padding-left: 42px;
    font-family: ${typographyStyles.body1.fontFamily};
    font-size: ${typographyStyles.body1.fontSize};
    font-weight: ${typographyStyles.body1.fontWeight};
    line-height: ${typographyStyles.body1.lineHeight};
  }

  phx-text-input {
    display: flex;
    align-items: center;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  .folder-heading {
    display: flex;
    align-items: center;
  }

  .folder-heading svg {
    margin-right: ${spacingHorizontalS};
  }

  .vertical-container {
    display: flex;
    flex-direction: column;
  }
`;

@customElement({ name: 'favorites-menu', template, styles })
export class FavoritesMenu extends FASTElement {
  @attr({ mode: 'boolean' }) pinned = false;
  @inject(FavoritesService) fs!: FavoritesService;
  @inject(TabService) ts!: TabService;
  @inject(EdgeSettingsSerivce) ess!: EdgeSettingsSerivce;

  @observable favorites: (Favorite | FavoriteFolder)[] = [];
  @observable searchValue = '';
  @observable menuVisible = true;
  _inputElement: HTMLInputElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.loadFavorites();
    requestAnimationFrame(() => {
      this.overrideHeadingStyles(); // Call here to set the initial height
    });
    this.fs.addObserver(this.loadFavorites.bind(this));
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unsetElements();
    this.fs.removeObserver(this.loadFavorites.bind(this));
  }

  setElements() {
    this._inputElement = this.shadowRoot?.querySelector(
      'phx-text-input',
    ) as HTMLInputElement;
  }

  unsetElements() {
    this._inputElement = null;
  }

  loadFavorites() {
    this.favorites = this.fs.favorites;
  }

  handleInput(event: InputEvent) {
    this.searchValue = (event.target as HTMLInputElement).value;
    this.overrideHeadingStyles();
  }

  clearSearch() {
    this.searchValue = '';
    this._inputElement!.value = '';
    this.overrideHeadingStyles();
  }

  overrideHeadingStyles() {
    const accordionItems =
      this.shadowRoot?.querySelectorAll('phx-accordion-item');

    accordionItems?.forEach((item) => {
      const heading = item.shadowRoot?.querySelector('.heading') as HTMLElement;
      const button = item.shadowRoot?.querySelector('button') as HTMLElement;
      if (heading) {
        heading.style.height = '32px';
      }
      if (button) {
        button.style.height = '32px';
      }
    });
  }

  get filteredFavorites() {
    const lowerCaseSearchValue = this.searchValue.toLowerCase();

    return this.favorites.filter(
      (favorite) =>
        favorite.type === 'folder' ||
        favorite.title.toLowerCase().includes(lowerCaseSearchValue),
    );
  }

  handlePinToggle() {
    this.pinned = !this.pinned;
    console.log('Toggled pinned state:', this.pinned);
    this.$emit('togglepintoolbaritem', this.pinned);
  }

  handleItemClick(item: Favorite | FavoriteFolder) {
    if (item.type === 'site' && item.url) {
      const activeTabId = this.ts.activeTabId;
      const activeTab = activeTabId ? this.ts.tabsById[activeTabId] : null;

      if (!activeTab) return;

      if (activeTab.url === 'edge://newtab') {
        this.ts.navigateTab(activeTab.id, item.url);
      } else {
        const id = this.ts.addTab();
        if (!id) return;
        this.ts.navigateTab(id, item.url);
      }

      // Close the favorites menu (if needed)
      this.$emit('closemenu');
    }
  }

  handleAddFavorite() {
    if (!this.pageIsFavorite()) {
      const activeTabId = this.ts.activeTabId;
      const activeTab = this.ts.tabsById[activeTabId!];
      if (!activeTab || activeTab.url === 'edge://newtab') return;

      this.fs.addFavorite({
        type: 'site',
        url: activeTab.url,
        title: activeTab.title || 'New favorite',
        favicon: activeTab.favicon,
      });
    }
  }

  pageIsFavorite() {
    const activeTabId = this.ts.activeTabId;
    const activeTab = this.ts.tabsById[activeTabId!];
    if (!activeTab) return false;
    return this.fs.favorites.some((f) => f.title === activeTab.title);
  }
}
