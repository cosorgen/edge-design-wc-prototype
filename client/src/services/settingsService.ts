import { observable } from '@microsoft/fast-element';

// Global state for the Edge browser
export default class EdgeSettingsSerivce {
  @observable theme: 'light' | 'dark' | 'system' = 'system';
  @observable showFavoritesBar: 'always' | 'newtab' | 'never' = 'never';

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
}
