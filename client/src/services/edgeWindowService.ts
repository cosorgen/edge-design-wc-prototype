import { observable } from '@microsoft/fast-element';

export type ToolbarItem = {
  id: string;
  open: boolean;
};

export default class EdgeWindowService {
  @observable id?: string;
  @observable activeSidepaneAppId?: string;
  @observable activeToolbarItemId?: string;
  @observable viewportSize?: {
    width: number;
    height: number;
    left: number;
    top: number;
  };

  openToolbarItem(id: string) {
    if (this.activeToolbarItemId !== id) {
      this.activeToolbarItemId = id;
    }
  }

  closeToolbarItem() {
    this.activeToolbarItemId = undefined;
  }

  openSidepaneApp(id: string) {
    if (this.activeSidepaneAppId !== id) {
      this.activeSidepaneAppId = id;
    }
  }

  closeSidepaneApp() {
    this.activeSidepaneAppId = undefined;
  }
}
