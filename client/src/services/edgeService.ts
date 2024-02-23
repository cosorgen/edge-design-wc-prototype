import { observable } from '@microsoft/fast-element';

// Global state for the Edge browser
export default class EdgeSerivce {
  @observable theme: 'light' | 'dark' | 'system' = 'system';
  @observable showFavoritesBar: 'always' | 'new tab' | 'never' = 'always';
  @observable showSideBar = true;
}
