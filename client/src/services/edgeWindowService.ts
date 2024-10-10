import { observable } from '@microsoft/fast-element';

export type ToolbarItem = {
  id: string;
  open: boolean;
};

export default class EdgeWindowService {
  @observable sidepaneAppId: string | null = null;
  @observable activeToolbarItemId: string | null = null;

  openToolbarItem(id: string) {
    this.activeToolbarItemId = id;
  }

  closeToolbarItem() {
    this.activeToolbarItemId = null;
  }
}
