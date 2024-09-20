import { observable } from '@microsoft/fast-element';

export type OSTheme = 'light' | 'dark';
export type OSTransparency = 'reduced' | 'normal';
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
  @observable theme: OSTheme;
  @observable transparency: OSTransparency;
  @observable windows: Window[] = [];
  @observable activeWindowId: string | null = null;

  constructor() {
    // Set theme and transparency based on system preferences
    this.theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

    // this.transparency = window.matchMedia(
    //   '(prefers-reduced-transparency: reduce)',
    // ).matches
    //   ? 'reduced'
    //   : 'normal';
    this.transparency = 'reduced';

    // Update when system preference changes
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        this.theme = e.matches ? 'dark' : 'light';
      });

    window
      .matchMedia('(prefers-reduced-transparency: reduce)')
      .addEventListener('change', (e) => {
        this.transparency = e.matches ? 'reduced' : 'normal';
      });
  }

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

  closeWindow(id: string | null) {
    this.windows = this.windows.filter((w) => w.id !== id);
    this.activateNextWindow(id);
  }

  activateWindow(id: string | null) {
    this.activeWindowId = id;
  }

  activateNextWindow(id: string | null) {
    if (this.activeWindowId === id) {
      this.activeWindowId =
        this.windows.find((win) => win.id !== id && !win.minimized)?.id || null;
    }
  }

  minimizeWindow(id: string | null) {
    this.windows = this.windows.map((w) =>
      w.id === id ? { ...w, minimized: true } : w,
    );
    this.activateNextWindow(id);
  }

  restoreWindow(id: string | null) {
    this.windows = this.windows.map((w) =>
      w.id === id ? { ...w, minimized: false, maximized: false } : w,
    );
    this.activateWindow(id);
  }

  maximizeWindow(id: string | null) {
    this.windows = this.windows.map((w) =>
      w.id === id ? { ...w, maximized: true } : w,
    );
  }

  getActiveWindow() {
    return this.windows.find((w) => w.id === this.activeWindowId);
  }
}
