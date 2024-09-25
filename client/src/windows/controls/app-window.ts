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
  }

  #content {
    position: relative; /* required for the grabbers and clipping */
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 12px; /* override from the frame sprint */
    box-shadow: ${shadow28};
  }

  :host([active]) #content {
    box-shadow: ${shadowBaseLayer};
  }

  :host([maximized]) #content {
    border-radius: 0;
    box-shadow: none;
  }

  .grabber {
    position: absolute;
  }

  #top {
    top: -8px;
    height: 8px;
    left: 0;
    right: 0;
    cursor: ns-resize;
  }

  #top-right {
    top: -8px;
    right: -8px;
    width: 8px;
    height: 8px;
    cursor: nesw-resize;
  }

  #right {
    top: 0;
    right: -8px;
    bottom: 0;
    width: 8px;
    cursor: ew-resize;
  }

  #bottom-right {
    bottom: -8px;
    right: -8px;
    width: 8px;
    height: 8px;
    cursor: nwse-resize;
  }

  #bottom {
    left: 0;
    bottom: -8px;
    height: 8px;
    right: 0;
    cursor: ns-resize;
  }

  #bottom-left {
    bottom: -8px;
    left: -8px;
    width: 8px;
    height: 8px;
    cursor: nesw-resize;
  }

  #left {
    top: 0;
    left: -8px;
    bottom: 0;
    width: 8px;
    cursor: ew-resize;
  }

  #top-left {
    top: -8px;
    left: -8px;
    width: 8px;
    height: 8px;
    cursor: nwse-resize;
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
