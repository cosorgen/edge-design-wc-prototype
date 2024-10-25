import { customElement, html, css, FASTElement } from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import '@phoenixui/web-components/text-input.js';
import '@phoenixui/web-components/button.js';
import {
  spacingHorizontalM,
  spacingVerticalM,
  typographyStyles,
} from '@phoenixui/themes';
import { spacingVerticalXL } from '@phoenixui/themes/tokens.js';
import { TabService } from '#services/tabService.js';

const template = html<AddFavoritesInputs>`
  <div class="flyout-menu">
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
      <phx-button appearance="outline" @click="${(x) => x.closeFlyout()}"
        >More</phx-button
      >
      <div class="button-group">
        <phx-button appearance="outline" @click="${(x) => x.closeFlyout()}"
          >Remove</phx-button
        >
        <phx-button
          appearance="primary"
          @click="${(x, c) => x.handleDone(c.event)}"
          >Done</phx-button
        >
      </div>
    </div>
  </div>
`;

const styles = css`
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

  connectedCallback() {
    super.connectedCallback();
  }

  getFavoriteName() {
    const activeTab = this.ts.getActiveTab();
    if (activeTab) {
      return this.extractFavoriteName(activeTab.url);
    }
    return '';
  }

  extractFavoriteName(url: string) {
    const urlObj = new URL(url);
    return urlObj.hostname;
  }

  closeFlyout() {
    this.$emit('closeflyout'); // Emit a close event
  }

  handleDone(e: Event) {
    e.stopPropagation();
    const favoriteName = this.getFavoriteName();
    this.$emit('done', { success: true, favoriteName });
    this.closeFlyout();
  }
  
  
}
