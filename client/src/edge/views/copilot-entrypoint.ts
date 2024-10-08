import {
  customElement,
  FASTElement,
  html,
  css,
  attr,
  when,
  observable,
} from '@microsoft/fast-element';
import {
  borderRadiusCircular,
  colorScrollbarForeground,
  colorScrollbarForegroundHover,
  durationSlow,
  spacingVerticalXS,
  spacingVerticalXXS,
} from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';
import '../controls/copilot-composer.js';
import { inject } from '@microsoft/fast-element/di.js';
import EdgeWindowService from '#servicesedgeWindowService.js';
import { spacingFrame } from '../designSystem.js';

const curveEasyEaseMax = 'cubic-bezier(0.6, 0, 0.3, 1)';

const template = html<CopilotEntrypoint>` <div
    part="grabber"
    @click="${(x) => x.activate()}"
    }
  ></div>
  <div id="click-catcher" @click="${(x) => x.deactivate()}"></div>
  ${when(
    (x) => x.renderComposer,
    html` <copilot-composer>
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
    </copilot-composer>`,
  )}`;

const styles = css`
  :host {
    position: relative;
    width: 100%;
    height: ${spacingVerticalXS};
    margin-block: calc(0px - (${spacingFrame} / 2));
    display: flex;
    justify-content: center;
  }

  [part='grabber'] {
    position: absolute;
    width: 100%;
    max-width: 160px;
    height: ${spacingVerticalXS};
    background-color: ${colorScrollbarForeground};
    border-radius: ${borderRadiusCircular};
    cursor: pointer;

    transition:
      transform ${durationSlow} ${curveEasyEaseMax},
      opacity ${durationSlow} ${curveEasyEaseMax};
  }

  [part='grabber']:hover {
    background-color: ${colorScrollbarForegroundHover};
    height: calc(${spacingVerticalXS} + ${spacingVerticalXXS});
    margin-block-start: calc(0px - ${spacingVerticalXXS} / 2);
  }

  :host([active]) [part='grabber'] {
    background-color: ${colorScrollbarForegroundHover};
    transform: translateY(-68px);
    opacity: 0;
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

  #click-catcher {
    display: none;
    position: fixed;
    inset: 0;
    background: transparent;
  }

  :host([active]) #click-catcher {
    display: block;
  }
`;

@customElement({
  name: 'copilot-entrypoint',
  template,
  styles,
})
export class CopilotEntrypoint extends FASTElement {
  @inject(EdgeWindowService) ews!: EdgeWindowService;
  @attr({ mode: 'boolean' }) active = false;
  @observable renderComposer = false;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListeners();
  }

  addEventListeners() {
    this.addEventListener('close', () => {
      this.deactivate();
    });

    this.addEventListener('submit', () => {
      this.deactivate(true);
    });

    this.addEventListener('home', () => {
      this.deactivate(true);
    });
  }

  activate() {
    this.renderComposer = true;

    // Wait for the element to be rendered before focusing
    const interval = setInterval(() => {
      const composer = this.shadowRoot?.querySelector('copilot-composer');
      if (composer) {
        clearInterval(interval);
        this.active = true;
        composer.addEventListener(
          'transitionend',
          () => {
            composer.querySelector('input')?.focus();
          },
          { once: true },
        );
      }
    }, 10);
  }

  deactivate(openSidepane = false) {
    this.active = false;
    const composer = this.shadowRoot?.querySelector('copilot-composer');
    if (!composer) return;

    composer.addEventListener(
      'transitionend',
      () => {
        this.renderComposer = false;
        this.ews.sidepaneAppId = openSidepane ? 'copilot' : null;
      },
      { once: true },
    );
  }
}
