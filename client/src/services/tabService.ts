import WindowsService from '#serviceswindowsService.js';
import { observable } from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';

export type Tab = {
  id: string;
  title?: string;
  url: string;
  page?: string;
  favicon?: string;
  loading?: boolean;
  actionIds?: {
    top: string;
    overflow?: string[];
  };
};

export class TabService {
  @inject(WindowsService) ws!: WindowsService;
  @observable tabsById: Record<string, Tab> = {};
  @observable tabIds: Array<string> = [];
  @observable activeTabId?: string;
  @observable shoppingTriggerURL = 'https://www.nike.com';

  constructor() {
    this.getSettingsFromURL();
    const id = this.addTab();
    this.activateTab(id);
  }

  addTab(tab?: Tab) {
    if (!tab) {
      tab = {
        id: `tab-${window.crypto.randomUUID()}`,
        url: 'edge://newtab',
        title: 'New tab',
      };
    }

    this.tabsById = {
      ...this.tabsById,
      [tab.id]: tab,
    };
    this.tabIds = [...this.tabIds, tab.id];

    return tab.id;
  }

  removeTab(tabId: string) {
    const index = this.tabIds.indexOf(tabId);
    if (index === -1) return;

    // If it's the active tab, activate the previous tab.
    // If it's the first tab, activate the next tab.
    if (this.activeTabId === tabId) {
      this.activeTabId = this.tabIds[index - 1] || this.tabIds[index + 1];
    }

    delete this.tabsById[tabId]; // this might not work
    this.tabIds = this.tabIds.filter((id) => id !== tabId);
  }

  activateTab(tabId: string) {
    this.activeTabId = tabId;
  }

  validateURL(url: string) {
    let validUrl = url;
    if (!validUrl.startsWith('edge://')) {
      // see if we just need to add https://
      if (!validUrl.match(/^.+:\/\/.+\..+$/)) validUrl = `https://${url}`;
      // if not, search bing
      if (!validUrl.match(/^.+:\/\/.+\..+$/))
        validUrl = `https://www.bing.com/search?q=${encodeURIComponent(url)}`;
    }

    return validUrl;
  }

  navigateTab(id: string, url: string) {
    const validUrl = this.validateURL(url);

    // Set tab to loading state
    const tab = this.tabsById[id];
    tab.url = validUrl;
    tab.loading = true;
    tab.title = url; // update title to query while loading
    this.tabsById[id] = tab;

    // Get metadata for the new query
    fetch(`/api/metadata?url=${validUrl}`)
      .then((res) => res.json())
      .then((res) => {
        const tab = this.tabsById[id];
        tab.title = res.title;
        tab.favicon = res.favicon;
        this.tabsById = {
          ...this.tabsById,
          [tab.id]: tab,
        };
      });

    // Get full page content
    fetch(`/api/proxy?url=${validUrl}`)
      .then((res) => res.json())
      .then((res) => {
        const tab = this.tabsById[id];
        tab.page = res.page;
        tab.url = res.url; // follow redirects
        this.tabsById = {
          ...this.tabsById,
          [tab.id]: tab,
        };
      });
  }

  tabDidLoad(tabId: string) {
    const tab = this.tabsById[tabId];
    tab.loading = false;
    tab.actionIds = this.getActionsForURL(tab.url);
    this.tabsById = {
      ...this.tabsById,
      [tab.id]: tab,
    };
  }

  tabLoadError(tabId: string) {
    const tab = this.tabsById[tabId];
    tab.loading = false;
    tab.url = 'edge://error';
    delete tab.page;
    this.tabsById = {
      ...this.tabsById,
      [tab.id]: tab,
    };
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
    if (url === 'https://www.madmoizelle.com/soleil-bonheur-161498') {
      overflow.unshift('favorite');
      top = 'translate';
    }
    if (url === 'https://www.figma.com/login') {
      overflow.unshift('favorite');
      top = 'save-password';
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
