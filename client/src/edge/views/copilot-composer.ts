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
  acrylicBackgroundBlur,
  acrylicBackgroundLuminosity,
  borderRadiusCircular,
  colorLayerBackgroundDialog,
  colorNeutralForegroundHint,
  colorScrollbarForeground,
  colorScrollbarForegroundHover,
  durationSlow,
  shadow28,
  spacingHorizontalS,
  spacingHorizontalXL,
  spacingHorizontalXS,
  spacingVerticalXS,
  spacingVerticalXXS,
  strokeWidthThin,
} from '@phoenixui/themes';
import '@phoenixui/web-components/button.js';

const curveEasyEaseMax = 'cubic-bezier(0.6, 0, 0.3, 1)';

const template = html<CopilotComposer>` <div
    part="grabber"
    @click="${(x) => x.activate()}"
    }
  ></div>
  <div id="click-catcher" @click="${(x) => x.deactivate()}"></div>
  ${when(
    (x) => x.renderComposer,
    html` <div part="composer">
      <phx-button appearance="subtle" size="large" icon-only>
        <img src="img/edge/copilot-icon.svg" />
      </phx-button>
      <input type="text" placeholder="Talk about your page" />
      <div>
        <phx-button appearance="subtle" size="large" icon-only>
          <svg>
            <use href="img/edge/icons.svg#cast-20-regular" />
          </svg>
        </phx-button>
      </div>
    </div>`,
  )}`;

const styles = css`
  :host {
    width: 100%;
    height: ${spacingVerticalXS};
    position: relative;
    bottom: 0;
    display: flex;
    justify-content: center;

    transition: all ${durationSlow} ${curveEasyEaseMax};
  }

  :host([active]) {
    margin-block-start: -8px;
  }

  [part='grabber'] {
    position: absolute;
    width: 100%;
    max-width: 160px;
    height: ${spacingVerticalXS};
    background-color: ${colorScrollbarForeground};
    border-radius: ${borderRadiusCircular};
    cursor: pointer;

    transition: all ${durationSlow} ${curveEasyEaseMax};
  }

  [part='grabber']:hover {
    background-color: ${colorScrollbarForegroundHover};
    height: calc(${spacingVerticalXS} + ${spacingVerticalXXS});
    transform: translateY(calc(0px - ${spacingVerticalXXS} / 2));
  }

  :host([active]) [part='grabber'] {
    background-color: ${colorScrollbarForegroundHover};
    transform: translateY(-68px);
    opacity: 0;
  }

  [part='composer'] {
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${spacingHorizontalXS};
    padding: ${spacingHorizontalS};
    background: ${acrylicBackgroundLuminosity};
    background-blend-mode: luminosity;
    backdrop-filter: blur(${acrylicBackgroundBlur});
    border: ${strokeWidthThin} solid ${colorLayerBackgroundDialog};
    border-radius: 28px;
    box-shadow: ${shadow28};
    overflow: hidden;

    transition: all ${durationSlow} ${curveEasyEaseMax};
    transform: translateY(8px);
    opacity: 0;
  }

  :host([active]) [part='composer'] {
    transform: translateY(-68px);
    opacity: 1;
  }

  [part='composer'] input {
    box-sizing: border-box;
    height: 48px;
    min-width: 384px;
    border: none;
    background: ${colorLayerBackgroundDialog};
    border-radius: 20px;
    color: inherit;
    padding: ${spacingHorizontalXS};
    padding-inline-start: ${spacingHorizontalXL};
    box-shadow: 0px 1px 30px rgba(0, 0, 0, 0.03);

    font-size: 18px;
    line-height: 26px;
  }

  [part='composer'] input:focus {
    outline: none;
  }

  [part='composer'] input:empty::placeholder {
    color: ${colorNeutralForegroundHint};
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
  name: 'copilot-composer',
  template,
  styles,
})
export class CopilotComposer extends FASTElement {
  @attr({ mode: 'boolean' }) active = false;
  @observable renderComposer = false;

  activate() {
    this.renderComposer = true;

    // Wait for the element to be rendered before focusing
    const interval = setInterval(() => {
      const composer = this.shadowRoot?.querySelector('[part=composer]');
      if (composer) {
        clearInterval(interval);
        this.active = true;
        const onTransitionEnd = () => {
          composer.querySelector('input')?.focus();
          composer.removeEventListener('transitionend', onTransitionEnd);
        };
        composer.addEventListener('transitionend', onTransitionEnd);
      }
    }, 10);
  }

  deactivate() {
    this.active = false;
    const onTransitionEnd = () => {
      this.renderComposer = false;
      this.removeEventListener('transitionend', onTransitionEnd);
    };
    this.addEventListener('transitionend', onTransitionEnd);
  }
}
