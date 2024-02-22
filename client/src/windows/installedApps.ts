import { html } from '@microsoft/fast-element';
import '../edge/index.js';

export default [
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
    element: html`<microsoft-edge></microsoft-edge>`,
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
