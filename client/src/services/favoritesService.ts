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
      title: 'Youtube',
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

  addFavorite(favorite: Favorite) {
    this.favorites = [...this.favorites, favorite];
    console.log('Added favorite:', this.favorites);
  }

  removeFavorite(favorite: Favorite | FavoriteFolder) {
    this.favorites = this.favorites.filter((f) => f.title !== favorite.title);
    console.log('Removed favorite:', this.favorites);
  }
}
