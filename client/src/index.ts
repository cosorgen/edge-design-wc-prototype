import { FASTElement, css, customElement, html } from '@microsoft/fast-element';
import { inject } from '@microsoft/fast-element/di.js';
import PrototypeService from '#services//prototypeService.js';
import './windows';

const template = html` ${(x: AppRoot) =>
  x.ps.os === 'windows' ? html`<windows-shell></windows-shell>` : ''}`;

const styles = css`
  :host {
    display: block;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
`;

@customElement({
  name: 'app-root',
  template,
  styles,
})
export class AppRoot extends FASTElement {
  @inject(PrototypeService) ps!: PrototypeService;
}
