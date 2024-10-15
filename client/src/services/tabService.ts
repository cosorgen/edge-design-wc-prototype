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

  constructor() {
    this.addTab();
    this.navigate(
      'https://www.nike.com/t/sportswear-essential-womens-quilted-anorak-jacket-wgWFp0/FZ7364-338',
    );
  }

  get tabs() {
    return this.tabs_;
  }

  addTab(tab?: Tab) {
    if (!tab) {
      tab = {
        id: window.crypto.randomUUID(),
        url: 'edge://newtab',
        active: true,
      };
    }

    if (tab.active) this.deactivateTabs();
    this.tabs_.push(tab);
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

  navigate(url: string) {
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
      title: tab.active ? url : tab.title,
      url: tab.active ? validUrl : tab.url,
      loading: tab.active,
    }));

    // Get metadata for the new query
    fetch(`/api/metadata?url=${validUrl}`)
      .then((res) => res.json())
      .then((metadata) => {
        this.tabs_ = this.tabs_.map((tab) => ({
          ...tab,
          title: tab.active ? metadata.title : tab.title,
          favicon: tab.active ? metadata.favicon : tab.favicon,
          loading: false,
          actionIds: tab.active
            ? this.getActionsForURL(validUrl)
            : tab.actionIds,
        }));
      });

    // Set the URL of the active tab to the query
    this.tabs_ = this.tabs_.map((tab) => ({
      ...tab,
      url: tab.active ? validUrl : tab.url,
    }));
  }

  getActionsForURL(url: string) {
    let top = 'favorite';
    const overflow = ['limit-cookies', 'read-aloud', 'install', 'share'];
    if (url.startsWith('https://www.nike.com/t/')) {
      overflow.unshift('favorite');
      top = 'shopping';
    }
    return { top, overflow };
  }
}
