import { observable } from '@microsoft/fast-element';

// Global state for the Edge browser
export default class EdgeSettingsService {
  @observable theme: 'light' | 'dark' | 'system' = 'system';
  @observable showFavoritesBar: 'always' | 'newtab' | 'never' = 'never';
  @observable showLegacyCopilot = true;
  @observable truncateURL = false;
  @observable pinnedToolbarItems: string[] = [];
  @observable frameSpacing = '4px';
  @observable showLegacyNewTab = true;

  constructor() {
    // Pin Copilot on initialization
    this.pinToolbarItem('Copilot');
    this.getSettingsFromURL();
  }

  getSettingsFromURL() {
    const url = new URL(window.location.href);
    this.showFavoritesBar =
      (url.searchParams.get('showFavoritesBar') as
        | 'always'
        | 'newtab'
        | 'never') || 'never';

  }

  setSettingsInURL() {
    const url = new URL(window.location.href);
    url.searchParams.set('showFavoritesBar', this.showFavoritesBar);
    window.history.pushState({}, '', url.toString());
  }

  setTruncateURL(truncate: boolean) {
    this.truncateURL = truncate;
  }

  setShowLegacyNewTab(show: boolean) {
    this.showLegacyNewTab = show;
  }

  setTheme(theme: 'light' | 'dark' | 'system') {
    this.theme = theme;
  }

  setShowFavoritesBar(show: 'always' | 'newtab' | 'never') {
    this.showFavoritesBar = show;
    this.setSettingsInURL();
  }

  setFrameSpacing(spacing: string) {
    this.frameSpacing = spacing;
  }

  pinToolbarItem(id: string) {
    if (!this.pinnedToolbarItems.includes(id)) {
      this.pinnedToolbarItems = [id, ...this.pinnedToolbarItems];
    }
  }

  unpinToolbarItem(id: string) {
    this.pinnedToolbarItems = this.pinnedToolbarItems.filter((i) => i !== id);
  }
}
