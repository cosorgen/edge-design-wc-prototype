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
import { spacingFrame } from '../designSystem.js';
import EdgeSettingsSerivce from '#servicessettingsService.js';
import { CopilotService } from '#servicescopilotService.js';

const template = html<CopilotEntrypoint>` <div id="hint-composer"></div>
  <div id="grabber"></div>
  <div id="hint-target"></div>
  <div id="composer">
    <copilot-composer @close="${(x) => x.toggleActive()}"></copilot-composer>
    <div
      class="resize"
      id="top"
      @mousedown="${(x) => x.handleResizeNSMouseDown()}"
    ></div>
    <div
      class="resize"
      id="left"
      @mousedown="${(x) => x.handleResizeEWMouseDown()}"
    ></div>
    <div
      class="resize"
      id="right"
      @mousedown="${(x) => x.handleResizeEWMouseDown()}"
    ></div>
  </div>`;

const styles = css`
  :host {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-block: ${(x) => x.calcMarginForMinHeight()}; /* Take no space  */

    --bottom-of-frame: calc(0px - max(${spacingFrame}, 6px) / 2);
    --composer-expanded-width: 512px;
    --composer-retracted-width: 160px;
    --composer-expanded-height: fit-content;
    --composer-retracted-height: fit-content;
  }

  #hint-target {
    position: absolute;
    bottom: var(--bottom-of-frame);
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

    width: 128px;
    bottom: -2px; /* Center the grabber */
    opacity: 1;
    transition:
      width ${durationSlow} ${curveEasyEaseMax},
      opacity ${durationSlow} ${curveEasyEaseMax},
      bottom ${durationSlow} ${curveEasyEaseMax};
  }

  :host([hint]) #grabber {
    opacity: 0.4;
    width: 64px;
    bottom: calc(var(--bottom-of-frame) + 16px - 2px);
  }

  :host([active]) #grabber {
    opacity: 0;
    bottom: calc(var(--bottom-of-frame) + 66px - 2px);
  }

  :host([hidden]) #grabber {
    bottom: calc(var(--bottom-of-frame) - 4px);
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

    bottom: calc(var(--bottom-of-frame) - 66px);
    opacity: 1;
    transition:
      bottom ${durationSlow} ${curveEasyEaseMax},
      width ${durationSlow} ${curveEasyEaseMax},
      opacity ${durationSlow} ${curveEasyEaseMax};
  }

  :host([hint]) #hint-composer {
    bottom: calc(var(--bottom-of-frame) - 32px);
  }

  :host([active]) #hint-composer {
    width: var(--composer-expanded-width);
    bottom: 36px;
    opacity: 0;
  }

  #composer {
    position: absolute;
    bottom: calc(${spacingFrame} / 2 + 32px);
    display: initial;
    max-height: 50vh;

    opacity: 1;
    width: var(--composer-expanded-width);
    height: var(--composer-expanded-height);
    transform: translateY(0px);
    transition:
      opacity ${durationSlow} ${curveEasyEaseMax},
      width ${durationSlow} ${curveEasyEaseMax},
      transform ${durationSlow} ${curveEasyEaseMax},
      display ${durationSlow} 50ms allow-discrete;
  }

  #composer:not([expanded]) {
    display: none;
    opacity: 0;
    transform: translateY(66px);
    width: var(
      --composer-retracted-width
    ) !important; /* Force the width to be same as hint */
    height: var(
      --composer-retracted-height
    ) !important; /* Force the height to be 68px */
  }

  #composer[dragging] {
    transition: none;
  }

  @starting-style {
    #composer {
      opacity: 0;
      width: var(
        --composer-retracted-width
      ) !important; /* Force the width to be same as hint */
      height: var(
        --composer-retracted-height
      ) !important; /* Force the height to be 68px */
      transform: translateY(66px);
    }
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
  _hintTargetElement: HTMLDivElement | null = null;
  _composerElement: HTMLDivElement | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.setElements();
    this.addEventListeners();
    if (this.active) {
      setTimeout(() => {
        this.setPopoverState();
      }, 500);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unsetElements();
    this.removeEventListeners();
  }

  activeChanged(): void {
    this.setPopoverState();
  }

  setElements(): void {
    this._hintTargetElement = this.shadowRoot?.querySelector(
      '#hint-target',
    ) as HTMLDivElement;

    this._composerElement = this.shadowRoot?.querySelector(
      '#composer',
    ) as HTMLDivElement;
  }

  unsetElements(): void {
    this._hintTargetElement = null;
    this._composerElement = null;
  }

  addEventListeners(): void {
    this._hintTargetElement?.addEventListener(
      'mouseover',
      this.handleMouseOverHintTarget,
    );
    this._hintTargetElement?.addEventListener(
      'mouseout',
      this.handleMouseOverHintTarget,
    );
    this._hintTargetElement?.addEventListener(
      'click',
      this.handleClickHintTarget,
    );
    this._composerElement?.addEventListener(
      'transitionend',
      this.handleComposerTransitionEnd,
    );
  }

  removeEventListeners(): void {
    this._hintTargetElement?.removeEventListener(
      'mouseover',
      this.handleMouseOverHintTarget,
    );
    this._hintTargetElement?.removeEventListener(
      'mouseout',
      this.handleMouseOverHintTarget,
    );
    this._hintTargetElement?.removeEventListener(
      'click',
      this.handleClickHintTarget,
    );
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
    this.setPopoverState();
  }

  setPopoverState(): void {
    this.active
      ? this._composerElement?.setAttribute('expanded', '')
      : this._composerElement?.removeAttribute('expanded');
  }

  calcMarginForMinHeight(): string {
    const frameSpacing = parseInt(this.ess.frameSpacing);
    const minHeight = 6;
    let margin = -1 * (frameSpacing / 2);
    if (frameSpacing < minHeight) margin += (minHeight - frameSpacing) / 2;
    return `${margin}px`;
  }

  handleResizeEWMouseDown(): void {
    window.addEventListener('mousemove', this.handleResizeEWMouseMove);
    window.addEventListener('mouseup', this.handleResizeEWMouseUp);

    this._composerElement?.setAttribute('dragging', '');
  }

  handleResizeEWMouseMove = (e: MouseEvent): void => {
    if (!this._composerElement) return;

    const delta = e.movementX;
    const composerWidth = this._composerElement?.clientWidth || 0;
    let newWidth = composerWidth + delta * 2;
    newWidth = Math.max(402, newWidth);
    newWidth = Math.min(1024, newWidth);

    this.style.setProperty('--composer-expanded-width', `${newWidth}px`);
  };

  handleResizeEWMouseUp = (): void => {
    window.removeEventListener('mousemove', this.handleResizeEWMouseMove);
    window.removeEventListener('mouseup', this.handleResizeEWMouseUp);

    this._composerElement?.removeAttribute('dragging');
  };

  handleResizeNSMouseDown(): void {
    window.addEventListener('mousemove', this.handleResizeNSMouseMove);
    window.addEventListener('mouseup', this.handleResizeNSMouseUp);

    this._composerElement?.setAttribute('dragging', '');
  }

  handleResizeNSMouseMove = (e: MouseEvent): void => {
    if (!this._composerElement) return;

    const delta = e.movementY;
    const composerHeight = this._composerElement?.clientHeight || 0;
    let newHeight = composerHeight - delta;
    newHeight = Math.max(68, newHeight);

    this.style.setProperty('--composer-expanded-height', `${newHeight}px`);
  };

  handleResizeNSMouseUp = (): void => {
    window.removeEventListener('mousemove', this.handleResizeNSMouseMove);
    window.removeEventListener('mouseup', this.handleResizeNSMouseUp);

    this._composerElement?.removeAttribute('dragging');
  };
}
