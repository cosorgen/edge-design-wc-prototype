import { observable } from '@microsoft/fast-element';

// Global state for the Edge browser
export default class EdgeSettingsSerivce {
  @observable theme: 'light' | 'dark' | 'system' = 'system';
  @observable showFavoritesBar: 'always' | 'newtab' | 'never' = 'never';
  @observable showLegacyCopilot = false;
  @observable truncateURL = false;
  @observable pinnedToolbarItems: string[] = [];

  constructor() {
    // Load settings from local storage
    this.setSettingsFromURL();
  }

  setSettingsFromURL() {
    const url = new URL(window.location.href);
    this.theme =
      (url.searchParams.get('theme') as 'light' | 'dark' | 'system') ||
      'system';
    this.showFavoritesBar =
      (url.searchParams.get('showFavoritesBar') as
        | 'always'
        | 'newtab'
        | 'never') || 'never';

    this.showLegacyCopilot = url.searchParams.has('showLegacyCopilot');
    this.showLegacyCopilot && this.pinToolbarItem('Copilot');

    this.truncateURL = url.searchParams.has('truncateURL');
  }

  pinToolbarItem(id: string) {
    this.pinnedToolbarItems = [id, ...this.pinnedToolbarItems];
  }

  unpinToolbarItem(id: string) {
    this.pinnedToolbarItems = this.pinnedToolbarItems.filter((i) => i !== id);
  }
}
