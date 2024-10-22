import { observable } from '@microsoft/fast-element';

export type ToolbarItem = {
  id: string;
  open: boolean;
};

export default class EdgeWindowService {
  @observable id: string | null = null;
  @observable activeSidepaneAppId: string | null = null;
  @observable activeToolbarItemId: string | null = null;
  @observable composerActive = false;

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
