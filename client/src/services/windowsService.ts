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

    const width = Math.min(window.innerWidth - 48, 1920); // 48px for padding
    let height = width * 0.75; // 4:3 aspect ratio
    height = Math.min(height, window.innerHeight - 96); // 48px for taskbar + padding

    this.windows = [
      ...this.windows,
      {
        id,
        appName,
        height,
        maximized: false,
        minHeight: 200,
        minimized: false,
        minWidth: 300,
        width,
        xPos: window.innerWidth - width - 24 + 24 * this.windows.length,
        yPos: (window.innerHeight - 48 - height) / 2 + 24 * this.windows.length,
        zIndex: this.windows.length + 1,
      },
    ];
    this.activeWindowId = id;

    return id;
  }

  closeWindow(id: string) {
    this.windows = this.windows.filter((w) => w.id !== id);
    if (this.activeWindowId === id) {
      this.activeWindowId = this.windows[this.windows.length - 1]?.id || null;
    }
  }

  activateWindow(id: string) {
    this.activeWindowId = id;
  }

  minimizeWindow(id: string) {
    this.windows = this.windows.map((w) =>
      w.id === id ? { ...w, minimized: true } : w,
    );
  }

  maximizeWindow(id: string) {
    this.windows = this.windows.map((w) =>
      w.id === id ? { ...w, maximized: !w.maximized } : w,
    );
  }
}
