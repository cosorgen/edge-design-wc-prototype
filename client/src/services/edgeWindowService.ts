import { observable } from '@microsoft/fast-element';

export default class EdgeWindowService {
  @observable moreMenuOpen = false;
  @observable favoritesOpen = false;
  @observable disableWebview = false;

  toggleMoreMenuOpen(newState = false) {
    this.moreMenuOpen = newState;
    this.toggleDisableWebview(newState);
  }

  toggleFavoritesOpen(newState = false) {
    this.favoritesOpen = newState;
    this.toggleDisableWebview(newState);
  }

  toggleDisableWebview(newState = false) {
    this.disableWebview = newState;
  }
}
