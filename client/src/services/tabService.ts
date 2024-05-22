import { observable } from '@microsoft/fast-element';

export type Tab = {
  id: string;
  title?: string;
  url: string;
  favicon?: string;
  active: boolean;
};

export class TabService {
  @observable private tabs_: Tab[] = [
    {
      id: '1',
      title: 'Google',
      url: 'https://www.google.com',
      favicon: 'https://www.google.com/favicon.ico',
      active: false,
    },
    {
      id: '2',
      title: 'YouTube',
      url: 'https://www.youtube.com',
      favicon: 'https://www.youtube.com/favicon.ico',
      active: false,
    },
    {
      id: '3',
      title: 'Microsoft',
      url: 'https://www.microsoft.com',
      favicon: 'https://www.microsoft.com/favicon.ico?v2',
      active: true,
    },
  ];

  get tabs() {
    return this.tabs_;
  }

  addTab(tab: Tab) {
    this.tabs_.push(tab);
  }

  removeTab(tabId: string) {
    this.tabs_ = this.tabs_.filter((tab) => tab.id !== tabId);
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
}
