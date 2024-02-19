import { observable } from '@microsoft/fast-element';

export type OSTheme = 'light' | 'dark';

export default class WindowsService {
  @observable theme: OSTheme = 'light';
}
