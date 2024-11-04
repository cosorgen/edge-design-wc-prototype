import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
  Observable,
  Updates,
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
import { TabService } from '#servicestabService.js';

const template = html<CopilotEntrypoint>` <div id="hint-composer"></div>
  <div id="grabber"></div>
  <div
    id="hint-target"
    @mouseover="${(x, c) => x.handleMouseOverHintTarget(c.event)}"
    @click="${(x) => x.handleClickHintTarget()}"
    @mouseout="${(x, c) => x.handleMouseOverHintTarget(c.event)}"
  ></div>
  <div
    id="composer"
    @mousedown="${(x) => x.handleComposerMouseDown()}"
    block-position="end"
    inline-position="center"
    ?ntp="${(x) => x.ts.tabsById[x.ts.activeTabId!]?.url === 'edge://newtab'}"
  >
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
    --composer-expanded-height: 68px;
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
    min-width: 404px;
    max-width: calc(var(--viewport-width) + ${spacingFrame});
    min-height: 68px;
    max-height: calc(var(--viewport-height) + ${spacingFrame});

    width: var(--composer-expanded-width);
    height: var(--composer-expanded-height);
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

  #composer[ntp] {
    max-width: calc(var(--viewport-width) - var(--ntp-inset) * 2);
    max-height: calc(var(--viewport-height) - var(--ntp-inset) * 2);
  }

  #composer[dragging] {
    transition: none;
  }

  #composer[block-position='end'] {
    inset-block-start: calc(
      var(--window-height) - var(--composer-expanded-height) -
        (${spacingFrame} / 2)
    );
  }

  #composer[block-position='end'][ntp] {
    inset-block-start: calc(
      var(--window-height) - var(--composer-expanded-height) - ${spacingFrame} - var(
          --ntp-inset
        )
    );
  }

  :host(:not([active])) #composer[block-position='end'] {
    inset-block-start: calc(
      var(--window-height) + var(--composer-retracted-height)
    );
  }

  #composer[block-position='start'] {
    inset-block-start: calc(
      var(--viewport-top) - var(--window-top) - ${spacingFrame} / 2
    );
  }

  #composer[block-position='start'][ntp] {
    inset-block-start: calc(
      var(--viewport-top) - var(--window-top) + var(--ntp-inset)
    );
  }

  :host(:not([active])) #composer[block-position='start'] {
    inset-block-start: calc(0px - var(--composer-retracted-height));
  }

  #composer[block-position='center'] {
    inset-block-start: calc(
      var(--viewport-top) - var(--window-top) + (var(--viewport-height) / 2) -
        (var(--composer-expanded-height) / 2)
    );
  }

  #composer[inline-position='center'] {
    inset-inline-start: max(
      ${spacingFrame} / 2,
      calc((var(--window-width) / 2) - (var(--composer-expanded-width) / 2))
    );
  }

  #composer[inline-position='center'][ntp] {
    inset-inline-start: max(
      calc(${spacingFrame} + var(--ntp-inset)),
      calc((var(--window-width) / 2) - (var(--composer-expanded-width) / 2))
    );
  }

  :host(:not([active])) #composer[inline-position='center'] {
    inset-inline-start: calc(
      (var(--window-width) / 2) - (var(--composer-retracted-width) / 2)
    );
  }

  #composer[inline-position='start'] {
    inset-inline-start: calc(${spacingFrame} / 2);
  }

  #composer[inline-position='start'][ntp] {
    inset-inline-start: calc(${spacingFrame} / 2 + var(--ntp-inset));
  }

  :host(:not([active])) #composer[inline-position='start'] {
    inset-inline-start: calc(0px - var(--composer-retracted-width));
  }

  #composer[inline-position='end'] {
    inset-inline-start: calc(
      var(--window-width) - var(--composer-expanded-width) - ${spacingFrame} / 2
    );
  }

  #composer[inline-position='end'][ntp] {
    inset-inline-start: calc(
      var(--window-width) - var(--composer-expanded-width) - ${spacingFrame} / 2 - var(
          --ntp-inset
        )
    );
  }

  :host(:not([active])) #composer[inline-position='end'] {
    inset-inline-start: calc(
      var(--window-width) + var(--composer-retracted-width)
    );
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
  @inject(EdgeWindowService) ews!: EdgeWindowService;
  @inject(EdgeSettingsSerivce) ess!: EdgeSettingsSerivce;
  @inject(TabService) ts!: TabService;
  @attr({ mode: 'boolean' }) hint = false;
  @attr({ mode: 'boolean' }) active = false;
  _composerElement: HTMLDivElement | null = null;
  _resizeVertical = 0;
  _resizeHorizontal = 0;

  connectedCallback(): void {
    super.connectedCallback();
    this.setElements();
    this.addEventListeners();
    if (this.$fastController.isConnected) {
      Updates.enqueue(() => {
        this.setCSSVariables();
      });
    }
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
  }

  removeEventListeners(): void {
    this._composerElement?.removeEventListener(
      'transitionend',
      this.handleComposerTransitionEnd,
    );
    Observable.getNotifier(this.ews).unsubscribe(this);
  }

  handleChange(subject: unknown, key: string): void {
    if (key === 'viewportSize') {
      this.setCSSVariables();
    }
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

  handleComposerTransitionEnd = (e: TransitionEvent) => {
    if (e.propertyName !== 'opacity') return;
    const composer = this._composerElement?.children[0] as HTMLElement;

    // Focus the input when the composer is expanded
    this.active && composer?.focus();

    // Reset the expanded height when composer is closed
    !this.active &&
      this.style.setProperty('--composer-expanded-height', '68px');
  };

  toggleActive(): void {
    this.active = !this.active;
    this.cs.composerActive = this.active;
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
    if (this._composerElement?.getAttribute('inline-position') === 'center')
      this._resizeHorizontal *= 2;
    if (this._composerElement?.getAttribute('block-position') === 'center')
      this._resizeVertical *= 2;
  }

  handleResizeMouseMove = (e: MouseEvent) => {
    if (!this._composerElement) return;
    if (!this.ews.viewportSize) return;

    const deltaX = e.movementX * this._resizeHorizontal;
    const deltaY = e.movementY * this._resizeVertical;
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

      this._composerElement.setAttribute('inline-position', xPosition);
      this._composerElement.setAttribute('block-position', yPosition);
    }
  };

  handleComposerMouseUp = () => {
    window.removeEventListener('mouseup', this.handleComposerMouseUp);
    window.removeEventListener('mousemove', this.handleComposerMouseMove);
    this._composerElement?.removeAttribute('dragging');
    this._composerElement?.style.removeProperty('inset-inline-start');
    this._composerElement?.style.removeProperty('inset-block-start');
  };

  setCSSVariables() {
    const window = this.getBoundingClientRect();
    if (window) {
      this.style.setProperty('--window-width', `${window.width}px`);
      this.style.setProperty('--window-height', `${window.height}px`);
      this.style.setProperty('--window-top', `${window.top}px`);
    }
    const viewportSize = this.ews.viewportSize;
    if (viewportSize) {
      this.style.setProperty('--viewport-width', `${viewportSize.width}px`);
      this.style.setProperty('--viewport-top', `${viewportSize.top}px`);
      this.style.setProperty('--viewport-height', `${viewportSize.height}px`);
    }
  }
}
