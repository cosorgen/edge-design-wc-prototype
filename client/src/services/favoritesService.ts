import { observable } from '@microsoft/fast-element';

export type Favorite = {
  type: 'site';
  url: string;
  title: string;
  favicon?: string;
};

export type FavoriteFolder = {
  type: 'folder';
  title: string;
  children?: (Favorite | FavoriteFolder)[];
};

// Global state for the Edge browser
export default class FavoritesService {
  @observable favorites: (Favorite | FavoriteFolder)[] = [
    {
      type: 'folder',
      title: 'Work',
    },
    {
      type: 'folder',
      title: 'Inspiration',
    },
    {
      type: 'folder',
      title: 'Shopping',
    },
    {
      type: 'site',
      url: 'https://www.microsoft.com',
      title: 'Microsoft',
      favicon: 'https://www.microsoft.com/favicon.ico?v2',
    },
    {
      type: 'site',
      url: 'https://www.youtube.com',
      title: 'YouTube',
      favicon: 'https://www.youtube.com/favicon.ico',
    },
    {
      type: 'site',
      url: 'https://www.amazon.com',
      title: 'Amazon',
      favicon: 'https://www.amazon.com/favicon.ico',
    },
    {
      type: 'site',
      url: 'https://www.instagram.com',
      title: 'Instagram',
      favicon: 'https://static.cdninstagram.com/rsrc.php/y4/r/QaBlI0OZiks.ico',
    },
    {
      type: 'site',
      url: 'https://www.nike.com/t/sportswear-essential-womens-quilted-anorak-jacket-wgWFp0/FZ7364-338',
      title: 'Nike jacket',
      favicon: 'https://www.nike.com/favicon.ico?v=1',
    },
    {
      type: 'folder',
      title: 'Other favorites',
    },
  ];

  private observers: Function[] = [];

  addObserver(observer: Function) {
    this.observers.push(observer);
  }

  removeObserver(observer: Function) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  addFavorite(favorite: Favorite) {
    this.favorites = [...this.favorites, favorite];
    console.log('Added favorite:', this.favorites);
    this.notifyObservers();
  }

  removeFavorite(favorite: Favorite | FavoriteFolder) {
    this.favorites = this.favorites.filter((f) => f.title !== favorite.title);
    console.log('Removed favorite:', this.favorites);
    this.notifyObservers();
  }

  isFavorite(url: string): boolean {
    return this.favorites.some((fav) => {
      if (fav.type === 'site') {
        return fav.url === url; // Check if the URL matches
      }
      return false; // Ignore folders
    });
  }

  private notifyObservers() {
    this.observers.forEach((obs) => obs());
  }
}
