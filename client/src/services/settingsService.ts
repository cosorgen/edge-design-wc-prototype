import { observable } from '@microsoft/fast-element';

// Global state for the Edge browser
export default class EdgeSettingsSerivce {
  @observable theme: 'light' | 'dark' | 'system' = 'system';
  @observable showFavoritesBar: 'always' | 'newtab' | 'never' = 'never';
  @observable showLegacyCopilot = false;
  @observable truncateURL = false;
  @observable pinnedToolbarItems: string[] = [];
  @observable frameSpacing = '4px';
  @observable showLegacyNewTab = false;

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
        | 'never') || 'never';

    this.showLegacyCopilot =
      url.searchParams.get('showLegacyCopilot') === 'true';
    this.showLegacyNewTab = url.searchParams.get('showLegacyNewTab') === 'true';
    this.showLegacyCopilot && this.pinToolbarItem('Copilot');

    this.truncateURL = url.searchParams.get('truncateURL') === 'true';

    this.frameSpacing = url.searchParams.get('frameSpacing') || '4px';
  }

  setSettingsInURL() {
    const url = new URL(window.location.href);
    url.searchParams.set('showFavoritesBar', this.showFavoritesBar);
    url.searchParams.set(
      'showLegacyCopilot',
      this.showLegacyCopilot.toString(),
    );
    url.searchParams.set('showLegacyNewTab', this.showLegacyNewTab.toString());
    url.searchParams.set('truncateURL', this.truncateURL.toString());
    url.searchParams.set('frameSpacing', this.frameSpacing);

    window.history.pushState({}, '', url.toString());
  }

  pinToolbarItem(id: string) {
    this.pinnedToolbarItems = [id, ...this.pinnedToolbarItems];
  }

  unpinToolbarItem(id: string) {
    this.pinnedToolbarItems = this.pinnedToolbarItems.filter((i) => i !== id);
  }

  setTruncateURL(truncate: boolean) {
    this.truncateURL = truncate;
    this.setSettingsInURL();
  }

  setShowLegacyCopilot(show: boolean) {
    this.showLegacyCopilot = show;
    show ? this.pinToolbarItem('Copilot') : this.unpinToolbarItem('Copilot');
    this.setSettingsInURL();
  }

  setShowLegacyNewTab(show: boolean) {
    this.showLegacyNewTab = show;
    this.setSettingsInURL();
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
