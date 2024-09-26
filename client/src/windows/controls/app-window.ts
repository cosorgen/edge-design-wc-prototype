import { shadow28, shadowBaseLayer } from '@phoenixui/themes';
import {
  FASTElement,
  attr,
  css,
  customElement,
  html,
  observable,
  ValueConverter,
} from '@microsoft/fast-element';

const NumberConverter: ValueConverter = {
  toView(value: number): string {
    return value.toString();
  },
  fromView(value: string): number {
    return parseInt(value);
  },
};

const template = html<AppWindow>` <div id="content"><slot></slot></div>
  <div
    class="grabber"
    id="top"
    @mousedown="${(x) => x.mouseDown(0, -1, 0, 1)}"
  ></div>
  <div
    class="grabber"
    id="top-right"
    @mousedown="${(x) => x.mouseDown(1, -1, 0, 1)}"
  ></div>
  <div
    class="grabber"
    id="right"
    @mousedown="${(x) => x.mouseDown(1, 0, 0, 0)}"
  ></div>
  <div
    class="grabber"
    id="bottom-right"
    @mousedown="${(x) => x.mouseDown(1, 1, 0, 0)}"
  ></div>
  <div
    class="grabber"
    id="bottom"
    @mousedown="${(x) => x.mouseDown(0, 1, 0, 0)}"
  ></div>
  <div
    class="grabber"
    id="bottom-left"
    @mousedown="${(x) => x.mouseDown(-1, 1, 1, 0)}"
  ></div>
  <div
    class="grabber"
    id="left"
    @mousedown="${(x) => x.mouseDown(-1, 0, 1, 0)}"
  ></div>
  <div
    class="grabber"
    id="top-left"
    @mousedown="${(x) => x.mouseDown(-1, -1, 1, 1)}"
  ></div>`;

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
  @attr({ attribute: 'min-width', converter: NumberConverter }) minWidth = 400;
  @attr({ attribute: 'min-height', converter: NumberConverter }) minHeight =
    400;
  @observable dragging = false;

  mouseDown(widthAmp: number, heightAmp: number, xAmp: number, yAmp: number) {
    const mouseMove = (e: MouseEvent) =>
      this.mouseMove(e, widthAmp, heightAmp, xAmp, yAmp);
    const mouseUp = () => {
      this.mouseUp();
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);
    this.dragging = true;
    // disable pointer events on iFrame so we hear onMouseUp
    const content = this.shadowRoot?.querySelector('#content') as HTMLElement;
    if (content) content.style.pointerEvents = 'none';
  }

  mouseUp() {
    const curWidth = parseInt(this.width, 10);
    const curHeight = parseInt(this.height, 10);
    const curX = parseInt(this.xPos, 10);
    const curY = parseInt(this.yPos, 10);

    this.$emit('windowmove', {
      windowId: this.id,
      width: curWidth,
      height: curHeight,
      xPos: curX,
      yPos: curY,
    });

    this.dragging = false;
    // re-enable pointer events on iFrame
    const content = this.shadowRoot?.querySelector('#content') as HTMLElement;
    if (content) content.style.pointerEvents = 'unset';
  }

  mouseMove(
    e: MouseEvent,
    widthAmp: number,
    heightAmp: number,
    xAmp: number,
    yAmp: number,
  ) {
    const { movementX, movementY } = e;
    const curWidth = parseInt(this.width, 10);
    const curHeight = parseInt(this.height, 10);
    const curX = parseInt(this.xPos, 10);
    const curY = parseInt(this.yPos, 10);

    let newWidth = curWidth + movementX * widthAmp;
    let newHeight = curHeight + movementY * heightAmp;
    let newX = curX + movementX * xAmp;
    let newY = curY + movementY * yAmp;

    newWidth = Math.max(this.minWidth, newWidth);
    if (newWidth === this.minWidth && movementX > 0) newX = curX;
    newHeight = Math.max(this.minHeight, newHeight);
    if (newHeight === this.minHeight && movementY > 0) newY = curY;

    this.width = `${newWidth}px`;
    this.height = `${newHeight}px`;
    this.xPos = `${newX}px`;
    this.yPos = `${newY}px`;
  }
}
