import { observable } from '@microsoft/fast-element';

export type OS = 'windows' | 'mac' | 'linux';

export default class PrototypeService {
  @observable os: OS = 'windows';
}
