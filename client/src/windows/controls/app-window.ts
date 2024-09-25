import { shadow28, shadowBaseLayer } from '@phoenixui/themes';
import {
  FASTElement,
  attr,
  css,
  customElement,
  html,
  observable,
} from '@microsoft/fast-element';

const template = html<AppWindow>` <div id="content"><slot></slot></div>
  <div class="grabber" id="top"></div>
  <div class="grabber" id="top-right"></div>
  <div class="grabber" id="right"></div>
  <div class="grabber" id="bottom-right"></div>
  <div class="grabber" id="bottom"></div>
  <div class="grabber" id="bottom-left"></div>
  <div class="grabber" id="left"></div>
  <div class="grabber" id="top-left"></div>`;

const styles = css`
  :host {
    position: absolute;
    z-index: ${(x) => x.zIndex};
    width: ${(x) => x.width};
    height: ${(x) => x.height};
    top: ${(x) => x.yPos};
    left: ${(x) => x.xPos};
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

  #content {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 12px; /* override from the frame sprint */
    box-shadow: ${shadow28};
  }

  .grabber {
    position: absolute;
    width: 16px;
    height: 16px;
    background: red;
    cursor: pointer;
  }

  #top {
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

@customElement({
  name: 'app-window',
  template,
  styles,
})
export class AppWindow extends FASTElement {
  @attr width = '800px';
  @attr height = '600px';
  @attr xPos = '100px';
  @attr yPos = '100px';
  @attr zIndex = 0;
  @observable dragging = false;
}
