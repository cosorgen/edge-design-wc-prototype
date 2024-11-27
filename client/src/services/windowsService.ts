import { observable } from '@microsoft/fast-element';
import installedApps, { type InstalledApp } from '../windows/installedApps.js';

export type OSTheme = 'light' | 'dark';
export type OSTransparency = 'reduced' | 'normal';
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
  lightIcon?: string;
  darkIcon?: string;
};

export default class WindowsService {
  @observable theme: OSTheme;
  @observable transparency: OSTransparency;
  @observable activeWindowId: string | null = null;
  @observable windows: Window[] = [];

  constructor() {
    // Set theme and transparency based on system preferences
    this.theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

    this.transparency = window.matchMedia(
      '(prefers-reduced-transparency: reduce)',
    ).matches
      ? 'reduced'
      : 'normal';

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

    // Override theme and transparency from URL
    this.getSettingsFromURL();

    // open default window
    this.openWindow('Microsoft Edge');
  }

  getSettingsFromURL() {
    const url = new URL(window.location.href);
    this.theme = (url.searchParams.get('theme') as OSTheme) || this.theme;
    this.transparency =
      (url.searchParams.get('transparency') as OSTransparency) ||
      this.transparency;
  }

  setSettingsInURL() {
    const url = new URL(window.location.href);
    url.searchParams.set('theme', this.theme);
    url.searchParams.set('transparency', this.transparency);

    window.history.pushState({}, '', url.toString());
  }

  setTheme(theme: OSTheme) {
    this.theme = theme;
    this.setSettingsInURL();
  }

  setTransparency(transparency: OSTransparency) {
    this.transparency = transparency;
    this.setSettingsInURL();
  }

  openWindow(appName: string) {
    const app = installedApps.find((a) => a.name === appName) as InstalledApp;
    const id = crypto.randomUUID();
    const width = app?.width || Math.min(window.innerWidth - 48, 1920); // 48px for padding
    let height = app?.height || width * 0.75; // 4:3 aspect ratio
    height = Math.min(height, window.innerHeight - 48 - 48); // 48px for taskbar
    const xPos =
      app?.xPos || (window.innerWidth - width) / 2 + 24 * this.windows.length;
    const yPos =
      (window.innerHeight - 48 - height) / 2 + 24 * this.windows.length;

    this.windows = [
      ...this.windows,
      {
        id,
        appName,
        height,
        maximized: app.maximized || false,
        minHeight: app?.minHeight || 300,
        minimized: false,
        minWidth: app?.minWidth || 300,
        width,
        xPos,
        yPos,
        zIndex: 1 + this.windows.length,
      },
    ];
    this.activateWindow(id);

    return id;
  }

  closeWindow(id: string | null) {
    this.windows = this.windows.filter((w) => w.id !== id);
    this.activateNextWindow(id);
  }

  activateWindow(id: string | null) {
    this.activeWindowId = id;

    // Update z-index
    this.windows = this.windows.map((w, i) =>
      w.id === id
        ? { ...w, zIndex: this.windows.length + 1 }
        : {
            ...w,
            zIndex: i + 1,
          },
    );
  }

  activateNextWindow(id: string | null) {
    if (this.activeWindowId === id) {
      this.activeWindowId =
        this.windows.find((win) => win.id !== id && !win.minimized)?.id || null;
    } else if (this.windows.length > 0) {
      // activate the window with the highest z-index that is not minimized
      this.activeWindowId = this.windows
        .filter((win) => !win.minimized)
        .sort((a, b) => a.zIndex - b.zIndex)[0].id;
    } else {
      this.activeWindowId = null;
    }
  }

  minimizeWindow(id: string | null, minimized = true) {
    this.windows = this.windows.map((w) =>
      w.id === id ? { ...w, minimized } : w,
    );
    this.activateNextWindow(id);
  }

  maximizeWindow(id: string | null, maximized = true) {
    this.windows = this.windows.map((w) =>
      w.id === id ? { ...w, maximized } : w,
    );
  }

  getActiveWindow(): Window | undefined {
    return this.windows.find((w) => w.id === this.activeWindowId);
  }

  getWindowById(id: string | null) {
    return this.windows.find((w) => w.id === id);
  }

  moveWindow(
    id: string,
    width: number,
    height: number,
    xPos: number,
    yPos: number,
  ) {
    this.windows = this.windows.map((w) =>
      w.id === id ? { ...w, xPos, yPos, width, height } : w,
    );
  }

  closeAllWindows(appName: string) {
    this.windows = this.windows.filter((w) => w.appName !== appName);
    this.activateNextWindow(null);
  }
}
