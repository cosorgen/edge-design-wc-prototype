import { observable } from '@microsoft/fast-element';

// Global state for the Edge browser
export default class EdgeSettingsSerivce {
  @observable theme: 'light' | 'dark' | 'system' = 'system';
  @observable showFavoritesBar: 'always' | 'newtab' | 'never' = 'never';
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
  }

  pinToolbarItem(id: string) {
    this.pinnedToolbarItems = [...this.pinnedToolbarItems, id];
  }

  unpinToolbarItem(id: string) {
    this.pinnedToolbarItems = this.pinnedToolbarItems.filter((i) => i !== id);
  }
}
