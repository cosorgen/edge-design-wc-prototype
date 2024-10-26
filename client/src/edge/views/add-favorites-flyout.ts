import {
  customElement,
  html,
  css,
  FASTElement,
  attr,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import '@phoenixui/web-components/text-input.js';
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
import FavoritesService from '#servicesfavoritesService.js';

const template = html<AddFavoritesInputs>`
  <div class="favorite-title">Favorite added</div>
  <div class="input-group">
    <label for="favorite-name">Name</label>
    <phx-text-input
      id="favorite-name"
      value="${(x) => x.getFavoriteName()}"
    ></phx-text-input>
  </div>
  <div class="input-group">
    <label for="favorite-folder">Folder</label>
    <phx-text-input id="favorite-folder" placeholder="Select folder">
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
      <phx-button appearance="primary" @click="${(x) => x.closeFlyout()}">
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
  name: 'add-favorites-flyout',
  template,
  styles,
})
export class AddFavoritesInputs extends FASTElement {
  @inject(TabService) ts!: TabService;
  @inject(FavoritesService) fs!: FavoritesService;
  @attr({ mode: 'boolean' }) open = false;

  openChanged() {
    if (this.$fastController.isConnected) {
      const isFavorite = this.fs.favorites.find(
        (f) => f.title === this.getFavoriteName(),
      );
      if (this.open && !isFavorite) {
        this.addFavorite();
      }
    }
  }

  getFavoriteName() {
    const activeTab = this.ts.getActiveTab();
    if (activeTab) return activeTab.title;
    return 'Uknown page';
  }

  closeFlyout() {
    this.$emit('closemenu'); // Emit a close event
  }

  addFavorite() {
    const activeTab = this.ts.getActiveTab();
    if (activeTab) {
      this.fs.addFavorite({
        type: 'site',
        url: activeTab.url,
        title: activeTab.title!,
        favicon: activeTab.favicon,
      });
    }
  }

  handleRemove() {
    const activeTab = this.ts.getActiveTab();
    const favorite = this.fs.favorites.find(
      (f) => f.title === activeTab?.title,
    );
    if (favorite) {
      this.fs.removeFavorite(favorite);
    }
    this.closeFlyout();
  }
}
