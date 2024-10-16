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
} from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';
import '../controls/copilot-composer.js';
import { inject } from '@microsoft/fast-element/di.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import { spacingFrame } from '../designSystem.js';

const template = html<CopilotEntrypoint>` <div id="hint-composer"></div>
  <div id="grabber"></div>
  <div id="hint-target"></div>
  <div popover="manual">
    <copilot-composer>
      <phx-button
        appearance="subtle"
        size="large"
        icon-only
        @click="${(x) => x.deactivate(true)}"
        slot="start"
      >
        <img src="img/edge/copilot-icon.svg" />
      </phx-button>
      <phx-button appearance="subtle" size="large" icon-only slot="end">
        <svg>
          <use href="img/edge/icons.svg#cast-20-regular" />
        </svg>
      </phx-button>
    </copilot-composer>
  </div>`;

const styles = css`
  :host {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-block-start: calc(0px - ${spacingFrame}); /* Take no space  */
  }

  #hint-target {
    position: absolute;
    bottom: calc(0px - ${spacingFrame});
    width: 256px;
    height: 56px;
    cursor: pointer;
  }

  #grabber {
    position: absolute;
    width: 128px;
    height: 4px;
    top: calc((${spacingFrame} - 4px) / 2);
    border-radius: ${borderRadiusCircular};
    background-color: ${colorScrollbarForeground};

    transition: all ${durationSlow} ${curveEasyEaseMax};
  }

  #hint-composer {
    position: absolute;
    bottom: calc(-64px - ${spacingFrame});
    width: 64px;
    height: 64px;
    border-radius: ${borderRadiusCircular};
    background: ${acrylicBackgroundLuminosity};
    background-blend-mode: luminosity;
    backdrop-filter: blur(${acrylicBackgroundBlur});
    border: ${strokeWidthThin} solid rgba(255, 255, 255, 0.1);
    box-shadow: ${shadow16};

    transition: all ${durationSlow} ${curveEasyEaseMax};
  }

  :host([hint]) #grabber {
    opacity: 0.4;
    width: 64px;
    top: -16px;
  }

  :host([hint]) #hint-composer {
    width: 160px;
    bottom: calc(-32px - ${spacingFrame});
  }

  copilot-composer {
    position: absolute;

    transition:
      transform ${durationSlow} ${curveEasyEaseMax},
      opacity ${durationSlow} ${curveEasyEaseMax};
    transform: translateY(8px);
    opacity: 0;
  }

  :host([active]) copilot-composer {
    transform: translateY(-66px);
    opacity: 1;
  }
`;

@customElement({
  name: 'copilot-entrypoint',
  template,
  styles,
})
export class CopilotEntrypoint extends FASTElement {
  @inject(EdgeWindowService) ews!: EdgeWindowService;
  @attr({ mode: 'boolean' }) hint = false;
  @attr({ mode: 'boolean' }) active = false;
  _hintTargetElement: HTMLElement | null = null;
  _popoverElement: HTMLElement | null = null;

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

  activeChanged(): void {
    this.setPopoverState();
  }

  setElements(): void {
    this._hintTargetElement = this.shadowRoot?.querySelector(
      '#hint-target',
    ) as HTMLElement;

    this._popoverElement = this.shadowRoot?.querySelector(
      '[popover]',
    ) as HTMLElement;
  }

  unsetElements(): void {
    this._hintTargetElement = null;
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
  }

  removeEventListeners(): void {
    this._hintTargetElement?.removeEventListener(
      'pointerdown',
      this.handleMouseOverHintTarget,
    );
    this._hintTargetElement?.removeEventListener(
      'mouseout',
      this.handleMouseOverHintTarget,
    );
  }

  handleMouseOverHintTarget = (e: Event): void => {
    console.log('handleMouseOverHintTarget');
    if (e.type === 'mouseover') {
      this.hint = true;
    } else {
      this.hint = false;
    }
  };

  handleClickHintTarget = (): void => {
    this.active = !this.active;
    this.setPopoverState();
  };

  setPopoverState(): void {
    this.active
      ? this._popoverElement?.showPopover()
      : this._popoverElement?.hidePopover();
  }
}
