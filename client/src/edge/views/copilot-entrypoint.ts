import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
} from '@microsoft/fast-element';
import {
  acrylicBackgroundBlur,
  acrylicBackgroundLuminosity,
  borderRadiusCircular,
  colorScrollbarForeground,
  durationSlow,
  shadow16,
  strokeWidthThin,
  curveEasyEaseMax,
  colorLayerBackgroundDialog,
} from '@phoenixui/themes';
import './copilot-composer.js';
import { inject } from '@microsoft/fast-element/di.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import EdgeSettingsSerivce from '#servicessettingsService.js';
import { CopilotService } from '#servicescopilotService.js';
import { spacingFrame } from '../designSystem.js';

const template = html<CopilotEntrypoint>` <div id="hint-composer"></div>
  <div id="grabber"></div>
  <div
    id="hint-target"
    @mouseover="${(x, c) => x.handleMouseOverHintTarget(c.event)}"
    @click="${(x) => x.handleClickHintTarget()}"
    @mouseout="${(x, c) => x.handleMouseOverHintTarget(c.event)}"
  ></div>
  <div id="composer" @mousedown="${(x) => x.handleComposerMouseDown()}">
    <copilot-composer @close="${(x) => x.toggleActive()}"></copilot-composer>
    <div
      class="resize"
      id="top"
      @mousedown="${(x, c) => x.handleResizeMouseDown(c.event)}"
    ></div>
    <div
      class="resize"
      id="left"
      @mousedown="${(x, c) => x.handleResizeMouseDown(c.event)}"
    ></div>
    <div
      class="resize"
      id="right"
      @mousedown="${(x, c) => x.handleResizeMouseDown(c.event)}"
    ></div>
  </div>`;

const styles = css`
  :host {
    --composer-expanded-width: 512px;
    --composer-retracted-width: 160px;
    --composer-expanded-height: fit-content;
    --composer-retracted-height: 68px;

    position: absolute;
    inset: 0;
    pointer-events: none;

    & * {
      pointer-events: auto;
    }
  }

  #hint-target {
    position: absolute;
    bottom: 0;
    left: calc((var(--window-width) / 2) - 128px);
    width: 256px;
    height: 48px;
    cursor: pointer;
  }

  :host([hidden]) #hint-target {
    display: none;
  }

  #grabber {
    position: absolute;
    height: 4px;
    border-radius: ${borderRadiusCircular};
    background-color: ${colorScrollbarForeground};
    left: calc((var(--window-width) / 2) - 64px);

    width: 128px;
    bottom: calc(${spacingFrame} / 2 - 2px);
    opacity: 1;
    transition:
      width ${durationSlow} ${curveEasyEaseMax},
      opacity ${durationSlow} ${curveEasyEaseMax},
      bottom ${durationSlow} ${curveEasyEaseMax},
      left ${durationSlow} ${curveEasyEaseMax};
  }

  :host([hint]) #grabber {
    opacity: 0.4;
    width: 64px;
    bottom: 16px;
    left: calc((var(--window-width) / 2) - 32px);
  }

  :host([active]) #grabber {
    opacity: 0;
    bottom: 68px;
  }

  :host([hidden]) #grabber {
    bottom: -4px;
  }

  #hint-composer {
    position: absolute;
    height: 64px;
    border-radius: ${borderRadiusCircular};
    background: ${acrylicBackgroundLuminosity};
    background-blend-mode: luminosity;
    backdrop-filter: blur(${acrylicBackgroundBlur});
    border: ${strokeWidthThin} solid ${colorLayerBackgroundDialog};
    box-shadow: ${shadow16};

    width: var(--composer-retracted-width);
    bottom: calc(0px - var(--composer-retracted-height));
    left: calc(var(--window-width) / 2 - var(--composer-retracted-width) / 2);
    opacity: 1;
    transition:
      bottom ${durationSlow} ${curveEasyEaseMax},
      width ${durationSlow} ${curveEasyEaseMax},
      opacity ${durationSlow} ${curveEasyEaseMax},
      left ${durationSlow} ${curveEasyEaseMax};
  }

  :host([hint]) #hint-composer {
    bottom: -32px;
  }

  :host([active]) #hint-composer {
    width: var(--composer-expanded-width);
    bottom: 36px;
    left: calc(var(--window-width) / 2 - var(--composer-expanded-width) / 2);
    opacity: 0;
  }

  #composer {
    position: absolute;
    bottom: 32px;
    left: calc(
      (var(--window-width) / 2) - (var(--composer-expanded-width) / 2)
    );
    display: initial;
    width: var(--composer-expanded-width);
    height: var(--composer-expanded-height);
    opacity: 1;
    transition:
      width ${durationSlow} ${curveEasyEaseMax},
      height ${durationSlow} ${curveEasyEaseMax},
      bottom ${durationSlow} ${curveEasyEaseMax},
      left ${durationSlow} ${curveEasyEaseMax},
      opacity ${durationSlow} ${curveEasyEaseMax};
  }

  :host(:not([active])) #composer {
    height: var(--composer-retracted-height);
    width: var(--composer-retracted-width);
    bottom: -68px;
    left: calc(
      (var(--window-width) / 2) - (var(--composer-retracted-width) / 2)
    );
    opacity: 0;
  }

  #composer[dragging] {
    transition: none;
  }

  .resize {
    position: absolute;
    width: 4px;
    height: 4px;
  }

  .resize#top {
    top: -2px;
    left: -2px;
    width: calc(100% + 4px);
    cursor: ns-resize;
  }

  .resize#left {
    top: -2px;
    left: -2px;
    height: calc(100% + 4px);
    cursor: ew-resize;
  }

  .resize#right {
    top: -2px;
    right: -2px;
    height: calc(100% + 4px);
    cursor: ew-resize;
  }
`;

@customElement({
  name: 'copilot-entrypoint',
  template,
  styles,
})
export class CopilotEntrypoint extends FASTElement {
  @inject(CopilotService) cs!: CopilotService;
  @inject(CopilotService) ews!: EdgeWindowService;
  @inject(EdgeSettingsSerivce) ess!: EdgeSettingsSerivce;
  @attr({ mode: 'boolean' }) hint = false;
  @attr({ mode: 'boolean' }) active = false;
  _composerElement: HTMLDivElement | null = null;
  _resizeVertical = 0;
  _resizeHorizontal = 0;

  connectedCallback(): void {
    super.connectedCallback();
    this.setElements();
    this.addEventListeners();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unsetElements();
    this.removeEventListeners();
  }

  setElements(): void {
    this._composerElement = this.shadowRoot?.querySelector(
      '#composer',
    ) as HTMLDivElement;
  }

  unsetElements(): void {
    this._composerElement = null;
  }

  addEventListeners(): void {
    this._composerElement?.addEventListener(
      'transitionend',
      this.handleComposerTransitionEnd,
    );
  }

  removeEventListeners(): void {
    this._composerElement?.removeEventListener(
      'transitionend',
      this.handleComposerTransitionEnd,
    );
  }

  handleMouseOverHintTarget = (e: Event): void => {
    if (e.type === 'mouseover' && !this.hint) {
      this.hint = true;
    } else if (this.hint) {
      this.hint = false;
    }
  };

  handleClickHintTarget = (): void => {
    this.toggleActive();
  };

  openSidebar(): void {
    this._composerElement?.addEventListener(
      'transitionend',
      this.handleTransitionToSidebar,
      { once: true },
    );
    this.toggleActive();
  }

  handleComposerTransitionEnd = (e: TransitionEvent) => {
    if (e.propertyName !== 'opacity') return;
    const composer = this._composerElement?.children[0] as HTMLElement;

    this.active && composer?.focus();
    !this.active &&
      this.style.setProperty('--composer-expanded-height', 'fit-content');
  };

  handleTransitionToSidebar = (e: TransitionEvent) => {
    if (e.propertyName !== 'opacity') {
      this._composerElement?.addEventListener(
        'transitionend',
        this.handleTransitionToSidebar,
        { once: true },
      );
      return;
    }
    this.ews.openSidepaneApp('Copilot');
  };

  toggleActive(): void {
    this.active = !this.active;
    this.cs.composerActive = this.active;
  }

  calcMarginForMinHeight(): string {
    const frameSpacing = parseInt(this.ess.frameSpacing);
    const minHeight = 6;
    let margin = -1 * (frameSpacing / 2);
    if (frameSpacing < minHeight) margin += (minHeight - frameSpacing) / 2;
    return `${margin}px`;
  }

  handleResizeMouseDown(e: Event) {
    e.stopPropagation();
    window.addEventListener('mousemove', this.handleResizeMouseMove);
    window.addEventListener('mouseup', this.handleResizeMouseUp);
    this._composerElement?.setAttribute('dragging', '');
    this._resizeVertical = e
      .composedPath()
      .some((x) => x === this.shadowRoot?.querySelector('.resize#top'))
      ? -1
      : 0;
    this._resizeHorizontal = e
      .composedPath()
      .some((x) => x === this.shadowRoot?.querySelector('.resize#left'))
      ? -1
      : 0;
    this._resizeHorizontal = e
      .composedPath()
      .some((x) => x === this.shadowRoot?.querySelector('.resize#right'))
      ? 1
      : this._resizeHorizontal;
  }

  handleResizeMouseMove = (e: MouseEvent) => {
    if (!this._composerElement) return;

    const deltaX = e.movementX * this._resizeHorizontal;
    const deltaY = e.movementY * this._resizeVertical;
    const composerWidth = this._composerElement.clientWidth;
    const composerHeight = this._composerElement.clientHeight;  
    const viewportHeight = parseInt(
      getComputedStyle(this._composerElement).getPropertyValue(
        '--viewport-height',
      ),
    );
    let newWidth = composerWidth + deltaX;
    newWidth = Math.max(402, newWidth);
    newWidth = Math.min(1024, newWidth);
    let newHeight = composerHeight + deltaY;
    newHeight = Math.max(68, newHeight);
    newHeight = Math.min(viewportHeight / 2, newHeight);

    this.style.setProperty('--composer-expanded-width', `${newWidth}px`);
    this.style.setProperty('--composer-expanded-height', `${newHeight}px`);
  };

  handleResizeMouseUp = () => {
    window.removeEventListener('mousemove', this.handleResizeMouseMove);
    window.removeEventListener('mouseup', this.handleResizeMouseUp);
    this._composerElement?.removeAttribute('dragging');
    this._resizeHorizontal = 0;
    this._resizeVertical = 0;
  };

  handleComposerMouseDown() {
    window.addEventListener('mouseup', this.handleComposerMouseUp);
    window.addEventListener('mousemove', this.handleComposerMouseMove);
    this._composerElement?.setAttribute('dragging', '');
  }

  handleComposerMouseMove = (e: MouseEvent) => {
    if (!this._composerElement) return;

    const composerBottom = parseInt(
      getComputedStyle(this._composerElement).bottom,
    );
    const deltaX = e.movementX;
    const deltaY = e.movementY;
    const newBottom = composerBottom - deltaY;
    const newLeft = this._composerElement.offsetLeft + deltaX;

    this._composerElement.style.left = `${newLeft}px`;
    this._composerElement.style.bottom = `${newBottom}px`;
  };

  handleComposerMouseUp = () => {
    window.removeEventListener('mouseup', this.handleComposerMouseUp);
    window.removeEventListener('mousemove', this.handleComposerMouseMove);
    this._composerElement?.removeAttribute('dragging');
    this._composerElement?.style.removeProperty('bottom');
    this._composerElement?.style.removeProperty('left');
  };
}
