import { observable } from '@microsoft/fast-element';

// Global state for the Edge browser
export default class EdgeSettingsSerivce {
  @observable theme: 'light' | 'dark' | 'system' = 'system';
  @observable showFavoritesBar: 'always' | 'newtab' | 'never' = 'never';
  @observable pinnedToolbarItems: string[] = ['Favorites'];
  @observable frameSpacing = '4px';
  @observable savePassword = false;
  @observable reversedCTA = false;

  constructor() {
    // Load settings from local storage
    this.getSettingsFromURL();
  }

  getSettingsFromURL() {
    const url = new URL(window.location.href);
    this.showFavoritesBar =
      (url.searchParams.get('showFavoritesBar') as
        | 'always'
        | 'newtab'
        | 'never') || this.showFavoritesBar;

    this.frameSpacing =
      url.searchParams.get('frameSpacing') || this.frameSpacing;

    this.savePassword = url.searchParams.get('savePassword') === 'true';

    this.reversedCTA = url.searchParams.get('reversedCTA') === 'true';
  }

  setSettingsInURL() {
    const url = new URL(window.location.href);
    url.searchParams.set('showFavoritesBar', this.showFavoritesBar);
    url.searchParams.set('frameSpacing', this.frameSpacing);

    window.history.pushState({}, '', url.toString());
  }

  pinToolbarItem(id: string) {
    this.pinnedToolbarItems = [id, ...this.pinnedToolbarItems];
  }

  unpinToolbarItem(id: string) {
    this.pinnedToolbarItems = this.pinnedToolbarItems.filter((i) => i !== id);
  }

  setTheme(theme: 'light' | 'dark' | 'system') {
    this.theme = theme;
    this.setSettingsInURL();
  }

  setShowFavoritesBar(show: 'always' | 'newtab' | 'never') {
    this.showFavoritesBar = show;
    this.setSettingsInURL();
  }

  setFrameSpacing(spacing: string) {
    this.frameSpacing = spacing;
    this.setSettingsInURL();
  }
}
