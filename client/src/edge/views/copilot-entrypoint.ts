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

const template = html<CopilotEntrypoint>` <div id="hint-composer"></div>
  <div id="grabber"></div>
  <div id="hint-target"></div>
  <copilot-composer @close="${(x) => x.toggleActive()}"></copilot-composer>`;

const styles = css`
  :host {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-block: ${(x) => x.calcMarginForMinHeight()}; /* Take no space  */

    --bottom-of-frame: calc(0px - max(${spacingFrame}, 6px) / 2);
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
    transition: all ${durationSlow} ${curveEasyEaseMax};
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

    width: 64px;
    bottom: calc(var(--bottom-of-frame) - 32px);
    opacity: 0;
    transition: all ${durationSlow} ${curveEasyEaseMax};
  }

  :host([hint]) #hint-composer {
    width: 160px;
    opacity: 1;
  }

  :host([active]) #hint-composer {
    width: 349px;
    bottom: 0px;
    opacity: 0;
  }

  copilot-composer {
    position: absolute;
    bottom: calc(${spacingFrame} / 2 + 32px);

    display: none;
    opacity: 0;
    transform: translateY(66px);
    width: 160px;
    transition:
      all ${durationSlow} ${curveEasyEaseMax},
      display ${durationSlow} 50ms allow-discrete;
  }

  copilot-composer[expanded] {
    display: flex;
    opacity: 1;
    width: 374px;
    transform: translateY(0px);
  }

  @starting-style {
    copilot-composer[expanded] {
      opacity: 0;
      width: 160px;
      transform: translateY(66px);
    }
  }
`;

@customElement({
  name: 'copilot-entrypoint',
  template,
  styles,
})
export class CopilotEntrypoint extends FASTElement {
  @inject(EdgeWindowService) ews!: EdgeWindowService;
  @inject(EdgeSettingsSerivce) ess!: EdgeSettingsSerivce;
  @attr({ mode: 'boolean' }) hint = false;
  @attr({ mode: 'boolean' }) active = false;
  _hintTargetElement: HTMLElement | null = null;
  _composerElement: HTMLElement | null = null;

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
    ) as HTMLElement;

    this._composerElement = this.shadowRoot?.querySelector(
      'copilot-composer',
    ) as HTMLElement;
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
    this.active && this._composerElement?.focus();
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
    this.ews.composerActive = this.active;
    this.setPopoverState();
    // if (this.active) this._composerElement?.focus();
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
}
