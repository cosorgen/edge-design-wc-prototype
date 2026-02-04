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
import '@mai-ui/divider/define.js';
import { TabService } from '#servicestabService.js';
import { paddingContentXSmall } from '@mai-ui/design-tokens/tokens.js';

const template = html`
  <div id="user">
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
            slot="trigger"
          >
          </favorites-item>
          <context-menu>
            <menu-item type="action" start-slot>
              <svg slot="start">
                <use href="./img/edge/icons.svg#document-20-regular" />
              </svg>
              Item 1
            </menu-item>
            <menu-item type="action" start-slot>
              <svg slot="start">
                <use href="./img/edge/icons.svg#document-20-regular" />
              </svg>
              Item 2
            </menu-item>
            <menu-item type="action" start-slot>
              <svg slot="start">
                <use href="./img/edge/icons.svg#document-20-regular" />
              </svg>
              Item 3
            </menu-item>
          </context-menu>
        </flyout-menu>`,
      )}`,
    )}
  </div>
  <mai-divider orientation="vertical"></mai-divider>
  <div id="system">
    <flyout-menu>
      <favorites-item type="folder" title="Other favorites" slot="trigger">
      </favorites-item>
      <context-menu>
        <menu-item type="action" start-slot>
          <svg slot="start">
            <use href="./img/edge/icons.svg#document-20-regular" />
          </svg>
          Item 1
        </menu-item>
        <menu-item type="action" start-slot>
          <svg slot="start">
            <use href="./img/edge/icons.svg#document-20-regular" />
          </svg>
          Item 2
        </menu-item>
        <menu-item type="action" start-slot>
          <svg slot="start">
            <use href="./img/edge/icons.svg#document-20-regular" />
          </svg>
          Item 3
        </menu-item>
      </context-menu>
    </flyout-menu>
  </div>
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: space-between;
    gap: calc(var(--paddingWindowDefault) * 2);
    padding: var(--paddingWindowDefault);
    padding-block-end: 0px;
  }

  #user {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    gap: calc(var(--paddingWindowDefault) * 2);
  }

  #system {
    display: flex;
    flex-direction: row;
  }

  mai-divider::before,
  mai-divider::after {
    min-height: 0px;
  }

  mai-divider {
    box-sizing: border-box;
    min-height: 0px;
    padding-block: ${paddingContentXSmall};
  }
`;

@customElement({ name: 'favorites-bar', template, styles })
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
