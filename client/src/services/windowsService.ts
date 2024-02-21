import { observable } from '@microsoft/fast-element';

export type OSTheme = 'light' | 'dark';
export type App = {
  name: string;
  lightIcon: string;
  darkIcon?: string;
};
export type Window = {
  appName: string;
  height: number;
  maximized: boolean;
  minHeight: number;
  minimized: boolean;
  minWidth: number;
  width: number;
  xPos: number;
  yPos: number;
  zIndex: number;
};

export default class WindowsService {
  @observable theme: OSTheme = 'light';
  @observable apps: App[] = [
    {
      name: 'Start',
      lightIcon: 'img/windows/start-24.svg',
      darkIcon: 'img/windows/start-24-dark.svg',
    },
    {
      name: 'Search',
      lightIcon: 'img/windows/search-24.svg',
      darkIcon: 'img/windows/search-24-dark.svg',
    },
    {
      name: 'Task View',
      lightIcon: 'img/windows/task-view-24.svg',
      darkIcon: 'img/windows/task-view-24-dark.svg',
    },
    {
      name: 'Chat',
      lightIcon: 'img/windows/chat-24.svg',
      darkIcon: 'img/windows/chat-24-dark.svg',
    },
    {
      name: 'File Explorer',
      lightIcon: 'img/windows/file-explorer-24.svg',
    },
    {
      name: 'Microsoft Edge',
      lightIcon: 'img/windows/edge-24.svg',
    },
    {
      name: 'Microsoft Store',
      lightIcon: 'img/windows/store-24.svg',
      darkIcon: 'img/windows/store-24-dark.svg',
    },
    {
      name: 'Settings',
      lightIcon: 'img/windows/settings-24.svg',
    },
  ];
  @observable windowsById: Window[] = [];
  @observable windowOrder: string[] = [];
  @observable activeWindowId: string | null = null;

  openWindow(appName: string) {
    const windowId = crypto.randomUUID();
    this.windowsById = [
      ...this.windowsById,
      {
        appName,
        height: 400,
        maximized: false,
        minHeight: 200,
        minimized: false,
        minWidth: 300,
        width: 500,
        xPos: 100,
        yPos: 100,
        zIndex: this.windowsById.length + 1,
      },
    ];
    this.windowOrder = [...this.windowOrder, windowId];
    this.activeWindowId = windowId;

    return windowId;
  }
}
