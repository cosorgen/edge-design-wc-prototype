import { observable } from '@microsoft/fast-element';

export default class EdgeWindowService {
  @observable moreMenuOpen: boolean = false;
  @observable favoritesOpen: boolean = false;
}
