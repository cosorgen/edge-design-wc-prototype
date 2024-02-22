import { shadow28 } from '@phoenixui/themes';
import {
  FASTElement,
  attr,
  css,
  customElement,
  html,
} from '@microsoft/fast-element';
import { shadowBaseLayer } from '../designSystem.js';
import { borderRadiusMedium } from '@phoenixui/themes';

const template = html<AppWindow>`<slot></slot>`;

const styles = css`
  :host {
    display: block;
    position: absolute;
    border-radius: ${borderRadiusMedium};
    z-index: ${(x) => x.zIndex};
    width: ${(x) => x.width};
    height: ${(x) => x.height};
    top: ${(x) => x.yPos};
    left: ${(x) => x.xPos};
    box-shadow: ${shadow28};
  }

  :host([active]) {
    box-shadow: ${shadowBaseLayer};
  }

  :host([minimized]) {
    display: none;
  }

  :host([maximized]) {
    top: 0;
    left: 0;
    right: 0;
    bottom: 48px;
    width: auto;
    height: auto;
    border-radius: 0;
    box-shadow: none;
  }
`;

@customElement({
  name: 'app-window',
  template,
  styles,
})
export class AppWindow extends FASTElement {
  @attr width: string = '800px';
  @attr height: string = '600px';
  @attr xPos: string = '100px';
  @attr yPos: string = '100px';
  @attr zIndex: number = 0;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('mousedown', this.handleMouseDown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('mousedown', this.handleMouseDown);
  }

  handleMouseDown(e: MouseEvent) {}
}
