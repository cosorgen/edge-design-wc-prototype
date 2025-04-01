import { observable } from '@microsoft/fast-element';

// Global state for the Edge browser
export default class EdgeSettingsSerivce {
  @observable theme: 'light' | 'dark' | 'system' = 'system';
  @observable showFavoritesBar: 'always' | 'newtab' | 'never' = 'newtab';
  @observable showLegacyCopilot = true;
  @observable showCopilotNTP = false;
  @observable truncateURL = false;
  @observable pinnedToolbarItems: string[] = [];
  @observable frameSpacing = '4px';
  @observable showLegacyNewTab = true;
  @observable showMenusInL1 = true;
  @observable fullWidthOmnibox = true;
  @observable themeColor = '#EFF4FA'; // Kumo blue

  constructor() {
    // Load settings from local storage
    this.getSettingsFromURL();
  }

  getSettingsFromURL() {
    const { searchParams } = new URL(window.location.href);
    this.showFavoritesBar =
      (searchParams.get('showFavoritesBar') as 'always' | 'newtab' | 'never') ||
      this.showFavoritesBar;

    this.showLegacyCopilot =
      searchParams.get('showLegacyCopilot') === 'true'
        ? searchParams.get('showLegacyCopilot') === 'true'
        : this.showLegacyCopilot;

    this.showLegacyNewTab =
      searchParams.get('showLegacyNewTab') === 'true'
        ? searchParams.get('showLegacyNewTab') === 'true'
        : this.showLegacyNewTab;

    this.showCopilotNTP =
      searchParams.get('showCopilotNTP') === 'true'
        ? searchParams.get('showCopilotNTP') === 'true'
        : this.showCopilotNTP;
    if (this.showLegacyCopilot) this.pinToolbarItem('Legacy Copilot');

    this.truncateURL =
      searchParams.get('truncateURL') === 'true'
        ? searchParams.get('truncateURL') === 'true'
        : this.truncateURL;

    this.frameSpacing = searchParams.get('frameSpacing') || this.frameSpacing;

    this.showMenusInL1 =
      searchParams.get('showMenusInL1') === 'true'
        ? searchParams.get('showMenusInL1') === 'true'
        : this.showMenusInL1;

    this.fullWidthOmnibox =
      searchParams.get('fullWidthOmnibox') === 'true'
        ? searchParams.get('fullWidthOmnibox') === 'true'
        : this.fullWidthOmnibox;

    this.themeColor = searchParams.get('themeColor') || this.themeColor;
  }

  setSettingsInURL() {
    const url = new URL(window.location.href);
    url.searchParams.set('showFavoritesBar', this.showFavoritesBar);
    url.searchParams.set(
      'showLegacyCopilot',
      this.showLegacyCopilot.toString(),
    );
    url.searchParams.set('showCopilotNTP', this.showCopilotNTP.toString());
    url.searchParams.set('showLegacyNewTab', this.showLegacyNewTab.toString());
    url.searchParams.set('truncateURL', this.truncateURL.toString());
    url.searchParams.set('frameSpacing', this.frameSpacing);
    url.searchParams.set('showMenusInL1', this.showMenusInL1.toString());
    url.searchParams.set('fullWidthOmnibox', this.fullWidthOmnibox.toString());
    url.searchParams.set('themeColor', this.themeColor);

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
    if (show) this.pinToolbarItem('Legacy Copilot');
    else this.unpinToolbarItem('Legacy Copilot');
    this.setSettingsInURL();
  }

  setShowLegacyNewTab(show: boolean) {
    this.showLegacyNewTab = show;
    this.setSettingsInURL();
  }

  setShowCopilotNTP(show: boolean) {
    this.showCopilotNTP = show;
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

  setShowMenusInL1(show: boolean) {
    this.showMenusInL1 = show;
    this.setSettingsInURL();
  }

  setFullWidthOmnibox(show: boolean): void {
    this.fullWidthOmnibox = show;
    this.setSettingsInURL();
  }

  setThemeColor(color: string): void {
    this.themeColor = color;
    this.setSettingsInURL();
  }
}
