import { observable } from '@microsoft/fast-element';

export type OSTheme = 'light' | 'dark';
export type App = {
  name: string;
  lightIcon: string;
  darkIcon?: string;
};

export default class WindowsService {
  @observable theme: OSTheme = 'dark';
  @observable apps: App[] = [
    {
      name: 'Start',
      lightIcon: 'img/windows/start-icon-24.svg',
      darkIcon: 'img/windows/start-icon-24-dark.svg',
    },
    {
      name: 'Search',
      lightIcon: 'img/windows/search-icon-24.svg',
      darkIcon: 'img/windows/search-icon-24-dark.svg',
    },
    {
      name: 'Task View',
      lightIcon: 'img/windows/task-view-icon-24.svg',
      darkIcon: 'img/windows/task-view-icon-24-dark.svg',
    },
    {
      name: 'Chat',
      lightIcon: 'img/windows/chat-icon-24.svg',
      darkIcon: 'img/windows/chat-icon-24-dark.svg',
    },
    {
      name: 'File Explorer',
      lightIcon: 'img/windows/file-explorer-icon-24.svg',
    },
    {
      name: 'Microsoft Edge',
      lightIcon: 'img/windows/edge-icon-24.svg',
    },
    {
      name: 'Microsoft Store',
      lightIcon: 'img/windows/store-icon-24.svg',
      darkIcon: 'img/windows/store-icon-24-dark.svg',
    },
    {
      name: 'Settings',
      lightIcon: 'img/windows/settings-icon-24.svg',
    },
  ];
}
