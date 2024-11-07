import { observable } from '@microsoft/fast-element';

export type ToolbarItem = {
  id: string;
  open: boolean;
};

export default class EdgeWindowService {
  @observable id: string | null = null;
  @observable activeSidepaneAppId: string | null = 'Copilot';
  @observable activeToolbarItemId: string | null = null;
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
    this.activeToolbarItemId = null;
  }

  openSidepaneApp(id: string) {
    if (this.activeSidepaneAppId !== id) {
      this.activeSidepaneAppId = id;
      this.openToolbarItem(id);
    }
  }

  closeSidepaneApp() {
    this.activeSidepaneAppId = null;
    this.closeToolbarItem();
  }
}
