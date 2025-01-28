import {
  customElement,
  html,
  css,
  FASTElement,
  attr,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import '@phoenixui/web-components/text-input.js';
import { TextInput } from '@phoenixui/web-components/text-input.js';
import '@phoenixui/web-components/button.js';
import {
  acrylicBackgroundBlur,
  acrylicBackgroundLuminosity,
  borderRadiusLayerDialog,
  colorNeutralForeground1,
  shadow28,
  spacingHorizontalL,
  spacingHorizontalM,
  spacingVerticalM,
  typographyStyles,
} from '@phoenixui/themes';
import { spacingVerticalXL } from '@phoenixui/themes/tokens.js';
import { TabService } from '#services/tabService.js';
import FavoritesService from '#services/favoritesService.js';

const template = html<AddFavoritesOmniboxFlyout>`
  <div class="favorite-title">Favorite added</div>
  <div class="input-group">
    <label for="favorite-name">Name</label>
    <phx-text-input
      id="favorite-name"
      value="${(x) => x.getPageTitle()}"
    ></phx-text-input>
  </div>
  <div class="input-group">
    <label for="favorite-folder">Folder</label>
    <phx-text-input id="favorite-folder" placeholder="Select folder" disabled>
      <span slot="start">
        <svg>
          <use href="./img/edge/icons.svg#folder-20-regular" />
        </svg>
      </span>
      <span slot="end">
        <svg>
          <use href="./img/edge/icons.svg#down-chevron-20-regular" />
        </svg>
      </span>
    </phx-text-input>
  </div>
  <div class="footer">
    <phx-button @click="${(x) => x.closeFlyout()}"> More </phx-button>
    <div class="button-group">
      <phx-button @click="${(x) => x.handleRemove()}"> Remove </phx-button>
      <phx-button appearance="primary" @click="${(x) => x.handleDone()}">
        Done
      </phx-button>
    </div>
  </div>
`;

const styles = css`
  :host {
    display: block;
    min-width: 256px;
    min-height: 120px;
    padding: ${spacingHorizontalL};
    background: ${acrylicBackgroundLuminosity};
    background-blend-mode: luminosity;
    backdrop-filter: blur(${acrylicBackgroundBlur});
    border-radius: ${borderRadiusLayerDialog};
    box-shadow: ${shadow28};
    color: ${colorNeutralForeground1};
  }

  .favorite-title {
    margin-bottom: ${spacingVerticalM};
    font-family: ${typographyStyles.subtitle2.fontFamily};
    font-size: ${typographyStyles.subtitle2.fontSize};
    font-weight: ${typographyStyles.subtitle2.fontWeight};
  }

  svg {
    width: 20px;
    height: 20px;
  }

  .input-group {
    display: flex;
    align-items: center;
    margin-bottom: ${spacingVerticalM};
    justify-content: space-between;
  }

  .input-group label {
    margin-right: ${spacingHorizontalM};
    flex: 0 0 auto;
  }

  phx-text-input {
    width: 280px;
    display: flex;
    align-items: center;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    margin-top: ${spacingVerticalXL};
  }

  .button-group {
    display: flex;
    gap: ${spacingHorizontalM};
  }
`;

@customElement({
  name: 'add-favorites-omnibox-flyout',
  template,
  styles,
})
export class AddFavoritesOmniboxFlyout extends FASTElement {
  @inject(TabService) ts!: TabService;
  @inject(FavoritesService) fs!: FavoritesService;
  @attr({ mode: 'boolean' }) open = false;

  openChanged() {
    if (this.$fastController.isConnected) {
      // Get active tab ID from the TabService
      const activeTabId = this.ts.activeTabId;

      // If there's no active tab, do nothing
      if (!activeTabId) return;

      const activeTab = this.ts.tabsById[activeTabId];
      const isFavorite = this.fs.favorites.find(
        (f) => f.type === 'site' && f.url === activeTab.url,
      );

      if (this.open && !isFavorite) {
        this.addFavorite();
      }
    }
  }

  getPageTitle() {
    const activeTabId = this.ts.activeTabId;
    if (activeTabId) {
      const activeTab = this.ts.tabsById[activeTabId];
      return activeTab?.title || 'New favorite';
    }
    return 'New favorite';
  }

  closeFlyout() {
    this.$emit('closemenu'); // Emit a close event
  }

  addFavorite(title?: string) {
    const activeTabId = this.ts.activeTabId;
    if (!activeTabId) return;

    const activeTab = this.ts.tabsById[activeTabId];
    if (activeTab) {
      this.fs.addFavorite({
        type: 'site',
        url: activeTab.url,
        title: title || this.getPageTitle(),
        favicon: activeTab.favicon,
      });
    }
  }

  handleRemove() {
    const activeTabId = this.ts.activeTabId;
    if (!activeTabId) return;

    const activeTab = this.ts.tabsById[activeTabId];
    const favorite = this.fs.favorites.find(
      (f) => f.type === 'site' && f.url === activeTab.url,
    );
    if (favorite) {
      this.fs.removeFavorite(favorite);
    }
    this.closeFlyout();
  }

  handleDone() {
    const activeTabId = this.ts.activeTabId;
    if (!activeTabId) return;

    const activeTab = this.ts.tabsById[activeTabId];

    // Rename the favorite
    const favorite = this.fs.favorites.find(
      (x) => x.type === 'site' && x.url === activeTab.url,
    );
    if (favorite) {
      this.fs.removeFavorite(favorite);
      const title = (
        this.shadowRoot?.querySelector('phx-text-input') as TextInput
      )?.value;
      this.addFavorite(title);
    }

    this.closeFlyout();
  }
}
