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
import '../../controls/favorites-item.js';
import '../../controls/context-menu.js';
import '../../controls/menu-item.js';
import {
  borderRadiusLayerFlyout,
  colorNeutralForeground1,
  shadow28,
  borderRadiusMedium,
  spacingHorizontalS,
  typographyStyles,
  spacingHorizontalMNudge,
  spacingHorizontalXXS,
  spacingHorizontalXS,
  spacingVerticalXXS,
} from '@phoenixui/themes';
import '@phoenixui/web-components/accordion.js';
import '@phoenixui/web-components/accordion-item.js';
import '@phoenixui/web-components/text-input.js';
import '../../../windows/controls/acrylic-material.js';

const template = html<FavoritesHubFlyout>`
  <acrylic-material></acrylic-material>
  <div id="content">
    <div id="header">
      ${when(
        (x) => x.isSearchInputVisible,
        html`
          <phx-button
              size="medium"
              appearance="subtle"
              icon-only
              @click="${(x) => x.toggleSearchInput()}"
            >
              <svg><use href="./img/edge/icons.svg#chevron-left-20-regular" /></svg>
            </phx-button>
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
              html`
                <button slot="end" @click="${(x) => x.clearSearch()}">
                  <svg><use href="img/edge/icons.svg#dismiss-16-regular" /></svg>
                </button>
              `
            )}
          </phx-text-input>
        `,
        html`
          <span>Favorites</span>
          <div id="icons">
            <phx-button
              size="small"
              appearance="subtle"
              icon-only
              @click="${(x) => x.handleAddFavorite()}"
            >
              <svg><use href="./img/edge/icons.svg#star-add-20-regular" /></svg>
            </phx-button>
            <phx-button
              size="small"
              appearance="subtle"
              icon-only
            >
              <svg><use href="./img/edge/icons.svg#folder-add-20-regular" /></svg>
            </phx-button>
            <phx-button
              size="small"
              appearance="subtle"
              icon-only
              @click="${(x) => x.toggleSearchInput()}"
            >
              <svg><use href="./img/edge/icons.svg#search-20-regular" /></svg>
            </phx-button>
            <flyout-menu>
              <phx-button size="small" appearance="subtle" icon-only slot="trigger">
                <svg>
                  <use href="./img/edge/icons.svg#more-horizontal-20-regular" />
                </svg>
              </phx-button>
              <context-menu>
                <menu-item>
                  <span slot="start"><svg><use href="./img/edge/icons.svg#open-20-regular" /></svg></span>
                  Open Favorites Page
                </menu-item>
                <phx-divider></phx-divider>
                <menu-item @click="${(x) => x.handleAddFavorite()}">
                  <span slot="start"><svg><use href="./img/edge/icons.svg#star-add-20-regular" /></svg></span>
                  Add This Page to Favorites...
                </menu-item>
                <menu-item> Add Open Pages to Favorites... </menu-item>
                <phx-divider></phx-divider>
                <menu-item> Import Favorites </menu-item>
                <menu-item> Export Favorites </menu-item>
                <menu-item> Remove Duplicate Favorites </menu-item>
                <phx-divider></phx-divider>
                <menu-item> 
                  <span slot="end"><svg><use href="./img/edge/icons.svg#chevron-right-20-regular" /></svg></span>
                  Show Favorites Bar 
                </menu-item>
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
        `
      )}
    </div>
    <phx-divider appearance="strong"></phx-divider>
    <div id="body">
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
  </div>
`;

const styles = css`
  :host {
    position: relative;
    display: block;
    border-radius: ${borderRadiusLayerFlyout};
    box-shadow: ${shadow28};
    color: ${colorNeutralForeground1};
    overflow: hidden;
  }

  #content {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 256px;
    max-width: 358px;
  }

  #header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${spacingHorizontalS};
    font-family: ${typographyStyles.body1Strong.fontFamily};
    font-size: ${typographyStyles.body1Strong.fontSize};
    font-weight: ${typographyStyles.body1Strong.fontWeight};
    gap: ${spacingHorizontalXS};
    height: 24px;
  }

  #icons {
    gap: ${spacingHorizontalXXS};
  }

  #body {
    display: flex;
    flex-direction: column;
    padding-bottom: ${spacingHorizontalS};
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

  phx-divider {
    padding: ${spacingVerticalXXS} 0;
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
    width: 100%;
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

@customElement({ name: 'favorites-hub-flyout', template, styles })
export class FavoritesHubFlyout extends FASTElement {
  @attr({ mode: 'boolean' }) pinned = false;
  @inject(FavoritesService) fs!: FavoritesService;
  @inject(TabService) ts!: TabService;
  @inject(EdgeSettingsSerivce) ess!: EdgeSettingsSerivce;

  @observable searchValue = '';
  @observable menuVisible = true;
  @observable isSearchInputVisible = false;
  _inputElement: HTMLInputElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.setElements();
    requestAnimationFrame(() => {
      this.overrideHeadingStyles(); // Call here to set the initial height
    });
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

  toggleSearchInput() {
    this.isSearchInputVisible = !this.isSearchInputVisible; // Toggle visibility
  }
}
