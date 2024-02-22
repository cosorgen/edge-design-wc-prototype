import { observable } from '@microsoft/fast-element';

export type OSTheme = 'light' | 'dark';
export type App = {
  name: string;
  lightIcon: string;
  darkIcon?: string;
};
export type Window = {
  id: string;
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
  @observable windows: Window[] = [];
  @observable activeWindowId: string | null = null;

  openWindow(appName: string) {
    const id = crypto.randomUUID();
    this.windows = [
      ...this.windows,
      {
        id,
        appName,
        height: 400,
        maximized: false,
        minHeight: 200,
        minimized: false,
        minWidth: 300,
        width: 500,
        xPos: 20 * this.windows.length + 100,
        yPos: 20 * this.windows.length + 100,
        zIndex: this.windows.length + 1,
      },
    ];
    this.activeWindowId = id;

    return id;
  }
}
