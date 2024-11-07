import {
  customElement,
  html,
  css,
  FASTElement,
  repeat,
  when,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import FavoritesService, {
  Favorite,
  FavoriteFolder,
} from '#services/favoritesService.js';
import '../controls/favorites-item.js';
import '../controls/flyout-menu.js';
import '../controls/context-menu.js';
import '../controls/menu-item.js';
import { spacingHorizontalS } from '@phoenixui/themes';
import { TabService } from '#servicestabService.js';
import { spacingFrame } from '../designSystem.js';

const template = html`
  ${repeat(
    (x) => x.fs.favorites,
    html`${when(
      (x) => x.type === 'site',
      html` <favorites-item
        type=${(x) => x.type}
        title=${(x) => x.title}
        favicon=${(x) => x.favicon}
        @click=${(x, c) => c.parent.handleItemClick(x)}
        slot="trigger"
      >
      </favorites-item>`,
      html`<flyout-menu>
        <favorites-item
          type=${(x) => x.type}
          title=${(x) => x.title}
          favicon=${(x) => x.favicon}
          @click=${(x, c) => c.parent.handleItemClick(x)}
          slot="trigger"
        >
        </favorites-item>
        <context-menu>
          <menu-item type="action">Item 1</menu-item>
          <menu-item type="action">Item 2</menu-item>
          <menu-item type="action">Item 3</menu-item>
        </context-menu>
      </flyout-menu>`,
    )}`,
  )}
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${spacingHorizontalS};
    padding-block-end: ${spacingFrame};
  }
`;

@customElement({
  name: 'favorites-bar',
  template,
  styles,
})
export class FavoritesBar extends FASTElement {
  @inject(FavoritesService) fs!: FavoritesService;
  @inject(TabService) ts!: TabService;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });
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
    }
  }
}
