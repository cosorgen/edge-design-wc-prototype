import { observable } from '@microsoft/fast-element';

export type Tab = {
  id: string;
  title?: string;
  url: string;
  favicon?: string;
  active: boolean;
  loading?: boolean;
  actionIds?: {
    top: string;
    overflow?: string[];
  };
};

export class TabService {
  @observable private tabs_: Tab[] = [];
  @observable shoppingTriggerURL = 'https://www.nike.com';

  constructor() {
    this.getSettingsFromURL();
    this.addTab();
  }

  get tabs() {
    return this.tabs_;
  }

  addTab(tab?: Tab) {
    const id = window.crypto.randomUUID();
    if (!tab) {
      tab = {
        id,
        url: 'edge://newtab',
        active: true,
      };
    }

    if (tab.active) this.deactivateTabs();
    this.tabs_.push(tab);
    return id;
  }

  removeTab(tabId: string) {
    const tabIndex = this.tabs_.findIndex((tab) => tab.id === tabId);
    const prevTabId =
      this.tabs_[tabIndex - 1]?.id ||
      this.tabs_[tabIndex + 1]?.id ||
      this.tabs_[this.tabs_.length - 1]?.id;

    this.tabs_ = this.tabs_.filter((tab) => tab.id !== tabId);

    if (this.tabs_.length !== 0) {
      this.activateTab(prevTabId);
    }
  }

  activateTab(tabId: string) {
    this.deactivateTabs();
    this.tabs_ = this.tabs_.map((tab) => ({
      ...tab,
      active: tab.id === tabId,
    }));
  }

  getActiveTab() {
    return this.tabs_.find((tab) => tab.active);
  }

  deactivateTabs() {
    this.tabs_ = this.tabs_.map((tab) => ({
      ...tab,
      active: false,
    }));
  }

  navigateTabById(id: string, url: string) {
    // Validate URL
    let validUrl = url;
    if (!validUrl.startsWith('edge://')) {
      // see if we just need to add https://
      if (!validUrl.match(/^.+:\/\/.+\..+$/)) validUrl = `https://${url}`;
      // if not, search bing
      if (!validUrl.match(/^.+:\/\/.+\..+$/))
        validUrl = `https://www.bing.com/search?q=${encodeURIComponent(url)}`;
    }

    // Set tab to loading state
    this.tabs_ = this.tabs_.map((tab) => ({
      ...tab,
      title: tab.id === id ? url : tab.title,
      url: tab.id === id ? validUrl : tab.url,
      loading: tab.id === id,
    }));

    // Get metadata for the new query
    fetch(`/api/metadata?url=${validUrl}`)
      .then((res) => res.json())
      .then((metadata) => {
        this.tabs_ = this.tabs_.map((tab) => ({
          ...tab,
          title: tab.id === id ? metadata.title : tab.title,
          favicon: tab.id === id ? metadata.favicon : tab.favicon,
        }));
      });

    // Set the URL of the active tab to the query
    this.tabs_ = this.tabs_.map((tab) => ({
      ...tab,
      url: tab.id === id ? validUrl : tab.url,
    }));
  }

  tabDidLoad(id: string) {
    this.tabs_ = this.tabs_.map((tab) => ({
      ...tab,
      loading: tab.id === id ? false : tab.loading,
      actionIds: tab.id === id ? this.getActionsForURL(tab.url) : tab.actionIds,
    }));
  }

  tabLoadError(id: string) {
    this.tabs_ = this.tabs_.map((tab) => ({
      ...tab,
      url: tab.id === id ? 'edge://error' : tab.url,
      loading: tab.id === id ? false : tab.loading,
    }));
  }

  getActionsForURL(url: string) {
    let top = 'favorite';
    const overflow = ['limit-cookies', 'read-aloud', 'install', 'share'];
    if (
      url.startsWith(this.shoppingTriggerURL) ||
      url.replace('www.', '').startsWith(this.shoppingTriggerURL) ||
      url.startsWith(this.shoppingTriggerURL.replace('www.', ''))
    ) {
      overflow.unshift('favorite');
      top = 'shopping';
    }
    return { top, overflow };
  }

  updateShoppingTriggerURL(url: string) {
    this.shoppingTriggerURL = url;
    this.setSettingsInURL();
  }

  setSettingsInURL() {
    // Set state in url
    const url = new URL(window.location.href);
    url.searchParams.set(
      'shoppingTriggerURL',
      encodeURIComponent(this.shoppingTriggerURL),
    );
    window.history.pushState({}, '', url.toString());
  }

  getSettingsFromURL() {
    // Get state from url
    const url = new URL(window.location.href);
    this.shoppingTriggerURL = decodeURIComponent(
      url.searchParams.get('shoppingTriggerURL') || this.shoppingTriggerURL,
    );
  }
}
