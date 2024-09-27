import {
  customElement,
  html,
  css,
  FASTElement,
  repeat,
} from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import FavoritesService, {
  Favorite,
  FavoriteFolder,
} from '#services/favoritesService.js';
import '../controls/favorites-item.js';
import { spacingHorizontalS } from '@phoenixui/themes';
import { TabService } from '#servicestabService.js';

const template = html`
  ${repeat(
    (x) => x.fs.favorites,
    html`<favorites-item
      type=${(x) => x.type}
      title=${(x) => x.title}
      favicon=${(x) => x.favicon}
      @click=${(x, c) => c.parent.handleItemClick(x)}
    >
    </favorites-item>`,
  )}
`;

const styles = css`
  :host {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${spacingHorizontalS};
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

  handleItemClick(item: Favorite | FavoriteFolder) {
    if (item.type === 'site') {
      this.ts.navigate(item.url);
    }
  }
}
