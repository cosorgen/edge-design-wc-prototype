import { observable } from '@microsoft/fast-element';

export type Tab = {
  id: string;
  title?: string;
  url: string;
  favicon?: string;
  active: boolean;
  loading?: boolean;
};

export class TabService {
  @observable private tabs_: Tab[] = [];

  constructor() {
    this.addTab({
      id: window.crypto.randomUUID(),
      url: 'https://microsoft.com',
      active: true,
      title:
        'Microsoft – AI, Cloud, Productivity, Computing, Gaming & AppsYour Privacy Choices Opt-Out Icon',
      favicon: 'https://microsoft.com/favicon.ico',
    });
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
    if (!url.startsWith('http')) {
      url = `https://www.bing.com/search?q=${url}`;
    }

    // Set tab to loading state
    this.tabs_ = this.tabs_.map((tab) => ({
      ...tab,
      title: tab.active ? url : tab.title,
      loading: tab.active,
    }));

    // Get metadata for the new query
    fetch(`/api/metadata?url=${url}`)
      .then((res) => res.json())
      .then((metadata) => {
        this.tabs_ = this.tabs_.map((tab) => ({
          ...tab,
          title: tab.active ? metadata.title : tab.title,
          favicon: tab.active ? metadata.favicon : tab.favicon,
          loading: false,
        }));
      });

    // Set the URL of the active tab to the query
    this.tabs_ = this.tabs_.map((tab) => ({
      ...tab,
      url: tab.active ? url : tab.url,
    }));
  }
}
