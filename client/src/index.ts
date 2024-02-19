import { FASTElement, customElement, html } from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import PrototypeService from './services/prototypeService.js';
import './windows';

const template = html` ${(x: AppRoot) =>
  x.ps.os === 'windows' ? html`<windows-shell></windows-shell>` : ''}`;

@customElement({
  name: 'app-root',
  template,
})
export class AppRoot extends FASTElement {
  @inject(PrototypeService) ps!: PrototypeService;

  connectedCallback() {
    super.connectedCallback();
    console.log(this.ps);
  }
}
