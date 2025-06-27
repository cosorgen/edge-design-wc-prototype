import {
  FASTElement,
  customElement,
  css,
  html,
  observable,
  repeat,
  when,
  attr,
  volatile,
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
import '@mai-ui/tree/define.js';
import '@mai-ui/tree-item/define.js';
import '@mai-ui/text-input/define.js';
import {
  backgroundFlyoutSolid,
  cornerFlyoutRest,
  foregroundContentNeutralPrimary,
  paddingContentXSmall,
  shadowFlyout,
  textGlobalBody3FontSize,
  textGlobalBody3LineHeight,
  textStyleDefaultHeaderWeight,
  textStyleDefaultRegularFontFamily,
  cornerCtrlRest,
  textStyleDefaultRegularWeight,
  gapBetweenContentMedium,
  gapBetweenContentXxSmall,
  paddingContentMedium,
  gapBetweenContentSmall,
} from '@phoenixui/themes/smtc-tokens.js';

const template = html<FavoritesMenu>`
  <div id="header">
    <div id="header-title">
      <span>Favorites</span>
      <div id="icons">
        <flyout-menu>
          <mai-button size="small" appearance="subtle" icon-only slot="trigger">
            <svg>
              <use href="./img/edge/icons.svg#more-horizontal-20-regular" />
            </svg>
          </mai-button>
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
        <mai-button
          size="small"
          appearance="subtle"
          icon-only
          @click="${(x) => x.handleAddFavorite()}"
        >
          <svg><use href="./img/edge/icons.svg#pin-20-regular" /></svg>
        </mai-button>
        <mai-button size="small" appearance="subtle" icon-only>
          <svg><use href="./img/edge/icons.svg#dismiss-16-regular" /></svg>
        </mai-button>
      </div>
    </div>
    <mai-text-input
      appearance="filled-darker"
      placeholder="Search your favorites"
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
    </mai-text-input>
  </div>
  <mai-tree>
    <mai-tree-item expanded>
      <svg slot="start">
        <use href="./img/edge/icons.svg#star-20-regular" />
      </svg>
      Favorites bar
      ${repeat(
        (x) => x.filteredFavorites,
        html`${when(
          (x) => x.type === 'folder',
          html`<mai-tree-item>
            <svg slot="start">
              <use href="./img/edge/icons.svg#folder-20-regular" />
            </svg>
            ${(x) => x.title}
            ${repeat(
              [1, 2, 3],
              html` <mai-tree-item
                @click="${(item, c) => c.parent.handleItemClick(item)}"
              >
                <svg slot="start">
                  <use href="./img/edge/icons.svg#document-20-regular" />
                </svg>
                ${(item) => `Favorite ${item}`}
              </mai-tree-item>`,
            )}
          </mai-tree-item>`,
          html`<mai-tree-item
            @click="${(item, c) => c.parent.handleItemClick(item)}"
          >
            <img src="${(x) => x.favicon}" slot="start" />
            ${(x) => x.title}
          </mai-tree-item>`,
        )}`,
      )}
    </mai-tree-item>
    <mai-tree-item>
      <svg slot="start">
        <use href="./img/edge/icons.svg#folder-20-regular" />
      </svg>
      Other favorites
      ${repeat(
        [1, 2, 3],
        html` <mai-tree-item
          @click="${(item, c) => c.parent.handleItemClick(item)}"
        >
          <svg slot="start">
            <use href="./img/edge/icons.svg#document-20-regular" />
          </svg>
          ${(item) => `Favorite ${item}`}
        </mai-tree-item>`,
      )}
    </mai-tree-item>
  </mai-tree>
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    min-width: 256px;
    max-width: 358px;
    padding: ${paddingContentMedium};
    gap: ${gapBetweenContentMedium};
    background: ${backgroundFlyoutSolid};
    border-radius: ${cornerFlyoutRest};
    box-shadow: ${shadowFlyout};
    color: ${foregroundContentNeutralPrimary};
  }

  #header {
    display: flex;
    flex-direction: column;
    gap: ${gapBetweenContentSmall};
  }

  #header-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-family: ${textStyleDefaultRegularFontFamily};
    font-size: ${textGlobalBody3FontSize};
    font-weight: ${textStyleDefaultHeaderWeight};
    line-height: ${textGlobalBody3LineHeight};
  }

  #icons {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${gapBetweenContentXxSmall};
  }

  button {
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0;
    border-radius: ${cornerCtrlRest};
  }

  favorites-item,
  phx-accordion {
    width: 100%;
  }

  phx-accordion-item {
    max-width: none !important;
  }

  phx-accordion-item::part(heading),
  phx-accordion-item::part(button) {
    height: 32px;
  }

  favorites-item::part(favorite-button) {
    height: 32px !important;
    gap: ${gapBetweenContentMedium};
    padding-left: 42px;
    font-family: ${textStyleDefaultRegularFontFamily};
    font-size: ${textGlobalBody3FontSize};
    font-weight: ${textStyleDefaultRegularWeight};
    line-height: ${textGlobalBody3LineHeight};
  }

  mai-text-input {
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
    margin-right: ${paddingContentXSmall};
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
  @observable searchValue = '';
  @observable menuVisible = true;
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
      'mai-text-input',
    ) as HTMLInputElement;
  }

  unsetElements() {
    this._inputElement = null;
  }

  handleInput(event: InputEvent) {
    this.searchValue = (event.target as HTMLInputElement).value;
  }

  clearSearch() {
    this.searchValue = '';
    this._inputElement!.value = '';
  }

  @volatile
  get filteredFavorites() {
    const lowerCaseSearchValue = this.searchValue.toLowerCase();

    return this.fs.favorites.filter(
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
