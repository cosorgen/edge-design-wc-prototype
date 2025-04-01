import {
  customElement,
  html,
  css,
  FASTElement,
  attr,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import '@mai-ui/text-input/define.js';
import { TextInput } from '@mai-ui/text-input';
import '@edge-design/button/define.js';
import { TabService } from '#services/tabService.js';
import FavoritesService from '#services/favoritesService.js';
import {
  backgroundFlyoutSolid,
  cornerFlyoutRest,
  foregroundCtrlNeutralPrimaryRest,
  gapBetweenContentSmall,
  paddingContentMedium,
  paddingContentSmall,
  shadowFlyout,
  textGlobalBody2Fontsize,
  textGlobalBody2Lineheight,
  textStyleDefaultRegularFontFamily,
  textStyleDefaultRegularWeight,
  paddingContentXsmall,
} from '@edge-design/kumo-theme/tokens.js';

const template = html<AddFavoritesInputs>`
  <div class="favorite-title">
    Favorite added
    <mai-button appearance="subtle" size="small" icon-only>
      <svg>
        <use href="./img/edge/icons.svg#dismiss-16-regular" />
      </svg>
    </mai-button>
  </div>
  <div class="input-group">
    <label for="favorite-name">Name</label>
    <mai-text-input
      id="favorite-name"
      value="${(x) => x.getPageTitle()}"
    ></mai-text-input>
  </div>
  <div class="input-group">
    <label for="favorite-folder">Folder</label>
    <mai-text-input id="favorite-folder" placeholder="Select folder" disabled>
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
    </mai-text-input>
  </div>
  <div class="footer">
    <mai-button @click="${(x) => x.closeFlyout()}"> More </mai-button>
    <div class="button-group">
      <mai-button appearance="primary" @click="${(x) => x.handleDone()}">
        Done
      </mai-button>
      <mai-button @click="${(x) => x.handleRemove()}"> Remove </mai-button>
    </div>
  </div>
`;

const styles = css`
  :host {
    display: block;
    min-width: 256px;
    min-height: 120px;
    padding: ${paddingContentMedium};
    background: ${backgroundFlyoutSolid};
    border-radius: ${cornerFlyoutRest};
    box-shadow: ${shadowFlyout};
    color: ${foregroundCtrlNeutralPrimaryRest};
  }

  .favorite-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${paddingContentXsmall};
    font-family: ${textStyleDefaultRegularFontFamily};
    font-size: ${textGlobalBody2Fontsize};
    line-height: ${textGlobalBody2Lineheight};
    font-weight: ${textStyleDefaultRegularWeight};
  }

  svg {
    width: 20px;
    height: 20px;
  }

  .input-group {
    display: flex;
    align-items: center;
    margin-bottom: ${paddingContentXsmall};
    justify-content: space-between;
  }

  .input-group label {
    margin-right: ${paddingContentSmall};
    flex: 0 0 auto;
  }

  mai-text-input {
    width: 280px;
    display: flex;
    align-items: center;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    margin-top: ${paddingContentMedium};
  }

  .button-group {
    display: flex;
    gap: ${gapBetweenContentSmall};
  }
`;

@customElement({ name: 'add-favorites-flyout', template, styles })
export class AddFavoritesInputs extends FASTElement {
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
        this.shadowRoot?.querySelector('mai-text-input') as TextInput
      )?.value;
      this.addFavorite(title);
    }

    this.closeFlyout();
  }
}
