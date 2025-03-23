import {
  borderRadiusMedium,
  curveDecelerateMax,
  durationSlow,
  shadow28,
  shadowBaseLayer,
} from '@edge-design/windows-theme';
import {
  FASTElement,
  attr,
  css,
  customElement,
  html,
  nullableNumberConverter,
  observable,
} from '@microsoft/fast-element';

const template = html<AppWindow>` <div id="content">
    <slot></slot>
  </div>
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
    display: block;
    position: absolute;
    z-index: ${(x) => x.zIndex};
    width: ${(x) => x.width + 'px'};
    height: ${(x) => x.height + 'px'};
    top: ${(x) => x.yPos + 'px'};
    left: ${(x) => x.xPos + 'px'};

    transition: all ${durationSlow} ${curveDecelerateMax};
  }

  :host([dragging]) {
    transition: none;
  }

  :host([minimized]) {
    visibility: hidden;
    transform: scale(0.9) translateY(64px);
    opacity: 0;
  }

  :host([maximized]) {
    top: 0px;
    left: 0px;
    width: ${(x) => x.screenWidth + 'px'};
    height: ${(x) => x.screenHeight - 48 + 'px'};
  }

  #content {
    position: relative; /* required for the grabbers and clipping */
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: ${borderRadiusMedium};
    box-shadow: ${shadow28};
  }

  :host([active]) #content {
    box-shadow: ${shadowBaseLayer};
  }

  :host([maximized]) #content {
    border-radius: 0;
    box-shadow: none;
  }

  :host([dragging]) #content {
    pointer-events: none;
  }

  .grabber {
    position: absolute;
    z-index: ${(x) => x.zIndex};
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

@customElement({ name: 'app-window', template, styles })
export class AppWindow extends FASTElement {
  @attr({ converter: nullableNumberConverter }) width = 800;
  @attr({ converter: nullableNumberConverter }) height = 600;
  @attr({ converter: nullableNumberConverter }) xPos = 100;
  @attr({ converter: nullableNumberConverter }) yPos = 100;
  @attr({ converter: nullableNumberConverter }) zIndex = 0;
  @attr({ mode: 'boolean' }) maximized = false;
  @attr({ mode: 'boolean' }) minimized = false;
  @attr({ attribute: 'min-width', converter: nullableNumberConverter })
  minWidth = 400;
  @attr({ attribute: 'min-height', converter: nullableNumberConverter })
  minHeight = 400;
  @attr({ mode: 'boolean' }) dragging = false;
  @observable screenWidth = window.innerWidth;
  @observable screenHeight = window.innerHeight;
  _appElement?: HTMLElement;
  _contentElement?: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListeners();
    this.setElements();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.handleWindowResize);
    window.removeEventListener('fullscreenchange', this.handleWindowResize);
    this.unsetElements();
  }

  addEventListeners() {
    // Listen for window move events from child app
    this.addEventListener('windowmovestart', this.handleWindowMoveStart);
    // Listen for clicks on the window to bring it to the front
    this.addEventListener('click', this.handleClick);
    // Listen for window resize event
    window.addEventListener('resize', this.handleWindowResize);
    window.addEventListener('fullscreenchange', this.handleWindowResize);
  }

  removeEventListeners() {
    this.removeEventListener('windowmovestart', this.handleWindowMoveStart);
    this.removeEventListener('click', this.handleClick);
    window.removeEventListener('resize', this.handleWindowResize);
    window.removeEventListener('fullscreenchange', this.handleWindowResize);
  }

  setElements() {
    this._appElement = this.shadowRoot
      ?.querySelector('slot')
      ?.assignedElements()[0] as HTMLElement;
    this._contentElement = this.shadowRoot?.querySelector(
      '#content',
    ) as HTMLElement;

    if (this._appElement) this._appElement.id = this.id;
  }

  unsetElements() {
    if (this._appElement) this._appElement.id = '';
    this._appElement = undefined;
    this._contentElement = undefined;
  }

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
  }

  mouseUp() {
    this.$emit('windowmove', {
      id: this.id,
      width: this.width,
      height: this.height,
      xPos: this.xPos,
      yPos: this.yPos,
    });

    this.dragging = false;
  }

  mouseMove(
    e: MouseEvent,
    widthAmp: number,
    heightAmp: number,
    xAmp: number,
    yAmp: number,
  ) {
    const { movementX, movementY } = e;

    let newWidth = this.width + movementX * widthAmp;
    let newHeight = this.height + movementY * heightAmp;
    let newX = this.xPos + movementX * xAmp;
    let newY = this.yPos + movementY * yAmp;

    newWidth = Math.max(this.minWidth, newWidth);
    if (newWidth === this.minWidth && movementX > 0) newX = this.xPos;
    newHeight = Math.max(this.minHeight, newHeight);
    if (newHeight === this.minHeight && movementY > 0) newY = this.yPos;

    this.width = newWidth;
    this.height = newHeight;
    this.xPos = newX;
    this.yPos = newY;
  }

  handleWindowResize = () => {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    const width = Math.min(window.innerWidth - 48, 1920); // 48px for padding
    let height = width * 0.75; // 4:3 aspect ratio
    height = Math.min(height, window.innerHeight - 48 - 48); // 48px for taskbar
    const xPos = (window.innerWidth - width) / 2;
    const yPos = (window.innerHeight - 48 - height) / 2;
    this.$emit('windowmove', { id: this.id, width, height, xPos, yPos });
  };

  handleWindowMoveStart = () => {
    this.mouseDown(0, 0, 1, 1);
  };

  handleClick = () => {
    this.$emit('activate');
  };

  focus() {
    this._appElement?.focus();
  }
}
