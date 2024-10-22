import { observable } from '@microsoft/fast-element';

// Global state for the Edge browser
export default class EdgeSettingsService {
  @observable theme: 'light' | 'dark' | 'system' = 'system';
  @observable showFavoritesBar: 'always' | 'newtab' | 'never' = 'never';
  @observable showLegacyCopilot = true; // Copilot is always shown
  @observable truncateURL = false;
  @observable pinnedToolbarItems: string[] = [];
  @observable frameSpacing = '4px';
  @observable showLegacyNewTab = true;

  constructor() {
    // Pin Copilot on initialization
    this.pinToolbarItem('Copilot');
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
