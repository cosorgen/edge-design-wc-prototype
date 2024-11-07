import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
  Observable,
  Updates,
  when,
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
import '../copilot-composer.js';
import { inject } from '@microsoft/fast-element/di.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import EdgeSettingsSerivce from '#servicessettingsService.js';
import { CopilotService } from '#servicescopilotService.js';
import { spacingFrame } from '../../designSystem.js';
import { TabService } from '#servicestabService.js';
import inlineCenterStyles from './inline-center-styles.js';
import inlineStartStyles from './inline-start-styles.js';
import inlineEndStyles from './inline-end-styles.js';
import blockStartStyles from './block-start-styles.js';
import blockEndStyles from './block-end-styles.js';
import blockCenterStyles from './block-center-styles.js';

const DEFAULT_COMPOSER_WIDTH = '512px';
const DEFAULT_COMPOSER_HEIGHT = '68px';

const template = html<CopilotEntrypoint>` ${when(
    (x) => x.cs.showHint,
    html`<div id="hint-composer"></div>`,
  )}
  <div id="${(x) => (x.cs.showHint ? 'grabber' : 'grabber-no-hint')}"></div>
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
      id="bottom"
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
    --hint-target-width: 256px;
    --hint-target-height: 48px;
    --grabber-expanded-width: 64px;
    --grabber-retracted-width: 128px;
    --grabber-vertical-expanded-width: 32px;
    --grabber-vertical-retracted-width: 64px;
    --grabber-height: 4px;
    --composer-expanded-width: ${DEFAULT_COMPOSER_WIDTH};
    --composer-retracted-width: 160px;
    --composer-expanded-height: ${DEFAULT_COMPOSER_HEIGHT};
    --composer-retracted-height: 68px;
    --ntp-inset: 24px;

    position: absolute;
    inset: 0;
    pointer-events: none;

    & * {
      pointer-events: auto;
    }
  }

  #hint-target {
    position: absolute;
    width: var(--hint-target-width);
    height: var(--hint-target-height);
    cursor: pointer;
  }

  :host([hidden]) #hint-target,
  :host([active]) #hint-target {
    display: none;
  }

  :host(:not([inline-position='center'])) #hint-target {
    width: var(--hint-target-height);
    height: var(--hint-target-width);
  }

  #grabber,
  #grabber-no-hint {
    position: absolute;
    height: var(--grabber-height);
    border-radius: ${borderRadiusCircular};
    background-color: ${colorScrollbarForeground};

    width: var(--grabber-retracted-width);
    opacity: 1;
    transition:
      width ${durationSlow} ${curveEasyEaseMax},
      height ${durationSlow} ${curveEasyEaseMax},
      opacity ${durationSlow} ${curveEasyEaseMax},
      inset ${durationSlow} ${curveEasyEaseMax};
  }

  :host([hint]) #grabber,
  :host([hint]) #grabber-no-hint {
    opacity: 0.4;
    width: var(--grabber-expanded-width);
  }

  :host([active]) #grabber,
  :host([active]) #grabber-no-hint {
    opacity: 0;
  }

  :host([dragging]) #grabber {
    opacity: 0.2;
    width: var(--grabber-expanded-width);
  }

  :host([dragging]) #grabber-no-hint {
    opacity: 1;
    width: var(--grabber-expanded-width);
  }

  :host(:not([inline-position='center'])) #grabber,
  :host(:not([inline-position='center'])) #grabber-no-hint {
    width: var(--grabber-height);
    height: var(--grabber-vertical-retracted-width);
  }

  :host(:not([inline-position='center'])[hint]) #grabber,
  :host(:not([inline-position='center'])[hint]) #grabber-no-hint {
    width: var(--grabber-height);
    height: var(--grabber-vertical-expanded-width);
  }

  :host(:not([inline-position='center'])[dragging]) #grabber,
  :host(:not([inline-position='center'])[dragging]) #grabber-no-hint {
    width: var(--grabber-height);
    height: var(--grabber-vertical-expanded-width);
  }

  #hint-composer {
    box-sizing: border-box;
    position: absolute;
    height: var(--composer-retracted-height);
    border-radius: ${borderRadiusCircular};
    background: ${acrylicBackgroundLuminosity};
    background-blend-mode: luminosity;
    backdrop-filter: blur(${acrylicBackgroundBlur});
    border: ${strokeWidthThin} solid ${colorLayerBackgroundDialog};
    box-shadow: ${shadow16};

    width: var(--composer-retracted-width);
    opacity: 1;
    transition:
      width ${durationSlow} ${curveEasyEaseMax},
      opacity ${durationSlow} ${curveEasyEaseMax},
      inset ${durationSlow} ${curveEasyEaseMax};
  }

  :host([hint]) #hint-composer {
    opacity: 1;
    width: var(--composer-retracted-width);
  }

  :host([active]) #hint-composer {
    opacity: 0;
    width: var(--composer-expanded-width);
  }

  :host([dragging]) #hint-composer {
    opacity: 0.5;
    width: var(--composer-retracted-width);
  }

  #composer {
    position: absolute;
    width: clamp(
      404px,
      var(--composer-expanded-width),
      calc(var(--viewport-width) + ${spacingFrame})
    );
    height: clamp(
      var(--composer-retracted-height),
      var(--composer-expanded-height),
      calc(var(--viewport-height) + ${spacingFrame})
    );
    opacity: 1;
    transition:
      width ${durationSlow} ${curveEasyEaseMax},
      height ${durationSlow} ${curveEasyEaseMax},
      inset ${durationSlow} ${curveEasyEaseMax},
      opacity ${durationSlow} ${curveEasyEaseMax};
  }

  :host(:not([active])) #composer {
    height: var(--composer-retracted-height);
    width: var(--composer-retracted-width);
    opacity: 0;
  }

  :host([ntp]) #composer {
    max-width: calc(var(--viewport-width) - var(--ntp-inset) * 2);
    max-height: calc(var(--viewport-height) - var(--ntp-inset) * 2);
  }

  :host([dragging]) #composer,
  :host([resizing]) #composer {
    transition: none;
  }

  ${inlineStartStyles}
  ${inlineCenterStyles}
  ${inlineEndStyles}
  ${blockStartStyles}
  ${blockCenterStyles}
  ${blockEndStyles}

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

  .resize#bottom {
    bottom: -2px;
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
  @inject(EdgeWindowService) ews!: EdgeWindowService;
  @inject(EdgeSettingsSerivce) ess!: EdgeSettingsSerivce;
  @inject(TabService) ts!: TabService;
  @attr({ mode: 'boolean' }) hint = false;
  @attr({ mode: 'boolean' }) active = false;
  @attr({ mode: 'boolean' }) hidden = false;
  @attr({ mode: 'boolean' }) ntp = false;
  @attr({ mode: 'boolean' }) dragging = false;
  @attr({ mode: 'boolean' }) resizing = false;
  @attr({ attribute: 'block-position' }) blockPosition = 'end';
  @attr({ attribute: 'inline-position' }) inlinePosition = 'center';
  _composerElement: HTMLDivElement | null = null;
  _resizeY = 0;
  _resizeX = 0;
  _openTimeout?: NodeJS.Timeout;

  connectedCallback(): void {
    super.connectedCallback();
    this.setElements();
    this.addEventListeners();
    if (this.$fastController.isConnected) {
      Updates.enqueue(() => {
        this.setCSSVariables();
      });
    }

    // finish the transition if the element is already active
    if (this.active)
      this.handleComposerTransitionEnd({
        propertyName: 'opacity',
      } as TransitionEvent);
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
    Observable.getNotifier(this.ews).subscribe(this, 'viewportSize');
    Observable.getNotifier(this.cs).subscribe(this, 'activeThreadId');
  }

  removeEventListeners(): void {
    this._composerElement?.removeEventListener(
      'transitionend',
      this.handleComposerTransitionEnd,
    );
    Observable.getNotifier(this.ews).unsubscribe(this);
    Observable.getNotifier(this.cs).unsubscribe(this);
  }

  handleChange(subject: unknown, key: string): void {
    if (key === 'viewportSize') {
      this.setCSSVariables();
    }
    if (key === 'activeThreadId') {
      this.resizeComposerForChat();
    }
  }

  handleMouseOverHintTarget = (e: Event): void => {
    if (e.type === 'mouseover' && !this.hint) {
      this.hint = true;
      this._openTimeout = setTimeout(() => {
        this.toggleActive();
      }, 350);
    } else if (this.hint) {
      this.hint = false;
      if (this._openTimeout) {
        clearTimeout(this._openTimeout);
        this._openTimeout = undefined;
      }
    }
  };

  handleClickHintTarget = (): void => {
    this.toggleActive();
  };

  handleComposerTransitionEnd = (e: TransitionEvent) => {
    if (e.propertyName !== 'opacity') return;
    const composer = this._composerElement?.children[0] as HTMLElement;

    // Focus the input when the composer is expanded
    this.active && composer?.focus();

    // Reset the expanded height and width when composer is closed
    if (!this.active) {
      this.style.setProperty(
        '--composer-expanded-height',
        DEFAULT_COMPOSER_HEIGHT,
      );
      this.style.setProperty(
        '--composer-expanded-width',
        DEFAULT_COMPOSER_WIDTH,
      );
    }
  };

  toggleActive(): void {
    this.active = !this.active;
    this.cs.composerActive = this.active;
  }

  handleResizeMouseDown(e: Event) {
    e.stopPropagation();
    window.addEventListener('mousemove', this.handleResizeMouseMove);
    window.addEventListener('mouseup', this.handleResizeMouseUp);

    // Set direction and magnitude of resize
    const cp = e.composedPath();
    const t = this.shadowRoot?.querySelector('.resize#top');
    const b = this.shadowRoot?.querySelector('.resize#bottom');
    const l = this.shadowRoot?.querySelector('.resize#left');
    const r = this.shadowRoot?.querySelector('.resize#right');
    this._resizeY = cp.some((x) => x === t) ? -1 : 0;
    this._resizeY = cp.some((x) => x === b) ? 1 : this._resizeY;
    this._resizeX = cp.some((x) => x === l) ? -1 : 0;
    this._resizeX = cp.some((x) => x === r) ? 1 : this._resizeX;
    if (this.inlinePosition === 'center') this._resizeX *= 2;
    if (this.blockPosition === 'center') this._resizeY *= 2;
  }

  handleResizeMouseMove = (e: MouseEvent) => {
    if (!this._composerElement) return;

    // Start the resize if it hasn't started yet
    if (!this.resizing) this.resizing = true;

    const deltaX = e.movementX * this._resizeX;
    const deltaY = e.movementY * this._resizeY;
    const composerWidth = this._composerElement.clientWidth;
    const composerHeight = this._composerElement.clientHeight;
    const newWidth = composerWidth + deltaX;
    const newHeight = composerHeight + deltaY;

    this.style.setProperty('--composer-expanded-width', `${newWidth}px`);
    this.style.setProperty('--composer-expanded-height', `${newHeight}px`);
  };

  handleResizeMouseUp = () => {
    window.removeEventListener('mousemove', this.handleResizeMouseMove);
    window.removeEventListener('mouseup', this.handleResizeMouseUp);
    this.resizing = false;
    this._resizeX = 0;
    this._resizeY = 0;
  };

  handleComposerMouseDown() {
    window.addEventListener('mouseup', this.handleComposerMouseUp);
    window.addEventListener('mousemove', this.handleComposerMouseMove);
  }

  handleComposerMouseMove = (e: MouseEvent) => {
    if (!this._composerElement) return;

    // Start the drag if it hasn't started yet
    if (!this.dragging) this.dragging = true;

    // Move the composer with the cursor
    const deltaX = e.movementX;
    const deltaY = e.movementY;
    const newTop = this._composerElement.offsetTop + deltaY;
    const newLeft = this._composerElement.offsetLeft + deltaX;

    this._composerElement.style.insetInlineStart = `${newLeft}px`;
    this._composerElement.style.insetBlockStart = `${newTop}px`;

    // Set attributes on composer element based on cursor position
    const window = this.getBoundingClientRect();
    if (window) {
      let xPosition: 'center' | 'start' | 'end' = 'center';
      let yPosition: 'center' | 'start' | 'end' = 'center';
      const cursorX = e.clientX;
      const cursorY = e.clientY;
      const windowXThird = window.width / 3;
      const windowYThird = window.height / 3;
      const windowYHalf = window.height / 2;

      if (cursorX < window.left + windowXThird) {
        xPosition = 'start';
      } else if (cursorX > window.left + windowXThird * 2) {
        xPosition = 'end';
      }
      if (cursorY < window.top + windowYThird) {
        yPosition = 'start';
      } else if (cursorY > window.top + windowYThird * 2) {
        yPosition = 'end';
      }
      if (xPosition === 'center' && yPosition === 'center') {
        yPosition = cursorY < window.top + windowYHalf ? 'start' : 'end';
      }

      this.inlinePosition = xPosition;
      this.blockPosition = yPosition;
    }
  };

  handleComposerMouseUp = () => {
    window.removeEventListener('mouseup', this.handleComposerMouseUp);
    window.removeEventListener('mousemove', this.handleComposerMouseMove);
    this.dragging = false;
    Updates.enqueue(() => {
      // Have to wait for rendering to finish before removing the inline styles
      this._composerElement?.style.removeProperty('inset-inline-start');
      this._composerElement?.style.removeProperty('inset-block-start');
    });
  };

  setCSSVariables() {
    const windowSize = this.getBoundingClientRect();
    const viewportSize = this.ews.viewportSize;
    if (viewportSize && windowSize) {
      this.style.setProperty('--viewport-width', `${viewportSize.width}px`);
      this.style.setProperty(
        '--viewport-top',
        `${viewportSize.top - windowSize.top}px`,
      );
      this.style.setProperty('--viewport-height', `${viewportSize.height}px`);
    }
  }

  resizeComposerForChat() {
    if (this.cs.activeThreadId) {
      this.style.setProperty('--composer-expanded-height', '256px');
    } else {
      this.style.setProperty(
        '--composer-expanded-height',
        DEFAULT_COMPOSER_HEIGHT,
      );
    }
  }
}
