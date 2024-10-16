import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
} from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  colorScrollbarForeground,
  durationSlow,
} from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';
import '../controls/copilot-composer.js';
import { inject } from '@microsoft/fast-element/di.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import { spacingFrame } from '../designSystem.js';

const curveEasyEaseMax = 'cubic-bezier(0.6, 0, 0.3, 1)';

// const template = html<CopilotEntrypoint>`<copilot-composer>
//   <phx-button
//     appearance="subtle"
//     size="large"
//     icon-only
//     @click="${(x) => x.deactivate(true)}"
//     slot="start"
//   >
//     <img src="img/edge/copilot-icon.svg" />
//   </phx-button>
//   <phx-button appearance="subtle" size="large" icon-only slot="end">
//     <svg>
//       <use href="img/edge/icons.svg#cast-20-regular" />
//     </svg>
//   </phx-button>
// </copilot-composer>`;

const template = html<CopilotEntrypoint>` <div id="grabber"></div>
  <div id="hint-target"></div>`;

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
  }

  :host([hint]) #grabber {
    opacity: 0.4;
    width: 64px;
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
    this._hintTargetElement = this.shadowRoot?.querySelector(
      '#hint-target',
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
}
