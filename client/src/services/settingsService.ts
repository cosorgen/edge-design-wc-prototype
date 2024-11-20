import { observable } from '@microsoft/fast-element';

// Global state for the Edge browser
export default class EdgeSettingsSerivce {
  @observable theme: 'light' | 'dark' | 'system' = 'system';
  @observable showFavoritesBar: 'always' | 'newtab' | 'never' = 'never';
  @observable showLegacyCopilot = false;
  @observable showCopilotNTP = false;
  @observable truncateURL = false;
  @observable pinnedToolbarItems: string[] = [];
  @observable frameSpacing = '4px';
  @observable showLegacyNewTab = false;
  @observable showMenusInL1 = true;
  @observable fullWidthOmnibox = false;
  @observable edgeTheme: 'kumo' | 'phoenix' | 'fluent' = 'phoenix';

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

    this.edgeTheme =
      (url.searchParams.get('edgeTheme') as 'kumo' | 'phoenix' | 'fluent') ||
      this.edgeTheme;

    this.showLegacyCopilot =
      url.searchParams.get('showLegacyCopilot') === 'true' ||
      this.showLegacyCopilot;
    this.showLegacyNewTab =
      url.searchParams.get('showLegacyNewTab') === 'true' ||
      this.showLegacyNewTab;
    this.showCopilotNTP =
      url.searchParams.get('showCopilotNTP') === 'true' || this.showCopilotNTP;
    this.showLegacyCopilot && this.pinToolbarItem('Legacy Copilot');

    this.truncateURL =
      url.searchParams.get('truncateURL') === 'true' || this.truncateURL;

    this.frameSpacing =
      url.searchParams.get('frameSpacing') || this.frameSpacing;
    this.showMenusInL1 = url.searchParams.get('showMenusInL1') === 'true';
    this.fullWidthOmnibox = url.searchParams.get('fullWidthOmnibox') === 'true';
  }

  setSettingsInURL() {
    const url = new URL(window.location.href);
    url.searchParams.set('showFavoritesBar', this.showFavoritesBar);
    url.searchParams.set('edgeTheme', this.edgeTheme);
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
    show
      ? this.pinToolbarItem('Legacy Copilot')
      : this.unpinToolbarItem('Legacy Copilot');
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

  setEdgeTheme(theme: 'kumo' | 'phoenix' | 'fluent') {
    this.edgeTheme = theme;
    this.setSettingsInURL();
  }
}
