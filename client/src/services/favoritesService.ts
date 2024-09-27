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
      url: 'https://www.outlook.com',
      title: 'Outlook',
      favicon: 'https://www.outlook.com/favicon.ico',
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
      url: 'https://www.netflix.com',
      title: 'Netflix',
      favicon: 'https://www.netflix.com/favicon.ico',
    },
    {
      type: 'folder',
      title: 'Other favorites',
    },
  ];
}
