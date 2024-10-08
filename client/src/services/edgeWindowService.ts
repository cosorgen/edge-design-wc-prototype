import { observable } from '@microsoft/fast-element';

export type ToolbarItem = {
  id: string;
  open: boolean;
  pinned: boolean;
};

export default class EdgeWindowService {
  @observable sidepaneAppId: string | null = null;
  @observable toolbarItems: ToolbarItem[] = [
    {
      id: 'favorites',
      open: false,
      pinned: false,
    },
    {
      id: 'extensions',
      open: false,
      pinned: false,
    },
  ];

  openToolbarItem(id: string) {
    if (this.toolbarItems.some((i) => i.id === id && i.open)) return;

    // open if already there
    this.toolbarItems = this.toolbarItems.map((i) => ({
      ...i,
      open: i.id === id ? true : i.open,
    }));
  }

  closeToolbarItem(id: string) {
    // close toolbar item by id
    this.toolbarItems = this.toolbarItems.map((i) => ({
      ...i,
      open: i.id === id ? false : i.open,
    }));
  }

  pinToolbarItem(id: string) {
    // pin toolbar item by id
    this.toolbarItems = this.toolbarItems.map((i) => ({
      ...i,
      pinned: i.id === id ? true : i.pinned,
    }));
  }

  unpinToolbarItem(id: string) {
    // unpin toolbar item by id
    this.toolbarItems = this.toolbarItems.map((i) => ({
      ...i,
      pinned: i.id === id ? false : i.pinned,
    }));
  }
}
